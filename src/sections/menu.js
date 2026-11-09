import { esc, money, stop, rise } from '../lib/html.js';
import { icons } from '../lib/icons.js';

const listWords = (opts) => {
  const o = opts.map((s, i) => (i === 0 ? s : s.toLowerCase()));
  return o.length > 1 ? `${o.slice(0, -1).join(', ')} or ${o[o.length - 1]}` : o[0];
};

const TAG = { new: 'New' };

function row(it, currency, i, images) {
  const desc = it.choices ? listWords(it.choices.options) : '';
  const tags = (it.tags || []).filter((t) => TAG[t]).map((t) => `<span class="tag">${TAG[t]}</span>`).join('');
  const img = it.photo && images[it.photo];
  return `
    <li class="row" style="--r:${i}">
      <button class="row__btn${img ? ' row__btn--photo' : ''}" type="button" data-item="${esc(it.id)}">
        ${img ? `<span class="row__thumb" aria-hidden="true"><img src="assets/img/${esc(img.src)}" alt="" width="${img.w}" height="${img.h}" loading="lazy" decoding="async" style="object-position:${esc(img.pos || '50% 50%')}"></span>` : ''}
        <span class="row__main">
          <span class="row__name">${esc(it.name)}${tags}</span>
          ${desc ? `<span class="row__desc">${esc(desc)}</span>` : ''}
        </span>
        <span class="row__price">${money(it.price, currency)}</span>
        <span class="row__add" aria-hidden="true">${icons.plus(18)}</span>
        <span class="sr-only">Add to order</span>
      </button>
    </li>`;
}

export function menuSection({ menu, content, brand }) {
  // Each category's heading carries a round mark, as the shop's own boards do: here that category's cup in the brand's pen.
  const mark = (id) => {
    const m = content.menu.marks?.[id];
    return m && brand?.icon ? `<span class="cat__mark" aria-hidden="true">${brand.icon(m, 'on-light')}</span>` : '';
  };
  const c = content.menu;
  const index = menu.categories.map((cat) => `<li><a href="#cat-${cat.id}" data-cat-link="${cat.id}">${esc(cat.name)}</a></li>`).join('');
  const cats = menu.categories.map((cat) => `
    <section class="cat" id="cat-${cat.id}" aria-labelledby="cat-${cat.id}-title" data-cat="${cat.id}">
      <header class="cat__head">
        ${mark(cat.id)}
        <h3 class="h3" id="cat-${cat.id}-title">${esc(cat.name)}</h3>
        ${cat.note ? `<p class="cat__note">${esc(cat.note)}</p>` : ''}
      </header>
      <div class="cat__groups${cat.groups.length >= 4 ? ' cat__groups--split' : ''}">
        ${cat.groups.map((g) => `
        <div class="group">
          ${g.label ? `<h4 class="label">${esc(g.label)}${g.note ? ` <span class="label__note">${esc(g.note)}</span>` : ''}</h4>` : ''}
          <ul class="rows" role="list">${g.items.map((it, i) => row(it, menu.currency, i, content.images)).join('')}</ul>
        </div>`).join('')}
      </div>
    </section>`).join('');

  const addOns = menu.addOns.map((a, i) => `<li style="--r:${i}"><span>${esc(a.name)}</span><span class="row__price">+${money(a.price, menu.currency)}</span></li>`).join('');

  return `
<section class="section menu" id="menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="menu__head">
      <h2 class="h2" id="menu-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede">${esc(c.lede)}</p>
      ${brand?.regular ? `<div class="menu__figure on-light" aria-hidden="true">${brand.regular({ pose: 'present', cup: 'iced', hold: 'back', cls: 'is-mirror' })}</div>` : ''}
    </div>
  </div>
  <nav class="menu__index" aria-label="Menu categories">
    <div class="wrap"><ul role="list"><li class="menu__ink" aria-hidden="true"></li>${index}<li><a href="#cat-add-ons" data-cat-link="add-ons">${esc(c.addOnsTitle)}</a></li></ul></div>
  </nav>
  <div class="wrap menu__body">
    ${cats}
    <section class="cat cat--addons" id="cat-add-ons" aria-labelledby="cat-add-ons-title" data-cat="add-ons">
      <header class="cat__head">
        <h3 class="h3" id="cat-add-ons-title">${esc(c.addOnsTitle)}</h3>
        <p class="cat__note">Add them to any drink when you order.</p>
      </header>
      <ul class="addons" role="list">${addOns}</ul>
    </section>
  </div>
</section>`;
}
