import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, ChevronDown, Phone, Mail, MapPin, Sparkles, RotateCcw, MessageCircle } from 'lucide-react';
import { callOrbi, type GeminiMessage } from './chatbotApi';
import { OES_KNOWLEDGE } from './chatbotKnowledge';
import { AI_NOTICE_VERSION, AI_PROVIDER_REVIEWED, AI_PROVIDER_DISCLOSURE } from '../../data/legalContent.mjs';
import indiamartLogo from '../../assets/indiamart-logo.png';

// ============================================================
//  TYPES
// ============================================================
interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
  showContact?: boolean;
  showForm?: boolean;
}


type ConvPhase = 'greeting' | 'discovery' | 'pitching' | 'closing';

// ============================================================
//  CONSTANTS
// ============================================================
const CONTACT = OES_KNOWLEDGE.company.contact;
const EXTERNAL_AI_READY = AI_PROVIDER_REVIEWED && AI_PROVIDER_DISCLOSURE.trim().length > 0;

const PHASE_QUICK_REPLIES: Record<ConvPhase, { icon: string; label: string }[]> = {
  greeting: [
    { icon: '🏛️', label: 'Government Project' },
    { icon: '🏭', label: 'Industrial Project' },
    { icon: '🌊', label: 'Water Treatment' },
    { icon: '⚙️', label: 'SCADA & Automation' },
    { icon: '📞', label: 'Talk to Expert' },
  ],
  discovery: [
    { icon: '🌊', label: 'Flow Meters' },
    { icon: '📊', label: 'Water Quality' },
    { icon: '🔧', label: 'Valves & Piping' },
    { icon: '🖥️', label: 'PLC / SCADA' },
    { icon: '📋', label: 'Request Datasheet' },
  ],
  pitching: [
    { icon: '📄', label: 'Request Datasheet' },
    { icon: '📋', label: 'Get a Quote' },
    { icon: '🤝', label: 'Free Consultation' },
    { icon: '📞', label: 'Talk to Expert' },
  ],
  closing: [
    { icon: '💬', label: 'WhatsApp Us' },
    { icon: '📞', label: 'Call Us' },
    { icon: '📧', label: 'Email Us' },
    { icon: '🔍', label: 'More Products' },
  ],
};

const CONTACT_TRIGGER_REGEX =
  /contact|phone|number|address|location|email|whatsapp|reach|call|office|bhopal|hours|timing|kahan|sampark|milna|kitna/i;

const FORM_TRIGGER_REGEX =
  /quote|price|cost|rate|daam|bhaav|rupay|callback|consultation|assessment|meeting|quotation|proposal|budget/i;

const PHASE_TRIGGER_KEYWORDS: Record<string, ConvPhase> = {
  quote: 'closing', datasheet: 'pitching', whatsapp: 'closing', call: 'closing',
  price: 'pitching', cost: 'pitching', rate: 'pitching', recommend: 'pitching',
  install: 'pitching', commissioning: 'pitching', amc: 'closing', maintenance: 'pitching',
};


// ============================================================
//  DETECT CONVERSATION PHASE
// ============================================================
function detectPhase(messages: Message[], currentPhase: ConvPhase): ConvPhase {
  if (messages.length <= 1) return 'greeting';
  if (messages.length === 2) return 'discovery';

  // Check last few user messages for closing triggers
  const recentUserMsgs = messages
    .filter(m => m.role === 'user')
    .slice(-3)
    .map(m => m.text.toLowerCase());

  for (const msg of recentUserMsgs) {
    for (const [keyword, phase] of Object.entries(PHASE_TRIGGER_KEYWORDS)) {
      if (msg.includes(keyword)) return phase;
    }
  }

  // Progress naturally
  if (messages.length >= 6 && currentPhase === 'discovery') return 'pitching';
  if (messages.length >= 10 && currentPhase === 'pitching') return 'closing';

  return currentPhase;
}

// ============================================================
//  ORBI ROBOT SVG AVATAR
// ============================================================
function OrbiAvatar({ size = 40, animate = false }: { size?: number; animate?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 90" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={animate ? { animation: 'orbi-float 3s ease-in-out infinite' } : undefined}
      aria-hidden="true">
      <defs>
        <linearGradient id="orbi-hg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0073bc" /><stop offset="100%" stopColor="#00a8e0" />
        </linearGradient>
        <linearGradient id="orbi-bg2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#005a94" /><stop offset="100%" stopColor="#0073bc" />
        </linearGradient>
        <linearGradient id="orbi-dg2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" /><stop offset="100%" stopColor="#0073bc" />
        </linearGradient>
        <filter id="orbi-glow2">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <line x1="40" y1="9" x2="40" y2="21" stroke="#0073bc" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 2 C37 5,33 10,33 13 C33 16.9,36.1 20,40 20 C43.9 20,47 16.9,47 13 C47 10,43 5,40 2Z"
        fill="url(#orbi-dg2)" filter="url(#orbi-glow2)" />
      <ellipse cx="37.5" cy="13" rx="2" ry="3" fill="rgba(255,255,255,0.45)" />
      <rect x="13" y="21" width="54" height="42" rx="17" fill="url(#orbi-hg2)" />
      <rect x="19" y="27" width="42" height="30" rx="11" fill="rgba(255,255,255,0.12)" />
      <circle cx="30" cy="39" r="9" fill="white" />
      <circle cx="30" cy="39" r="5.5" fill="#0073bc" />
      <circle cx="30" cy="39" r="2.8" fill="#001f3f" />
      <circle cx="32" cy="37" r="1.8" fill="white" />
      <circle cx="50" cy="39" r="9" fill="white" />
      <circle cx="50" cy="39" r="5.5" fill="#0073bc" />
      <circle cx="50" cy="39" r="2.8" fill="#001f3f" />
      <circle cx="52" cy="37" r="1.8" fill="white" />
      <path d="M27 51 Q40 59 53 51" stroke="white" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="44" r="4.5" fill="rgba(255,255,255,0.18)" />
      <circle cx="60" cy="44" r="4.5" fill="rgba(255,255,255,0.18)" />
      <rect x="19" y="65" width="42" height="23" rx="11" fill="url(#orbi-bg2)" />
      <rect x="26" y="70" width="28" height="13" rx="5" fill="rgba(255,255,255,0.15)" />
      <circle cx="33" cy="76.5" r="3.2" fill="#00d4ff" opacity="0.85" />
      <circle cx="40" cy="76.5" r="3.2" fill="#7eeef7" opacity="0.85" />
      <circle cx="47" cy="76.5" r="3.2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

// ============================================================
//  GREETING TOAST — macOS Notification Card Style
// ============================================================
function GreetingToast({ onClose, onOpenChat }: { onClose: () => void; onOpenChat: () => void }) {
  const [phase, setPhase] = useState<'hidden' | 'entering' | 'visible' | 'leaving'>('hidden');
  const dismissedRef = useRef(false);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    setPhase('leaving');
    setTimeout(onClose, 450);
  }, [onClose]);

  // 1) Delay launch
  useEffect(() => {
    const t = setTimeout(() => setPhase('entering'), 1600);
    return () => clearTimeout(t);
  }, []);

  // 2) Transition to visible after slide animation finishes (400ms)
  useEffect(() => {
    if (phase !== 'entering') return;
    const t = setTimeout(() => setPhase('visible'), 400);
    return () => clearTimeout(t);
  }, [phase]);

  // 3) Auto-dismiss after 6 seconds
  useEffect(() => {
    if (phase !== 'visible') return;
    const t = setTimeout(() => dismiss(), 6000);
    return () => clearTimeout(t);
  }, [phase, dismiss]);

  if (phase === 'hidden') return null;

  const isLeaving = phase === 'leaving';

  return (
    <>
      <style>{`
        /* ── Entrance: 10-stop high-resolution harmonic oscillator spring curve ── */
        @keyframes orbi-mac-slide-up {
          0% {
            transform: translate3d(0, 110px, 0) scale(0.72) rotate(-5deg);
            opacity: 0;
            filter: blur(8px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          }
          32% {
            transform: translate3d(0, -15px, 0) scale(1.045) rotate(2deg);
            opacity: 0.95;
            filter: blur(0px);
            box-shadow: 0 20px 40px rgba(0, 115, 188, 0.12);
          }
          48% {
            transform: translate3d(0, 6px, 0) scale(0.97) rotate(-1deg);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.05);
          }
          62% {
            transform: translate3d(0, -2.5px, 0) scale(1.015) rotate(0.4deg);
            box-shadow: 0 18px 35px rgba(0, 115, 188, 0.1);
          }
          74% {
            transform: translate3d(0, 1px, 0) scale(0.993) rotate(-0.15deg);
          }
          85% {
            transform: translate3d(0, -0.4px, 0) scale(1.004) rotate(0.05deg);
          }
          94% {
            transform: translate3d(0, 0.1px, 0) scale(0.998) rotate(-0.02deg);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            opacity: 1;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 115, 188, 0.06);
          }
        }

        /* ── Exit: iOS-style elastic release & arching sweep ── */
        @keyframes orbi-mac-slide-left {
          0% {
            transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
            opacity: 1;
            filter: blur(0px);
          }
          14% {
            transform: translate3d(12px, -3px, 0) scale(1.035) rotate(2.2deg);
            opacity: 1;
          }
          28% {
            transform: translate3d(-8px, 1px, 0) scale(0.98) rotate(-1.5deg);
          }
          100% {
            transform: translate3d(-150%, 25px, 0) scale(0.75) rotate(-12deg);
            opacity: 0;
            filter: blur(6px);
          }
        }

        /* ── Waving hand emoji ── */
        @keyframes orbi-mac-hand-wave {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(14deg); }
          40% { transform: rotate(-8deg); }
          60% { transform: rotate(14deg); }
          80% { transform: rotate(-4deg); }
        }

        .orbi-mac-card {
          will-change: transform, opacity;
        }

        .orbi-mac-card.entering {
          animation: orbi-mac-slide-up 0.82s cubic-bezier(0.25, 1.25, 0.5, 1) forwards;
        }

        .orbi-mac-card.visible {
          transform: translate3d(0, 0, 0) scale(1) rotate(0deg);
          opacity: 1;
        }

        .orbi-mac-card.leaving {
          animation: orbi-mac-slide-left 0.62s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .orbi-mac-wave-emoji {
          display: inline-block;
          animation: orbi-mac-hand-wave 1.6s ease-in-out 1.2s infinite alternate;
        }

        .orbi-mac-open-btn {
          transition: all 0.2s ease-in-out;
        }

        .orbi-mac-open-btn:hover {
          transform: translateY(-1.5px);
          background: linear-gradient(135deg, #005f9e 0%, #0093c4 100%) !important;
          box-shadow: 0 6px 18px rgba(0, 115, 188, 0.38) !important;
        }

        .orbi-mac-open-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      {/* Main positioning wrapper above FAB on the left */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: 'fixed',
          bottom: '100px',
          left: '16px',
          zIndex: 10001,
          fontFamily: "'Inter', system-ui, sans-serif",
          pointerEvents: isLeaving ? 'none' : 'auto',
        }}
      >
        {/* macOS Style Notification Card */}
        <div
          className={`orbi-mac-card ${phase}`}
          style={{
            width: '312px',
            maxWidth: 'calc(100vw - 36px)',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 115, 188, 0.06)',
            border: '1px solid rgba(0, 115, 188, 0.08)',
            borderLeft: '4px solid #0073bc', // macOS-style custom highlight border
            cursor: 'pointer',
            padding: '16px',
            position: 'relative',
          }}
          onClick={() => { dismiss(); onOpenChat(); }}
        >
          {/* Close button */}
          <button
            onClick={e => { e.stopPropagation(); dismiss(); }}
            aria-label="Dismiss message"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#9ca3af',
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#f3f4f6'; (e.currentTarget as HTMLButtonElement).style.color = '#4b5563'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#9ca3af'; }}
          >
            <X size={12} />
          </button>

          {/* Card Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <div style={{
              width: '34px', height: '34px',
              background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 3px 8px rgba(0, 115, 188, 0.2)',
              border: '2.5px solid white',
            }}>
              <OrbiAvatar size={24} animate />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#005b94' }}>Orbi</span>
                <span style={{
                  fontSize: '8px', fontWeight: 700, color: '#059669',
                  background: '#d1fae5', padding: '0.5px 5px', borderRadius: '6px',
                  border: '1px solid #a7f3d0',
                }}>● Online</span>
              </div>
            </div>
          </div>

          {/* Message text */}
          <div style={{
            fontSize: '13px',
            color: '#1f2937',
            lineHeight: 1.55,
            marginBottom: '12px',
          }}>
            <span className="orbi-mac-wave-emoji">👋</span>{' '}
            <strong style={{ color: '#0073bc' }}>Hey there!</strong> I'm <strong>Orbi</strong>, your OES engineering assistant.
            <p style={{ margin: '4px 0 0', color: '#4b5563', fontSize: '12px' }}>
              Have questions about water solutions, SCADA, or solar infrastructure? Let's chat! 💧
            </p>
          </div>

          {/* CTA Button */}
          <button
            className="orbi-mac-open-btn"
            onClick={e => { e.stopPropagation(); dismiss(); onOpenChat(); }}
            style={{
              width: '100%',
              padding: '9.5px 0',
              background: 'linear-gradient(135deg, #0073bc 0%, #00a8e0 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em',
              boxShadow: '0 4px 12px rgba(0, 115, 188, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Sparkles size={13} />
            Chat with Orbi
          </button>
        </div>

        {/* Small pointer tail pointing towards FAB */}
        <div
          className={`orbi-mac-card ${phase}`}
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '38px',
            width: '10px',
            height: '10px',
            background: '#ffffff',
            transform: 'rotate(45deg)',
            borderLeft: '1px solid rgba(0, 115, 188, 0.08)',
            borderBottom: '1px solid rgba(0, 115, 188, 0.08)',
            boxShadow: '-1px 1px 3px rgba(0, 0, 0, 0.02)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </div>
    </>
  );
}

// ============================================================
//  CONTACT CARD
// ============================================================
function ContactCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '14px', padding: '14px',
      border: '1px solid rgba(0,115,188,0.18)',
      fontSize: '12.5px', lineHeight: 1.6, marginTop: '8px',
      boxShadow: '0 2px 10px rgba(0,115,188,0.06)',
    }}>
      <p style={{ margin: '0 0 10px', fontWeight: 700, color: '#0073bc', fontSize: '13px' }}>
        🏢 Orbit Engineering Solutions
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px' }}>
        <Phone size={11} color="#0073bc" style={{ flexShrink: 0 }} />
        <span>
          <a href="tel:7024128029" style={{ color: '#0073bc', textDecoration: 'none', fontWeight: 600 }}>+91 70241 28029</a>
          {'  |  '}
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
      <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          padding: '10px', background: '#25D366', color: 'white',
          borderRadius: '11px', textDecoration: 'none', fontWeight: 700, fontSize: '13px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        </svg>
        Contact us on WhatsApp
      </a>
      <a href="https://www.indiamart.com/orbit-engineering-solutions-bhopal/?srsltid=AfmBOoqv0uyKZ1nbWyrYQsROXsB8pmT8cHLbpbeCFKcDaUv1ZOyLiEcV"
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          padding: '9px', background: '#002F52', color: 'white', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '11px', textDecoration: 'none', fontWeight: 700, fontSize: '12px',
          transition: 'opacity 0.2s', marginTop: '6px'
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.9'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1'; }}
      >
        <img src={indiamartLogo} alt="IndiaMART Marketplace" style={{ height: '18px', width: 'auto', background: 'white', borderRadius: '50%', padding: '1px' }} />
        <span>View our IndiaMART profile ↗</span>
      </a>
    </div>
  );
}

// ============================================================
//  CALLBACK / LEAD FORM
// ============================================================
function CallbackForm({ defaultInterest = '' }: { defaultInterest?: string }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState(defaultInterest);
  const [submitted, setSubmitted] = useState(false);
  const [handoffConsent, setHandoffConsent] = useState(false);
  const [draftUrl, setDraftUrl] = useState('');
  const fieldId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !handoffConsent) return;

    // Send to WhatsApp
    const message = `Namaste Orbit Engineering! I'm interested in your services.\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n⚙️ Requirement/Interest: ${interest || 'General Enquiry'}`;
    const url = `https://wa.me/919039075048?text=${encodeURIComponent(message)}`;
    
    setDraftUrl(url);
    setSubmitted(true);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (submitted) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
        borderRadius: '14px', padding: '14px',
        border: '1px solid #10b981',
        fontSize: '12.5px', marginTop: '8px',
        textAlign: 'center', color: '#065f46',
      }}>
        <div style={{ fontSize: '20px', marginBottom: '5px' }}>✓</div>
        <strong>WhatsApp draft prepared</strong>
        <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#047857' }}>
          Please press Send in WhatsApp to deliver your request. Opening a draft does not send it.
        </p>
        <a href={draftUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '8px', color: '#075985', textDecoration: 'underline' }}>Open WhatsApp draft</a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '14px', padding: '14px',
      border: '1px solid rgba(0,115,188,0.15)',
      fontSize: '12.5px', marginTop: '8px',
      boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
    }}>
      <p style={{ margin: '0 0 10px', fontWeight: 700, color: '#1e293b', fontSize: '13px' }}>
        📞 Request a Callback / Quote
      </p>
      
      <div style={{ marginBottom: '8px' }}>
        <label htmlFor={`${fieldId}-name`} style={{ display: 'block', marginBottom: '3px', fontWeight: 600, color: '#475569' }}>Name</label>
        <input 
          id={`${fieldId}-name`} type="text"
          required
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Apna naam likhein"
          style={{
            width: '100%', padding: '6px 10px', borderRadius: '8px',
            border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '12px',
          }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label htmlFor={`${fieldId}-phone`} style={{ display: 'block', marginBottom: '3px', fontWeight: 600, color: '#475569' }}>Mobile Number</label>
        <input 
          id={`${fieldId}-phone`} type="tel"
          required
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number"
          style={{
            width: '100%', padding: '6px 10px', borderRadius: '8px',
            border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '12px',
          }}
        />
      </div>

      <div style={{ marginBottom: '12px' }}>
        <label htmlFor={`${fieldId}-interest`} style={{ display: 'block', marginBottom: '3px', fontWeight: 600, color: '#475569' }}>Requirement (Optional)</label>
        <input 
          id={`${fieldId}-interest`} type="text"
          value={interest}
          onChange={e => setInterest(e.target.value)}
          placeholder="e.g. Flow Meter, Solar Project"
          style={{
            width: '100%', padding: '6px 10px', borderRadius: '8px',
            border: '1.5px solid #cbd5e1', outline: 'none', fontSize: '12px',
          }}
        />
      </div>

      <label style={{ display: 'flex', gap: '7px', alignItems: 'flex-start', marginBottom: '10px', lineHeight: 1.5, color: '#334155' }}>
        <input type="checkbox" required checked={handoffConsent} onChange={e => setHandoffConsent(e.target.checked)} style={{ marginTop: '3px' }} />
        <span>I am 18 or over and want to open my details in WhatsApp to request a callback/quote. I will send the draft myself. WhatsApp processes the handoff under its own terms. <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#075985', textDecoration: 'underline' }}>Privacy Policy</Link></span>
      </label>
      <button type="submit" style={{
        width: '100%', padding: '8px', background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
        color: 'white', borderRadius: '8px', border: 'none', fontWeight: 700,
        cursor: 'pointer', transition: 'transform 0.1s',
      }}>
        Prepare WhatsApp draft
      </button>
    </form>
  );
}

// ============================================================
//  LOCAL FALLBACK QA SYSTEM (HYBRID APPROACH)
// ============================================================
function getLocalResponse(query: string): {
  text: string;
  showForm: boolean;
  showContact: boolean;
  suggestions: { icon: string; label: string }[];
} {
  const q = query.toLowerCase();
  const matches = (keywords: string[]) => keywords.some(kw => q.includes(kw));
  const isHindiScript = /[\u0900-\u097F]/.test(query);

  if (matches(['water treatment', 'water solutions', 'wtp', 'stp', 'sewage', 'effluent', 'reverse osmosis', 'government project', 'industrial project', 'जल समाधान'])) {
    return {
      text: isHindiScript
        ? 'OES से **Water Treatment, Sewage/Effluent Treatment, RO और PLC/SCADA** की आवश्यकताओं पर बात करें। उपयुक्त समाधान के लिए क्षमता, पानी की गुणवत्ता, स्थान और प्रोजेक्ट की जरूरतों की समीक्षा जरूरी है। यह FAQ एक सामान्य परिचय है; डिजाइन और व्यावसायिक शर्तों की हमारी टीम से पुष्टि करें।'
        : 'You can discuss **Water Treatment, Sewage/Effluent Treatment, RO and PLC/SCADA** requirements with OES. The right solution depends on capacity, water quality, location and project specifications. This local FAQ is a general introduction; confirm design suitability and commercial terms with our team.',
      showForm: false,
      showContact: true,
      suggestions: [{ icon: '⚙️', label: 'SCADA & Automation' }, { icon: '📞', label: 'Contact our team' }],
    };
  }

  // 1. Flow Measurement
  if (matches(['flow', 'meter', 'prepaid', 'ultrasonic', 'electromagnetic', 'turbine', 'speed', 'pipeline', 'pani', 'water meter'])) {
    if (isHindiScript) {
      return {
        text: "OES से **Electromagnetic Flow Meters** और **Smart Prepaid Water Meters** की जानकारी लें। उपलब्ध आकार, सटीकता और WTP/STP में उपयुक्तता चुने गए मॉडल और लिखित स्पेसिफिकेशन पर निर्भर करते हैं।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'कोटेशन चाहिए' },
          { icon: '📞', label: 'एक्सपर्ट से बात करें' },
          { icon: '⚙️', label: 'SCADA डिटेल्स' }
        ]
      };
    }
    return {
      text: "Ask OES about **Electromagnetic Flow Meters** and **Smart Prepaid Water Meters**. Available sizes, accuracy and WTP/STP suitability depend on the selected model and written specifications.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'Request Quote' },
        { icon: '📞', label: 'Call Expert' },
        { icon: '⚙️', label: 'SCADA Telemetry' }
      ]
    };
  }

  // 2. Water Quality Analyzers
  if (matches(['ph', 'turbidity', 'chlorine', 'analyzer', 'quality', 'do', 'bod', 'cod', 'analyser', 'choke', 'water quality'])) {
    if (isHindiScript) {
      return {
        text: "हम **Water Quality Analyzers** (जैसे pH, Turbidity, Chlorine, DO, BOD, COD) और ऑनलाइन मॉनिटरिंग सिस्टम्स प्रोवाइड करते हैं प्रोजेक्ट की आवश्यकताओं के अनुसार चुने जाते हैं। मॉडल की उपयुक्तता हमारी टीम से पुष्टि करें।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'कोटेशन चाहिए' },
          { icon: '📞', label: 'टीम से बात करें' }
        ]
      };
    }
    return {
      text: "Ask us about **Water Quality Analyzers** (pH, Turbidity, Chlorine, DO, BOD, COD) and online WTP monitoring systems available for municipal and industrial monitoring; suitability depends on the selected model and project requirements.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'Request Quote' },
        { icon: '📞', label: 'Call Expert' }
      ]
    };
  }

  // 3. Solar Projects
  if (matches(['solar', 'panel', 'sun', 'dhoop', 'street light', 'floating solar', 'structure', 'grid', 'rooftop', 'urja'])) {
    if (isHindiScript) {
      return {
        text: "हम **Solar Rooftop Grid Systems**, **Solar Water Pumps**, और **Floating Solar Structures** के साथ-साथ स्मार्ट **LED Solar Street Lights** में भी एक्सपर्ट हैं।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'कोटेशन चाहिए' },
          { icon: '☀️', label: 'Floating Solar' }
        ]
      };
    }
    return {
      text: "OES specializes in **Solar Rooftop Systems**, **Solar Water Pumps**, **Floating Solar Structures**, and smart **LED Solar Street Lights** for cities and industries.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'Solar Quote' },
        { icon: '☀️', label: 'Floating Solar' }
      ]
    };
  }

  // 4. Automation & SCADA
  if (matches(['scada', 'plc', 'rtu', 'panel', 'automation', 'telemetry', 'iot', 'cloud', 'software', 'control room', 'remote'])) {
    if (isHindiScript) {
      return {
        text: "हम **PLC & SCADA Control Panels** डिज़ाइन करते हैं। हमारा GPRS Telemetry सिस्टम पानी के फ्लो और क्वालिटी का डेटा क्लाउड पर लाइव भेजता है।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '⚙️', label: 'SCADA Demo' },
          { icon: '📋', label: 'कोटेशन चाहिए' }
        ]
      };
    }
    return {
      text: "We supply complete **PLC & SCADA Panels**, remote RTUs, and GPRS cloud telemetry systems to monitor flows and plant quality data in real-time.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '⚙️', label: 'SCADA Demo' },
        { icon: '📋', label: 'Request Quote' }
      ]
    };
  }

  // 5. Valves & Actuators
  if (matches(['valve', 'actuator', 'jointing', 'electrofusion', 'butt fusion', 'butterfly', 'gate valve', 'piping'])) {
    if (isHindiScript) {
      return {
        text: "OES **Butterfly Valves**, Gate Valves, **Electric/Pneumatic Actuators**, and HDPE पाइप्स के लिए **Electrofusion/Butt Fusion Jointing Machines** भी सप्लाई करता है।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '⚙️', label: 'Jointing Machines' },
          { icon: '📞', label: 'कॉल करें' }
        ]
      };
    }
    return {
      text: "OES supplies **Butterfly/Sluice/Gate Valves**, **Electric/Pneumatic Actuators**, and advanced HDPE **Electrofusion & Butt Fusion Jointing Machines**.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '⚙️', label: 'Jointing Machines' },
        { icon: '📞', label: 'Call Sales' }
      ]
    };
  }

  // 6. Transformers
  if (matches(['transformer', 'voltage', 'power', 'substation', 'electricity', 'current', 'bijli'])) {
    if (isHindiScript) {
      return {
        text: "OES से **Power and Distribution Transformers** और इलेक्ट्रिकल सबस्टेशन की आवश्यकताओं पर बात करें। क्षमता, डिजाइन और सप्लाई का दायरा लिखित कोटेशन में पुष्टि किया जाएगा।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'ट्रांसफॉर्मर कोट' },
          { icon: '📞', label: 'संपर्क करें' }
        ]
      };
    }
    return {
      text: "Discuss **Power and Distribution Transformers** and electrical-substation requirements with OES. Available ratings, design and supply scope must be confirmed in the written quotation.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'Transformer Quote' },
        { icon: '📞', label: 'Call Sales' }
      ]
    };
  }

  // 7. Cameras
  if (matches(['camera', 'cctv', 'surveillance', 'ptz', 'bullet camera', 'security', 'monitoring', 'guard'])) {
    if (isHindiScript) {
      return {
        text: "हम WTP, STP और सरकारी साइट्स के लिए **Industrial IP CCTV Surveillance Systems** और सोलर-पावर्ड PTZ कैमरा सिक्योरिटी सेटअप्स कमीशन करते हैं।",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'कैमरा कोट' },
          { icon: '📞', label: 'संपर्क करें' }
        ]
      };
    }
    return {
      text: "We commission industrial **IP CCTV Surveillance Systems**, PTZ outdoor solar cameras, and remote control-room video monitoring units for secure plant sites.",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'CCTV Quote' },
        { icon: '📞', label: 'Call Sales' }
      ]
    };
  }

  // 8. Company Profile
  if (matches(['about', 'company', 'orbit', 'oes', 'experience', 'projects', 'owner', 'director', 'history', 'purana', 'kaise'])) {
    if (isHindiScript) {
      return {
        text: 'Orbit Engineering Solutions (OES) भोपाल, म.प्र. में स्थित एक प्रोप्राइटरशिप है। हम वाटर इंफ्रास्ट्रक्चर, ऑटोमेशन और सोलर समाधानों में काम करते हैं। प्रोजेक्ट और प्रमाणपत्र की जानकारी हमारी टीम से पुष्टि करें।',
        showForm: false,
        showContact: true,
        suggestions: [
          { icon: '🌊', label: 'जल प्रोजेक्ट्स' },
          { icon: '📞', label: 'संपर्क सूत्र' }
        ]
      };
    }
    return {
      text: 'Orbit Engineering Solutions (OES) is a proprietorship based in Bhopal, MP, working in water infrastructure, automation and solar solutions. Contact our team for current project references and certification documents.',
      showForm: false,
      showContact: true,
      suggestions: [
        { icon: '🌊', label: 'Water Projects' },
        { icon: '📞', label: 'Get Contact' }
      ]
    };
  }

  // 9. Contact details
  if (matches(['contact', 'number', 'phone', 'mobile', 'email', 'address', 'location', 'office', 'timing'])) {
    if (isHindiScript) {
      return {
        text: "हमारा ऑफिस **Root Space, Char Imli, Bhopal** में है। हमसे फ़ोन पर बात करने के लिए कॉल करें: **+91 70241 28029** या WhatsApp करें: **+91 9039075048**।",
        showForm: true,
        showContact: true,
        suggestions: [
          { icon: '💬', label: 'WhatsApp' },
          { icon: '📧', label: 'ईमेल भेजें' }
        ]
      };
    }
    return {
      text: "Our office is at **Root Space, Char Imli, Bhopal**. Call us at **+91 70241 28029** or WhatsApp at **+91 9039075048** for any queries.",
      showForm: true,
      showContact: true,
      suggestions: [
        { icon: '💬', label: 'WhatsApp' },
        { icon: '📧', label: 'Send Email' }
      ]
    };
  }

  // 10. Pricing & Customization (Smart response)
  if (matches(['price', 'cost', 'rate', 'daam', 'bhaav', 'rupay', 'pais'])) {
    if (isHindiScript) {
      return {
        text: "ओरबिट के सभी इंजीनियरिंग सॉल्यूशंस कस्टमाइज्ड होते हैं (जैसे पाइपलाइन व्यास, फ्लो वॉल्यूम और विशिष्टताओं के आधार पर)। इसलिए हम सटीक कोटेशन चर्चा के बाद ही प्रदान करते हैं। आप आश्वस्त रहें, व्यावसायिक शर्तें लिखित कोटेशन में दी जाएंगी। कृपया नीचे दिए गए फॉर्म में अपनी बुनियादी जानकारी दर्ज करें, हमारी टीम आपकी आवश्यकताओं की समीक्षा करके संपर्क करेगी। 😊",
        showForm: true,
        showContact: false,
        suggestions: [
          { icon: '📋', label: 'कोटेशन फॉर्म' },
          { icon: '📞', label: 'एक्सपर्ट कॉल' }
        ]
      };
    }
    return {
      text: "All engineering and instrumentation projects at OES are customized based on technical factors (pipeline sizing, automation level, flow rate). Thus, we provide tailored quotes after evaluating requirements. Commercial terms will be set out in the quotation. Use the form below to prepare a WhatsApp request for our sales team. 😊",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '📋', label: 'Request Callback' },
        { icon: '📞', label: 'Speak to Expert' }
      ]
    };
  }

  // 11. Generic Fallback
  if (isHindiScript) {
    return {
      text: "नमस्ते! मैं आपका प्रश्न पूरी तरह समझ नहीं पाया। 😅 ओएस (OES) **जल संरचना, सौर ऊर्जा, ऑटोमेशन, SCADA, और सीसीटीवी प्रणालियों** में काम करती है। क्या आप इनमें से किसी विशिष्ट प्रोजेक्ट या उत्पाद के बारे में जानना चाहते हैं? या आप सीधे कॉल बैक का अनुरोध करना चाहते हैं?",
      showForm: true,
      showContact: false,
      suggestions: [
        { icon: '🌊', label: 'जल समाधान' },
        { icon: '☀️', label: 'सोलर प्रोजेक्ट्स' },
        { icon: '⚙️', label: 'ऑटोमेशन SCADA' }
      ]
    };
  }
  return {
    text: "Hello! I didn't quite catch that. 😅 OES specializes in **Water Infrastructure, Solar Energy, Automation, SCADA telemetry, and surveillance setups**. Would you like to check details on any of these areas, or request a call back?",
    showForm: true,
    showContact: false,
    suggestions: [
      { icon: '🌊', label: 'Water Solutions' },
      { icon: '☀️', label: 'Solar Energy' },
      { icon: '⚙️', label: 'SCADA Panels' }
    ]
  };
}

// ============================================================
//  RENDER MARKDOWN LITE
// ============================================================
// ============================================================
//  SMART LINK DETECTION — makes phone/email/WhatsApp/address
//  auto-clickable inside any bot message
// ============================================================

// OES contact constants (single source of truth)
const OES_CONTACTS = {
  phones: ['+91 70241 28029', '+91 9039075049', '+91 9039075048'],
  whatsapp: '+91 9039075048',
  emails: ['info@orbitengineerings.com', 'service@orbitengineerings.com'],
  address: 'Root Space, Char Imli, Mannipuram, Bhopal 462016',
  mapsUrl: 'https://maps.google.com/?q=Root+Space+Char+Imli+Mannipuram+Bhopal+462016+MP',
};

/** Tokenise a line into plain-text and link segments */
type Segment =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'phone'; value: string; href: string }
  | { type: 'whatsapp'; value: string; href: string }
  | { type: 'email'; value: string; href: string }
  | { type: 'address'; value: string; href: string };

function tokeniseLine(line: string): Segment[] {
  // Regex patterns
  // Indian mobile/landline: optional +91, then 10 digits (with spaces/dashes)

  // Build a merged pattern with named groups
  const MASTER_RE  = new RegExp(
    `(?<bold>\\*\\*(.+?)\\*\\*)|(?<phone>\\+91[\\s\\-]?\\d{5}[\\s\\-]?\\d{5}|\\b[6-9]\\d{9}\\b)|(?<email>[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,})`,
    'g'
  );

  const whatsappNum = OES_CONTACTS.whatsapp.replace(/\D/g, ''); // digits only

  const segments: Segment[] = [];
  let lastIndex = 0;

  // First check for address substring
  const ADDRESS_TEXT = 'Root Space, Char Imli';

  for (const match of line.matchAll(MASTER_RE)) {
    const start = match.index!;

    // Push plain text before this match
    if (start > lastIndex) {
      segments.push({ type: 'text', value: line.slice(lastIndex, start) });
    }

    const full = match[0];
    const groups = match.groups ?? {};

    if (groups.bold !== undefined) {
      segments.push({ type: 'bold', value: groups.bold.replace(/\*\*/g, '') });
    } else if (groups.phone !== undefined) {
      const digits = full.replace(/\D/g, '');
      const isWhatsApp =
        digits === whatsappNum ||
        OES_CONTACTS.phones.some(p => p.replace(/\D/g, '') === digits && p.replace(/\D/g, '') === whatsappNum);
      if (isWhatsApp) {
        segments.push({
          type: 'whatsapp',
          value: full,
          href: `https://wa.me/${digits}`,
        });
      } else {
        segments.push({
          type: 'phone',
          value: full,
          href: `tel:+${digits.startsWith('91') ? digits : '91' + digits}`,
        });
      }
    } else if (groups.email !== undefined) {
      segments.push({
        type: 'email',
        value: full,
        href: `mailto:${full}`,
      });
    }

    lastIndex = start + full.length;
  }

  // Remaining tail
  if (lastIndex < line.length) {
    segments.push({ type: 'text', value: line.slice(lastIndex) });
  }

  // Post-process: replace any text segment containing address substring with address link
  return segments.flatMap(seg => {
    if (seg.type !== 'text') return [seg];
    const idx = seg.value.indexOf(ADDRESS_TEXT);
    if (idx === -1) return [seg];
    const result: Segment[] = [];
    if (idx > 0) result.push({ type: 'text', value: seg.value.slice(0, idx) });
    // find end of address (up to end of line or next comma-group)
    const addrEnd = seg.value.indexOf('\n', idx) === -1
      ? seg.value.length
      : seg.value.indexOf('\n', idx);
    result.push({
      type: 'address',
      value: seg.value.slice(idx, addrEnd),
      href: OES_CONTACTS.mapsUrl,
    });
    if (addrEnd < seg.value.length) {
      result.push({ type: 'text', value: seg.value.slice(addrEnd) });
    }
    return result;
  });
}

const baseLinkStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '5px',
  fontWeight: 600,
  textDecoration: 'none',
  borderRadius: '8px',
  padding: '3px 8px',
  margin: '2px 3px',
  fontSize: '13px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease',
  border: '1px solid',
  verticalAlign: 'middle',
};

function RenderText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i, arr) => {
        const segments = tokeniseLine(line);
        return (
          <span key={i}>
            {segments.map((seg, j) => {
              switch (seg.type) {
                case 'bold':
                  return <strong key={j}>{seg.value}</strong>;

                case 'phone':
                  return (
                    <a
                      key={j}
                      href={seg.href}
                      className="orbi-bot-link-phone"
                      style={{
                        ...baseLinkStyle,
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.35)',
                        color: '#f0f9ff',
                      }}
                      title="Tap to call"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      📞 {seg.value}
                    </a>
                  );

                case 'whatsapp':
                  return (
                    <a
                      key={j}
                      href={seg.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="orbi-bot-link-wa"
                      style={{
                        ...baseLinkStyle,
                        background: 'rgba(37, 211, 102, 0.18)',
                        borderColor: 'rgba(37, 211, 102, 0.4)',
                        color: '#a7f3d0',
                      }}
                      title="Open WhatsApp"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(37, 211, 102, 0.28)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(37, 211, 102, 0.18)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      💬 {seg.value}
                    </a>
                  );

                case 'email':
                  return (
                    <a
                      key={j}
                      href={seg.href}
                      className="orbi-bot-link-email"
                      style={{
                        ...baseLinkStyle,
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderColor: 'rgba(255, 255, 255, 0.35)',
                        color: '#f0f9ff',
                      }}
                      title="Send email"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.28)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      📧 {seg.value}
                    </a>
                  );

                case 'address':
                  return (
                    <a
                      key={j}
                      href={seg.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="orbi-bot-link-addr"
                      style={{
                        ...baseLinkStyle,
                        background: 'rgba(253, 186, 116, 0.15)',
                        borderColor: 'rgba(253, 186, 116, 0.35)',
                        color: '#ffedd5',
                      }}
                      title="Open in Google Maps"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(253, 186, 116, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(253, 186, 116, 0.15)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      📍 {seg.value}
                    </a>
                  );

                default:
                  return <span key={j}>{(seg as { value: string }).value}</span>;
              }
            })}
            {i < arr.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}


// ============================================================
//  MOBILE DETECTION HOOK
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
  const [convPhase, setConvPhase] = useState<ConvPhase>('greeting');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [reEngaged, setReEngaged] = useState(false); // re-engagement badge

  const welcomeMessage = (): Message => ({
    id: `welcome-${Date.now()}`,
    role: 'bot',
    text: "Hello! I'm **Orbi**, the Orbit Engineering assistant. You can browse local FAQs about water treatment, automation, solar and instrumentation. Local FAQs are processed in your browser. Opening WhatsApp or choosing external AI shares messages as explained in our Privacy Policy. External AI is available only after provider review and your explicit choice. Please do not enter sensitive or confidential information.",
    timestamp: new Date(),
  });
  const [messages, setMessages] = useState<Message[]>(() => [welcomeMessage()]);
  const [aiConsent, setAiConsent] = useState(false);
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [aiPermissionChecked, setAiPermissionChecked] = useState(false);
  const requestRef = useRef<AbortController | null>(null);
  const generationRef = useRef(0);
  const sendLockRef = useRef(false);
  useEffect(() => () => { generationRef.current += 1; requestRef.current?.abort(); }, []);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [geminiHistory, setGeminiHistory] = useState<GeminiMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<{ icon?: string; label: string }[]>(PHASE_QUICK_REPLIES.greeting);
  const [statusColor, setStatusColor] = useState<'green' | 'yellow' | 'red'>('yellow');

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setStatusColor('yellow');
    const handleOffline = () => setStatusColor('red');
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    if (!navigator.onLine) setStatusColor('red');
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageCountRef = useRef(0);

  // ── Session management (greeting only, NOT chat history — privacy) ──
  useEffect(() => {
    let seen: string | null = null;
    try { seen = sessionStorage.getItem('orbi-greeted'); } catch { /* Storage may be disabled. */ }
    if (!seen) setGreetingActive(true);
    else setGreetingDone(true);
  }, []);

  // ── Auto-scroll ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // ── Focus input when opened ──
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  // ── Lock body scroll on mobile ──
  useEffect(() => {
    if (isMobile && isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, isOpen]);

  // ── Re-engagement badge: show notification badge if user has had 2+ messages and closed ──
  useEffect(() => {
    if (!isOpen && messageCountRef.current >= 2) {
      const t = setTimeout(() => setReEngaged(true), 4000);
      return () => clearTimeout(t);
    } else {
      setReEngaged(false);
    }
  }, [isOpen]);

  const dismissGreeting = useCallback(() => {
    setGreetingActive(false);
    setGreetingDone(true);
    try { sessionStorage.setItem('orbi-greeted', '1'); } catch { /* Greeting remains usable without storage. */ }
  }, []);

  const openFromGreeting = useCallback(() => {
    dismissGreeting();
    setIsOpen(true);
  }, [dismissGreeting]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 500 || sendLockRef.current) return;
    sendLockRef.current = true;
    const generation = ++generationRef.current;
    const controller = new AbortController();
    requestRef.current = controller;

    setShowQuickReplies(false);
    setInputText('');
    setReEngaged(false);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => {
      const next = [...prev, userMsg];
      messageCountRef.current = next.filter(m => m.role === 'user').length;
      // Update phase
      const newPhase = detectPhase(next, convPhase);
      setConvPhase(newPhase);
      return next;
    });

    setIsTyping(true);

    const appendLocalReply = () => {
      const result = getLocalResponse(trimmed);
      setStatusColor('yellow');
      setMessages(prev => [...prev, { id: `b-${Date.now()}`, role: 'bot', text: result.text, timestamp: new Date(), showContact: result.showContact, showForm: result.showForm }]);
      setQuickReplies(result.suggestions);
      setShowQuickReplies(true);
    };
    try {
      if (!EXTERNAL_AI_READY || !aiConsent || !adultConfirmed) {
        appendLocalReply();
        return;
      }
      const reply = await callOrbi(geminiHistory, trimmed, { consent: aiConsent, adult: adultConfirmed, consentVersion: AI_NOTICE_VERSION, signal: controller.signal });
      if (generationRef.current !== generation || controller.signal.aborted) return;
      
      // Parse suggestions
      let cleanReply = reply;
      let parsedChips: { icon?: string; label: string }[] = [];

      const suggestionsMatch = reply.match(/\[Suggestions:\s*(.+?)\]/i);
      if (suggestionsMatch) {
        const options = suggestionsMatch[1].split('|').map(o => o.trim()).filter(Boolean);
        parsedChips = options.map(o => {
          let emoji = '⚡';
          const lower = o.toLowerCase();
          if (lower.includes('water') || lower.includes('flow') || lower.includes('meter')) emoji = '🌊';
          else if (lower.includes('solar') || lower.includes('dhoop') || lower.includes('panel')) emoji = '☀️';
          else if (lower.includes('quote') || lower.includes('price') || lower.includes('daam') || lower.includes('bhaav') || lower.includes('cost') || lower.includes('rate')) emoji = '📋';
          else if (lower.includes('contact') || lower.includes('call') || lower.includes('phone') || lower.includes('expert')) emoji = '📞';
          else if (lower.includes('whatsapp') || lower.includes('chat')) emoji = '💬';
          return { icon: emoji, label: o };
        });
        cleanReply = reply.replace(/\[Suggestions:\s*.+?\]/gi, '').trim();
      }

      const showContact = CONTACT_TRIGGER_REGEX.test(trimmed) || CONTACT_TRIGGER_REGEX.test(cleanReply);
      const showForm = FORM_TRIGGER_REGEX.test(trimmed) || FORM_TRIGGER_REGEX.test(cleanReply);

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: 'bot',
        text: cleanReply,
        timestamp: new Date(),
        showContact,
        showForm,
      };

      setMessages(prev => [...prev, botMsg]);
      setGeminiHistory(prev => [
        ...prev.slice(-14),
        { role: 'user', parts: [{ text: trimmed }] },
        { role: 'model', parts: [{ text: reply }] },
      ]);

      if (parsedChips.length > 0) {
        setQuickReplies(parsedChips);
      } else {
        const newPhase = detectPhase(messages, convPhase);
        setQuickReplies(PHASE_QUICK_REPLIES[newPhase]);
      }
      setStatusColor(navigator.onLine ? 'green' : 'red');
      setShowQuickReplies(true);

    } catch {
      if (generationRef.current !== generation || controller.signal.aborted) return;
      appendLocalReply();
    } finally {
      if (generationRef.current === generation) {
        requestRef.current = null;
        sendLockRef.current = false;
        setIsTyping(false);
      }
    }
  }, [geminiHistory, convPhase, messages, aiConsent, adultConfirmed]);

  const clearChat = useCallback(() => {
    generationRef.current += 1;
    requestRef.current?.abort();
    requestRef.current = null;
    sendLockRef.current = false;
    setIsTyping(false);
    setInputText('');
    setAiConsent(false);
    setAdultConfirmed(false);
    setAiPermissionChecked(false);
    setMessages([welcomeMessage()]);
    setGeminiHistory([]);
    setConvPhase('greeting');
    setQuickReplies(PHASE_QUICK_REPLIES.greeting);
    setShowQuickReplies(true);
    setStatusColor('yellow');
    messageCountRef.current = 0;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputText); }
  };

  const toggleChat = () => {
    setIsOpen(o => !o);
    if (greetingActive) dismissGreeting();
    setReEngaged(false);
  };

  const fmtTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // ── Responsive layout ──
  const chatW = isMobile ? '100vw' : 'min(440px, calc(100vw - 48px))';
  const chatH = isMobile ? '100dvh' : 'min(630px, calc(100dvh - 108px))';
  const chatBottom = isMobile ? '0' : '92px';
  const chatLeft = isMobile ? '0' : '20px';
  const chatBR = isMobile ? '0' : '24px';

  const isFirstMessage = messages.length === 1;

  return (
    <>
      {/* ── Global CSS ── */}
      <style>{`
        @keyframes orbi-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes orbi-pulse-ring { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.75);opacity:0} }
        @keyframes orbi-window-desktop {
          0%{transform:scale(0.88) translateY(24px) translateX(-10px);opacity:0}
          50%{transform:scale(1.02) translateY(-4px);opacity:1}
          100%{transform:scale(1) translateY(0);opacity:1}
        }
        @keyframes orbi-window-mobile {
          0%{transform:translateY(100%);opacity:0}
          100%{transform:translateY(0);opacity:1}
        }
        @keyframes orbi-dot { 0%,60%,100%{transform:translateY(0);opacity:.35} 30%{transform:translateY(-7px);opacity:1} }
        @keyframes orbi-msg-in-bot  { from{transform:translateX(-16px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes orbi-msg-in-user { from{transform:translateX(16px);opacity:0} to{transform:translateX(0);opacity:1} }
        @keyframes orbi-badge-pop { 0%{transform:scale(0)} 60%{transform:scale(1.2)} 100%{transform:scale(1)} }

        .orbi-desktop  { animation: orbi-window-desktop 0.42s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .orbi-mobile   { animation: orbi-window-mobile  0.38s cubic-bezier(0.22,1,0.36,1) forwards; }
        .orbi-msg-bot  { animation: orbi-msg-in-bot  0.3s ease-out; }
        .orbi-msg-user { animation: orbi-msg-in-user 0.3s ease-out; }
        .orbi-dot1 { animation: orbi-dot 1.3s 0s    infinite; }
        .orbi-dot2 { animation: orbi-dot 1.3s 0.22s infinite; }
        .orbi-dot3 { animation: orbi-dot 1.3s 0.44s infinite; }
        .orbi-badge { animation: orbi-badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both; }

        .orbi-scroll::-webkit-scrollbar { width: 5px; }
        .orbi-scroll::-webkit-scrollbar-track { background: #f0f9ff; }
        .orbi-scroll::-webkit-scrollbar-thumb { background: #bae6fd; border-radius: 3px; }
        .orbi-scroll::-webkit-scrollbar-thumb:hover { background: #7dd3fc; }

        .orbi-chip {
          transition: all 0.2s ease !important;
        }
        .orbi-chip:hover {
          background: linear-gradient(135deg, #0073bc, #00a8e0) !important;
          color: white !important;
          border-color: transparent !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 14px rgba(0,115,188,0.32) !important;
        }
        .orbi-send:hover  { opacity: .9; transform: scale(1.08); }
        .orbi-send:active { transform: scale(.93); }
        .orbi-close:hover { background: rgba(255,255,255,.28) !important; }
        .orbi-input-wrap:focus-within {
          border-color: #0073bc !important;
          box-shadow: 0 0 0 3px rgba(0,115,188,0.13) !important;
        }
        .orbi-clr:hover { background: rgba(0,115,188,0.1) !important; color: #0073bc !important; }
      `}</style>

      {/* ── Greeting Toast ── */}
      {greetingActive && !greetingDone && !isOpen && (
        <GreetingToast onClose={dismissGreeting} onOpenChat={openFromGreeting} />
      )}

      {/* ── Mobile backdrop ── */}
      {isMobile && isOpen && (
        <div onClick={toggleChat} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
          zIndex: 9996, backdropFilter: 'blur(3px)',
        }} />
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className={isMobile ? 'orbi-mobile' : 'orbi-desktop'}
          role="dialog"
          aria-label="Orbi — OES Sales & Support AI"
          aria-modal="true"
          style={{
            position: 'fixed', bottom: chatBottom, left: chatLeft,
            width: chatW, height: chatH, zIndex: 9998,
            display: 'flex', flexDirection: 'column',
            borderRadius: chatBR, overflow: 'hidden',
            background: 'white',
            boxShadow: isMobile
              ? '0 -8px 40px rgba(0,0,0,0.15)'
              : '0 28px 80px rgba(0,115,188,0.22), 0 8px 32px rgba(0,0,0,0.1)',
            border: isMobile ? 'none' : '1px solid rgba(0,115,188,0.1)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {/* ─── HEADER ─── */}
          <div style={{
            background: 'linear-gradient(135deg, #0073bc 0%, #005fa3 45%, #003d6b 100%)',
            padding: isMobile ? '14px 16px 12px' : '16px 20px 14px',
            display: 'flex', alignItems: 'center', gap: '13px',
            flexShrink: 0, position: 'relative', overflow: 'hidden',
          }}>
            {/* Wave */}
            <svg style={{ position: 'absolute', bottom: 0, left: 0, opacity: 0.1 }}
              viewBox="0 0 440 32" height="32" width="100%" preserveAspectRatio="none">
              <path d="M0 22 Q55 8,110 20 Q165 32,220 16 Q275 2,330 18 Q385 34,440 18 L440 32 L0 32Z" fill="white" />
            </svg>
            {/* Stars */}
            <div style={{ position: 'absolute', top: '10px', right: '72px', opacity: 0.22 }}>
              <svg width="42" height="18" viewBox="0 0 42 18">
                <circle cx="5" cy="9" r="1.5" fill="white" />
                <circle cx="14" cy="4" r="1" fill="white" />
                <circle cx="25" cy="13" r="1.3" fill="white" />
                <circle cx="36" cy="6" r="1" fill="white" />
              </svg>
            </div>

            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: isMobile ? '48px' : '54px',
                height: isMobile ? '48px' : '54px',
                background: 'rgba(255,255,255,0.14)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2.5px solid rgba(255,255,255,0.32)',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
              }}>
                <OrbiAvatar size={isMobile ? 36 : 40} animate />
              </div>
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: '13px', height: '13px',
                background: statusColor === 'green' ? '#4ade80' : statusColor === 'yellow' ? '#fbbf24' : '#f87171',
                borderRadius: '50%', border: '2.5px solid white',
                boxShadow: statusColor === 'green' 
                  ? '0 0 7px rgba(74,222,128,0.65)' 
                  : statusColor === 'yellow' 
                    ? '0 0 7px rgba(251,191,36,0.65)' 
                    : '0 0 7px rgba(248,113,113,0.65)',
                transition: 'all 0.3s ease',
              }} />
            </div>

            {/* Name */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: isMobile ? '17px' : '18px', lineHeight: 1.2 }}>
                Orbi
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', marginTop: '2px' }}>
                🌊 Orbit Engineering Assistant
              </div>
            </div>

            {/* Header actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              {aiConsent && <button type="button" onClick={clearChat} style={{ color: 'white', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', padding: '6px', fontSize: '11px', cursor: 'pointer' }}>Stop AI</button>}
              {/* Clear chat */}
              <button onClick={clearChat} className="orbi-clr" title="Clear local chat and stop AI"
                aria-label="Clear local chat and stop AI"
                style={{
                  background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px', color: 'rgba(255,255,255,0.8)',
                  width: '30px', height: '30px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <RotateCcw size={14} />
              </button>
              {/* Close */}
              <button onClick={toggleChat} className="orbi-close" aria-label="Close chat"
                style={{
                  background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '10px', color: 'white',
                  width: '34px', height: '34px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s',
                }}>
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* ─── MESSAGES AREA ─── */}
          <div className="orbi-scroll" style={{
            flex: 1, overflowY: 'auto',
            padding: isMobile ? '14px 12px' : '18px 16px',
            background: 'linear-gradient(180deg, #f8fbff 0%, #ffffff 40%)',
            display: 'flex', flexDirection: 'column', gap: '14px',
          }}>
            {/* Date separator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.08)' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500 }}>
                {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.08)' }} />
            </div>

            <section aria-label="Chat privacy choices" style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '12px', fontSize: '12px', lineHeight: 1.55, color: '#1e3a5f' }}>
              <strong>{aiConsent ? 'External AI enabled for this page' : 'Local FAQ mode'}</strong>
              {!aiConsent && <>
                <p style={{ margin: '6px 0' }}>{EXTERNAL_AI_READY
                  ? `If you choose AI, your messages and subsequent AI chat history go to these reviewed processors: ${AI_PROVIDER_DISCLOSURE}. Providers may retain records. AI answers may be inaccurate; confirm technical and commercial details with our team.`
                  : 'External AI is paused while provider privacy settings are reviewed. You can use local FAQs below without sending messages to an AI provider, or contact our team directly.'}</p>
                {EXTERNAL_AI_READY && <>
                  <label style={{ display: 'flex', gap: '7px', margin: '8px 0', alignItems: 'flex-start' }}><input type="checkbox" checked={adultConfirmed} onChange={e => setAdultConfirmed(e.target.checked)} /><span>I am 18 or over.</span></label>
                  <label style={{ display: 'flex', gap: '7px', margin: '8px 0', alignItems: 'flex-start' }}><input type="checkbox" checked={aiPermissionChecked} onChange={e => setAiPermissionChecked(e.target.checked)} /><span>I agree to the described AI processing for answers to my questions. I will not enter personal, sensitive or confidential information.</span></label>
                  <button type="button" disabled={!adultConfirmed || !aiPermissionChecked} onClick={() => { if (adultConfirmed && aiPermissionChecked) { setGeminiHistory([]); setAiConsent(true); } }} style={{ borderRadius: '7px', border: 0, background: '#0369a1', color: 'white', padding: '7px 10px', opacity: adultConfirmed && aiPermissionChecked ? 1 : 0.5 }}>Enable AI for this page</button>
                </>}
              </>}
              {aiConsent && <p style={{ margin: '6px 0' }}>Stop AI to prevent further requests and clear local history. This cannot retract messages already transmitted or erase provider records. <button type="button" onClick={clearChat} style={{ color: '#075985', textDecoration: 'underline', background: 'none', border: 0, cursor: 'pointer', fontWeight: 700 }}>Stop AI chat</button></p>}
              <p style={{ margin: '7px 0 0' }}><Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#075985' }}>Privacy Policy</Link> · <Link to="/contact" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#075985' }}>Contact a person</Link></p>
            </section>
            {/* Messages */}
            {messages.map(msg => (
              <div key={msg.id}
                className={msg.role === 'bot' ? 'orbi-msg-bot' : 'orbi-msg-user'}
                style={{
                  display: 'flex',
                  flexDirection: msg.role === 'bot' ? 'row' : 'row-reverse',
                  alignItems: 'flex-end', gap: '10px',
                }}>
                {/* Avatar */}
                {msg.role === 'bot' && (
                  <div style={{
                    width: '32px', height: '32px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #0073bc, #00a8e0)',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 3px 10px rgba(0,115,188,0.3)',
                  }}>
                    <OrbiAvatar size={24} />
                  </div>
                )}

                <div style={{ maxWidth: isMobile ? '82%' : '78%' }}>
                  {/* Bubble */}
                  <div style={{
                    padding: isMobile ? '10px 13px' : '12px 16px',
                    borderRadius: msg.role === 'bot' ? '18px 18px 18px 5px' : '18px 18px 5px 18px',
                    background: msg.role === 'bot'
                      ? 'linear-gradient(135deg, #0073bc 0%, #005494 100%)'
                      : 'white',
                    color: msg.role === 'bot' ? 'white' : '#111827',
                    fontSize: '14px', lineHeight: 1.65,
                    boxShadow: msg.role === 'bot'
                      ? '0 4px 16px rgba(0,115,188,0.3)'
                      : '0 2px 10px rgba(0,0,0,0.07)',
                    border: msg.role === 'user' ? '1px solid rgba(0,115,188,0.1)' : 'none',
                    wordBreak: 'break-word',
                  }}>
                    <RenderText text={msg.text} />
                  </div>

                  {/* Contact card / Form */}
                  {msg.role === 'bot' && msg.showForm && msg.id !== 'welcome' && (
                    <CallbackForm defaultInterest={msg.text} />
                  )}
                  {msg.role === 'bot' && msg.showContact && !msg.showForm && msg.id !== 'welcome' && (
                    <ContactCard />
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
                  background: 'linear-gradient(135deg, #0073bc, #005494)',
                  display: 'flex', gap: '6px', alignItems: 'center',
                  boxShadow: '0 4px 16px rgba(0,115,188,0.3)',
                }}>
                  <span className="orbi-dot1" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                  <span className="orbi-dot2" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                  <span className="orbi-dot3" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'inline-block' }} />
                </div>
              </div>
            )}

            {/* Quick reply chips — phase-aware */}
            {showQuickReplies && !isTyping && (
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '8px',
                marginTop: isFirstMessage ? '6px' : '2px',
              }}>
                {quickReplies.map(qr => (
                  <button key={qr.label} className="orbi-chip"
                    onClick={() => sendMessage(qr.label)}
                    style={{
                      padding: '7px 13px', background: 'white', color: '#0073bc',
                      border: '1.5px solid #0073bc', borderRadius: '22px',
                      fontSize: '12.5px', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '5px',
                      boxShadow: '0 2px 6px rgba(0,115,188,0.12)',
                    }}>
                    {qr.icon} {qr.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ─── INPUT AREA ─── */}
          <div style={{
            padding: isMobile ? '10px 12px 14px' : '13px 16px 16px',
            background: 'white',
            borderTop: '1px solid rgba(0,115,188,0.07)',
            flexShrink: 0,
          }}>
            {/* WhatsApp quick-connect bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '6px', marginBottom: '10px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.06)' }} />
              <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  fontSize: '11px', color: '#25D366', fontWeight: 600,
                  textDecoration: 'none', padding: '3px 8px',
                  background: '#f0fdf4', borderRadius: '10px',
                  border: '1px solid #bbf7d0', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#dcfce7'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#f0fdf4'; }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                </svg>
                Quick WhatsApp Chat
              </a>
              <div style={{ flex: 1, height: '1px', background: 'rgba(0,115,188,0.06)' }} />
            </div>

            {/* Input box */}
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
                placeholder="Ask Orbi about products or services..."
                disabled={isTyping}
                maxLength={500}
                aria-label="Type your message to Orbi"
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontSize: isMobile ? '15px' : '14px', color: '#111827',
                  outline: 'none', fontFamily: "'Inter', system-ui, sans-serif", minWidth: 0,
                }}
              />
              <button
                id="orbi-send-btn" className="orbi-send"
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
                }}>
                <Send size={17} color={inputText.trim() && !isTyping ? 'white' : '#9ca3af'} />
              </button>
            </div>

            <p style={{
              margin: '7px 0 0', fontSize: '10.5px', color: '#9ca3af',
              textAlign: 'center', letterSpacing: '0.01em',
            }}>
              {aiConsent ? 'Orbi · AI mode' : 'Orbi · Local FAQ mode'} · Orbit Engineering Solutions
            </p>
          </div>
        </div>
      )}

      {/* ── Floating Orbi Button ── */}
      <div style={{
        position: 'fixed',
        bottom: isMobile ? '16px' : '22px',
        left: isMobile ? '16px' : '20px',
        zIndex: 9999,
      }}>
        {/* Pulse rings */}
        {!isOpen && (
          <>
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              border: '2px solid rgba(0,115,188,0.42)',
              animation: 'orbi-pulse-ring 2.4s ease-out infinite', pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', inset: '-12px', borderRadius: '50%',
              border: '2px solid rgba(0,115,188,0.22)',
              animation: 'orbi-pulse-ring 2.4s ease-out 0.8s infinite', pointerEvents: 'none',
            }} />
          </>
        )}

        {/* Re-engagement notification badge */}
        {reEngaged && !isOpen && (
          <div className="orbi-badge" style={{
            position: 'absolute', top: '-8px', left: '-8px',
            background: '#ef4444', color: 'white',
            borderRadius: '50%', width: '22px', height: '22px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, zIndex: 1,
            border: '2px solid white',
            boxShadow: '0 2px 8px rgba(239,68,68,0.45)',
          }}>
            <MessageCircle size={12} />
          </div>
        )}

        <button
          id="orbi-chat-toggle"
          onClick={toggleChat}
          aria-label={isOpen ? 'Close Orbi chat' : 'Open Orbi — OES Sales & Support AI'}
          style={{
            width: isMobile ? '58px' : '64px',
            height: isMobile ? '58px' : '64px',
            background: isOpen
              ? 'linear-gradient(135deg, #ef4444, #dc2626)'
              : 'linear-gradient(135deg, #0073bc 0%, #00a8e0 100%)',
            border: 'none', borderRadius: '50%', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: isOpen
              ? '0 8px 28px rgba(239,68,68,0.48)'
              : '0 8px 28px rgba(0,115,188,0.48)',
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
