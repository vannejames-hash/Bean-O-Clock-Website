import { esc, money, picture, findItem, stop, rise } from '../lib/html.js';
import { icons } from '../lib/icons.js';

// The usual: the pour under an arch, the barista sitting on top of it with a cup; the crema line that runs
// down from the hero arrives here and draws the arch's frame.
export function bestSellers({ menu, content, brand }) {
  const c = content.bestSellers;
  const items = menu.featured.bestSellers.map((id) => findItem(menu, id)).filter(Boolean);
  const img = content.images[c.image];
  return `
<section class="section usual" id="best-sellers" aria-labelledby="usual-title">
  <div class="wrap usual__grid">
    <figure class="usual__photo">
      <div class="arch-wrap">
        <div class="arch" data-m="mask">${picture(img, { sizes: '(max-width: 899px) 70vw, 460px' })}</div>
        <svg class="arch__frame" viewBox="0 0 300 357" preserveAspectRatio="none" aria-hidden="true" data-thread-end><path pathLength="1" d="M300 357 V150 A150 150 0 0 0 0 150 V357"/></svg>
        ${brand?.shine ? `<span class="usual__shine">${brand.shine()}</span>` : ''}
      </div>
      ${brand?.regular ? `<div class="usual__figure on-light" data-figure-idle="sip">${brand.regular({ pose: 'sit', cup: 'hot' })}</div>` : ''}
    </figure>
    <div class="usual__body">
      <h2 class="h2" id="usual-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede">${esc(c.lede)}</p>
      <ol class="bests__list" role="list">
        ${items.map((it) => `
        <li>
          <button class="best" type="button" data-item="${esc(it.id)}">
            <span class="best__name">${esc(it.name)}</span>
            <span class="best__meta">${it.temp ? 'Iced or hot' : ''}</span>
            <span class="best__price">${money(it.price, menu.currency)}</span>
            <span class="best__add" aria-hidden="true">${icons.plus(20)}</span>
            <span class="sr-only">Add ${esc(it.name)} to your order</span>
          </button>
        </li>`).join('')}
      </ol>
      ${c.note ? `<p class="usual__note">${brand?.arrow ? brand.arrow('usual__arrow on-light', 'M70 50 C 40 52 18 40 14 8', 'M5 17 L14 6 L23 16') : ''}<span>${esc(c.note)}</span></p>` : ''}
      <a class="link-action link-action--ink" href="#menu">See the whole board${icons.arrow(18)}</a>
    </div>
  </div>
</section>`;
}

// New on the board: the shop's own poster drinks, die-cut like stickers and slapped on the green.
export function newDrinks({ menu, content, brand }) {
  const c = content.newDrinks;
  const items = menu.featured.newDrinks.map((id) => findItem(menu, id)).filter(Boolean);
  const card = (it, i) => {
    const img = content.images[it.photo];
    return `
      <li class="drink" style="--n:${i}">
        <button class="drink__btn" type="button" data-item="${esc(it.id)}">
          <span class="drink__photo" data-m="pop">${picture(img, { sizes: '(max-width: 639px) 112px, 280px' })}</span>
          ${brand?.shine && i !== 1 ? `<span class="drink__shine">${brand.shine()}</span>` : ''}
          <span class="drink__meta">
            <span class="drink__text">
              <span class="drink__name">${esc(it.name)}</span>
              <span class="drink__price">${money(it.price, menu.currency)}</span>
            </span>
            <span class="row__add drink__add" aria-hidden="true">${icons.plus(18)}</span>
          </span>
          <span class="sr-only">Add to order</span>
        </button>
      </li>`;
  };
  return `
<section class="section news ground-brand" id="new" aria-labelledby="news-title">
  ${brand?.branch ? `<div class="news__branch" aria-hidden="true" data-m="draw">${brand.branch()}</div>` : ''}
  <div class="wrap">
    <div class="head-row">
      <h2 class="h2" id="news-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede">${esc(c.lede)}</p>
    </div>
    <div class="news__body">
      ${brand?.stamp && c.sticker ? `<div class="news__stamp" data-m="pop">${brand.stamp({ text: esc(c.sticker), mark: 'iced' })}</div>` : ''}
      <ul class="news__row" role="list">${items.map(card).join('')}</ul>
    </div>
  </div>
</section>`;
}
