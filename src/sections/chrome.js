import { esc, stop } from '../lib/html.js';
import { icons } from '../lib/icons.js';

export function nav({ business, content }) {
  const links = content.nav.map((l) => `<li><a class="nav__link" href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('');
  return `
<header class="nav" data-nav>
  <div class="wrap nav__inner">
    <a class="nav__brand" href="#top" aria-label="${esc(business.name)}, back to top">
      <img src="assets/img/${esc(content.images.mark.src)}" width="44" height="44" alt="">
      <span class="nav__word">${esc(business.name)}<small>Coffee to-go</small></span>
    </a>
    <nav class="nav__links" aria-label="Main"><ul role="list">${links}</ul></nav>
    <div class="nav__actions">
      <button class="nav__text" type="button" data-delivery>Delivery</button>
      <button class="btn btn--light btn--sm nav__order" type="button" data-open-order>
        ${icons.bag(18)}<span class="nav__order-label">Order ahead</span><span class="count" data-count hidden>0</span>
      </button>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        ${icons.menu(22)}<span class="sr-only">Open the menu</span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <ul role="list">${links}</ul>
    <div class="mobile-menu__foot">
      <a class="plain-link" href="tel:${esc(business.phone.tel)}">${icons.phone(18)} ${esc(business.phone.display)}</a>
    </div>
  </div>
</header>`;
}

export function footer({ business, content, brand }) {
  const loc = business.location;
  const fb = business.social.find((s) => s.network === 'Facebook');
  const year = new Date().getFullYear();
  const sign = content.footer?.signoff;
  return `
<footer class="footer ground-deep">
  <span class="ticks footer__ticks" aria-hidden="true"></span>
  <div class="wrap">
    ${sign ? `
    <div class="footer__sign">
      <p class="footer__signoff">${stop(sign).replace(/Bean O&#39;Clock/, '<span class="it">Bean O&#39;Clock</span>')}</p>
      ${brand?.stamp && content.stamp ? `
      <div class="footer__stamp">
        ${brand.regular ? `<span class="footer__figure">${brand.regular({ pose: 'lean', cup: 'hot' })}</span>` : ''}
        ${brand.stamp({ text: esc(content.stamp), mark: 'iced' })}
      </div>` : ''}
    </div>` : ''}
    <div class="footer__top">
      <div class="footer__brand">
        <p>${esc(business.fullName)}</p>
      </div>
      <div class="footer__col">
        <h2 class="label">Visit</h2>
        <p><a class="plain-link" href="${esc(loc.mapsUrl)}" target="_blank" rel="noopener">${esc(loc.city)}, ${esc(loc.province)}</a></p>
      </div>
      <div class="footer__col">
        <h2 class="label">Contact</h2>
        <p><a class="plain-link" href="tel:${esc(business.phone.tel)}">${esc(business.phone.display)}</a></p>
        ${fb ? `<p><a class="plain-link" href="${esc(fb.url)}" target="_blank" rel="noopener">Facebook</a></p>` : ''}
      </div>
      <div class="footer__col">
        <h2 class="label">Order</h2>
        <p><button class="plain-link" type="button" data-open-order>Order ahead for pickup</button></p>
        <p><button class="plain-link" type="button" data-delivery>Delivery</button></p>
      </div>
    </div>
    <div class="footer__legal">
      <p>© ${year} ${esc(business.fullName)}</p>
      <p>${business.site.demo ? 'Demo storefront. Orders are not sent to the shop.' : ''}</p>
      <p><a class="plain-link" href="credits.html">Photo credits</a></p>
    </div>
  </div>
</footer>`;
}

export function actionBar() {
  return `
<nav class="actionbar" aria-label="Order" data-actionbar>
  <div class="actionbar__idle">
    <button class="btn btn--dark" type="button" data-open-order>Order ahead</button>
    <button class="btn btn--quiet" type="button" data-delivery>Delivery</button>
  </div>
  <button class="actionbar__cart btn btn--dark" type="button" data-open-order hidden>
    <span><span data-count>0</span> in your order</span><span data-total>₱0</span>
  </button>
</nav>`;
}

// Dialog shells. app.js fills their bodies.
// With a brand kit, the barista rides along in templates: app.js clones them into the drawer
// (checking the watch at the pickup time, shrugging at an empty cart, raising a cup to a placed order).
export function dialogs({ business, content, brand }) {
  const tpl = brand?.regular ? `
<template id="tpl-figure-watch">${brand.regular({ pose: 'watch', cup: 'hot', hold: 'back' })}</template>
<template id="tpl-figure-cheers">${brand.regular({ pose: 'cheers', cup: 'hot', smile: true })}</template>
<template id="tpl-figure-empty">${brand.regular({ pose: 'shrug', cup: '' })}</template>` : '';
  return `${tpl}
<dialog class="sheet sheet--order" id="order-sheet" aria-labelledby="order-title">
  <div class="sheet__panel">
    <header class="sheet__head">
      <button class="icon-btn" type="button" data-step-back hidden>${icons.back(20)}<span class="sr-only">Back</span></button>
      <div class="sheet__titles">
        <h2 class="sheet__title" id="order-title">Your order</h2>
        <p class="sheet__step" data-step-label></p>
      </div>
      <button class="icon-btn" type="button" data-close>${icons.close(20)}<span class="sr-only">Close</span></button>
    </header>
    <div class="sheet__progress" aria-hidden="true"><span data-progress></span></div>
    <div class="sheet__body" data-order-body></div>
    <footer class="sheet__foot" data-order-foot></footer>
  </div>
</dialog>

<dialog class="sheet sheet--item" id="item-sheet" aria-labelledby="item-title">
  <form class="sheet__panel" method="dialog" data-item-form></form>
</dialog>

<dialog class="sheet sheet--note" id="delivery-sheet" aria-labelledby="delivery-title">
  <div class="sheet__panel">
    <header class="sheet__head">
      <div class="sheet__titles">
        <h2 class="sheet__title" id="delivery-title">Delivery on ${esc(business.ordering.delivery.provider)}</h2>
        <p class="sheet__step">${esc(content.demo.banner)}</p>
      </div>
      <button class="icon-btn" type="button" data-close>${icons.close(20)}<span class="sr-only">Close</span></button>
    </header>
    <div class="sheet__body">
      <p>${esc(content.demo.deliveryNote)}</p>
      <div class="note-actions">
        <a class="btn btn--dark" href="tel:${esc(business.phone.tel)}">${icons.phone(18)} Call ${esc(business.phone.display)}</a>
        ${business.social[0] ? `<a class="btn btn--quiet" href="${esc(business.social[0].url)}" target="_blank" rel="noopener">${icons.facebook(18)} Message on Facebook</a>` : ''}
      </div>
    </div>
  </div>
</dialog>

<div class="toast" role="status" aria-live="polite" data-toast hidden></div>`;
}
