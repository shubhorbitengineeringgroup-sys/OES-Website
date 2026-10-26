import { test } from 'node:test';
import assert from 'node:assert/strict';
import { submitLead } from '../src/lib/leadSubmission.ts';
import { MARKETING_NOTICE_VERSION, PRIVACY_NOTICE_VERSION } from '../src/data/legalContent.mjs';

function lead() {
  const data = new FormData();
  data.set('name', '  Business Visitor  ');
  data.set('email', ' visitor@example.com ');
  data.set('message', 'Please discuss a water automation project.');
  data.set('serviceConsent', 'true');
  return data;
}

test('missing or false required consent sends no personal information', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 200 }));
  for (const value of [null, 'false', 'on']) {
    const data = lead();
    if (value === null) data.delete('serviceConsent');
    else data.set('serviceConsent', value);
    await assert.rejects(submitLead(data, 'contact', '/contact'), /18 or older and consent/);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('accepted inquiry records separate choices and only necessary metadata', async (t) => {
  let sent: FormData | undefined;
  const fetchMock = t.mock.method(globalThis, 'fetch', async (url, init) => {
    assert.equal(url, 'https://formspree.io/f/xeeoyary');
    assert.equal(init?.method, 'POST');
    assert.equal(new Headers(init?.headers).get('Accept'), 'application/json');
    sent = init?.body as FormData;
    return new Response(null, { status: 200 });
  });
  const data = lead();
  data.set('unrelatedData', 'do not collect this');
  await submitLead(data, 'clients', '/clients?private-query=omit#fragment');
  assert.equal(fetchMock.mock.callCount(), 1);
  assert.equal(sent?.get('fullName'), 'Business Visitor');
  assert.equal(sent?.get('email'), 'visitor@example.com');
  assert.equal(sent?.get('name'), null);
  assert.equal(sent?.get('unrelatedData'), null);
  assert.equal(sent?.get('formType'), 'clients');
  assert.equal(sent?.get('collectionPurpose'), 'inquiry-response');
  assert.equal(sent?.get('sourcePath'), '/clients');
  assert.equal(sent?.get('serviceConsent'), 'true');
  assert.equal(sent?.get('adultDeclaration'), 'true');
  assert.equal(sent?.get('marketingEmailOptIn'), 'false');
  assert.equal(sent?.get('privacyNoticeVersion'), PRIVACY_NOTICE_VERSION);
  assert.equal(sent?.get('marketingNoticeVersion'), MARKETING_NOTICE_VERSION);
  assert.ok(!Number.isNaN(Date.parse(String(sent?.get('serviceConsentAt')))));
});

test('brochure and quote work without a phone/company or marketing permission', async (t) => {
  const received: FormData[] = [];
  t.mock.method(globalThis, 'fetch', async (_url, init) => {
    received.push(init?.body as FormData);
    return new Response(null, { status: 202 });
  });
  for (const type of ['brochure', 'quote'] as const) {
    const data = lead();
    data.delete('message');
    await submitLead(data, type, '/products');
  }
  assert.deepEqual(received.map(data => data.get('collectionPurpose')), ['brochure-request', 'quote-preparation']);
  for (const body of received) {
    assert.equal(body.get('phone'), null);
    assert.equal(body.get('company'), null);
    assert.equal(body.get('marketingEmailOptIn'), 'false');
  }
});

test('affirmative email marketing choice is recorded independently', async (t) => {
  let sent: FormData | undefined;
  t.mock.method(globalThis, 'fetch', async (_url, init) => {
    sent = init?.body as FormData;
    return new Response(null, { status: 200 });
  });
  const data = lead();
  data.set('marketingEmailOptIn', 'true');
  await submitLead(data, 'contact', '/contact');
  assert.equal(sent?.get('marketingEmailOptIn'), 'true');
  assert.equal(sent?.get('serviceConsent'), 'true');
});

test('invalid contact details are rejected before any network request', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 200 }));
  const invalidName = lead();
  invalidName.set('name', ' ');
  const invalidEmail = lead();
  invalidEmail.set('email', 'not-an-email');
  const invalidMessage = lead();
  invalidMessage.set('message', ' ');
  for (const data of [invalidName, invalidEmail, invalidMessage]) {
    await assert.rejects(submitLead(data, 'contact', '/contact'));
  }
  assert.equal(fetchMock.mock.callCount(), 0);
});

test('provider errors reject submission and preserve the original inputs', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 422 }));
  const data = lead();
  const originalEntries = [...data.entries()];
  await assert.rejects(submitLead(data, 'contact', '/contact'), /not accepted/);
  assert.deepEqual([...data.entries()], originalEntries);
});

test('rate limits and network failures remain errors, never accepted requests', async (t) => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 429 }));
  await assert.rejects(submitLead(lead(), 'contact', '/contact'), /temporarily busy/);
  fetchMock.mock.mockImplementation(async () => { throw new TypeError('Network failure'); });
  await assert.rejects(submitLead(lead(), 'contact', '/contact'), /check your connection/);
});

test('a stalled request is aborted without claiming delivery', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(globalThis, 'fetch', async (_url, init) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true });
  }));
  const request = submitLead(lead(), 'contact', '/contact');
  const rejected = assert.rejects(request, /could not confirm delivery/);
  t.mock.timers.tick(30_000);
  await rejected;
});
