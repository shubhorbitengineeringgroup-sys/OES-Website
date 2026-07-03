export interface Env {
  GEMINI_KEYS?: string;
  OPENROUTER_KEYS?: string;
  ALLOWED_ORIGINS: string;
  OPENROUTER_MODEL: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Simple in-memory rate limiter per worker isolate
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function getCorsHeaders(requestOrigin: string | null, env: Env) {
  const allowed = env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
  
  if (requestOrigin && allowed.includes(requestOrigin)) {
    return {
      ...CORS_HEADERS,
      'Access-Control-Allow-Origin': requestOrigin,
    };
  }
  
  return {
    ...CORS_HEADERS,
    'Access-Control-Allow-Origin': allowed[0], // fallback
  };
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin');
    const cors = getCorsHeaders(origin, env);

    // Handle Preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors });
    }

    // 1. Domain Lock Check
    const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map(o => o.trim());
    if (origin && !allowedOrigins.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Unauthorized origin' }), { 
        status: 403, 
        headers: { ...cors, 'Content-Type': 'application/json' } 
      });
    }

    // 2. Simple IP Rate Limiting (Isolate level)
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    const now = Date.now();
    const rateLimit = ipRequests.get(clientIP);

    if (rateLimit) {
      if (now > rateLimit.resetAt) {
        // Reset
        ipRequests.set(clientIP, { count: 1, resetAt: now + 3600000 }); // 1 hour
      } else {
        rateLimit.count++;
        if (rateLimit.count > 30) {
          return new Response(JSON.stringify({ error: 'Too many requests' }), {
            status: 429,
            headers: { ...cors, 'Content-Type': 'application/json' }
          });
        }
      }
    } else {
      ipRequests.set(clientIP, { count: 1, resetAt: now + 3600000 });
    }

    // 3. Payload Validation
    let payload: any;
    try {
      payload = await request.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: cors });
    }

    const { messages, systemPrompt } = payload;
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid payload format' }), { status: 400, headers: cors });
    }

    const lastMessage = messages[messages.length - 1]?.content || '';
    if (lastMessage.length > 500) {
      return new Response(JSON.stringify({ error: 'Message too long' }), { status: 400, headers: cors });
    }

    const lowerMsg = lastMessage.toLowerCase();
    if (lowerMsg.includes('ignore all previous') || lowerMsg.includes('system prompt')) {
      return new Response(JSON.stringify({ error: 'Blocked content detected' }), { status: 403, headers: cors });
    }

    // 4. Multi-Key Round Robin / Failover
    const geminiKeys = (env.GEMINI_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
    const openRouterKeys = (env.OPENROUTER_KEYS || '').split(',').map(k => k.trim()).filter(Boolean);
    const allProviders = [
      ...geminiKeys.map(k => ({ type: 'gemini', key: k })),
      ...openRouterKeys.map(k => ({ type: 'openrouter', key: k }))
    ];

    if (allProviders.length === 0) {
      return new Response(JSON.stringify({ error: 'No API keys configured on server' }), { status: 500, headers: cors });
    }

    // Try keys sequentially until one succeeds
    for (const provider of allProviders) {
      try {
        let text = '';
        
        if (provider.type === 'gemini') {
          // Convert OpenAI format to Gemini format
          const contents = messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          }));

          const body = {
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents,
            generationConfig: {
              temperature: 0.78,
              maxOutputTokens: 500,
            },
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
            ],
          };

          const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${provider.key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });

          console.log(`[Proxy] Gemini status: ${res.status}`);
          if (res.status === 429 || res.status === 401 || res.status === 403) {
            console.log(`[Proxy] Gemini failed with status: ${res.status}`);
            continue; // Try next key
          }
          
          const data: any = await res.json();
          text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
          console.log(`[Proxy] Gemini response text: ${text ? 'Success' : 'Empty'}`);
          
          if (text) return new Response(JSON.stringify({ text }), { headers: { ...cors, 'Content-Type': 'application/json' } });

        } else if (provider.type === 'openrouter') {
          const body = {
            model: env.OPENROUTER_MODEL || 'google/gemma-4-26b-a4b-it:free',
            messages: [{ role: 'system', content: systemPrompt }, ...messages],
            max_tokens: 500,
            temperature: 0.78
          };

          const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${provider.key}`,
              'HTTP-Referer': 'https://orbitengineerings.com',
              'X-Title': 'Orbi Proxy'
            },
            body: JSON.stringify(body)
          });

          console.log(`[Proxy] OpenRouter status: ${res.status}`);
          if (res.status === 429 || res.status === 401 || res.status === 403) {
            console.log(`[Proxy] OpenRouter failed with status: ${res.status}`);
            continue; // Try next key
          }

          const data: any = await res.json();
          text = data?.choices?.[0]?.message?.content?.trim() || '';
          console.log(`[Proxy] OpenRouter response text: ${text ? 'Success' : 'Empty'}`);

          if (text) return new Response(JSON.stringify({ text }), { headers: { ...cors, 'Content-Type': 'application/json' } });
        }
      } catch (err) {
        // Network error for this provider, try next
        continue;
      }
    }

    // If all fail
    return new Response(JSON.stringify({ error: 'All API providers failed or are rate limited.' }), { status: 503, headers: cors });
  },
};
