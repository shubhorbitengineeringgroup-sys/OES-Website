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

// ── Language Detection ──────────────────────────────────────
// Detects which language the user typed in so we can inject
// the correct LANGUAGE LOCK instruction into the system prompt.
function detectLanguage(text: string): 'english' | 'hindi' | 'hinglish' {
  // Devanagari Unicode block → pure Hindi
  if (/[\u0900-\u097F]/.test(text)) return 'hindi';

  // Common Hinglish Roman-script words/patterns
  const hinglishPatterns = [
    /\b(kya|kaise|kab|kyun|kaun|kitna|matlab|nahi|nhi|haan|hnn|acha|accha|bhai|yaar|yrr|toh|hai|ho|hun|mein|mujhe|aapko|chahiye|batao|karo|krdo|dena|lena|abhi|phir|phir|seedha|sahi|thik|bilkul|zaroor|woh|jo|bhi|aur|ya|par|lekin|agar|isliye|kyunki|pls|plz)\b/i,
    /\b(paani|pani|jal|bijli|gaon|sheher|sarkar|sarkari|yojana|project|kaam|kharcha|daam|bhaav|chota|bada|purana|nayi|nayi|nayi)\b/i,
  ];
  if (hinglishPatterns.some(p => p.test(text))) return 'hinglish';

  // Default to English
  return 'english';
}

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
  const detectedLang = detectLanguage(userText);
  const systemPrompt = buildSystemPrompt(detectedLang);

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
      return detectedLang === 'english'
        ? '🙏 I am a little busy right now. Please try again in a moment or reach us on WhatsApp: +91 9039075048'
        : '🙏 Thoda busy hoon abhi. Ek second mein phir try karein ya seedha WhatsApp karein: +91 9039075048';
    }

    if (res.status === 403) {
      return '🚫 Security system block. Please contact support.';
    }

    if (!res.ok) {
      console.error(`[Orbi Proxy] Error ${res.status}`);
      return detectedLang === 'english'
        ? 'I am temporarily unavailable 😅 Please reach us directly:\n📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**\n📧 **info@orbitengineerings.com**'
        : 'Abhi main temporarily unavailable hoon 😅 Seedha humse baat karein:\n📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**\n📧 **info@orbitengineerings.com**\n\nHamari team turant help karegi! 🙏';
    }

    const data = await res.json();
    return data.text || (detectedLang === 'english'
      ? 'There was a technical issue. Please try again in a moment.'
      : 'Kuch technical issue aa gaya. Please thodi der baad try karein.');
  } catch (networkErr) {
    console.error(`[Orbi Proxy] Network error:`, networkErr);
    return detectedLang === 'english'
      ? `Network issue detected 😅 Please check your connection or reach us:\n📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**`
      : `Network issue aa raha hai 😅 Please check your internet connection ya seedha humse baat karein:\n📞 **+91 70241 28029**\n💬 **WhatsApp: +91 9039075048**`;
  }
}

// Status helper (for debugging, shown in clear chat or admin)
export function getProviderStatus(): string {
  return PROXY_URL ? `✅ Secure Proxy Active (${PROXY_URL.split('//')[1].split('.')[0]})` : '❌ Proxy Missing';
}
