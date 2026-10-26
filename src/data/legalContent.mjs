// Shared by React, generated HTML and consent receipts. Change the versions when
// changing the corresponding notice, and retain previous wording in Git.
export const PRIVACY_NOTICE_VERSION = '2026-10-26';
export const MARKETING_NOTICE_VERSION = '2026-10-26';
export const AI_NOTICE_VERSION = '2026-10-26';
// Enable only after the release checklist's provider review is complete. The
// Worker independently requires its own reviewed-provider configuration.
export const AI_PROVIDER_REVIEWED = false;
// Public, human-readable description of the exact reviewed model/provider chain.
// Empty by default; a boolean alone must not enable an undisclosed processor.
export const AI_PROVIDER_DISCLOSURE = '';

export const business = {
  tradeName: 'Orbit Engineering Solutions',
  operator: 'Vijay Kumar Tiwari, trading as Orbit Engineering Solutions',
  entityType: 'Proprietorship',
  address: 'GF, E-45, Pride City, Katara Hills, Bhopal, Madhya Pradesh 462043, India',
  grievanceName: 'Vijay Kumar Tiwari',
  grievanceEmail: 'info@orbitengineerings.com',
  grievancePhone: '+91 70241 28029',
  grievancePhoneHref: '+917024128029',
  phone: '+91 70241 28029',
};

export const legalPages = [
  {
    path: '/privacy-policy',
    title: 'Privacy Policy',
    description: 'How Orbit Engineering Solutions handles enquiries, brochure requests, recruitment emails, optional marketing and website data.',
    sections: [
      { heading: 'Who handles your information', paragraphs: [
        `${business.operator} operates this website as a proprietorship based at ${business.address}. This policy applies to this website and information you send us through its listed business contact channels.`,
        `For privacy questions or complaints, contact ${business.grievanceName}, Grievance Officer and Proprietor, at ${business.grievanceEmail} or ${business.grievancePhone}.`,
      ] },
      { heading: 'Information and purposes', paragraphs: [
        'We collect the details you choose to submit to respond to your particular request. Please provide only information relevant to your business enquiry. Do not send passwords, payment-card details, Aadhaar or other identity documents, health information, confidential plant credentials or personal information about other people without authority.',
      ], items: [
        'Contact and client enquiries: name, email, optional telephone number and your message, to answer the enquiry and follow up on the same project or service.',
        'Quotation requests: name, email, optional telephone number, selected product and any message, to discuss requirements and prepare a quotation.',
        'Brochure requests: name and email, with optional telephone and company, to provide the brochure and follow up on that specific interest. Email marketing is a separate choice.',
        'Recruitment: CV, contact details and application information that you email to our careers address, for recruitment and candidate correspondence. There is no active CV-upload form on this website.',
        'Consent records: the form type, purpose, page pathname, notice version, consent choices and submission time, to document your request and choices. Formspree also records receipt of the submission.',
        'Technical information: hosting and form providers may process IP addresses, browser/request information and security logs to deliver and protect their services.',
      ] },
      { heading: 'Optional email marketing', paragraphs: [
        'The email-marketing checkbox is optional and starts unchecked. Declining it does not prevent an enquiry, quotation request or brochure download. If you opt in, we may email product, service and company updates. That permission does not cover promotional telephone calls, SMS or WhatsApp campaigns.',
        `Withdraw marketing permission at any time by replying “unsubscribe” to a marketing email or emailing ${business.grievanceEmail} with the subject “Unsubscribe”. We stop promotional use after receiving and processing the request. We may retain a restricted suppression record so that you are not added again. Existing enquiries are not treated as marketing permission.`,
      ] },
      { heading: 'Service providers and transfers', paragraphs: [
        'Forms are sent over HTTPS to Formspree, which receives the submission and delivers it to our business inbox. Formspree processes information using infrastructure in the United States and potentially other countries. Copies may remain in its submission dashboard, our email service and authorised business records. Our public website is hosted through GitHub Pages; GitHub processes technical request information under its own privacy statement.',
        'Google Maps is loaded only when you select “Load Google Map”. Loading it connects your browser to Google, which may process technical information and use its own cookies. Links to WhatsApp, IndiaMART, social platforms and other external services open those services; their own privacy terms apply. A WhatsApp callback opens a draft containing the details you entered; you must send it yourself.',
        'We do not sell enquiry details. We share relevant information with service providers to operate the website and handle your request, and where required by applicable law or to establish or defend legal rights. Provider locations and legal safeguards are reviewed before introducing a new processing service.',
      ] },
      { heading: 'AI assistance and your choice', paragraphs: [
        'The assistant can display local FAQs and business contact information without sending your question to an AI provider. External AI chat is unavailable until our provider review is complete. When enabled, an in-chat notice will identify the reviewed providers and require an adult-user confirmation and specific permission before the first external message.',
        'With that permission, your message and a limited recent chat history pass through our Cloudflare Worker to the reviewed AI provider. The supported integrations are Google Gemini and OpenRouter; OpenRouter can route to a model provider. Only providers named in the active notice and approved in our configuration may receive a chat. Provider retention, security and model-training settings must be checked before activation; we do not promise that providers never store messages.',
        'Use the human-contact option if you prefer. Do not enter sensitive, personal or confidential information in the assistant. “Stop AI chat” stops further requests and clears the chat held in this page; it does not delete information already processed by a provider. Contact us for help with a provider-related privacy request.',
      ] },
      { heading: 'Storage, retention and security', paragraphs: [
        'Chat history and AI permission are held in page memory. The orbi-greeted sessionStorage flag remembers whether the greeting was shown in the current tab session. Fonts are served from this website. We do not currently install analytics or advertising pixels. See Cookies & Storage for details.',
        'Closed or unconverted enquiries and associated marketing permissions are reviewed for deletion 12 months after the last meaningful interaction. Unsuccessful recruitment applications are reviewed 12 months after the recruitment process closes. This is an operational review covering Formspree, inboxes, exports and marketing lists; it is not an automatic website deletion timer.',
        'Contracts, accounts, consent evidence, security records, suppression records and information subject to a legal hold may need restricted retention for applicable legal or security purposes. We stop unrelated business or marketing use while retaining such records. Applicable statutory retention takes precedence, including requirements as they commence under the phased data-protection framework.',
        'We use HTTPS for website forms and restrict business-record access to authorised staff and service providers. No system can guarantee complete security. If you suspect a data incident, contact the privacy/grievance contact promptly and avoid including further sensitive details.',
      ] },
      { heading: 'Your requests, children and changes', paragraphs: [
        `You can request access to information you supplied, correction, withdrawal of consent or deletion by contacting ${business.grievanceEmail}. We may ask for proportionate information to verify that the request is yours; do not send an identity-document scan unless a lawful, necessary method has been agreed. We explain any legal reason that prevents full deletion. Withdrawal does not undo earlier processing and may prevent us from completing the related request.`,
        'This website and its enquiry/AI facilities are intended for adult business representatives aged 18 or over. We do not offer services directed at children or seek children’s personal data. Contact us if a child’s information was supplied so we can assess and address it under applicable law.',
        'We aim to respond to privacy grievances within one month of receipt. This contact process does not limit rights or remedies available under applicable law. We update this policy when practices change and publish a new version/date; materially new purposes require the appropriate notice and permission.',
      ] },
    ],
  },
  {
    path: '/terms',
    title: 'Website Terms',
    description: 'Terms for using Orbit Engineering Solutions’ B2B catalogue, requesting quotations and accessing technical information.',
    sections: [
      { heading: 'Website operator and purpose', paragraphs: [
        `${business.operator}, a proprietorship at ${business.address}, provides this website as a business catalogue and enquiry facility for customers in India. Contact ${business.grievanceEmail} for website questions.`,
        'The website does not provide an online checkout or accept payments. Submitting an enquiry, requesting a brochure or discussing a product in chat does not by itself conclude a sale, reserve stock or create a supply contract.',
      ] },
      { heading: 'Quotations, products and commercial terms', paragraphs: [
        'Product descriptions, images, specifications and application examples are general information. Confirm the manufacturer, model, configuration, suitability, current specifications, certifications and availability with our team before purchase or installation.',
        'Pricing, taxes, delivery, installation, acceptance, warranty, cancellation, returns, refunds and other commercial terms are specified in the quotation and contract accepted by the parties, subject to applicable law. The website does not promise a universal warranty duration or refund window. Manufacturer warranties apply only as stated in the applicable written terms.',
      ] },
      { heading: 'Technical and AI information', paragraphs: [
        'Website material and assistant responses are introductory information, not a site-specific engineering design, safety approval, regulatory approval or performance guarantee. Obtain a qualified engineering assessment and applicable approvals for your installation.',
        'AI responses can contain mistakes. Confirm specifications, prices, scope, delivery dates and commitments with an authorised member of our team. An AI response cannot amend a quotation or contract.',
      ] },
      { heading: 'Acceptable use and third-party material', paragraphs: [
        'Use the website lawfully. Do not submit malicious code, attempt unauthorised access, misuse forms or send confidential or personal information without the necessary authority.',
        'Product names and third-party trademarks identify their respective owners. A reference or link does not by itself imply endorsement, affiliation, authorised dealership or certification. Ask us to confirm the specific relationship and supporting documentation relevant to your proposed order.',
        'Our original website content remains protected by applicable intellectual-property law. Third-party material remains subject to its owner’s rights and licence conditions. Contact us about an ownership concern or correction.',
      ] },
      { heading: 'External services, responsibility and applicable law', paragraphs: [
        'External websites and services have their own terms. We do not control their availability or content. We take reasonable steps to correct reported website errors but do not guarantee uninterrupted access or the accuracy of every general description.',
        'Nothing in these terms excludes a non-excludable right, statutory remedy or liability under applicable law. Separate signed commercial terms govern the relevant transaction. Indian law applies to website use, with disputes determined by courts having lawful jurisdiction.',
        'These terms may be updated for future website use. The displayed version identifies the current text. Privacy requests and complaints can be made through the Privacy/Grievance Contact page.',
      ] },
    ],
  },
  {
    path: '/cookies',
    title: 'Cookies & Storage',
    description: 'Actual browser storage and optional third-party connections used by Orbit Engineering Solutions.',
    sections: [
      { heading: 'What this website uses', paragraphs: [
        'We do not currently install advertising pixels or analytics tools. We do not use a general “accept all cookies” popup because it would not describe the current site behaviour. Hosting and third-party services may still process technical request information.',
      ], items: [
        'orbi-greeted: a first-party sessionStorage flag recording that the assistant greeting was shown. It lasts for the browser tab session, subject to browser session restoration. It is not a tracking cookie.',
        'Chat messages and AI permission: held in page memory and cleared when you stop AI chat or leave/reload the page. We do not save the transcript to browser localStorage.',
        'Fonts: loaded from this website rather than Google Fonts servers.',
      ] },
      { heading: 'Optional connections', paragraphs: [
        'Google Maps iframes are not loaded until you choose “Load Google Map”. That click connects to Google, which may process IP/browser information and set or read its cookies. You may instead use the displayed postal address without loading a map. “Hide map” removes the iframe but cannot undo information already sent or clear Google’s cookies.',
        'A submitted form connects to Formspree. External AI connects to our Cloudflare Worker and reviewed providers only after the stated checks and your choice. WhatsApp and social links connect to those services when opened. See the Privacy Policy for the data and purposes involved.',
      ] },
      { heading: 'Your controls', paragraphs: [
        'You can clear site data using your browser settings and use the website without loading maps or external AI. You can stop AI chat from the assistant. To clear or manage third-party cookies, use your browser and the relevant provider’s settings.',
        `Contact ${business.grievanceEmail} about these practices. If we introduce analytics, advertising or other optional processing, this notice and the relevant controls must be updated before activation.`,
      ] },
    ],
  },
  {
    path: '/privacy-grievance',
    title: 'Privacy / Grievance Contact',
    description: 'Contact Vijay Kumar Tiwari, Grievance Officer and Proprietor, for privacy requests, marketing withdrawal, corrections and website complaints.',
    sections: [
      { heading: 'Your designated contact', paragraphs: [
        `${business.grievanceName} — Grievance Officer and Proprietor of ${business.tradeName}.`,
        `Email: ${business.grievanceEmail}. Telephone: ${business.grievancePhone}. Postal address: ${business.address}.`,
      ] },
      { heading: 'How to make a request', paragraphs: [
        'Email the contact above with the subject “Privacy request”, “Unsubscribe” or “Website complaint”, as appropriate. Describe the request and, if relevant, the email address and approximate date used for your enquiry. Please do not include passwords, payment details or identity-document scans.',
        'You may ask about access, correction, consent withdrawal or deletion, report a suspected incident, raise an intellectual-property/content concern or complain about how we handled your information. We may verify your relationship to the information using proportionate steps.',
        'For email-marketing withdrawal you can also reply “unsubscribe” to a marketing email. Marketing permission is optional and does not affect your ability to make a business enquiry.',
      ] },
      { heading: 'What happens next', paragraphs: [
        'We aim to respond to privacy grievances within one month of receipt. If additional information is required, we explain what is needed. We record the request, responsible person, relevant checks, action taken and response.',
        'Withdrawal stops the corresponding future use after processing. Some information may need restricted retention for a legal obligation, security purpose, suppression record or legal hold. We explain applicable limits rather than promise immediate deletion of every copy or provider record.',
        'Vijay Kumar Tiwari, as proprietor, is the final authority within the business for these grievances. If you need further review, reply with the outstanding concern. This process does not remove any remedy available under applicable law.',
      ] },
    ],
  },
];
