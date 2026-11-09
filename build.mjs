// Builds one client's storefront into dist/<client>/.
//   node build.mjs                 (default client)
//   node build.mjs --client <id>
import { readFile, writeFile, mkdir, cp, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderPage } from './src/page.js';

const root = dirname(fileURLToPath(import.meta.url));
const argClient = process.argv.indexOf('--client');
const client = argClient > -1 ? process.argv[argClient + 1] : 'bean-o-clock';
const clientDir = join(root, 'clients', client);
if (!existsSync(clientDir)) throw new Error(`No client folder: clients/${client}`);

const load = async (name) => (await import(pathToFileURL(join(clientDir, `${name}.js`)).href + `?t=${Date.now()}`)).default;
// brand.js is optional: a client with its own illustration kit (a character, glyphs) exports it there,
// and sections fall back to type and photographs when it is absent.
const loadModule = async (name) => (existsSync(join(clientDir, `${name}.js`)) ? import(pathToFileURL(join(clientDir, `${name}.js`)).href + `?t=${Date.now()}`) : null);
const ctx = {
  business: await load('business'),
  menu: await load('menu'),
  theme: await load('theme'),
  content: await load('content'),
  brand: await loadModule('brand'),
};

const out = join(root, 'dist', client);
await rm(out, { recursive: true, force: true });
await mkdir(join(out, 'assets'), { recursive: true });

const styleDir = join(root, 'src', 'styles');
const styleFiles = (await readdir(styleDir)).filter((f) => f.endsWith('.css')).sort();
const css = (await Promise.all(styleFiles.map((f) => readFile(join(styleDir, f), 'utf8')))).join('\n');
await writeFile(join(out, 'site.css'), css);

await cp(join(root, 'src', 'client', 'app.js'), join(out, 'app.js'));
await cp(join(root, 'src', 'fonts'), join(out, 'assets', 'fonts'), { recursive: true });
const html = renderPage(ctx, { css });
await writeFile(join(out, 'index.html'), html);

// Ship only library photographs the page references; client files always ship.
const usedPhoto = (name) => !/^photo-([mf]?\d+)/.test(name) || html.includes(name.match(/^photo-([mf]?\d+)/)[0]);
await cp(join(clientDir, 'assets', 'img'), join(out, 'assets', 'img'), {
  recursive: true,
  filter: (src) => !src.endsWith('.json') && usedPhoto(src.split(/[\\/]/).pop()),
});

// Photo credits page, from the licence records saved beside the photographs.
const creditsFile = join(clientDir, 'assets', 'img', 'credits.json');
if (existsSync(creditsFile)) {
  const { photos = [] } = JSON.parse(await readFile(creditsFile, 'utf8'));
  const e = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const list = photos
    .filter((c) => html.includes(`photo-${c.id}`))
    .map((c) => `<li><a href="${e(c.page)}">${e(c.alt)}</a> by ${e(c.by)}, ${c.licenceUrl ? `<a href="${e(c.licenceUrl)}">${e(c.licence)}</a>` : e(c.licence)}, via ${e(c.source)}. Cropped and resized.</li>`).join('\n');
  await writeFile(join(out, 'credits.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Photo credits · ${ctx.business.fullName}</title><link rel="stylesheet" href="site.css"><style>:root{--c-ground:${ctx.theme.color.ground};--c-ink:${ctx.theme.color.ink}}</style></head><body class="credits"><main class="wrap"><h1 class="h2">Photo credits</h1><p>Stand-in photographs used until the shop supplies its own. Drink photographs and the logo belong to ${ctx.business.fullName}.</p><ul>${list}</ul><p><a href="index.html">Back to the storefront</a></p></main></body></html>`);
}

console.log(`built dist/${client}/ (${styleFiles.length} stylesheets)`);
