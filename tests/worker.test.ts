import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { createRateLimiter, type Env } from '../orbi-proxy/src/index.ts';
import { AI_NOTICE_VERSION } from '../src/data/legalContent.mjs';

const origin = 'https://orbitengineerings.com';
const env: Env = { ALLOWED_ORIGINS: origin, AI_PROVIDER_REVIEWED: 'true', REVIEWED_PROVIDERS: 'gemini', GEMINI_KEYS: 'test-key' };
const payload = () => ({ messages: [{ role: 'user', content: 'Tell me about water treatment' }], systemPrompt: 'Help with product FAQs.', consent: true, adult: true, consentVersion: AI_NOTICE_VERSION });
const request = (body: unknown = payload(), headers: Record<string, string> = {}, method = 'POST') => new Request('https://proxy.example', {
  method,
  headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': 'test-default', ...headers },
  ...(method === 'POST' ? { body: JSON.stringify(body) } : {}),
});

function mockProvider(t: Parameters<Parameters<typeof test>[1]>[0], result: (input: string | URL | Request, init?: RequestInit) => Response | Promise<Response>) {
  let count = 0;
  t.mock.method(globalThis, 'fetch', async (input: string | URL | Request, init?: RequestInit) => { count += 1; return result(input, init); });
  return () => count;
}

test('origin is checked before OPTIONS and rejected origins get no allow-origin header', async t => {
  const count = mockProvider(t, () => { throw new Error('No network permitted'); });
  for (const method of ['POST', 'OPTIONS']) {
    for (const badOrigin of ['', 'null', 'https://evil.example']) {
      const req = request(payload(), { Origin: badOrigin }, method);
      const response = await worker.fetch(req, env);
      assert.equal(response.status, 403);
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.equal(response.headers.get('Cache-Control'), 'no-store');
      assert.equal(response.headers.get('Vary'), 'Origin');
    }
  }
  const missing = new Request('https://proxy.example', { method: 'OPTIONS' });
  assert.equal((await worker.fetch(missing, env)).status, 403);
  const allowed = await worker.fetch(request(undefined, {}, 'OPTIONS'), env);
  assert.equal(allowed.status, 204);
  assert.equal(allowed.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal(count(), 0);
});

test('current adult consent and provider review must all be present before a provider call', async t => {
  const count = mockProvider(t, () => { throw new Error('No network permitted'); });
  for (const amendment of [{ consent: false }, { adult: false }, { consentVersion: 'old' }, { consentVersion: undefined }]) {
    const response = await worker.fetch(request({ ...payload(), ...amendment }), env);
    assert.equal(response.status, 400);
    assert.equal((await response.json()).code, 'CONSENT_REQUIRED');
  }
  assert.equal((await worker.fetch(request(), { ...env, AI_PROVIDER_REVIEWED: 'false' })).status, 503);
  assert.equal((await worker.fetch(request(), { ...env, REVIEWED_PROVIDERS: '' })).status, 503);
  assert.equal((await worker.fetch(request(), { ...env, REVIEWED_PROVIDERS: 'unknown' })).status, 503);
  assert.equal(count(), 0);
});

test('all message fields, history limits, prompt and payload size are validated', async t => {
  const count = mockProvider(t, () => { throw new Error('No network permitted'); });
  const invalid = [null, {}, { ...payload(), messages: [] }, { ...payload(), messages: [{ role: 'user', content: 42 }] },
    { ...payload(), messages: [{ role: 'system', content: 'bad' }] }, { ...payload(), messages: [{ role: 'assistant', content: 'Only assistant' }] },
    { ...payload(), messages: [{ role: 'user', content: 'x'.repeat(501) }] }, { ...payload(), messages: [{ role: 'assistant', content: 'x'.repeat(4001) }, { role: 'user', content: 'hello' }] },
    { ...payload(), messages: Array.from({ length: 18 }, () => ({ role: 'user', content: 'hello' })) }, { ...payload(), systemPrompt: {} }, { ...payload(), systemPrompt: 'x'.repeat(65537) }];
  for (const body of invalid) assert.equal((await worker.fetch(request(body), env)).status, 400);
  assert.equal((await worker.fetch(request({ ...payload(), padding: 'x'.repeat(128 * 1024) }), env)).status, 413);
  assert.equal((await worker.fetch(new Request('https://proxy.example', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: '{' }), env)).status, 400);
  assert.equal((await worker.fetch(request(payload(), { 'Content-Type': 'text/plain' }), env)).status, 415);
  assert.equal(count(), 0);
});

test('only reviewed providers receive requests; successful responses are JSON and no-store', async t => {
  const calls: string[] = [];
  mockProvider(t, (input, init) => {
    calls.push(String(input));
    const body = JSON.parse(init!.body as string);
    assert.equal(body.contents[0].parts[0].text, payload().messages[0].content);
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Product FAQ answer' }] } }] }), { status: 200 });
  });
  const response = await worker.fetch(request(payload(), { 'CF-Connecting-IP': 'success' }), { ...env, OPENROUTER_KEYS: 'unreviewed-key', OPENROUTER_MODEL: 'unreviewed-model' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { text: 'Product FAQ answer' });
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.match(response.headers.get('Content-Type')!, /application\/json/);
  assert.equal(calls.length, 1);
  assert.match(calls[0], /generativelanguage\.googleapis\.com/);
});

test('provider failures cannot fall back to an unreviewed provider', async t => {
  const calls: string[] = [];
  mockProvider(t, input => { calls.push(String(input)); return new Response('{}', { status: 503 }); });
  const response = await worker.fetch(request(payload(), { 'CF-Connecting-IP': 'failure' }), { ...env, OPENROUTER_KEYS: 'not-reviewed', OPENROUTER_MODEL: 'test-model' });
  assert.equal(response.status, 503);
  assert.equal(calls.length, 1);
  assert.ok(calls.every(url => !url.includes('openrouter')));
});

test('31st per-isolate request is limited and has Retry-After', async t => {
  const count = mockProvider(t, () => new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Answer' }] } }] }), { status: 200 }));
  for (let i = 0; i < 30; i += 1) assert.equal((await worker.fetch(request(payload(), { 'CF-Connecting-IP': 'rate-test' }), env)).status, 200);
  const response = await worker.fetch(request(payload(), { 'CF-Connecting-IP': 'rate-test' }), env);
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get('Retry-After')) > 0);
  assert.equal(count(), 30);
});

test('expired rate buckets are removed and a returning address gets a fresh window', () => {
  const rate = createRateLimiter();
  rate.consume('gone', 100);
  for (let i = 0; i < 30; i += 1) rate.consume('returning', 100);
  assert.equal(rate.consume('returning', 100).allowed, false);
  assert.equal(rate.size, 2);
  assert.equal(rate.consume('returning', 3_600_101).allowed, true);
  assert.equal(rate.size, 1);
});

test('an already cancelled browser request makes zero provider requests', async t => {
  const count = mockProvider(t, () => { throw new Error('No network permitted'); });
  const controller = new AbortController();
  const req = new Request(request(payload(), { 'CF-Connecting-IP': 'aborted' }), { signal: controller.signal });
  controller.abort();
  assert.equal((await worker.fetch(req, env)).status, 499);
  assert.equal(count(), 0);
});

test('cancelling during a provider request never falls back to another reviewed provider', async t => {
  for (const failure of ['status', 'exception']) {
    const controller = new AbortController();
    let calls = 0;
    const mock = t.mock.method(globalThis, 'fetch', async () => {
      calls += 1;
      controller.abort();
      if (failure === 'exception') throw new DOMException('Cancelled', 'AbortError');
      return new Response('{}', { status: 503 });
    });
    const req = new Request(request(payload(), { 'CF-Connecting-IP': `cancel-during-${failure}` }), { signal: controller.signal });
    const response = await worker.fetch(req, { ...env, REVIEWED_PROVIDERS: 'gemini,openrouter', OPENROUTER_KEYS: 'reviewed-test-key', OPENROUTER_MODEL: 'reviewed-test-model', OPENROUTER_REVIEWED_PROVIDERS: 'reviewed-host' });
    assert.equal(response.status, 499);
    assert.equal(calls, 1);
    mock.mock.restore();
  }
});

test('OpenRouter fails closed without a reviewed model-host allowlist and explicit model', async t => {
  const count = mockProvider(t, () => { throw new Error('No network permitted'); });
  const openRouter = { ...env, REVIEWED_PROVIDERS: 'openrouter', OPENROUTER_KEYS: 'mock-key', OPENROUTER_MODEL: 'reviewed-model' };
  for (const config of [
    {}, { OPENROUTER_REVIEWED_PROVIDERS: ' , ' }, { OPENROUTER_REVIEWED_PROVIDERS: '*' },
    { OPENROUTER_REVIEWED_PROVIDERS: 'reviewed-host', OPENROUTER_MODEL: ' ' },
  ]) {
    const response = await worker.fetch(request(), { ...openRouter, ...config });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'AI_DISABLED');
  }
  // Configuring both gateways must not leak to Gemini when OpenRouter review is incomplete.
  assert.equal((await worker.fetch(request(), { ...openRouter, REVIEWED_PROVIDERS: 'gemini,openrouter' })).status, 503);
  assert.equal(count(), 0);
});

test('OpenRouter requests pin reviewed model hosts, forbid fallback, and deny data collection', async t => {
  const count = mockProvider(t, (input, init) => {
    assert.equal(String(input), 'https://openrouter.ai/api/v1/chat/completions');
    const body = JSON.parse(init!.body as string);
    assert.equal(body.model, 'reviewed-model');
    assert.deepEqual(body.provider, { only: ['reviewed-host-a', 'reviewed-host-b'], allow_fallbacks: false, data_collection: 'deny' });
    return new Response(JSON.stringify({ choices: [{ message: { content: 'Pinned provider answer' } }] }), { status: 200 });
  });
  const response = await worker.fetch(request(payload(), { 'CF-Connecting-IP': 'pinned-openrouter' }), {
    ...env, REVIEWED_PROVIDERS: 'openrouter', OPENROUTER_KEYS: 'mock-key', OPENROUTER_MODEL: ' reviewed-model ',
    OPENROUTER_REVIEWED_PROVIDERS: ' reviewed-host-a,reviewed-host-b,reviewed-host-a ',
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { text: 'Pinned provider answer' });
  assert.equal(count(), 1);
});
