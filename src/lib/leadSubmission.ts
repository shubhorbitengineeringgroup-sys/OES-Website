import { MARKETING_NOTICE_VERSION, PRIVACY_NOTICE_VERSION } from '../data/legalContent.mjs';

export type LeadFormType = 'contact' | 'clients' | 'quote' | 'brochure';

export const LEAD_PURPOSES: Record<LeadFormType, { code: string; consent: string; subject: string }> = {
  contact: { code: 'inquiry-response', consent: 'respond to my business inquiry', subject: 'Website business inquiry' },
  clients: { code: 'inquiry-response', consent: 'respond to my business inquiry', subject: 'Clients page business inquiry' },
  quote: { code: 'quote-preparation', consent: 'prepare and respond to my quotation request', subject: 'Website quotation request' },
  brochure: { code: 'brochure-request', consent: 'provide the brochure and contact me about this request', subject: 'Brochure request' },
};

const FORM_ENDPOINT = 'https://formspree.io/f/xeeoyary';

/** Submit only the fields used by the website, with explicit consent choices. */
export async function submitLead(data: FormData, formType: LeadFormType, sourcePath: string): Promise<void> {
  if (data.get('serviceConsent') !== 'true') {
    throw new Error('Please confirm that you are 18 or older and consent to the use of your details for this request.');
  }

  const fullName = String(data.get('fullName') ?? data.get('name') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  if (!fullName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter your name and a valid email address.');
  }
  if ((formType === 'contact' || formType === 'clients') && !String(data.get('message') ?? '').trim()) {
    throw new Error('Please enter your message.');
  }

  const body = new FormData();
  body.set('fullName', fullName);
  body.set('email', email);
  for (const field of ['phone', 'company', 'message', 'productName']) {
    const value = data.get(field);
    if (typeof value === 'string' && value.trim()) body.set(field, value.trim());
  }
  body.set('_subject', LEAD_PURPOSES[formType].subject);
  body.set('formType', formType);
  body.set('collectionPurpose', LEAD_PURPOSES[formType].code);
  body.set('sourcePath', sourcePath.split(/[?#]/, 1)[0]);
  body.set('privacyNoticeVersion', PRIVACY_NOTICE_VERSION);
  body.set('serviceConsent', 'true');
  body.set('adultDeclaration', 'true');
  body.set('serviceConsentAt', new Date().toISOString());
  body.set('marketingEmailOptIn', data.get('marketingEmailOptIn') === 'true' ? 'true' : 'false');
  body.set('marketingNoticeVersion', MARKETING_NOTICE_VERSION);

  let response: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    response = await fetch(FORM_ENDPOINT, { method: 'POST', body, headers: { Accept: 'application/json' }, signal: controller.signal });
  } catch {
    throw new Error('We could not confirm delivery. Please check your connection or contact us by email; your details are still here.');
  } finally {
    clearTimeout(timeout);
  }
  if (!response.ok) {
    throw new Error(response.status === 429
      ? 'The form is temporarily busy. Please try again later or contact us by email.'
      : 'Your request was not accepted. Please try again or contact us by email; your details are still here.');
  }
}
