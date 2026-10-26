/** Local browser fixture. It never forwards fetch, downloads or external navigation. */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ContactPage from '../src/pages/ContactPage';
import ClientsPage from '../src/pages/ClientsPage';
import QuoteModal from '../src/components/QuoteModal';
import BrochureModal from '../src/components/BrochureModal';
import ClickToLoadMap from '../src/components/ClickToLoadMap';
import ChatbotWidget from '../src/components/Chatbot/ChatbotWidget';
import '../src/index.css';

type FetchMode = 'accepted' | 'rejected' | 'network' | 'pending';
type View = 'contact' | 'clients' | 'quote' | 'brochure' | 'maps' | 'chat';
type RequestRecord = { id: number; kind: 'form' | 'ai' | 'blocked'; url: string; payload: unknown; status: string };
type Snapshot = { mode: FetchMode; requests: RequestRecord[]; downloads: number; externalNavigations: number; iframes: number };

let snapshot: Snapshot = { mode: 'rejected', requests: [], downloads: 0, externalNavigations: 0, iframes: 0 };
let nextRequestId = 1;
const listeners = new Set<() => void>();
const pendingRequests = new Map<number, { release: (accepted: boolean) => void; cancel: () => void }>();
const publish = (patch: Partial<Snapshot>) => {
  snapshot = { ...snapshot, ...patch };
  listeners.forEach(listener => listener());
};
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
const updateRequest = (id: number, status: string) => publish({ requests: snapshot.requests.map(request => request.id === id ? { ...request, status } : request) });

function payloadOf(body: BodyInit | null | undefined): unknown {
  if (body instanceof FormData) return Object.fromEntries([...body.entries()].map(([key, value]) => [key, typeof value === 'string' ? value : `[file: ${value.name}]`]));
  if (typeof body === 'string') { try { return JSON.parse(body); } catch { return body; } }
  return null;
}

window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
  const kind = url.startsWith('https://formspree.io/') ? 'form' : url.startsWith('https://orbi-proxy.') ? 'ai' : 'blocked';
  const id = nextRequestId++;
  const mode = snapshot.mode;
  publish({ requests: [...snapshot.requests, { id, kind, url, payload: payloadOf(init?.body), status: kind === 'blocked' ? 'blocked' : mode }] });
  if (kind === 'blocked') return new Response('{"error":"Local fixture blocked this request"}', { status: 403 });

  const response = (accepted: boolean) => new Response(JSON.stringify(accepted
    ? (kind === 'ai' ? { text: 'MOCK AI ANSWER — generated locally for this browser test. [Suggestions: Products | Contact]' } : { ok: true })
    : { error: 'Mock provider rejection' }), { status: accepted ? 200 : 422, headers: { 'Content-Type': 'application/json' } });
  const signal = init?.signal ?? (input instanceof Request ? input.signal : null);
  if (signal?.aborted) { updateRequest(id, 'aborted'); throw new DOMException('Mock request aborted', 'AbortError'); }
  if (mode === 'network') { updateRequest(id, 'network-error'); throw new TypeError('Mock network failure'); }
  if (mode !== 'pending') return response(mode === 'accepted');

  return new Promise<Response>((resolve, reject) => {
    const finish = () => { pendingRequests.delete(id); signal?.removeEventListener('abort', cancel); };
    const cancel = () => { finish(); updateRequest(id, 'aborted'); reject(new DOMException('Mock request aborted', 'AbortError')); };
    pendingRequests.set(id, {
      release: accepted => { finish(); updateRequest(id, accepted ? 'accepted' : 'rejected'); resolve(response(accepted)); },
      cancel,
    });
    signal?.addEventListener('abort', cancel, { once: true });
  });
};

// Capture both programmatic brochure downloads and fallback download links.
document.addEventListener('click', event => {
  const anchor = event.target instanceof Element ? event.target.closest('a') : null;
  if (!anchor) return;
  if (anchor.hasAttribute('download')) {
    event.preventDefault();
    publish({ downloads: snapshot.downloads + 1 });
  } else if (anchor.origin !== window.location.origin && anchor.protocol !== 'about:') {
    event.preventDefault();
    publish({ externalNavigations: snapshot.externalNavigations + 1 });
  }
}, true);
window.open = () => { publish({ externalNavigations: snapshot.externalNavigations + 1 }); return null; };
new MutationObserver(() => {
  const iframes = document.querySelectorAll('iframe').length;
  if (iframes !== snapshot.iframes) publish({ iframes });
}).observe(document.documentElement, { childList: true, subtree: true });

export default function Harness() {
  const state = useSyncExternalStore(subscribe, () => snapshot);
  const [view, setView] = useState<View>('contact');
  const [mountKey, setMountKey] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  useEffect(() => {
    const toolbar = document.getElementById('fixture-toolbar')!;
    const observer = new ResizeObserver(() => document.documentElement.style.setProperty('--fixture-toolbar-height', `${toolbar.getBoundingClientRect().height}px`));
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, []);
  const choose = (next: View) => { setView(next); setQuoteOpen(next === 'quote'); setBrochureOpen(next === 'brochure'); };
  const reset = () => {
    [...pendingRequests.values()].forEach(request => request.cancel());
    nextRequestId = 1;
    publish({ mode: 'rejected', requests: [], downloads: 0, externalNavigations: 0, iframes: 0 });
    setMountKey(key => key + 1);
    setQuoteOpen(view === 'quote');
    setBrochureOpen(view === 'brochure');
  };
  const forms = state.requests.filter(request => request.kind === 'form').length;
  const ai = state.requests.filter(request => request.kind === 'ai').length;
  const pending = state.requests.filter(request => request.status === 'pending').length;
  const aborted = state.requests.filter(request => request.status === 'aborted').length;
  return (
    <>
      <header id="fixture-toolbar" style={{ position: 'sticky', top: 0, zIndex: 20000, background: '#0f172a', color: '#fff', padding: '12px', fontSize: '13px', borderBottom: '3px solid #38bdf8' }}>
        <strong>LOCAL MOCK FIXTURE · production AI flags unchanged · no external fetches/downloads</strong>
        <nav aria-label="Test views" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
          {(['contact', 'clients', 'quote', 'brochure', 'maps', 'chat'] as View[]).map(name => <button key={name} id={`show-${name}`} type="button" onClick={() => choose(name)} aria-pressed={view === name} style={{ border: '1px solid #94a3b8', padding: '5px 10px', borderRadius: '5px', background: view === name ? '#0369a1' : '#334155' }}>{name}</button>)}
          <label>Fetch mode{' '}<select id="fetch-mode" value={state.mode} onChange={event => publish({ mode: event.target.value as FetchMode })} style={{ color: '#0f172a', padding: '5px' }}>
            <option value="rejected">rejected (422)</option><option value="accepted">accepted (200)</option><option value="network">network failure</option><option value="pending">pending until released/aborted</option>
          </select></label>
          <button id="release-pending" type="button" onClick={() => [...pendingRequests.values()].forEach(request => request.release(true))}>Release pending as accepted</button>
          <button id="reject-pending" type="button" onClick={() => [...pendingRequests.values()].forEach(request => request.release(false))}>Reject pending</button>
          <button id="reset-fixture" type="button" onClick={reset}>Reset fixture</button>
        </nav>
        <p aria-live="polite" style={{ marginTop: '8px' }}>
          Form requests: <output id="form-count">{forms}</output> · AI requests: <output id="ai-count">{ai}</output> · Pending: <output id="pending-count">{pending}</output> · Aborted: <output id="aborted-count">{aborted}</output> · Downloads attempted: <output id="download-count">{state.downloads}</output> · Iframes: <output id="iframe-count">{state.iframes}</output> · Blocked navigation: <output id="navigation-count">{state.externalNavigations}</output>
        </p>
        <details style={{ marginTop: '6px' }}><summary>Last submitted payload and request log</summary>
          <pre id="last-payload" style={{ maxHeight: '180px', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: '11px' }}>{JSON.stringify(state.requests.at(-1)?.payload ?? null, null, 2)}</pre>
          <pre id="request-log" style={{ maxHeight: '140px', overflow: 'auto', whiteSpace: 'pre-wrap', fontSize: '11px' }}>{JSON.stringify(state.requests.map(({ id, kind, url, status }) => ({ id, kind, url, status })), null, 2)}</pre>
        </details>
      </header>
      <main key={mountKey} id="test-content">
        {view === 'contact' && <ContactPage />}
        {view === 'clients' && <ClientsPage />}
        {view === 'quote' && <><button id="open-quote" type="button" onClick={() => setQuoteOpen(true)}>Open quote form</button><QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} productName="Mock industrial flow meter" /></>}
        {view === 'brochure' && <><button id="open-brochure" type="button" onClick={() => setBrochureOpen(true)}>Open brochure form</button><BrochureModal open={brochureOpen} onClose={() => setBrochureOpen(false)} brochureUrl="/tests/mock-brochure.pdf" /></>}
        {view === 'maps' && <section style={{ maxWidth: '440px', margin: '30px auto' }}><h1>Map control test (iframe source is about:blank)</h1><ClickToLoadMap title="Local test office" embedUrl="about:blank" mapUrl="about:blank" /></section>}
        {view === 'chat' && <section style={{ padding: '30px' }}><h1>Chat privacy test</h1><p>Open Orbi using its own button. Typing and quick replies stay local until both consent choices are confirmed. The fixture alone enables the mock-provider consent UI.</p><ChatbotWidget /></section>}
      </main>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<BrowserRouter><Harness /></BrowserRouter>);
