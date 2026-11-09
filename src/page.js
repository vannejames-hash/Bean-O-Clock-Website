import { esc, lowestPrice } from './lib/html.js';
import { hero, ticker } from './sections/hero.js';
import { bestSellers, newDrinks } from './sections/featured.js';
import { menuSection } from './sections/menu.js';
import { coffee, visit, close } from './sections/story.js';
import { nav, footer, actionBar, dialogs } from './sections/chrome.js';

function themeVars(theme) {
  const kebab = (k) => k.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  const colors = Object.entries(theme.color).map(([k, v]) => `--c-${kebab(k)}: ${v};`).join(' ');
  const f = theme.font;
  return `:root { ${colors} --font-display: '${f.display}', Georgia, serif; --display-wght: ${f.displayWeight || 700}; --font-text: '${f.text}', 'Segoe UI', system-ui, sans-serif; --font-accent: '${f.accent || f.display}', Georgia, serif; }`;
}

function fontFaces(theme) {
  return theme.font.faces.map((f) => `@font-face { font-family: '${f.family}'; src: url(assets/fonts/${f.file}) format('woff2'); font-weight: ${f.weight};${f.stretch ? ` font-stretch: ${f.stretch};` : ''} font-style: ${f.style || 'normal'}; font-display: swap; unicode-range: ${f.range}; }`).join('\n');
}

function jsonLd({ business, menu }) {
  const loc = business.location;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: business.fullName,
    telephone: business.phone.tel,
    foundingDate: String(business.established),
    servesCuisine: 'Coffee',
    priceRange: `₱${lowestPrice(menu)}–₱${Math.max(...menu.categories.flatMap((c) => c.groups.flatMap((g) => g.items.map((i) => i.price))))}`,
    address: { '@type': 'PostalAddress', addressLocality: loc.city, addressRegion: loc.province, addressCountry: loc.country },
    hasMap: loc.mapsUrl,
    sameAs: business.social.map((s) => s.url),
    hasMenu: '#menu',
  };
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

// The browser bundle only needs what ordering uses.
function storeData({ business, menu, content }) {
  const images = {};
  for (const cat of menu.categories) for (const g of cat.groups) for (const i of g.items) {
    if (i.photo) images[i.photo] = content.images[i.photo];
  }
  return JSON.stringify({
    name: business.name,
    phone: business.phone,
    pickup: business.ordering.pickup,
    delivery: business.ordering.delivery,
    currency: menu.currency,
    categories: menu.categories,
    addOns: menu.addOns,
    images,
    demo: content.demo,
    copy: content.order || {},
  }).replace(/</g, '\\u003c');
}

export function renderPage(ctx, { css }) {
  const { business, content, theme } = ctx;
  const preload = theme.font.faces.filter((f) => f.preload).map((f) => `<link rel="preload" href="assets/fonts/${f.file}" as="font" type="font/woff2" crossorigin>`).join('\n  ');
  const ogImage = 'assets/img/share.jpg';
  return `<!doctype html>
<html lang="en" data-type="place">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(content.seo.title)}</title>
  <meta name="description" content="${esc(content.seo.description)}">
  <meta name="theme-color" content="${esc(theme.color.brand)}">
  <meta name="page-type" content="place">
  <meta name="page-kind" content="place">
  <meta name="site-kind" content="other">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(content.seo.title)}">
  <meta property="og:description" content="${esc(content.seo.description)}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:locale" content="${esc(business.site.locale)}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/img/icon.png" type="image/png">
  <link rel="apple-touch-icon" href="assets/img/icon.png">
  ${preload}
  <style>${fontFaces(theme)}\n${themeVars(theme)}</style>
  <link rel="stylesheet" href="site.css">
  <script>document.documentElement.classList.add('js');</script>
  <script type="application/ld+json">${jsonLd(ctx)}</script>
</head>
<body>
  <a class="skip" href="#menu">Skip to the menu</a>
  ${nav(ctx)}
  <main>
    ${hero(ctx)}
    ${ticker(ctx)}
    ${bestSellers(ctx)}
    ${newDrinks(ctx)}
    ${coffee(ctx)}
    ${menuSection(ctx)}
    ${close(ctx)}
    ${visit(ctx)}
  </main>
  ${footer(ctx)}
  ${actionBar(ctx)}
  ${dialogs(ctx)}
  <script type="application/json" id="store-data">${storeData(ctx)}</script>
  ${ctx.brand?.poses ? `<script type="application/json" id="figure-poses">${JSON.stringify(ctx.brand.poses)}</script>` : ''}
  <script type="module" src="app.js"></script>
</body>
</html>
`;
}
