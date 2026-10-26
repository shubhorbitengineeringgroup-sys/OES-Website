import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { business, legalPages } from '../src/data/legalContent.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

for (const page of legalPages) {
  test(`built ${page.path} serves the complete shared notice with direct-route metadata`, () => {
    const html = fs.readFileSync(path.join(dist, page.path, 'index.html'), 'utf8');
    assert.ok(html.includes(`<link rel="canonical" href="https://orbitengineerings.com${page.path}/"`));
    assert.ok(html.includes(`<title>${escape(page.title)}</title>`));
    assert.ok(html.includes(escape(page.description)));
    assert.ok(html.includes(escape(business.operator)));
    for (const section of page.sections) {
      for (const text of [section.heading, ...section.paragraphs, ...(section.items || [])]) {
        assert.ok(html.includes(escape(text)), `${page.path} missing: ${text.slice(0, 70)}`);
      }
    }
    assert.ok(!html.includes('"FAQPage"'), 'unrelated home FAQ must not describe a legal page');
    for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      assert.doesNotThrow(() => JSON.parse(match[1]));
    }
    const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
    assert.ok(sitemap.includes(`<loc>https://orbitengineerings.com${page.path}/</loc>`));
  });
}

test('published HTML and bundles contain no removed rating or automatic Google Fonts calls', () => {
  const files = fs.readdirSync(dist, { recursive: true }).filter(name => /\.(html|js|css)$/.test(name));
  for (const name of files) {
    const content = fs.readFileSync(path.join(dist, name), 'utf8');
    assert.ok(!/fonts\.(googleapis|gstatic)\.com|aggregateRating|reviewCount|Verified Seller|150 mega|₹200\+|zero-hazard/i.test(content), name);
  }
});

test('font files and all legacy corporate brochure URLs are packaged locally', () => {
  for (const asset of ['fonts/Inter-variable.ttf', 'fonts/Outfit-variable.ttf', 'fonts/Inter-OFL.txt', 'fonts/Outfit-OFL.txt']) {
    assert.ok(fs.statSync(path.join(dist, asset)).size > 1000, asset);
  }
  const canonical = fs.readFileSync(path.join(dist, 'assets/docs/brochure.pdf'));
  assert.equal(canonical.subarray(0, 5).toString(), '%PDF-');
  assert.deepEqual(fs.readFileSync(path.join(dist, 'assets/docs/Orbit brocher.pdf_.pdf')), canonical);
  assert.deepEqual(fs.readFileSync(path.join(root, 'src/assets/Orbit brocher.pdf_.pdf')), canonical);
});
