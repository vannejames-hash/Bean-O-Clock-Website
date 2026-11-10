export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const money = (n, currency = '₱') => `${currency}${Number(n).toLocaleString('en-PH')}`;

export const join = (parts) => parts.filter(Boolean).join('');

// A heading's full stops set in the brand's stop colour (styled by .stop): a sentence end, not a decimal point.
export const stop = (s) => esc(s).replace(/\.(?=\s|$)/g, '<span class="stop">.</span>');
// A headline that rises into its line when it comes into view (motion verb "reveal": [data-m="rise"]).
export const rise = (s) => `<span class="rise">${stop(s)}</span>`;

// `img` is an entry from content.images. Paths resolve under assets/img/.
export function picture(img, { sizes = '100vw', eager = false, cls = '', fetchpriority = null } = {}) {
  const base = 'assets/img/';
  const srcset = img.srcset
    ? img.srcset.split(',').map((s) => base + s.trim()).join(', ')
    : null;
  return `<img class="${esc(cls)}" src="${base}${esc(img.src)}"${srcset ? ` srcset="${esc(srcset)}" sizes="${esc(sizes)}"` : ''} width="${img.w}" height="${img.h}" alt="${esc(img.alt)}"${eager ? '' : ' loading="lazy"'} decoding="async"${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ''}${img.pos ? ` style="object-position:${esc(img.pos)}"` : ''} data-source="${sourceOf(img)}">`;
}

// Where a picture comes from: the shop's own, a licensed library photograph, or a generated stand-in.
export function sourceOf(img) {
  return img.generated ? 'generated' : img.standIn ? 'stand-in' : img.enhanced ? 'client-enhanced' : 'client';
}

export function findItem(menu, id) {
  for (const cat of menu.categories) {
    for (const g of cat.groups) {
      const it = g.items.find((i) => i.id === id);
      if (it) return { ...it, category: cat.id, group: g.label };
    }
  }
  return null;
}

export function lowestPrice(menu) {
  let min = Infinity;
  for (const cat of menu.categories) for (const g of cat.groups) for (const i of g.items) min = Math.min(min, i.price);
  return min;
}
