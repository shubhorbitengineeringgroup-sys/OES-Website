import { Link } from 'react-router-dom';
import { Mail, Phone, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import { business, legalPages, PRIVACY_NOTICE_VERSION } from '../data/legalContent.mjs';

export default function LegalPage({ path }: { path: string }) {
  const page = legalPages.find((entry) => entry.path === path);
  if (!page) return null;

  return (
    <article className="bg-slate-50 pb-16">
      <SEO title={`${page.title} | Orbit Engineering Solutions`} description={page.description} canonicalPath={page.path} />
      <header className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sky-300 text-sm font-semibold mb-4"><ShieldCheck className="w-5 h-5" aria-hidden="true" />Orbit Engineering Solutions</div>
          <h1 className="text-3xl sm:text-5xl font-bold">{page.title}</h1>
          <p className="text-slate-300 mt-5 max-w-2xl leading-relaxed">{page.description}</p>
          <p className="text-sm text-slate-400 mt-5">Updated 26 October 2026 · Version {PRIVACY_NOTICE_VERSION}</p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <nav aria-label="Legal pages" className="flex flex-wrap gap-2 py-6">
          {legalPages.map((entry) => (
            <Link key={entry.path} to={entry.path} aria-current={entry.path === path ? 'page' : undefined}
              className={`text-sm rounded-lg px-3 py-2 border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${entry.path === path ? 'bg-sky-700 text-white border-sky-700' : 'bg-white text-slate-700 border-slate-200 hover:border-sky-600'}`}>
              {entry.title}
            </Link>
          ))}
        </nav>
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-10 space-y-9">
          {page.sections.map((section, index) => (
            <section key={section.heading} aria-labelledby={`legal-section-${index}`}>
              <h2 id={`legal-section-${index}`} className="text-xl font-semibold text-slate-900 mb-3">{section.heading}</h2>
              <div className="text-slate-600 leading-7 space-y-3">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.items && <ul className="list-disc pl-5 space-y-2">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
              </div>
            </section>
          ))}
          <aside className="rounded-xl bg-sky-50 p-5 border border-sky-100">
            <h2 className="font-semibold text-slate-900">Contact {business.grievanceName}</h2>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3 text-sm">
              <a className="inline-flex items-center gap-2 text-sky-800 underline underline-offset-4 break-all" href={`mailto:${business.grievanceEmail}?subject=Privacy%20request`}><Mail className="w-4 h-4 shrink-0" aria-hidden="true" />{business.grievanceEmail}</a>
              <a className="inline-flex items-center gap-2 text-sky-800 underline underline-offset-4" href={`tel:${business.grievancePhoneHref}`}><Phone className="w-4 h-4" aria-hidden="true" />{business.grievancePhone}</a>
            </div>
            <a className="inline-block mt-4 text-sm text-sky-800 underline underline-offset-4" href={`mailto:${business.grievanceEmail}?subject=Unsubscribe`}>Withdraw email-marketing permission</a>
          </aside>
        </div>
      </div>
    </article>
  );
}
