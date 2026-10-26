# Orbit Engineering Solutions website

React 18, TypeScript, Vite and Tailwind corporate catalogue/enquiry website for
Orbit Engineering Solutions, Bhopal. The operator is Vijay Kumar Tiwari, trading
as Orbit Engineering Solutions (proprietorship). This site has no checkout.

## Development and checks

Use Node 22.18+ (CI Node 22) or Node 24 and install dependencies with npm ci.

```sh
npm run dev
npm test
npm run typecheck
npm run typecheck:worker
npm run build
npm run test:built
```

The build generates static direct-route HTML and a sitemap in dist/ for GitHub
Pages. public/CNAME retains orbitengineerings.com. Pushing main triggers the
existing deployment workflow, so complete the release review first.

## Privacy and business content

- Shared policies, operator details and notice versions: src/data/legalContent.mjs.
- Four legal pages use identical content in React and generated HTML.
- Contact, client, quotation and brochure forms use Formspree with explicit
  purpose consent, separate optional email marketing and versioned receipts.
- Vijay Kumar Tiwari (Proprietor) is the Grievance Officer. See
  [privacy operations and release checks](docs/privacy-operations.md).
- AI is disabled pending provider review; local FAQs and direct contact work.
  Browser and Worker independently enforce readiness and consent. Deploy the
  Worker separately; never enable an undisclosed or unreviewed fallback.
- Maps load on a click. Fonts are local with OFL licences.
- scripts/build-brochures.py (Python + reportlab) generates three application
  brochures and updates legacy corporate PDF paths together. Previous versions
  remain in Git. .gitattributes protects PDF byte offsets.

## Verification and delivery limits

Tests mock external requests. Built-output checks verify shared legal text,
metadata, sitemap, local assets and removed claims. Browser checks also use
mocks; never send fictitious leads or prompts to production services.

For manual browser checks, run `node scripts/privacy-test-server.mjs` and open
`http://localhost:5174/tests/browser-harness.html`. This isolated fixture mocks
all fetches and changes AI readiness only in memory; production flags stay off.

Account ownership/settings, GST address, image/logo rights, certification
records, operational retention and final legal wording need the recorded
business review before publication. Code cannot complete those external checks.
Keep credentials and customer documents out of the repository.
