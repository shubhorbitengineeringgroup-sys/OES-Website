// Separate local-only browser fixture. No production source/config is changed.
import { createServer } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const server = await createServer({
  configFile: false,
  root,
  appType: 'mpa',
  plugins: [
    {
      name: 'local-privacy-fixture',
      enforce: 'pre',
      transform(code, id) {
        const file = id.replace(/\\/g, '/').split('?')[0];
        if (file.endsWith('/src/data/legalContent.mjs')) {
          if (!code.includes('export const AI_PROVIDER_REVIEWED = false;') || !code.includes("export const AI_PROVIDER_DISCLOSURE = '';")) throw new Error('Fixture expected disabled production AI flags. Review the fixture before running.');
          return code.replace('export const AI_PROVIDER_REVIEWED = false;', 'export const AI_PROVIDER_REVIEWED = true;')
            .replace("export const AI_PROVIDER_DISCLOSURE = '';", "export const AI_PROVIDER_DISCLOSURE = 'Mock AI provider (local test; no external processing)';");
        }
        // Exercise the real map controls without ever loading a Google iframe.
        if (file.endsWith('/src/components/ClickToLoadMap.tsx')) {
          if (!code.includes('src={embedUrl}')) throw new Error('Map fixture needs review after component changes.');
          return code.replace('src={embedUrl}', 'src="about:blank"');
        }
      },
      configureServer(vite) {
        vite.middlewares.use((request, response, next) => {
          const pathname = (request.url || '').split('?')[0];
          if ((request.headers.accept?.includes('text/html') && pathname !== '/tests/browser-harness.html') || ['/index.html', '/', '/src/main.tsx', '/src/App.tsx'].includes(pathname)) {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/plain');
            response.end('This server only serves /tests/browser-harness.html. Use the normal dev server for the website.');
            return;
          }
          next();
        });
      },
    },
    react(),
  ],
  server: { host: '127.0.0.1', port: 5174, strictPort: true, cors: false, open: false },
});
await server.listen();
console.log('Local privacy fixture: http://127.0.0.1:5174/tests/browser-harness.html');
console.log('Fetch is mocked; downloads/navigation are intercepted; map iframes use about:blank. Production flags remain disabled.');
