import { esc, money, lowestPrice } from '../lib/html.js';
import { icons } from '../lib/icons.js';

// The logo, rebuilt as a scene: the dial's ticks, the coffee rising like the logo's sun over its ground line,
// EST. and the year on the ground, and the brand's barista walking up the hill to raise a cup.
function tickArc() {
  const c = 500, r1 = 466, r2 = 494;
  let t = '';
  for (let i = 0; i <= 16; i++) {
    const a = ((-120 + 15 * i) * Math.PI) / 180;
    const long = i % 4 === 0;
    const ri = long ? r1 - 16 : r1;
    t += `<line pathLength="1" style="--i:${i}" x1="${(c + ri * Math.sin(a)).toFixed(1)}" y1="${(c - ri * Math.cos(a)).toFixed(1)}" x2="${(c + r2 * Math.sin(a)).toFixed(1)}" y2="${(c - r2 * Math.cos(a)).toFixed(1)}"/>`;
  }
  return `<svg class="hero__ticks" viewBox="0 0 1000 1000" aria-hidden="true">${t}</svg>`;
}

export function hero({ business, menu, content, brand }) {
  const c = content.hero;
  const img = content.images[c.image];
  const facts = [
    business.rating && `<li><strong>${business.rating.value}</strong> on ${esc(business.rating.source)} from ${business.rating.count} reviews</li>`,
    `<li>Drinks from <strong>${money(lowestPrice(menu), menu.currency)}</strong></li>`,
  ].filter(Boolean).join('');
  const [l1, l2] = c.lines;
  // "It's bean": the noun in the italic, the brand's aside.
  const first = esc(l1).replace(/bean$/i, '<span class="it">bean</span>');
  const second = `<span>${esc(l2)}</span>`;
  const srcset = img.srcset.split(',').map((s) => `assets/img/${s.trim()}`).join(', ');

  return `
<section class="hero ground-brand" id="top" aria-labelledby="hero-title" data-enter>
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <h1 class="hero__title" id="hero-title">
        <span class="sr-only">${esc(c.title)}</span>
        <span class="hero__lockup" aria-hidden="true">
          <span class="line"><span class="line__in">${first}</span></span>
          <span class="line line--2"><span class="line__in">${second}<span class="stop">.</span></span></span>
        </span>
      </h1>
      <p class="hero__lede">${esc(c.lede)}</p>
      <div class="hero__actions">
        <button class="btn btn--light" type="button" data-open-order data-hero-action>${esc(c.primary)}${icons.arrow(18)}</button>
        <button class="link-action" type="button" data-delivery>${esc(c.secondary)}${icons.arrow(18)}</button>
      </div>
      <ul class="hero__facts" role="list">${facts}</ul>
    </div>
    <div class="hero__stage">
      <figure class="hero__sun">
        ${tickArc()}
        <div class="hero__mask"><img class="hero__img" src="assets/img/${esc(img.src)}" srcset="${esc(srcset)}" sizes="(max-width: 899px) 70vw, 470px" width="${img.w}" height="${img.h}" alt="${esc(img.alt)}" fetchpriority="high" decoding="async" data-source="stand-in"></div>
      </figure>
      ${brand?.stamp && content.stamp ? `<div class="hero__stamp">${brand.stamp({ text: esc(content.stamp), mark: 'hot' })}</div>` : ''}
      ${brand?.regular ? `<div class="hero__figure" data-hero-figure>${brand.regular({ pose: 'cheers', cup: 'hot', smile: true })}</div>` : ''}
      <p class="hero__est" aria-hidden="true"><span>Est.</span><span>${business.established}</span></p>
    </div>
  </div>
  <div class="hero__hill" aria-hidden="true"></div>
</section>`;
}

// The cup sleeve: the menu's facts in the italic, each with its cup, between two minute tracks.
// It slides with the scroll. Decorative: every word repeats a fact the page states elsewhere.
export function ticker({ content, brand }) {
  const words = content.ticker || [];
  if (!words.length) return '';
  const run = words.map((w) => `<span class="sleeve__word">${brand?.icon ? brand.icon(w.icon, 'on-light') : ''}${esc(w.text)}</span>`).join('');
  return `
<div class="sleeve" aria-hidden="true">
  <span class="ticks"></span>
  <p class="sleeve__line" data-ticker><span class="sleeve__run">${run}${run}${run}</span></p>
  <span class="ticks"></span>
</div>`;
}
