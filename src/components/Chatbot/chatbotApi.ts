// ============================================================
//  ORBI MULTI-PROVIDER API ENGINE (SECURE PROXY VERSION)
//  Calls the Cloudflare Worker instead of exposing API keys
// ============================================================

import { buildSystemPrompt } from './chatbotPrompt';
import { AI_NOTICE_VERSION, AI_PROVIDER_REVIEWED, AI_PROVIDER_DISCLOSURE } from '../../data/legalContent.mjs';

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

export interface ChatPermission {
  consent: boolean;
  adult: boolean;
  consentVersion: string;
  signal?: AbortSignal;
}

export async function callOrbi(
  history: GeminiMessage[],
  userText: string,
  permission: ChatPermission,
): Promise<string> {
  // Fail closed even if a caller accidentally bypasses the widget controls.
  if (!AI_PROVIDER_REVIEWED || !AI_PROVIDER_DISCLOSURE.trim() || !permission.consent || !permission.adult || permission.consentVersion !== AI_NOTICE_VERSION) {
    throw new Error('External AI has not been enabled with current consent.');
  }
  const messages = toProxyMessages(history, userText);
  const detectedLang = detectLanguage(userText);
  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: permission.signal,
    body: JSON.stringify({
      messages,
      systemPrompt: buildSystemPrompt(detectedLang),
      consent: true,
      adult: true,
      consentVersion: AI_NOTICE_VERSION,
    }),
  });
  if (!response.ok) throw new Error('AI is unavailable. Please use local FAQ or contact our team.');
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('text' in data) || typeof data.text !== 'string' || !data.text.trim()) {
    throw new Error('AI returned an empty response.');
  }
  return data.text;
}

export function getProviderStatus(): string {
  return AI_PROVIDER_REVIEWED && AI_PROVIDER_DISCLOSURE.trim() ? 'External AI available after consent' : 'Local FAQ mode; external AI paused';
}
