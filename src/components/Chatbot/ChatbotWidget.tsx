import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, ChevronDown, Phone, Mail, MapPin, Sparkles } from 'lucide-react';

// ============================================================
//  TYPES
// ============================================================
interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// ============================================================
//  CONTACT DATA
// ============================================================
const CONTACT = {
  phones: ['+91 70241 28029', '+91 9039075049'],
  whatsapp: '+91 9039075048',
  emails: ['info@orbitengineerings.com', 'service@orbitengineerings.com'],
  whatsappLink:
    "https://wa.me/919039075048?text=Hello,%20I%20am%20interested%20in%20Orbit%20Engineering's%20services.",
};

// ============================================================
//  SYSTEM PROMPT
// ============================================================
const SYSTEM_PROMPT = `You are Orbi, a warm, professional, and enthusiastic AI assistant for Orbit Engineering Solutions (OES) — a premier engineering company established in 1998, headquartered in Bhopal, Madhya Pradesh, India.

COMPANY OVERVIEW:
- Full Name: Orbit Engineering Solutions (OES)
- Established: 1998 (25+ years of excellence)
- Location: Bhopal, Madhya Pradesh, India
- Core domains: Water infrastructure, Solar energy, Industrial automation, SCADA/Telemetry, IoT, Surveillance systems

PRODUCTS:
1. FLOW MEASUREMENT: Electromagnetic flow meters, bulk flow meters, ultrasonic level transmitters, water meters, smart prepaid water meters, mass flow meters, turbine flow meters, vortex flow meters
2. WATER QUALITY ANALYSIS: Chlorine transmitters, DO transmitters, pH analyzers, turbidity analyzers
3. PRESSURE & LEVEL INSTRUMENTS: Differential pressure transmitters, smart pressure transmitters, hydrostatic level transmitters, capacitance level transmitters, conductive/float/coupling level switches, blind-type pressure transmitters
4. VALVES: Butterfly valves, gate valves, motorized ball valves, sluice valves
5. AUTOMATION & CONTROL: PLC systems (SyncSys PLC), RTU (Remote Terminal Units), SCADA systems, IoT solutions, servers & SCADA software
6. SURVEILLANCE: Bullet cameras, dome cameras, high-speed cameras, PTZ cameras
7. PIPE SYSTEMS: Big jointing machines, welding machines, electrofusion jointing machines, HDPE fittings, chlorinators
8. ELECTRICAL: Auto transformers, distribution transformers, shunt reactors, locomotive transformers, SF6 circuit breakers
9. SOLAR: Smart solar street lights, solar panels

SERVICES:
- Water supply project design, execution & commissioning
- SCADA and telemetry system installation & integration
- Solar power project implementation
- Industrial automation & PLC programming
- Surveillance system setup & maintenance
- Annual Maintenance Contracts (AMC)
- Equipment supply & commissioning

YOUR ROLE:
1. CUSTOMER SUPPORT — Answer queries politely and professionally
2. SALES AGENT — Enthusiastically promote OES solutions; highlight 25+ years experience, government track record, quality products; help users find the right solution
3. GENERAL ENQUIRY — Answer questions about the company, domain (water, solar, automation, SCADA)
4. CONTACT REDIRECT — When user asks for contact details, is frustrated, or wants human support, provide contact info

CONTACT INFORMATION:
- Phone 1: +91 70241 28029
- Phone 2: +91 9039075049
- WhatsApp: +91 9039075048
- Email (General): info@orbitengineerings.com
- Email (Service): service@orbitengineerings.com
- Working Office: Root Space, Char Imli, Mannipuram, Bhopal 462016, MP
- Branch Office: Flat No.2, Block 12, Shalimar Enclave, E3 Arera Colony, Bhopal 462016
- Head Office: E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043
- Business Hours: Monday–Saturday: 10:00 AM – 7:00 PM | Sunday: Closed

PERSONALITY:
- Warm, helpful, professional, enthusiastic
- Use simple, clear language
- Respond in same language as user — Hindi, English, or Hinglish
- Be concise: 2–5 sentences ideal
- Use 1–2 emojis per message
- End with a call to action
- Never make up technical specs not listed above`;

// ============================================================
//  GEMINI API
// ============================================================
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY ?? '';
const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function callGemini(history: GeminiMessage[], userText: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'Main abhi fully configured nahi hoon 😅 Please humse directly contact karein:\n📞 +91 70241 28029\n📧 info@orbitengineerings.com';
  }
  const contents: GeminiMessage[] = [
    ...history.slice(-12),
    { role: 'user', parts: [{ text: userText }] },
  ];
  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: { temperature: 0.72, maxOutputTokens: 450, topP: 0.9 },
  };
  const res = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) { console.error('[Orbi] API error', res.status); throw new Error(`API ${res.status}`); }
  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text?.trim() || "Sorry, I couldn't generate a response. Please try again!";
}

// ============================================================
//  ORBI SVG AVATAR
// ============================================================
function OrbiAvatar({ size = 40, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 80 90" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? { animation: 'orbi-float 3s ease-in-out infinite' } : undefined}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="orbi-hg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0073bc" /><stop offset="100%" stopColor="#00a8e0" />
        </linearGradient>
        <linearGradient id="orbi-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#005a94" /><stop offset="100%" stopColor="#0073bc" />
        </linearGradient>
        <linearGradient id="orbi-dg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#0073bc" />
        </linearGradient>
        <filter id="orbi-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Antenna */}
      <line x1="40" y1="9" x2="40" y2="21" stroke="#0073bc" strokeWidth="2.5" strokeLinecap="round" />
      {/* Water drop */}
      <path d="M40 2 C37 5,33 10,33 13 C33 16.9,36.1 20,40 20 C43.9 20,47 16.9,47 13 C47 10,43 5,40 2Z"
        fill="url(#orbi-dg)" filter="url(#orbi-glow)" />
      <ellipse cx="37.5" cy="13" rx="2" ry="3" fill="rgba(255,255,255,0.45)" />
      {/* Head */}
      <rect x="13" y="21" width="54" height="42" rx="17" fill="url(#orbi-hg)" />
      <rect x="19" y="27" width="42" height="30" rx="11" fill="rgba(255,255,255,0.12)" />
      {/* Eyes */}
      <circle cx="30" cy="39" r="9" fill="white" />
      <circle cx="30" cy="39" r="5.5" fill="#0073bc" />
      <circle cx="30" cy="39" r="2.8" fill="#001f3f" />
      <circle cx="32" cy="37" r="1.8" fill="white" />
      <circle cx="50" cy="39" r="9" fill="white" />
      <circle cx="50" cy="39" r="5.5" fill="#0073bc" />
      <circle cx="50" cy="39" r="2.8" fill="#001f3f" />
      <circle cx="52" cy="37" r="1.8" fill="white" />
      {/* Smile */}
      <path d="M27 51 Q40 59 53 51" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx="20" cy="44" r="4.5" fill="rgba(255,255,255,0.18)" />
      <circle cx="60" cy="44" r="4.5" fill="rgba(255,255,255,0.18)" />
      {/* Body */}
      <rect x="19" y="65" width="42" height="23" rx="11" fill="url(#orbi-bg)" />
      <rect x="26" y="70" width="28" height="13" rx="5" fill="rgba(255,255,255,0.15)" />
      <circle cx="33" cy="76.5" r="3.2" fill="#00d4ff" opacity="0.85" />
      <circle cx="40" cy="76.5" r="3.2" fill="#7eeef7" opacity="0.85" />
      <circle cx="47" cy="76.5" r="3.2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

// ============================================================
//  GREETING TOAST — BEAUTIFUL NOTIFICATION CARD
// ============================================================
function GreetingToast({ onClose, onOpenChat }: { onClose: () => void; onOpenChat: () => void }) {
  const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'leaving'>('hidden');
  const [progress, setProgress] = useState(100);
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setPhase('leaving');
    setTimeout(onClose, 500);
  }, [onClose]);

  useEffect(() => {
    // Phase 1: show after 2.5s
    const t1 = setTimeout(() => setPhase('entering'), 2500);
    // Phase 2: settle to visible
    const t2 = setTimeout(() => setPhase('visible'), 2500 + 60);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (phase !== 'visible') return;
    // Countdown 6 seconds
    const tick = setInterval(() => {
      setProgress(p => {
        const next = Math.max(0, p - 1.66); // ~6s
        if (next <= 0) { clearInterval(tick); dismiss(); }
        return next;
      });
    }, 100);
    return () => clearInterval(tick);
  }, [phase, dismiss]);

  if (phase === 'hidden') return null;

  const isVisible = phase === 'visible' || phase === 'entering';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '22px',
        zIndex: 10001,
        fontFamily: "'Inter', system-ui, sans-serif",
        /* Mobile: center bottom */
      }}
    >
      {/* Outer glow ring */}
      <div style={{
        position: 'absolute', inset: '-6px',
        borderRadius: '26px',
        background: 'linear-gradient(135deg, rgba(0,115,188,0.15), rgba(0,212,255,0.08))',
        filter: 'blur(8px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }} />

      {/* Main card */}
      <div style={{
        width: '300px',
        maxWidth: 'calc(100vw - 44px)',
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 12px 48px rgba(0,115,188,0.22), 0 4px 16px rgba(0,0,0,0.08)',
        border: '1px solid rgba(0,115,188,0.12)',
        transform: isVisible
          ? 'translateY(0) scale(1)'
          : phase === 'leaving'
            ? 'translateY(16px) scale(0.94)'
            : 'translateY(30px) scale(0.88)',
        opacity: isVisible ? 1 : 0,
        transition: phase === 'entering'
          ? 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease'
          : 'transform 0.4s ease-in, opacity 0.4s ease-in',
      }}>

        {/* Top gradient bar */}
        <div style={{
          height: '4px',
          background: 'linear-gradient(90deg, #0073bc 0%, #00a8e0 50%, #00d4ff 100%)',
        }} />

        {/* Header section */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '16px 16px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
        }}>
          {/* Decorative water drops */}
          <div style={{
            position: 'absolute', top: '8px', right: '48px',
            width: '8px', height: '12px',
            background: 'rgba(0,115,188,0.12)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'rotate(-20deg)',
          }} />
          <div style={{
            position: 'absolute', top: '14px', right: '38px',
            width: '5px', height: '8px',
            background: 'rgba(0,115,188,0.08)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            transform: 'rotate(10deg)',
          }} />

          {/* Avatar */}
          <div style={{
            width: '52px', height: '52px', flexShrink: 0,
            background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,115,188,0.35)',
            border: '3px solid white',
          }}>
            <OrbiAvatar size={38} animate />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#0073bc' }}>Orbi</span>
              <span style={{
                fontSize: '10px', fontWeight: 600, color: '#059669',
                background: '#d1fae5', padding: '1px 7px', borderRadius: '10px',
                border: '1px solid #a7f3d0',
              }}>Online ●</span>
            </div>
            <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>
              Orbit Engineering Assistant 🌊
            </div>
          </div>

          {/* Close btn */}
          <button
            onClick={dismiss}
            aria-label="Dismiss"
            style={{
              alignSelf: 'flex-start',
              background: 'rgba(0,0,0,0.05)', border: 'none',
              cursor: 'pointer', color: '#9ca3af',
              width: '24px', height: '24px',
              borderRadius: '6px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.1)'; (e.currentTarget as HTMLButtonElement).style.color = '#4b5563'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.05)'; (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Message bubble */}
        <div style={{ padding: '12px 16px 14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f8fbff, #f0f9ff)',
            borderRadius: '14px 14px 14px 4px',
            padding: '12px 14px',
            border: '1px solid rgba(0,115,188,0.1)',
            fontSize: '13px', color: '#374151', lineHeight: 1.6,
            position: 'relative',
          }}>
            <span style={{ fontSize: '15px' }}>👋</span> <strong style={{ color: '#0073bc' }}>Namaste!</strong> I'm Orbi, your Orbit Engineering assistant.
            <br /><br />
            Need help with <strong>water solutions</strong>, <strong>solar projects</strong>, or product enquiries? I'm here 24/7! ✨
          </div>

          {/* CTA Button */}
          <button
            onClick={() => { dismiss(); onOpenChat(); }}
            style={{
              marginTop: '10px',
              width: '100%',
              padding: '11px',
              background: 'linear-gradient(135deg, #0073bc 0%, #00a8e0 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 14px rgba(0,115,188,0.35)',
              transition: 'all 0.2s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(0,115,188,0.45)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(0,115,188,0.35)'; }}
          >
            <Sparkles size={15} />
            Start Chatting with Orbi
          </button>

          {/* Progress bar */}
          <div style={{
            marginTop: '10px', height: '3px', background: '#f1f5f9',
            borderRadius: '2px', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', width: `${progress}%`,
              background: 'linear-gradient(90deg, #0073bc, #00d4ff)',
              borderRadius: '2px', transition: 'width 0.1s linear',
            }} />
          </div>
          <p style={{ margin: '5px 0 0', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
            Auto-closing in a moment…
          </p>
        </div>
      </div>

      {/* Tail arrow */}
      <div style={{
        position: 'absolute', bottom: '-8px', right: '36px',
        width: '16px', height: '16px',
        background: 'white',
        transform: 'rotate(45deg)',
        borderRight: '1px solid rgba(0,115,188,0.12)',
        borderBottom: '1px solid rgba(0,115,188,0.12)',
        boxShadow: '3px 3px 5px rgba(0,0,0,0.03)',
      }} />
    </div>
  );
}

// ============================================================
//  QUICK REPLIES
// ============================================================
const QUICK_REPLIES = [
  { icon: '🌊', label: 'Water Projects' },
  { icon: '☀️', label: 'Solar Solutions' },
  { icon: '⚙️', label: 'SCADA & Automation' },
  { icon: '📞', label: 'Contact & Location' },
  { icon: '💼', label: 'Get a Quote' },
];

// ============================================================
//  CONTACT CARD
// ============================================================
function ContactCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '14px', padding: '14px',
      border: '1px solid rgba(0,115,188,0.18)',
      fontSize: '12.5px', lineHeight: 1.6,
    }}>
      <p style={{ margin: '0 0 10px', fontWeight: 700, color: '#0073bc', fontSize: '13.5px' }}>
        🏢 Orbit Engineering Solutions
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
        <Phone size={11} color="#0073bc" style={{ flexShrink: 0 }} />
        <span>
          <a href="tel:7024128029" style={{ color: '#0073bc', textDecoration: 'none', fontWeight: 600 }}>+91 70241 28029</a>
          {' | '}
          <a href="tel:9039075049" style={{ color: '#0073bc', textDecoration: 'none', fontWeight: 600 }}>+91 9039075049</a>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
        <Mail size={11} color="#0073bc" style={{ flexShrink: 0 }} />
        <a href="mailto:info@orbitengineerings.com" style={{ color: '#0073bc', textDecoration: 'none', fontWeight: 500 }}>
          info@orbitengineerings.com
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px', marginBottom: '10px', color: '#6b7280' }}>
        <MapPin size={11} color="#0073bc" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>Root Space, Char Imli, Mannipuram, Bhopal MP 462016</span>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: '11px', color: '#6b7280' }}>
        🕐 Mon–Sat: 10:00 AM – 7:00 PM | Sun: Closed
      </p>
      <a
        href={CONTACT.whatsappLink}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          padding: '9px', background: '#25D366', color: 'white',
          borderRadius: '10px', textDecoration: 'none', fontWeight: 700, fontSize: '12.5px',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        </svg>
        WhatsApp Us Now
      </a>
    </div>
  );
}

// ============================================================
//  RENDER MARKDOWN LITE
// ============================================================
function RenderText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => {
        const parts = line.split(/\*\*(.+?)\*\*/g);
        return (
          <span key={i}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

// ============================================================
//  USE WINDOW SIZE HOOK
// ============================================================
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return isMobile;
}

// ============================================================
//  MAIN CHATBOT WIDGET
// ============================================================
export default function ChatbotWidget() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [greetingActive, setGreetingActive] = useState(false);
  const [greetingDone, setGreetingDone] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: "Namaste! 🙏 I'm **Orbi**, your Orbit Engineering assistant!\n\nI can help you with:\n• 🌊 Water infrastructure & SCADA\n• ☀️ Solar energy solutions\n• ⚙️ Products, specs & quotes\n• 📞 Connecting you to our expert team\n\nHow may I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('orbi-greeted');
    if (!seen) setGreetingActive(true);
    else setGreetingDone(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  // Lock body scroll on mobile when chat is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, isOpen]);

  const dismissGreeting = useCallback(() => {
    setGreetingActive(false);
    setGreetingDone(true);
    sessionStorage.setItem('orbi-greeted', '1');
  }, []);

  const openFromGreeting = useCallback(() => {
    dismissGreeting();
    setIsOpen(true);
  }, [dismissGreeting]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;
    setShowQuickReplies(false);
    setInputText('');
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', text: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    try {
      const reply = await callGemini(geminiHistory, trimmed);
      const botMsg: Message = { id: `b-${Date.now()}`, role: 'bot', text: reply, timestamp: new Date() };
      setMessages(prev => [...prev, botMsg]);
      setGeminiHistory(prev => [
        ...prev,
        { role: 'user', parts: [{ text: trimmed }] },
        { role: 'model', parts: [{ text: reply }] },
      ]);
    } catch {
      setMessages(prev => [...prev, {
        id: `e-${Date.now()}`, role: 'bot',
        text: 'Oops! 😅 Network issue. Please humse directly contact karein:\n📞 +91 70241 28029\n📧 info@orbitengineerings.com',
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, geminiHistory]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }
  };

  const toggleChat = () => { setIsOpen(o => !o); if (greetingActive) dismissGreeting(); };
  const fmtTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const isContactMsg = (t: string) =>
    /contact|phone|number|address|location|email|whatsapp|reach|call|office|bhopal|hours|timing/i.test(t);

  // ── Responsive dimensions ──
  const chatW = isMobile ? '100vw' : 'min(440px, calc(100vw - 48px))';
  const chatH = isMobile ? '100dvh' : 'min(620px, calc(100dvh - 110px))';
  const chatBottom = isMobile ? '0' : '92px';
  const chatRight = isMobile ? '0' : '20px';
  const chatBorderRadius = isMobile ? '0' : '24px';

  return (
    <>
      {/* ── Global Animations ── */}
      <style>{`
        @keyframes orbi-float {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-5px); }
        }
        @keyframes orbi-pulse-ring {
          0%   { transform:scale(1);    opacity:0.6; }
          100% { transform:scale(1.7);  opacity:0; }
        }
        @keyframes orbi-window-open {
          0%   { transform:scale(0.85) translateY(20px); opacity:0; }
          100% { transform:scale(1)    translateY(0);    opacity:1; }
        }
        @keyframes orbi-mobile-open {
          0%   { transform:translateY(100%); opacity:0; }
          100% { transform:translateY(0);    opacity:1; }
        }
        @keyframes orbi-dot {
          0%,60%,100% { transform:translateY(0);   opacity:0.35; }
          30%          { transform:translateY(-7px); opacity:1; }
        }
        @keyframes orbi-msg-bot {
          from { transform:translateX(-16px); opacity:0; }
          to   { transform:translateX(0);     opacity:1; }
        }
        @keyframes orbi-msg-user {
          from { transform:translateX(16px); opacity:0; }
          to   { transform:translateX(0);    opacity:1; }
        }
        @keyframes orbi-shimmer {
          0%   { background-position:200% center; }
          100% { background-position:-200% center; }
        }
        .orbi-window-desktop { animation: orbi-window-open 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .orbi-window-mobile  { animation: orbi-mobile-open 0.38s cubic-bezier(0.22,1,0.36,1) forwards; }
        .orbi-msg-bot  { animation: orbi-msg-bot  0.3s ease-out; }
        .orbi-msg-user { animation: orbi-msg-user 0.3s ease-out; }
        .orbi-dot1 { animation: orbi-dot 1.3s 0s    infinite; }
        .orbi-dot2 { animation: orbi-dot 1.3s 0.22s infinite; }
        .orbi-dot3 { animation: orbi-dot 1.3s 0.44s infinite; }
        .orbi-scroll::-webkit-scrollbar { width:5px; }
        .orbi-scroll::-webkit-scrollbar-track { background:#f0f9ff; border-radius:3px; }
        .orbi-scroll::-webkit-scrollbar-thumb { background:#bae6fd; border-radius:3px; }
        .orbi-scroll::-webkit-scrollbar-thumb:hover { background:#7dd3fc; }
        .orbi-chip {
          transition: all 0.22s ease !important;
        }
        .orbi-chip:hover {
          background: linear-gradient(135deg,#0073bc,#00a8e0) !important;
          color: white !important;
          border-color: transparent !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,115,188,0.28) !important;
        }
        .orbi-send-btn:hover  { opacity:0.9; transform:scale(1.08); }
        .orbi-send-btn:active { transform:scale(0.93); }
        .orbi-close-btn:hover { background:rgba(255,255,255,0.28) !important; }
        .orbi-input-wrap:focus-within {
          border-color: #0073bc !important;
          box-shadow: 0 0 0 3px rgba(0,115,188,0.12) !important;
        }
        @media (max-width: 639px) {
          .orbi-chat-btn {
            width: 56px !important;
            height: 56px !important;
            bottom: 16px !important;
            right: 16px !important;
          }
        }
      `}</style>

      {/* ── Greeting Toast ── */}
      {greetingActive && !greetingDone && !isOpen && (
        <GreetingToast onClose={dismissGreeting} onOpenChat={openFromGreeting} />
      )}

      {/* ── Mobile Overlay Backdrop ── */}
      {isMobile && isOpen && (
        <div
          onClick={toggleChat}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 9997,
            backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className={isMobile ? 'orbi-window-mobile' : 'orbi-window-desktop'}
          role="dialog"
          aria-label="Orbi — Orbit Engineering Chatbot"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: chatBottom,
            right: chatRight,
            width: chatW,
            height: chatH,
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: chatBorderRadius,
            overflow: 'hidden',
            background: 'white',
            boxShadow: isMobile
              ? '0 -8px 40px rgba(0,0,0,0.15)'
              : '0 28px 80px rgba(0,115,188,0.2), 0 8px 32px rgba(0,0,0,0.1)',
            border: isMobile ? 'none' : '1px solid rgba(0,115,188,0.1)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* ─── HEADER ─── */}
          <div style={{
            background: 'linear-gradient(135deg, #0073bc 0%, #0060a0 40%, #003d6b 100%)',
            padding: isMobile ? '14px 16px 12px' : '16px 20px 14px',
            display: 'flex', alignItems: 'center', gap: '14px',
            flexShrink: 0, position: 'relative', overflow: 'hidden',
          }}>
            {/* Wave decoration */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.1 }}
              viewBox="0 0 440 32" height="32" width="100%" preserveAspectRatio="none">
              <path d="M0 22 Q55 8,110 20 Q165 32,220 16 Q275 2,330 18 Q385 34,440 18 L440 32 L0 32Z" fill="white" />
            </svg>

            {/* Stars decoration */}
            <div style={{ position: 'absolute', top: '10px', right: '70px', opacity: 0.25 }}>
              <svg width="40" height="20" viewBox="0 0 40 20">
                <circle cx="5" cy="10" r="1.5" fill="white" />
                <circle cx="15" cy="5" r="1" fill="white" />
                <circle cx="25" cy="14" r="1.2" fill="white" />
                <circle cx="35" cy="7" r="1" fill="white" />
              </svg>
            </div>

            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: isMobile ? '48px' : '54px',
                height: isMobile ? '48px' : '54px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2.5px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              }}>
                <OrbiAvatar size={isMobile ? 36 : 40} animate />
              </div>
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: '13px', height: '13px',
                background: '#4ade80', borderRadius: '50%',
                border: '2.5px solid white',
                boxShadow: '0 0 6px rgba(74,222,128,0.6)',
              }} />
            </div>

            {/* Name + Status */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: isMobile ? '17px' : '18px', lineHeight: 1.2 }}>
                Orbi
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '2px' }}>
                🌊 Orbit Engineering Assistant
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                <div style={{ width: '7px', height: '7px', background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 4px rgba(74,222,128,0.8)' }} />
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Online · Replies instantly</span>
              </div>
            </div>

            {/* Close */}
            <button
              onClick={toggleChat}
              className="orbi-close-btn"
              aria-label="Close chat"
              style={{
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '10px', color: 'white',
                width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
              }}
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* ─── MESSAGES ─── */}
          <div className="orbi-scroll" style={{
            flex: 1, overflowY: 'auto',
            padding: isMobile ? '14px 12px' : '18px 16px',
            background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 50%)',
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            {/* Date separator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.08)' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.08)' }} />
            </div>

            {messages.map(msg => (
              <div key={msg.id}
                className={msg.role === 'bot' ? 'orbi-msg-bot' : 'orbi-msg-user'}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'bot' ? 'row' : 'row-reverse',
                  alignItems: 'flex-end', gap: '10px',
                }}>
                {/* Bot icon */}
                {msg.role === 'bot' && (
                  <div style={{
                    width: '32px', height: '32px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 3px 10px rgba(0,115,188,0.3)',
                  }}>
                    <OrbiAvatar size={24} />
                  </div>
                )}

                <div style={{ maxWidth: '78%' }}>
                  {/* Bubble */}
                  <div style={{
                    padding: isMobile ? '10px 14px' : '12px 16px',
                    borderRadius: msg.role === 'bot' ? '18px 18px 18px 5px' : '18px 18px 5px 18px',
                    background: msg.role === 'bot'
                      ? 'linear-gradient(135deg, #0073bc 0%, #005a94 100%)'
                      : 'white',
                    color: msg.role === 'bot' ? 'white' : '#111827',
                    fontSize: isMobile ? '14px' : '14px',
                    lineHeight: 1.6,
                    boxShadow: msg.role === 'bot'
                      ? '0 4px 16px rgba(0,115,188,0.3)'
                      : '0 2px 10px rgba(0,0,0,0.07)',
                    border: msg.role === 'user' ? '1px solid rgba(0,115,188,0.1)' : 'none',
                    wordBreak: 'break-word',
                  }}>
                    <RenderText text={msg.text} />
                  </div>

                  {/* Contact card */}
                  {msg.role === 'bot' && isContactMsg(msg.text) && msg.id !== 'welcome' && (
                    <div style={{ marginTop: '10px' }}><ContactCard /></div>
                  )}

                  {/* Time */}
                  <div style={{
                    fontSize: '10.5px', color: '#9ca3af', marginTop: '4px',
                    textAlign: msg.role === 'bot' ? 'left' : 'right',
                    paddingLeft: msg.role === 'bot' ? '4px' : 0,
                    paddingRight: msg.role === 'user' ? '4px' : 0,
                  }}>
                    {fmtTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="orbi-msg-bot" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(0,115,188,0.3)',
                }}>
                  <OrbiAvatar size={24} />
                </div>
                <div style={{
                  padding: '14px 18px', borderRadius: '18px 18px 18px 5px',
                  background: 'linear-gradient(135deg, #0073bc, #005a94)',
                  display: 'flex', gap: '6px', alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0,115,188,0.3)',
                }}>
                  <span className="orbi-dot1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                  <span className="orbi-dot2" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                  <span className="orbi-dot3" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && messages.length === 1 && !isTyping && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {QUICK_REPLIES.map(qr => (
                  <button key={qr.label} className="orbi-chip"
                    onClick={() => sendMessage(qr.label)}
                    style={{
                      padding: '7px 14px', background: 'white', color: '#0073bc',
                      border: '1.5px solid #0073bc', borderRadius: '22px',
                      fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      boxShadow: '0 2px 6px rgba(0,115,188,0.12)',
                    }}>
                    {qr.icon} {qr.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ─── INPUT ─── */}
          <div style={{
            padding: isMobile ? '12px 12px 16px' : '14px 16px 16px',
            background: 'white',
            borderTop: '1px solid rgba(0,115,188,0.07)',
            flexShrink: 0,
          }}>
            <div className="orbi-input-wrap" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#f8fbff', borderRadius: '16px',
              border: '1.5px solid rgba(0,115,188,0.15)',
              padding: '8px 8px 8px 16px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}>
              <input
                ref={inputRef} id="orbi-chat-input"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about OES…"
                disabled={isTyping}
                aria-label="Type your message"
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontSize: isMobile ? '15px' : '14px', color: '#111827',
                  outline: 'none', fontFamily: "'Inter', system-ui, sans-serif",
                  minWidth: 0,
                }}
              />
              <button
                id="orbi-send-btn" className="orbi-send-btn"
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
                style={{
                  width: '40px', height: '40px',
                  background: inputText.trim() && !isTyping
                    ? 'linear-gradient(135deg, #0073bc, #00a8e0)'
                    : '#e5e7eb',
                  border: 'none', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  flexShrink: 0, transition: 'all 0.2s ease',
                  boxShadow: inputText.trim() && !isTyping ? '0 3px 10px rgba(0,115,188,0.35)' : 'none',
                }}
              >
                <Send size={17} color={inputText.trim() && !isTyping ? 'white' : '#9ca3af'} />
              </button>
            </div>
            <p style={{
              margin: '8px 0 0', fontSize: '10.5px', color: '#9ca3af',
              textAlign: 'center', letterSpacing: '0.01em',
            }}>
              🤖 Powered by Orbi AI · Orbit Engineering Solutions
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Orbi Button ── */}
      <div style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '22px',
        right: isMobile ? '16px' : '20px',
        zIndex: 9999,
      }}>
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              border: '2px solid rgba(0,115,188,0.4)',
              animation: 'orbi-pulse-ring 2.4s ease-out infinite',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              border: '2px solid rgba(0,115,188,0.22)',
              animation: 'orbi-pulse-ring 2.4s ease-out 0.8s infinite',
              pointerEvents: 'none',
            }} />
          </>
        )}

        <button
          id="orbi-chat-toggle"
          onClick={toggleChat}
          aria-label={isOpen ? 'Close Orbi chat' : 'Open Orbi — Orbit Engineering Assistant'}
          style={{
            width: isMobile ? '58px' : '64px',
            height: isMobile ? '58px' : '64px',
            background: isOpen
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #0073bc 0%, #00a8e0 100%)',
            border: 'none', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isOpen
              ? '0 8px 28px rgba(239,68,68,0.45)'
              : '0 8px 28px rgba(0,115,188,0.45)',
            position: 'relative', zIndex: 1,
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.12)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}
        >
          {isOpen
            ? <X size={24} color="white" />
            : <OrbiAvatar size={isMobile ? 42 : 48} animate />
          }
        </button>
      </div>
    </>
  );
}
