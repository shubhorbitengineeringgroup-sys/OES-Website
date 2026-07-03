// ============================================================
//  ORBI MULTI-PROVIDER API ENGINE (SECURE PROXY VERSION)
//  Calls the Cloudflare Worker instead of exposing API keys
// ============================================================

import { buildSystemPrompt } from './chatbotPrompt';

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

const PROXY_URL = 'https://orbi-proxy.orbit-chatbot-proxy.workers.dev';

// Convert Gemini history format to common format expected by proxy
function toProxyMessages(history: GeminiMessage[], userText: string) {
  const messages: { role: string; content: string }[] = [];
  
  for (const msg of history.slice(-16)) {
    messages.push({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.parts.map(p => p.text).join(''),
    });
  }
  
  messages.push({ role: 'user', content: userText });
  return messages;
}

export async function callOrbi(
  history: GeminiMessage[],
  userText: string
): Promise<string> {
  if (!PROXY_URL) {
    return (
      '⚠️ Chatbot security proxy is not configured.\n' +
      '📞 **+91 70241 28029**\n📧 **info@orbitengineerings.com**'
    );
  }

  const messages = toProxyMessages(history, userText);
  const systemPrompt = buildSystemPrompt();

  try {
    const res = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        systemPrompt,
      }),
    });

    if (res.status === 429) {
      return '🙏 Thoda busy hoon abhi. Ek second mein phir try karein ya seedha WhatsApp karein: +91 9039075048';
    }

    if (res.status === 403) {
      return '🚫 Security system block. Please contact support.';
    }

    if (!res.ok) {
      console.error(`[Orbi Proxy] Error ${res.status}`);
      return (
        'Abhi main temporarily unavailable hoon 😅 Seedha humse baat karein:\n' +
        '📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**\n📧 **info@orbitengineerings.com**\n\nHamar team turant help karegi! 🙏'
      );
    }

    const data = await res.json();
    return data.text || 'Kuch technical issue aa gaya. Please thodi der baad try karein.';
  } catch (networkErr) {
    console.error(`[Orbi Proxy] Network error:`, networkErr);
    return `Network issue aa raha hai 😅 Please check your internet connection ya seedha humse baat karein:\n📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**`;
  }
}

// Status helper (for debugging, shown in clear chat or admin)
export function getProviderStatus(): string {
  return PROXY_URL ? `✅ Secure Proxy Active (${PROXY_URL.split('//')[1].split('.')[0]})` : '❌ Proxy Missing';
}
