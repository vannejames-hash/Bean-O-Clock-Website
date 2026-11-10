import { esc, money, stop, rise, picture, findItem } from '../lib/html.js';
import { icons } from '../lib/icons.js';

const listWords = (opts) => {
  const o = opts.map((s, i) => (i === 0 ? s : s.toLowerCase()));
  return o.length > 1 ? `${o.slice(0, -1).join(', ')} or ${o[o.length - 1]}` : o[0];
};

const TAG = { new: 'New' };
// The tags are stuck on by hand: each sits a little off straight until it is picked.
const TILT = [-1.4, 1, -0.6, 1.3, -1];
const pad = (n) => String(n).padStart(2, '0');
const itemsOf = (cat) => cat.groups.flatMap((g) => g.items);

function row(it, currency, images) {
  const desc = it.choices ? listWords(it.choices.options) : '';
  const tags = (it.tags || []).filter((t) => TAG[t]).map((t) => `<span class="tag">${TAG[t]}</span>`).join('');
  const img = it.photo && images[it.photo];
  return `
          <li class="row">
            <button class="row__btn${img ? ' row__btn--photo' : ''}" type="button" data-item="${esc(it.id)}">
              ${img ? `<span class="row__thumb" aria-hidden="true"><img src="assets/img/${esc(img.src)}" alt="" width="${img.w}" height="${img.h}" loading="lazy" decoding="async" style="object-position:${esc(img.pos || '50% 50%')}"></span>` : ''}
              <span class="row__name">${esc(it.name)}${tags}</span>
              <span class="row__dots" aria-hidden="true"></span>
              <span class="row__price">${money(it.price, currency)}</span>
              ${desc ? `<span class="row__desc">${esc(desc)}</span>` : ''}
              <span class="row__add" aria-hidden="true">${icons.plus(16)}</span>
              <span class="sr-only">Add to order</span>
            </button>
          </li>`;
}

// A list's face on the board: its picture (a stand-in photograph, the shop's own poster drink as a sticker that is
// also its add button, or the stamp) and the barista holding the list's cup, drawn in the pose it ends on.
function face(f, { menu, content, brand }) {
  if (!f) return '';
  let pic = '';
  if (f.image && content.images[f.image]) {
    pic = `<div class="face__photo">${picture(content.images[f.image], { sizes: '(max-width: 899px) 132px, 190px' })}</div>`;
  } else if (f.item) {
    const it = findItem(menu, f.item);
    const img = it?.photo && content.images[it.photo];
    if (img) {
      pic = `
        <button class="face__sticker" type="button" data-item="${esc(it.id)}">
          <span class="face__disc">${picture(img, { sizes: '190px' })}</span>
          <span class="face__label">${it.tags?.includes('new') ? '<span class="tag">New</span>' : ''}<span class="face__name">${esc(it.name)}</span><span class="face__price">${money(it.price, menu.currency)}</span></span>
          <span class="sr-only">Add to order</span>
        </button>`;
    }
  } else if (f.stamp && brand?.stamp) {
    pic = `<div class="face__stamp" aria-hidden="true">${brand.stamp({ text: esc(f.stamp), mark: 'cloud' })}</div>`;
  }
  const fig = brand?.regular ? `<div class="face__figure" aria-hidden="true">${brand.regular({ pose: f.pose || 'stand', cup: f.cup ?? 'hot', hold: f.hold || 'front', spare: f.spare || '' })}</div>` : '';
  return `<div class="face${pic ? '' : ' face--solo'}" data-pose="${esc(f.pose || 'stand')}">${pic}${fig}</div>`;
}

// The whole board: one list at a time. The five tags name every list and how many drinks it holds; the board
// under them shows the picked one, a green plate naming it beside the list itself on paper. Without JS every
// list is shown, one under the other.
export function menuSection(ctx) {
  const { menu, content, brand } = ctx;
  const c = content.menu;
  const lists = [
    ...menu.categories.map((cat) => ({
      id: cat.id, name: cat.name, note: cat.note, groups: cat.groups,
      count: itemsOf(cat).length, unit: 'drinks', from: Math.min(...itemsOf(cat).map((i) => i.price)),
    })),
    { id: 'add-ons', name: c.addOnsTitle, note: c.addOnsNote, addOns: menu.addOns, count: menu.addOns.length, unit: 'extras', from: Math.min(...menu.addOns.map((a) => a.price)) },
  ];
  const mark = (id) => (brand?.icon && c.marks?.[id] ? brand.icon(c.marks[id]) : '');

  const tabs = lists.map((l, i) => `
        <button class="board__tab" type="button" role="tab" id="tab-${l.id}" aria-controls="cat-${l.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-tab="${l.id}" style="--tilt:${TILT[i % TILT.length]}">
          <span class="board__mark" aria-hidden="true">${mark(l.id)}</span>
          <span class="board__tabtext"><span class="board__tabname">${esc(l.name)}</span><span class="board__tabcount">${l.count} ${l.unit}</span></span>
        </button>`).join('');

  const panels = lists.map((l, i) => {
    const many = l.count > 5 || (l.groups?.length || 0) > 2;
    const body = l.addOns
      ? `<ul class="rows" role="list">${l.addOns.map((a) => `
          <li class="row row--static"><span class="row__name">${esc(a.name)}</span><span class="row__dots" aria-hidden="true"></span><span class="row__price">+${money(a.price, menu.currency)}</span></li>`).join('')}
        </ul>`
      : l.groups.map((g) => `
        <div class="board__group">
          ${g.label ? `<h4 class="board__label">${esc(g.label)}${g.note ? ` <span class="label__note">${esc(g.note)}</span>` : ''}</h4>` : ''}
          <ul class="rows" role="list">${g.items.map((it) => row(it, menu.currency, content.images)).join('')}
          </ul>
        </div>`).join('');
    return `
      <section class="board__panel${i === 0 ? ' is-active' : ''}" id="cat-${l.id}" role="tabpanel" aria-labelledby="tab-${l.id}" data-panel="${l.id}">
        <div class="board__intro">
          <p class="board__no" aria-hidden="true"><span class="board__roll"><span>${pad(i + 1)}</span></span><span class="board__of">/ ${pad(lists.length)}</span></p>
          <h3 class="board__title"><span class="board__roll"><span>${stop(`${l.name}.`)}</span></span></h3>
          ${l.note ? `<p class="board__note">${esc(l.note)}</p>` : ''}
          <p class="board__meta">${l.count} ${l.unit} · from ${l.addOns ? '+' : ''}${money(l.from, menu.currency)}</p>
          ${face(c.faces?.[l.id], ctx)}
        </div>
        <div class="board__list board__list--${many ? 2 : 1}${l.groups?.length === 1 ? ' board__list--flow' : ''}">${body}
        </div>
      </section>`;
  }).join('');

  return `
<section class="section menu" aria-labelledby="menu-title">
  <div class="wrap">
    <div class="menu__head">
      <h2 class="h2" id="menu-title" data-m="rise">${rise(c.title)}</h2>
      <p class="lede">${esc(c.lede)}</p>
    </div>
    <div class="board" id="menu" data-board>
      <div class="board__bar">
        <div class="board__tabs" role="tablist" aria-label="Menu lists">${tabs}
        </div>
        <span class="ticks board__hand" aria-hidden="true"></span>
      </div>
      <div class="board__stage">
        <div class="board__plate ground-brand" aria-hidden="true"></div>
        ${brand?.branch ? `<div class="board__art" aria-hidden="true">${brand.branch()}</div>` : ''}
        ${panels}
      </div>
    </div>
  </div>
</section>`;
}
