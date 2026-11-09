import { esc, money, picture, stop, rise } from '../lib/html.js';
import { icons } from '../lib/icons.js';

const fromPrice = (menu, catId) => {
  const cat = menu.categories.find((c) => c.id === catId);
  return cat ? Math.min(...cat.groups.flatMap((g) => g.items.map((i) => i.price))) : null;
};

// What goes in the cup, on espresso: the barista at the counter in three drawn scenes (tamp, pull, pour),
// played in turn as the section arrives, a crema arrow carrying the eye from one to the next; then what
// the boards say goes in, as three packaging labels.
export function coffee({ menu, content, brand }) {
  const c = content.coffee;
  const steps = brand?.processScene ? c.steps || [] : [];
  const icon = (cat) => (brand?.icon && c.claimIcons?.[cat] ? brand.icon(c.claimIcons[cat]) : '');
  const link = (i) => (i < steps.length - 1 && brand?.arrow ? `<li class="process__link" aria-hidden="true" data-link="${i}">${brand.arrow('process__arrow', 'M4 40 C 22 18 50 16 72 30', 'M60 22 L73 31 L61 39')}</li>` : '');
  return `
<section class="section craft ground-espresso" id="coffee" aria-labelledby="coffee-title">
  <div class="wrap">
    <div class="craft__head">
      <h2 class="h2 craft__title" id="coffee-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede craft__statement">${esc(c.statement)}</p>
    </div>
    ${steps.length ? `
    <ol class="process" role="list" data-process>
      ${steps.map((s, i) => `
      <li class="process__step" data-step="${esc(s.scene)}">
        <div class="process__scene">${brand.processScene(s.scene)}</div>
        <p class="process__word"><span class="craft__no">${i + 1}</span>${esc(s.word)}<span class="stop">.</span></p>
        <p class="process__note">${esc(s.note)}</p>
      </li>${link(i)}`).join('')}
    </ol>` : ''}
    <ul class="claims" role="list">
      ${c.claims.map((cl) => `
      <li>
        <a class="claim" href="#cat-${esc(cl.category)}">
          <span class="ticks" aria-hidden="true"></span>
          <span class="claim__icon" aria-hidden="true">${icon(cl.category)}</span>
          <span class="claim__title">${esc(cl.title)}</span>
          <span class="claim__text">${esc(cl.text)}</span>
          <span class="claim__price">From ${money(fromPrice(menu, cl.category), menu.currency)} ${icons.arrow(18)}</span>
        </a>
      </li>`).join('')}
    </ul>
  </div>
</section>`;
}

// The order band: the barista checks the watch, and the watch's face, blown up, tells the time in Tagum.
function watchFace() {
  let ticks = '';
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 * Math.PI) / 180;
    const long = i % 5 === 0;
    const r1 = long ? 166 : 176, r2 = 186;
    ticks += `<line x1="${(200 + r1 * Math.sin(a)).toFixed(1)}" y1="${(200 - r1 * Math.cos(a)).toFixed(1)}" x2="${(200 + r2 * Math.sin(a)).toFixed(1)}" y2="${(200 - r2 * Math.cos(a)).toFixed(1)}"${long ? ' class="long"' : ''}/>`;
  }
  return `<svg class="watch__dial" viewBox="0 0 400 400" aria-hidden="true"><circle cx="200" cy="200" r="198"/><g>${ticks}</g></svg>`;
}

export function close({ content, brand }) {
  const c = content.close;
  return `
<section class="section order ground-brand" id="order" aria-labelledby="close-title">
  <div class="wrap order__grid">
    <div class="order__text">
      <h2 class="h2 order__title" id="close-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede">${esc(c.lede)}</p>
      <div class="close__actions">
        <button class="btn btn--light" type="button" data-open-order>Order ahead${icons.arrow(18)}</button>
        <button class="link-action" type="button" data-delivery>Get it delivered${icons.arrow(18)}</button>
      </div>
    </div>
    <figure class="order__watch" data-clock>
      <div class="watch" data-m="pop">
        ${watchFace()}
        <p class="watch__time"><strong data-clock-time>&nbsp;</strong><span>${esc(c.clockLabel)}</span></p>
      </div>
      ${brand?.regular ? `<div class="order__figure" data-clock-figure>${brand.regular({ pose: 'watch', cup: 'hot', hold: 'back' })}</div>` : ''}
    </figure>
  </div>
</section>`;
}

// Visit: the barista walks in along a dotted route and points to the map pin.
export function visit({ business, content, brand }) {
  const c = content.visit;
  const loc = business.location;
  const fb = business.social.find((s) => s.network === 'Facebook');
  return `
<section class="section visit" id="visit" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="visit__head" data-visit>
      <h2 class="h2 visit__title" id="visit-title">${stop(c.title)}</h2>
      <div class="visit__route" aria-hidden="true">
        ${brand?.regular ? `<div class="visit__figure on-light" data-visit-figure>${brand.regular({ pose: 'point', cup: 'hot', hold: 'back' })}</div>` : ''}
        <span class="visit__dash"></span>
        <span class="visit__pin">${brand?.icon ? brand.icon('pin', 'on-light') : icons.pin(28)}</span>
      </div>
    </div>
    <p class="visit__place"><a href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener">${c.place.map((l, i) => `<span>${i ? `<span class="it">${esc(l)}</span>` : esc(l)}</span>`).join(' ')}</a></p>
    <div class="visit__grid">
      <div class="visit__cols">
        <div class="visit__col">
          <h3 class="label">Find us</h3>
          <p>Search the map pin <strong>${esc(loc.plusCode)}</strong> in Google Maps, or open it from here.</p>
        </div>
        <div class="visit__col">
          <h3 class="label">Message</h3>
          ${fb ? `<p><a class="plain-link" href="${esc(fb.url)}" target="_blank" rel="noopener">${icons.facebook(18)} facebook.com/${esc(fb.handle)}</a></p>` : ''}
        </div>
        <div class="visit__col">
          <h3 class="label">Hours</h3>
          ${business.hours ? '' : `<p class="muted">${esc(c.hoursNote)}</p>`}
        </div>
      </div>
      <div class="visit__panel">
        <span class="ticks" aria-hidden="true"></span>
        <p class="label">Map pin</p>
        <p class="visit__pin-code">${esc(loc.plusCode)}</p>
        <div class="visit__actions">
          <a class="btn btn--dark" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener">${icons.pin(18)} Open in Google Maps</a>
          <a class="btn btn--quiet" href="tel:${esc(business.phone.tel)}">${icons.phone(18)} Call ${esc(business.phone.display)}</a>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
