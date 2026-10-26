# Privacy operations and release checklist

Owner and Grievance Officer: Vijay Kumar Tiwari (Proprietor),
+91 70241 28029, info@orbitengineerings.com. He is the final authority within the
business for grievances; sales employees may route requests to him.

This document is an operating procedure, not evidence that the external account
checks below have been completed. Code implementation does not appoint inbox
access, delete mailbox copies, verify certificates or activate provider contracts.

## Release status: external checks outstanding

Do not publish this change until a responsible business owner has recorded these
checks as complete. Pushing `main` triggers the existing GitHub Pages workflow;
the Cloudflare Worker has a separate deployment. No hosting migration is needed.

| Check | Required evidence | Current status |
| --- | --- | --- |
| Operator and address | Match Vijay Kumar Tiwari / Orbit Engineering Solutions and GF E-45 Pride City address to current GST registration; publish GSTIN only if verified | Pending: public listing corroborates address, certificate not inspected |
| Grievance handling | Confirm the proprietor monitors info@orbitengineerings.com; confirm telephone and administrative backup cover | Vijay Kumar Tiwari selected by user; inbox/access operation pending |
| Formspree ownership and delivery | Confirm account owner, recipients, dashboard access, custom consent fields, server receipt timestamps, retention/deletion controls, processor terms and transfers | Pending account review; tests mock network |
| Email records | Restrict access, MFA where available, retention/export locations, recovery/incident contact | Pending account review |
| Evidence for public claims | Original certificate holder/scope/locations/body/validity and model-specific warranties; substantiation for any client/partner relationship or numerical claim restored later | Unsupported claims removed/suppressed; original evidence not supplied |
| Images and logos | Record owner/licence or applicable permitted use for each asset. Remove/relicense anything without a defensible basis. Government emblem must not imply affiliation | Asset register review pending |
| Legal wording | Indian legal adviser/business owner review of final wording, retention exceptions and current phased-law applicability | Pending |
| Marketing operation | Verified sender, valid consent list, unsubscribe processing, suppression list and access restrictions | Capture only; no campaigns implemented or sent |
| AI providers | Complete the AI checklist below before enabling any external AI | Disabled by default |

Keep evidence in a restricted business records system, not this public source
repository. Do not put certificates containing unnecessary identifiers, identity
documents, API keys or customer contracts in Git.

## Enquiry and consent records

All four live lead forms submit through Formspree. A receipt includes `fullName`,
`email`, optional relevant contact/project fields, `formType`, `collectionPurpose`,
`sourcePath` (no query string/fragment), `privacyNoticeVersion`, `serviceConsent`,
`adultDeclaration`, `serviceConsentAt`, `marketingEmailOptIn` and
`marketingNoticeVersion`. Visitor time is contextual; provider receipt time is the
stronger evidence of when a submission arrived. Confirm all these fields survive
dashboard storage, exports and email notification templates before release.

The notice text and version live with the website. Preserve old wording in Git
when changing a version. Never turn an omitted or false marketing choice into a
positive one. Existing submissions without evidence remain **no marketing
permission**; this release does not migrate them into a campaign list.

Respond to the requested enquiry using the stated purpose. Promotional email is
allowed only for a valid, current email opt-in, after sender setup is reviewed.
This permission does not cover promotional calls, WhatsApp or SMS. Every future
marketing email must identify the business and provide a working reply-to and
unsubscribe instruction. Stop marketing promptly when withdrawal is received;
keep a restricted minimal suppression entry so it is not accidentally restarted.
Do not treat automated delivery, opens or a campaign email as a meaningful new
business interaction that resets retention.

## Privacy requests and grievance register

1. Vijay Kumar Tiwari monitors the published inbox on business days. Log receipt, request ID,
   requested action, relevant form/date, assigned owner and response deadline.
2. Acknowledge the request and verify identity proportionately, normally by
   replying to the address already associated with the enquiry. Do not request
   Aadhaar, PAN or other identity-document scans as a routine step.
3. Locate relevant Formspree, mailbox, export, recruitment and marketing records.
   For AI/provider records, identify the reviewed provider, dates and available
   request information, and coordinate the applicable provider process.
4. Apply correction, access, withdrawal or deletion as appropriate. Explain
   retained categories, lawful reason, access restrictions and expected review
   date. Local chat clearing does not prove third-party deletion.
5. Respond to privacy grievances within **one month of receipt**. Employees
   receiving a grievance must route it to Vijay Kumar Tiwari promptly; he handles
   the review and final business decision within that target.
6. Record action, date, response, any legal hold and next review. Store the
   register securely; do not include excessive copies of the underlying data.

Suggested register columns: request ID, received at, verified by/method,
category, record locations, assigned person, deadline, action, exception/hold,
response date, next review. Restrict this register to authorised personnel.

## Retention review

- Review closed/unconverted leads and associated marketing permissions at
  **12 months after the last meaningful interaction**. Record the date/source
  of any ongoing project or renewed permission. Remove expired records from
  Formspree, inboxes, downloads/exports and marketing lists.
- Review unsuccessful recruitment applications 12 months after the recruitment
  closes; restrict access to hiring personnel. Keep email CV processing within
  recruitment; do not enable the dormant upload form without a separate review.
- Apply documented statutory, contractual, security and legal-hold exceptions.
  Restrict the retained material to that purpose and record a next review date.
  Keep suppression evidence minimal; do not reuse retained records for marketing.
- Deletion is an operational process, not a browser timer. Check provider backup
  deletion limitations; do not promise complete immediate erasure.
- Reassess the schedule before the May 2027 DPDP tranche. Final Rules 6 and 8(3)
  introduce one-year security/data/traffic/log retention requirements; this must
  be reconciled with processor arrangements and purpose-limited deletion. Do not
  delete required records merely because a lead has closed.

## External AI activation

Default: browser `AI_PROVIDER_REVIEWED = false`, `AI_PROVIDER_DISCLOSURE = ""`, Worker
`AI_PROVIDER_REVIEWED = "false"`, `REVIEWED_PROVIDERS = ""`. The assistant serves
local FAQs/direct contact. Consent alone does not override these controls.

Before activation, record:

1. Account/controller ownership, provider terms/processor role, locations,
   retention, training/human-review settings, security logging, deletion process
   and applicable minimum retention. Gemini unpaid service terms can allow
   product improvement/human review and prohibit submitting personal/confidential
   data; do not assume a free key provides private processing.
2. For OpenRouter, identify each permitted model/provider, not just OpenRouter.
   Verify routing/privacy restrictions and disable unreviewed fallbacks.
3. Align the privacy policy and first-send notice with the exact enabled chain.
   A change of provider or materially different handling needs a notice/version
   review and renewed permission.
4. Configure only reviewed keys as Worker secrets. Set `REVIEWED_PROVIDERS` to
   the reviewed identifiers (`gemini`, `openrouter` as applicable). OpenRouter
   additionally requires `OPENROUTER_REVIEWED_PROVIDERS`, an explicit list of
   reviewed underlying providers, and a reviewed model. Requests pin that list,
   disable routing fallbacks and deny provider data collection. Populate the
   shared `AI_PROVIDER_DISCLOSURE` with the exact chain shown to the visitor, and enable
   the server and browser flags together only after the review. Never commit
   secrets or log message bodies, prompts, authorisation headers or API keys.
5. Test refusal, Stop AI, in-flight cancellation, provider error and fallback
   behaviour using mocks/staging. Keep human contact available. Origin filtering
   is not authentication; the current per-isolate 30/hour limiter is best-effort
   abuse control, not a global quota.

The website stores history/AI permission in page memory, and the greeting flag
in sessionStorage. Provider/infrastructure retention is separate. Check
Cloudflare request/observability settings; do not claim “chats are never stored”.

## Incident procedure

Employees notify Vijay Kumar Tiwari promptly when a suspected incident is received.
Preserve relevant evidence, limit access, revoke compromised credentials and
coordinate with providers. Assess affected information/people and legal
notification duties with qualified advice, including applicable CERT-In and
phased DPDP requirements. Record facts, decisions, notifications, remediation
and follow-up. Avoid copying full personal-data payloads into debugging logs.

## Verification and rollout

Implementation validation on 26 October 2026: 19 mocked form/Worker tests and
6 built-output checks passed; application and Worker typechecks passed; the
production build generated 42 routes. Browser checks used the isolated fixture:
missing consent made zero requests, rejected/network submissions preserved
inputs, marketing choices were recorded independently, pending brochure requests
did not download, and accepted requests did. AI remained local before consent;
Stop AI aborted a pending request and prevented subsequent external requests.
Map load/hide controls and mobile (390px) layout/keyboard order were checked.
All three revised brochures were rendered and visually inspected after the
Grievance Officer change to Vijay Kumar Tiwari. No live leads, AI requests,
campaigns or deployments were made during these checks.

Run `npm test`, `npm run typecheck`, `npm run typecheck:worker`, `npm run build`
and then `npm run test:built`.
Use intercepted/mocked responses for browser tests; never send fictitious leads
or chat prompts to production services. Check direct legal routes, footer,
keyboard/mobile controls, consent rejection, preserved failure inputs, accepted
brochure download, local fonts, optional maps and zero AI requests by default.

The canonical brochures and legacy downloadable URLs are updated together;
source generation is reproducible with the brochure script. Keep a record of
any further model-specific specification or image-licence evidence before adding
detailed marketing material back.

After all release checks pass, use the existing Pages workflow for the frontend
and the Worker deployment for its server changes. Deploy the fail-closed Worker
before enabling the corresponding frontend. Previously cached clients without
the new consent fields must fail safely and offer direct contact. Verify the
deployed versions; retain the previous revision for rollback. An emergency AI
rollback must disable both AI flags, never restore a consent-bypassing endpoint.

## Primary references reviewed 26 October 2026

- DPDP commencement: https://www.meity.gov.in/static/uploads/2025/11/c56ceae6c383460ca69577428d36828b.pdf
- Final DPDP Rules: https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf
- SPDI Rules 2011: https://www.meity.gov.in/sites/upload_files/dit/files/GSR313E_10511%281%29.pdf
- Gemini terms: https://ai.google.dev/gemini-api/terms
- Formspree privacy: https://formspree.io/legal/privacy-policy/
- ISO name/logo guidance: https://www.iso.org/iso-name-and-logo.html

Core DPDP commencement is phased; these references do not establish that every
obligation already applies or that a website can guarantee freedom from legal
risk. Recheck applicable requirements before release and when processing changes.
