import { AI_NOTICE_VERSION } from '../../src/data/legalContent.mjs';

export interface Env {
  GEMINI_KEYS?: string;
  GEMINI_MODEL?: string;
  OPENROUTER_KEYS?: string;
  OPENROUTER_MODEL?: string;
  OPENROUTER_REVIEWED_PROVIDERS?: string;
  ALLOWED_ORIGINS: string;
  AI_PROVIDER_REVIEWED?: string;
  REVIEWED_PROVIDERS?: string;
}

const MAX_BODY_BYTES = 128 * 1024;
const MAX_PROMPT_LENGTH = 64 * 1024;
const MAX_MESSAGE_CHARACTERS = 32 * 1024;
const WINDOW_MS = 60 * 60 * 1000;

// Best-effort abuse control per isolate, not authentication or a global limit.
export function createRateLimiter() {
  const entries = new Map<string, { count: number; resetAt: number }>();
  return {
    get size() { return entries.size; },
    consume(ip: string, now = Date.now()) {
      for (const [key, entry] of entries) {
        if (entry.resetAt <= now) entries.delete(key);
      }
      const entry = entries.get(ip);
      if (entry) {
        entry.count += 1;
        return { allowed: entry.count <= 30, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
      }
      if (entries.size >= 5000) entries.delete(entries.keys().next().value!);
      entries.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      return { allowed: true, retryAfter: 3600 };
    },
  };
}
const limiter = createRateLimiter();
type ChatMessage = { role: 'user' | 'assistant'; content: string };
type ChatPayload = { messages: ChatMessage[]; systemPrompt: string; consent: true; adult: true; consentVersion: string };
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function validPayload(value: unknown): value is ChatPayload {
  if (!isObject(value) || !Array.isArray(value.messages) || value.messages.length < 1 || value.messages.length > 17) return false;
  if (typeof value.systemPrompt !== 'string' || !value.systemPrompt.trim() || value.systemPrompt.length > MAX_PROMPT_LENGTH) return false;
  let total = 0;
  for (const message of value.messages) {
    if (!isObject(message) || (message.role !== 'user' && message.role !== 'assistant') || typeof message.content !== 'string') return false;
    if (!message.content.trim() || message.content.length > (message.role === 'user' ? 500 : 4000)) return false;
    total += message.content.length;
  }
  return total <= MAX_MESSAGE_CHARACTERS && value.messages[value.messages.length - 1].role === 'user';
}
async function readBody(request: Request): Promise<string> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); throw new RangeError('Payload too large'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
    const permitted = Boolean(origin && origin !== 'null' && allowed.includes(origin));
    const headers: Record<string, string> = {
      'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Origin',
      ...(permitted ? { 'Access-Control-Allow-Origin': origin!, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } : {}),
    };
    const json = (value: unknown, status = 200, extra: Record<string, string> = {}) => new Response(JSON.stringify(value), { status, headers: { ...headers, ...extra } });
    // An origin allow-list filters browser access; it is not authentication.
    if (!permitted) return json({ error: 'Origin not permitted' }, 403);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { Allow: 'POST, OPTIONS' });
    if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return json({ error: 'JSON required' }, 415);
    let payload: unknown;
    try { payload = JSON.parse(await readBody(request)); }
    catch (error) { return json({ error: error instanceof RangeError ? 'Payload too large' : 'Invalid JSON' }, error instanceof RangeError ? 413 : 400); }
    if (!validPayload(payload)) return json({ error: 'Invalid or oversized chat payload' }, 400);
    if (payload.consent !== true || payload.adult !== true || payload.consentVersion !== AI_NOTICE_VERSION) return json({ error: 'Current adult-user consent is required', code: 'CONSENT_REQUIRED' }, 400);
    // Enable only after account, model, retention and disclosures have been reviewed.
    const reviewed = (env.REVIEWED_PROVIDERS || '').split(',').map(value => value.trim());
    if (env.AI_PROVIDER_REVIEWED !== 'true' || !reviewed.some(value => value === 'gemini' || value === 'openrouter')) return json({ error: 'External AI is unavailable; please use FAQ or contact our team', code: 'AI_DISABLED' }, 503);
    const reviewedModelProviders = [...new Set((env.OPENROUTER_REVIEWED_PROVIDERS || '').split(',').map(value => value.trim()).filter(Boolean))];
    if (reviewed.includes('openrouter') && (!env.OPENROUTER_MODEL?.trim() || reviewedModelProviders.length === 0 || reviewedModelProviders.some(value => !/^[a-z0-9][a-z0-9/_-]*$/i.test(value)))) {
      return json({ error: 'OpenRouter model and underlying reviewed providers must be configured', code: 'AI_DISABLED' }, 503);
    }
    const rate = limiter.consume(request.headers.get('CF-Connecting-IP') || 'unknown');
    if (!rate.allowed) return json({ error: 'Too many requests' }, 429, { 'Retry-After': String(rate.retryAfter) });
    const providers = [
      ...(reviewed.includes('gemini') ? (env.GEMINI_KEYS || '').split(',').map(key => ({ type: 'gemini', key: key.trim() })) : []),
      ...(reviewed.includes('openrouter') && env.OPENROUTER_MODEL ? (env.OPENROUTER_KEYS || '').split(',').map(key => ({ type: 'openrouter', key: key.trim() })) : []),
    ].filter(provider => provider.key);
    if (providers.length === 0) return json({ error: 'Reviewed AI provider is not configured', code: 'AI_DISABLED' }, 503);
    for (const provider of providers) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20_000);
      const abort = () => controller.abort();
      request.signal.addEventListener('abort', abort, { once: true });
      try {
        if (request.signal.aborted) return json({ error: 'Request cancelled' }, 499);
        const gemini = provider.type === 'gemini';
        const body = gemini ? {
          system_instruction: { parts: [{ text: payload.systemPrompt }] },
          contents: payload.messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
          generationConfig: { temperature: 0.78, maxOutputTokens: 500 },
        } : {
          model: env.OPENROUTER_MODEL!.trim(),
          messages: [{ role: 'system', content: payload.systemPrompt }, ...payload.messages],
          // Never allow the router to select an undisclosed/unreviewed model host.
          // https://openrouter.ai/docs/guides/routing/provider-selection
          provider: { only: reviewedModelProviders, allow_fallbacks: false, data_collection: 'deny' },
          max_tokens: 500,
          temperature: 0.78,
        };
        const response = await fetch(gemini
          ? `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL || 'gemini-2.5-flash')}:generateContent`
          : 'https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(gemini ? { 'x-goog-api-key': provider.key } : { Authorization: `Bearer ${provider.key}`, 'HTTP-Referer': 'https://orbitengineerings.com', 'X-Title': 'Orbi' }) },
          body: JSON.stringify(body), signal: controller.signal,
        });
        if (!response.ok) continue;
        const data = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[]; choices?: { message?: { content?: string } }[] };
        const text = gemini ? data.candidates?.[0]?.content?.parts?.[0]?.text : data.choices?.[0]?.message?.content;
        if (typeof text === 'string' && text.trim()) return json({ text: text.trim() });
      } catch {
        if (request.signal.aborted) return json({ error: 'Request cancelled' }, 499);
        // Retry only reviewed providers. Never log chat contents or keys.
      } finally { clearTimeout(timeout); request.signal.removeEventListener('abort', abort); }
    }
    return json({ error: 'AI unavailable; please contact our team' }, 503);
  },
};
