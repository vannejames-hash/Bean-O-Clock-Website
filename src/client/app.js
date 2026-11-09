// Storefront behaviour: cart, item options, order-ahead flow, delivery, navigation details.
// Reads everything business-specific from #store-data, so it is shared by every client build.

const data = JSON.parse(document.getElementById('store-data').textContent);
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const money = (n) => `${data.currency}${Number(n).toLocaleString('en-PH')}`;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

const ICON = {
  close: '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>',
  plus: '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg>',
  minus: '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
  arrow: '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>',
  clock: '<svg class="icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  check: '<svg class="icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
};

/* ---------- The brand figure: a rig of joints ----------
   A client's brand kit can draw a figure (`[data-figure]`) as nested joints (`[data-j]`, each placed by
   data-x/data-y and turned by an angle) with the pose table printed as #figure-poses. Here it is posed,
   tweened between poses, walked, and given small idle loops. Everything lands on its final pose even
   when animation frames stall (a background tab), and nothing moves under reduced motion. */
const POSES = (() => { try { return JSON.parse($('#figure-poses')?.textContent || '{}'); } catch { return {}; } })();
const JOINTS = ['sF', 'eF', 'sB', 'eB', 'hF', 'kF', 'hB', 'kB', 'hd', 'y', 'cup', 'bob'];
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const poseOf = (name) => ({ bob: 0, cup: 0, y: 0, ...POSES.stand, ...(typeof name === 'string' ? POSES[name] : name) });
function applyPose(svg, p) {
  svg._pose = p;
  for (const g of svg.querySelectorAll('[data-j]')) {
    const j = g.dataset.j;
    if (j === 'root') { g.setAttribute('transform', `translate(${g.dataset.x} ${(Number(g.dataset.y) + (p.y || 0) + (p.bob || 0)).toFixed(2)})`); continue; }
    g.setAttribute('transform', `translate(${g.dataset.x} ${g.dataset.y}) rotate(${(p[j] || 0).toFixed(2)})`);
  }
  for (const h of svg.querySelectorAll('[data-hold]')) {
    const s = h.dataset.hold === 'front' ? 'F' : 'B';
    h.setAttribute('transform', `rotate(${(-(p[`s${s}`] + p[`e${s}`]) + (p.cup || 0)).toFixed(2)})`);
  }
}
function stopMotion(svg) { cancelAnimationFrame(svg._raf); clearTimeout(svg._settle); svg._loop = null; }
// Tween to a pose. Resolves when it lands.
function pose(svg, name, { dur = 700 } = {}) {
  if (!svg) return Promise.resolve();
  stopMotion(svg);
  const to = poseOf(name);
  if (reduceMotion || !svg._pose) { applyPose(svg, to); return Promise.resolve(); }
  const from = { ...svg._pose };
  return new Promise((done) => {
    const t0 = performance.now();
    const land = () => { stopMotion(svg); applyPose(svg, to); done(); };
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      const e = easeInOut(t);
      const p = {};
      for (const k of JOINTS) p[k] = (from[k] || 0) + ((to[k] || 0) - (from[k] || 0)) * e;
      applyPose(svg, p);
      if (t < 1) svg._raf = requestAnimationFrame(step); else land();
    };
    svg._raf = requestAnimationFrame(step);
    svg._settle = setTimeout(land, dur + 500);
  });
}
// A loop around a base pose: `fn(phase)` returns the joints that move. Runs until the next pose() or stopMotion().
function loop(svg, base, fn, period) {
  if (!svg || reduceMotion) return;
  stopMotion(svg);
  const b = poseOf(base);
  const t0 = performance.now();
  const tick = (now) => {
    const ph = (((now - t0) / period) % 1) * Math.PI * 2;
    applyPose(svg, { ...b, ...fn(ph) });
    svg._raf = requestAnimationFrame(tick);
  };
  svg._raf = requestAnimationFrame(tick);
}
const rad = (d) => (d * Math.PI) / 180;
// The walk: legs swing from the hips, the trailing knee bends, the free arm swings against its leg, the body bobs.
const walkCycle = (ph) => {
  const s = Math.sin(ph);
  const swing = 24;
  return {
    hF: -swing * s, hB: swing * s,
    kF: 34 * Math.max(0, Math.cos(ph)) , kB: 34 * Math.max(0, -Math.cos(ph)),
    sB: 14 - 22 * s, eB: 18, sF: -14 + 5 * s,
    hd: -4 + 2 * Math.sin(2 * ph),
    bob: 88 * (1 - Math.cos(rad(swing * Math.abs(s)))),
  };
};
function walk(svg) { loop(svg, 'carry', walkCycle, 860); }
// Init: every figure starts on the pose it was drawn in.
$$('[data-figure]').forEach((svg) => applyPose(svg, poseOf(svg.dataset.pose)));

// Clone a figure from its <template>, with its clip-path ids made unique.
function figure(id) {
  const t = document.getElementById(id);
  if (!t) return '';
  const uid = `k${Math.random().toString(36).slice(2, 8)}`;
  const old = (t.innerHTML.match(/clipPath id="([^"]+)"/) || [])[1];
  return old ? t.innerHTML.split(old).join(uid) : t.innerHTML;
}

/* ---------- Catalogue ---------- */
const ITEMS = new Map();
for (const cat of data.categories) {
  for (const g of cat.groups) {
    for (const it of g.items) ITEMS.set(it.id, { ...it, catName: cat.name, groupLabel: g.label });
  }
}
const ADDONS = new Map(data.addOns.map((a) => [a.id, a]));
// Espresso-ice-cream rows carry only a flavour name; show the group with it.
const displayName = (it) => (it.groupLabel && /ice cream/i.test(it.groupLabel) ? `Espresso + ice cream, ${it.name}` : it.name);

/* ---------- State ---------- */
const KEY = `storefront:${data.name}:v1`;
const blank = () => ({ cart: [], pickup: { date: null, time: null }, details: { name: '', mobile: '', notes: '' } });
let state = (() => {
  try { return { ...blank(), ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return blank(); }
})();
state.cart = (state.cart || []).filter((l) => ITEMS.has(l.id));
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* private mode */ } };

const unitPrice = (l) => ITEMS.get(l.id).price + (l.addOns || []).reduce((s, a) => s + (ADDONS.get(a)?.price || 0), 0);
const lineTotal = (l) => unitPrice(l) * l.qty;
const cartCount = () => state.cart.reduce((s, l) => s + l.qty, 0);
const cartTotal = () => state.cart.reduce((s, l) => s + lineTotal(l), 0);
const lineKey = (l) => [l.id, l.temp || '', l.choice || '', [...(l.addOns || [])].sort().join('+')].join('|');
const optsText = (l) => [l.temp, l.choice, ...(l.addOns || []).map((a) => ADDONS.get(a)?.name)].filter(Boolean).join(' · ');

function addLine(line) {
  const k = lineKey(line);
  const found = state.cart.find((l) => lineKey(l) === k);
  if (found) found.qty += line.qty; else state.cart.push(line);
  save();
  syncBadges(true);
}

function syncBadges(bump = false) {
  const n = cartCount();
  $$('[data-count]').forEach((el) => {
    el.textContent = n;
    if (el.classList.contains('count')) {
      el.hidden = n === 0;
      if (bump && !reduceMotion) { el.removeAttribute('data-bump'); void el.offsetWidth; el.setAttribute('data-bump', ''); }
    }
  });
  $$('[data-total]').forEach((el) => { el.textContent = money(cartTotal()); });
  const bar = $('[data-actionbar]');
  if (bar) {
    $('.actionbar__idle', bar).hidden = n > 0;
    $('.actionbar__cart', bar).hidden = n === 0;
  }
}

/* ---------- Sheets ---------- */
let openSheets = 0;
function openSheet(dlg) {
  if (dlg.open) return;
  dlg.showModal();
  openSheets++;
  document.documentElement.classList.add('has-sheet');
  updateActionBar();
}
function closeSheet(dlg) {
  if (!dlg.open || dlg.classList.contains('is-closing')) return;
  const finish = () => {
    dlg.classList.remove('is-closing');
    dlg.close();
    openSheets = Math.max(0, openSheets - 1);
    if (!openSheets) document.documentElement.classList.remove('has-sheet');
    updateActionBar();
  };
  if (reduceMotion) return finish();
  dlg.classList.add('is-closing');
  setTimeout(finish, 280);
}
$$('dialog.sheet').forEach((dlg) => {
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeSheet(dlg); });
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target.closest('[data-close]')) closeSheet(dlg);
  });
});

/* ---------- Item sheet ---------- */
const itemSheet = $('#item-sheet');
const itemForm = $('[data-item-form]');

function openItem(id) {
  const it = ITEMS.get(id);
  if (!it) return;
  const img = it.photo && data.images[it.photo];
  const temps = it.temp ? ['Iced', 'Hot'] : [];
  itemForm.innerHTML = `
    <header class="sheet__head">
      <div class="sheet__titles">
        <h2 class="sheet__title" id="item-title">${esc(displayName(it))}</h2>
        <p class="sheet__step">${esc(it.catName)}</p>
      </div>
      <button class="icon-btn" type="button" data-close>${ICON.close}<span class="sr-only">Close</span></button>
    </header>
    <div class="sheet__body">
      ${img ? `<div class="item__photo ${img.round ? 'item__photo--round' : ''}"><img src="assets/img/${esc(img.src)}" alt="${esc(img.alt)}" width="${img.w}" height="${img.h}" style="object-position:${esc(img.pos || '50% 50%')}"></div>` : ''}
      <p class="item__price">${money(it.price)}</p>
      ${temps.length ? `
      <fieldset class="field-set">
        <legend class="label">Iced or hot</legend>
        <div class="segmented">${temps.map((t, i) => `<label><input type="radio" name="temp" value="${t}" ${i === 0 ? 'checked' : ''}><span>${t}</span></label>`).join('')}</div>
      </fieldset>` : ''}
      ${it.choices ? `
      <fieldset class="field-set">
        <legend class="label">${esc(it.choices.label)}</legend>
        <div class="chips">${it.choices.options.map((o, i) => `<label class="chip"><input type="radio" name="choice" value="${esc(o)}" ${i === 0 ? 'checked' : ''}><span>${esc(o)}</span></label>`).join('')}</div>
      </fieldset>` : ''}
      <fieldset class="field-set">
        <legend class="label">Add-ons <span class="label__note">optional</span></legend>
        <div class="checks">${data.addOns.map((a) => `<label class="check"><input type="checkbox" name="addOns" value="${esc(a.id)}"><span>${esc(a.name)}</span><span class="price">+${money(a.price)}</span></label>`).join('')}</div>
      </fieldset>
    </div>
    <footer class="sheet__foot item__foot">
      <div class="stepper" role="group" aria-label="Quantity">
        <button type="button" data-qty="-1">${ICON.minus}<span class="sr-only">One less</span></button>
        <output name="qty" aria-live="polite">1</output>
        <button type="button" data-qty="1">${ICON.plus}<span class="sr-only">One more</span></button>
      </div>
      <button class="btn btn--dark" type="submit" value="add"><span>Add<span class="wide-only"> to order</span></span><span data-item-total>${money(it.price)}</span></button>
    </footer>`;
  itemForm.dataset.id = id;
  itemForm.dataset.quantity = '1';
  openSheet(itemSheet);
  $('.sheet__body', itemForm).scrollTop = 0;
}

function readItemForm() {
  const fd = new FormData(itemForm);
  return {
    id: itemForm.dataset.id,
    temp: fd.get('temp') || null,
    choice: fd.get('choice') || null,
    addOns: fd.getAll('addOns'),
    qty: Number(itemForm.dataset.quantity || 1),
  };
}
function refreshItemTotal() {
  const line = readItemForm();
  $('[data-item-total]', itemForm).textContent = money(lineTotal(line));
  $('output[name=qty]', itemForm).textContent = line.qty;
}
itemForm.addEventListener('change', refreshItemTotal);
itemForm.addEventListener('click', (e) => {
  const b = e.target.closest('[data-qty]');
  if (!b) return;
  itemForm.dataset.quantity = String(Math.min(20, Math.max(1, Number(itemForm.dataset.quantity) + Number(b.dataset.qty))));
  refreshItemTotal();
});
itemForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const line = readItemForm();
  addLine(line);
  closeSheet(itemSheet);
  flashAdded(lastTrigger);
  toast(`${line.qty > 1 ? `${line.qty} × ` : ''}${displayName(ITEMS.get(line.id))} added`);
  if (orderSheet.open) renderOrder();
});

// The row or card the drink was picked from answers with a check for a moment.
let lastTrigger = null;
function flashAdded(el) {
  if (!el || !document.contains(el)) return;
  el.removeAttribute('data-added');
  void el.offsetWidth;
  el.setAttribute('data-added', '');
  clearTimeout(el._addedTimer);
  el._addedTimer = setTimeout(() => el.removeAttribute('data-added'), 1600);
}

/* ---------- Toast ---------- */
const toastEl = $('[data-toast]');
let toastTimer;
function toast(msg) {
  toastEl.innerHTML = `<span>${esc(msg)}</span><button type="button" data-open-order>View order</button>`;
  toastEl.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toastEl.hidden = true; }, 3600);
}
toastEl.addEventListener('mouseenter', () => clearTimeout(toastTimer));
toastEl.addEventListener('mouseleave', () => { toastTimer = setTimeout(() => { toastEl.hidden = true; }, 1600); });

/* ---------- Pickup times ---------- */
const P = data.pickup;
const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
const fmtTime = (min) => {
  const h = Math.floor(min / 60), m = min % 60;
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
};
const dayKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function pickupDays() {
  const now = new Date();
  const open = toMin(P.window.open), close = toMin(P.window.close);
  const days = [];
  for (let i = 0; i < P.daysAhead + 1 && days.length < P.daysAhead; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    let first = open;
    if (i === 0) {
      const earliest = now.getHours() * 60 + now.getMinutes() + P.leadMinutes;
      first = Math.max(open, Math.ceil(earliest / P.slotMinutes) * P.slotMinutes);
    }
    const slots = [];
    for (let t = first; t <= close - P.slotMinutes; t += P.slotMinutes) slots.push(t);
    if (!slots.length) continue;
    const label = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-PH', { weekday: 'short' });
    days.push({ key: dayKey(d), label, sub: d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' }), slots });
  }
  return days;
}
function pickupText(p = state.pickup) {
  const day = pickupDays().find((d) => d.key === p.date);
  if (!day || p.time == null) return null;
  return `${day.label}, ${day.sub} · ${fmtTime(p.time)}`;
}

/* ---------- Order sheet ---------- */
const orderSheet = $('#order-sheet');
const body = $('[data-order-body]');
const foot = $('[data-order-foot]');
const STEPS = ['cart', 'pickup', 'details', 'review'];
const STEP_NAME = { cart: 'Your drinks', pickup: 'Pickup time', details: 'Your details', review: 'Check and place' };
let step = 'cart';
let lastOrder = null;

function setHeader() {
  const i = STEPS.indexOf(step);
  $('#order-title').textContent = step === 'done' ? 'Order received' : 'Your order';
  $('[data-step-label]').textContent = step === 'done' ? data.demo.banner : `Step ${i + 1} of ${STEPS.length} · ${STEP_NAME[step]}`;
  $('[data-progress]').style.transform = `scaleX(${step === 'done' ? 1 : (i + 1) / STEPS.length})`;
  $('[data-step-back]').hidden = i <= 0;
}

function go(next) {
  step = next;
  renderOrder();
  body.scrollTop = 0;
  const focusTarget = $('h3, legend, input, button', body);
  if (focusTarget && document.activeElement && orderSheet.contains(document.activeElement)) {
    $('#order-title').setAttribute('tabindex', '-1');
    $('#order-title').focus({ preventScroll: true });
  }
}

function renderOrder() {
  setHeader();
  const views = { cart: viewCart, pickup: viewPickup, details: viewDetails, review: viewReview, done: viewDone };
  views[step]();
}

function viewCart() {
  if (!state.cart.length) {
    const fig = figure('tpl-figure-empty');
    body.innerHTML = `
      <div class="empty">
        ${fig ? `<div class="empty__figure">${fig}</div>` : ''}
        <h3 class="h3">${esc(data.copy?.emptyTitle || 'Nothing here yet.')}</h3>
        <p>${esc(data.copy?.emptyText || 'Pick a drink from the menu and it will wait here while you choose a pickup time.')}</p>
        <button class="btn btn--dark" type="button" data-browse>Browse the menu ${ICON.arrow}</button>
      </div>`;
    foot.innerHTML = '';
    foot.hidden = true;
    return;
  }
  foot.hidden = false;
  body.innerHTML = `
    <ul role="list">
      ${state.cart.map((l, i) => {
        const it = ITEMS.get(l.id);
        return `
        <li class="cart-line" data-line="${i}">
          <span class="cart-line__name">${esc(displayName(it))}</span>
          <span class="cart-line__price">${money(lineTotal(l))}</span>
          ${optsText(l) ? `<span class="cart-line__opts">${esc(optsText(l))}</span>` : ''}
          <div class="cart-line__controls">
            <div class="stepper" role="group" aria-label="Quantity of ${esc(displayName(it))}">
              <button type="button" data-line-qty="-1">${ICON.minus}<span class="sr-only">One less</span></button>
              <output aria-live="polite">${l.qty}</output>
              <button type="button" data-line-qty="1">${ICON.plus}<span class="sr-only">One more</span></button>
            </div>
            <button class="cart-line__remove" type="button" data-line-remove>Remove</button>
          </div>
        </li>`;
      }).join('')}
    </ul>
    <p style="margin-top:20px"><button class="link-action link-action--ink" type="button" data-browse>Add another drink ${ICON.plus}</button></p>`;
  foot.innerHTML = `
    <div class="foot-sum"><span>Total, paid at pickup</span><strong>${money(cartTotal())}</strong></div>
    <button class="btn btn--dark" type="button" data-next="pickup">Choose a pickup time ${ICON.arrow}</button>`;
}

// The pickup readout: the brand figure when the client has one (its arms turn to the chosen time),
// else the logo's dial, small. Angles carry over between renders so the hands travel, not jump.
let handAngles = null;
const turnTo = (prev, raw) => prev + ((((raw - prev) % 360) + 540) % 360) - 180;
function pickDial(t) {
  const raw = { h: ((t / 60) % 12) * 30, m: (t % 60) * 6 };
  const from = handAngles || raw;
  const to = { h: turnTo(from.h, raw.h), m: turnTo(from.m, raw.m) };
  handAngles = to;
  const cx = 300, cy = 250;
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180, r1 = 180, r2 = i % 3 === 0 ? 222 : 208;
    ticks += `<line x1="${(cx + r1 * Math.sin(a)).toFixed(1)}" y1="${(cy - r1 * Math.cos(a)).toFixed(1)}" x2="${(cx + r2 * Math.sin(a)).toFixed(1)}" y2="${(cy - r2 * Math.cos(a)).toFixed(1)}"/>`;
  }
  const hand = (k, len) => `<g class="pick-dial__hand pick-dial__hand--${k}" data-pick-hand="${k}" data-to="${to[k]}" style="transform:rotate(${from[k]}deg)"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy - len}"/></g>`;
  return `
    <svg class="pick-dial" viewBox="0 0 600 560" aria-hidden="true">
      <circle class="pick-dial__ring" cx="${cx}" cy="${cy}" r="246"/>
      <g class="pick-dial__ticks">${ticks}</g>
      ${hand('h', 110)}${hand('m', 165)}
      <circle class="pick-dial__pin" cx="${cx}" cy="${cy}" r="18"/>
      <path class="pick-dial__ground" d="M12 540 Q300 470 588 540"/>
    </svg>`;
}

function viewPickup() {
  const days = pickupDays();
  if (!days.some((d) => d.key === state.pickup.date)) state.pickup = { date: days[0]?.key ?? null, time: null };
  const day = days.find((d) => d.key === state.pickup.date);
  if (day && !day.slots.includes(state.pickup.time)) state.pickup.time = null;
  const chosen = state.pickup.time;
  const shown = chosen ?? day?.slots[0];
  const fig = figure('tpl-figure-watch');
  body.innerHTML = `
    ${shown != null ? `
    <div class="pick-readout${chosen == null ? ' is-empty' : ''}">
      ${fig ? `<div class="pick-figure">${fig}</div>` : pickDial(shown)}
      <div>
        <p class="label">${day ? `${esc(day.label)}, ${esc(day.sub)}` : 'Pickup'}</p>
        <p class="pick-readout__time">${chosen == null ? 'Choose a time' : fmtTime(chosen)}</p>
      </div>
    </div>` : ''}
    <fieldset class="field-set" style="margin-top:0">
      <legend class="label">Day</legend>
      <div class="chips">${days.map((d) => `<label class="chip"><input type="radio" name="pickup-day" value="${d.key}" ${d.key === state.pickup.date ? 'checked' : ''}><span>${esc(d.label)} <span class="muted">${esc(d.sub)}</span></span></label>`).join('')}</div>
    </fieldset>
    <fieldset class="field-set">
      <legend class="label">Time</legend>
      ${day ? [['Morning', 0, 720], ['Afternoon', 720, 1020], ['Evening', 1020, 1440]].map(([label, from, to]) => {
        const slots = day.slots.filter((t) => t >= from && t < to);
        return slots.length ? `
        <div class="slot-group" role="group" aria-label="${label}">
          <p class="slot-group__label">${label}</p>
          <div class="chips slots">${slots.map((t) => `<label class="chip"><input type="radio" name="pickup-time" value="${t}" ${t === state.pickup.time ? 'checked' : ''}><span>${fmtTime(t)}</span></label>`).join('')}</div>
        </div>` : '';
      }).join('') : ''}
    </fieldset>
    <p class="note">${ICON.clock}<span>${esc(data.demo.pickupNote)}</span></p>`;
  foot.innerHTML = `
    <div class="foot-sum"><span>${esc(pickupText() || 'Pick a time')}</span><strong>${money(cartTotal())}</strong></div>
    <button class="btn btn--dark" type="button" data-next="details" ${state.pickup.time == null ? 'disabled' : ''}>Continue ${ICON.arrow}</button>`;
  const hands = $$('[data-pick-hand]', body);
  if (hands.length) {
    hands[0].getBoundingClientRect(); // commit the old angle so the change transitions
    hands.forEach((g) => { g.style.transform = `rotate(${g.dataset.to}deg)`; });
  }
}

function viewDetails() {
  const d = state.details;
  body.innerHTML = `
    <form data-details novalidate>
      <div class="field">
        <label for="f-name">Name for the order</label>
        <input id="f-name" name="name" autocomplete="name" value="${esc(d.name)}" required>
        <p class="error" id="e-name" hidden></p>
      </div>
      <div class="field">
        <label for="f-mobile">Mobile number</label>
        <span class="hint" id="h-mobile">In case the shop needs to reach you about the order.</span>
        <input id="f-mobile" name="mobile" type="tel" inputmode="tel" autocomplete="tel" placeholder="0917 123 4567" value="${esc(d.mobile)}" aria-describedby="h-mobile e-mobile" required>
        <p class="error" id="e-mobile" hidden></p>
      </div>
      <div class="field">
        <label for="f-notes">Notes <span class="muted">(optional)</span></label>
        <textarea id="f-notes" name="notes" placeholder="Less ice, extra hot, anything the bar should know">${esc(d.notes)}</textarea>
      </div>
    </form>`;
  foot.innerHTML = `<button class="btn btn--dark" type="button" data-validate>Review order ${ICON.arrow}</button>`;
}

function validateDetails() {
  const form = $('[data-details]', body);
  const fd = new FormData(form);
  const name = String(fd.get('name') || '').trim();
  const mobileRaw = String(fd.get('mobile') || '').trim();
  const digits = mobileRaw.replace(/\D/g, '');
  const okMobile = /^09\d{9}$/.test(digits) || /^639\d{9}$/.test(digits);
  const set = (field, msg) => {
    const wrap = $(`#f-${field}`, form).closest('.field');
    const err = $(`#e-${field}`, form);
    if (msg) { wrap.setAttribute('data-invalid', ''); err.textContent = msg; err.hidden = false; $(`#f-${field}`, form).setAttribute('aria-invalid', 'true'); }
    else { wrap.removeAttribute('data-invalid'); err.hidden = true; $(`#f-${field}`, form).removeAttribute('aria-invalid'); }
  };
  set('name', name.length >= 2 ? '' : 'Add the name the barista should call.');
  set('mobile', okMobile ? '' : 'Use an 11-digit mobile number, like 0917 123 4567.');
  state.details = { name, mobile: mobileRaw, notes: String(fd.get('notes') || '').trim() };
  save();
  if (name.length < 2) return $('#f-name', form).focus();
  if (!okMobile) return $('#f-mobile', form).focus();
  go('review');
}

function viewReview() {
  const d = state.details;
  body.innerHTML = `
    <dl>
      <div class="summary">
        <div class="summary__head"><dt class="label">Pickup</dt><button class="edit-link" type="button" data-next="pickup">Change</button></div>
        <dd>${esc(pickupText())}</dd>
      </div>
      <div class="summary">
        <div class="summary__head"><dt class="label">For</dt><button class="edit-link" type="button" data-next="details">Change</button></div>
        <dd>${esc(d.name)} · ${esc(d.mobile)}${d.notes ? `<br><span class="muted">${esc(d.notes)}</span>` : ''}</dd>
      </div>
      <div class="summary">
        <div class="summary__head"><dt class="label">Drinks</dt><button class="edit-link" type="button" data-next="cart">Change</button></div>
        <dd><ul class="summary-items" role="list">${state.cart.map((l) => `<li><span>${l.qty} × ${esc(displayName(ITEMS.get(l.id)))}${optsText(l) ? `<small>${esc(optsText(l))}</small>` : ''}</span><span>${money(lineTotal(l))}</span></li>`).join('')}</ul></dd>
      </div>
    </dl>
    <div class="totals"><div class="grand"><span>Total, paid at pickup</span><span>${money(cartTotal())}</span></div></div>
    <p class="note">${ICON.clock}<span>${esc(data.demo.orderNote)}</span></p>`;
  foot.innerHTML = `<button class="btn btn--dark" type="button" data-place>Place order ${ICON.arrow}</button>`;
}

function viewDone() {
  const o = lastOrder;
  foot.hidden = false;
  body.innerHTML = `
    <div class="ticket">
      ${figure('tpl-figure-cheers') ? `<div class="ticket__figure">${figure('tpl-figure-cheers')}</div>` : `<div class="ticket__mark">${ICON.check}</div>`}
      <h3 class="h3">Thanks, ${esc(o.name.split(' ')[0])}.</h3>
      <p class="ticket__demo">${esc(data.demo.orderNote)}</p>
      <div class="ticket__body">
        <div class="ticket__row"><span>Shop</span><strong>${esc(data.name)}</strong></div>
        <div class="ticket__row"><span>Order</span><strong>${esc(o.number)}</strong></div>
        <div class="ticket__row"><span>Pickup</span><strong>${esc(o.pickup)}</strong></div>
        <div class="ticket__row"><span>Drinks</span><strong>${o.lines.map((l) => `${l.qty} × ${esc(l.name)}`).join('<br>')}</strong></div>
        <div class="ticket__row"><span>Total, paid at pickup</span><strong>${money(o.total)}</strong></div>
      </div>
    </div>`;
  foot.innerHTML = `<button class="btn btn--dark" type="button" data-new-order>Start a new order</button>`;
}

function placeOrder() {
  lastOrder = {
    number: `BOC-${String(Math.floor(1000 + Math.random() * 9000))}`,
    name: state.details.name,
    pickup: pickupText(),
    lines: state.cart.map((l) => ({ qty: l.qty, name: displayName(ITEMS.get(l.id)) })),
    total: cartTotal(),
  };
  state.cart = [];
  state.pickup = { date: null, time: null };
  save();
  syncBadges();
  go('done');
}

orderSheet.addEventListener('click', (e) => {
  const t = e.target;
  const next = t.closest('[data-next]');
  if (next) return go(next.dataset.next);
  if (t.closest('[data-step-back]')) return go(STEPS[Math.max(0, STEPS.indexOf(step) - 1)]);
  if (t.closest('[data-validate]')) return validateDetails();
  if (t.closest('[data-place]')) return placeOrder();
  if (t.closest('[data-new-order]')) { step = 'cart'; closeSheet(orderSheet); return; }
  if (t.closest('[data-browse]')) { closeSheet(orderSheet); setTimeout(() => $('#menu').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }), 120); return; }
  const lineEl = t.closest('[data-line]');
  if (lineEl) {
    const i = Number(lineEl.dataset.line);
    const q = t.closest('[data-line-qty]');
    if (q) {
      state.cart[i].qty += Number(q.dataset.lineQty);
      const removed = state.cart[i].qty < 1;
      if (removed) state.cart.splice(i, 1);
      save(); syncBadges(true); renderOrder();
      if (!removed && !reduceMotion) $$(`[data-line="${i}"] :is(output, .cart-line__price)`, body).forEach((el) => el.classList.add('bump'));
    } else if (t.closest('[data-line-remove]')) {
      lineEl.classList.add('is-leaving');
      setTimeout(() => { state.cart.splice(i, 1); save(); syncBadges(); renderOrder(); }, reduceMotion ? 0 : 200);
    }
  }
});
orderSheet.addEventListener('change', (e) => {
  if (e.target.name === 'pickup-day') { state.pickup = { date: e.target.value, time: null }; save(); viewPickup(); }
  if (e.target.name === 'pickup-time') { state.pickup.time = Number(e.target.value); save(); viewPickup(); $(`input[name=pickup-time][value="${state.pickup.time}"]`, body)?.focus(); }
});
orderSheet.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && step === 'details' && e.target.matches('input')) { e.preventDefault(); validateDetails(); }
});

function openOrder() {
  if (step === 'done' || !state.cart.length) step = 'cart';
  renderOrder();
  if (!orderSheet.open) openSheet(orderSheet);
}

/* ---------- Delivery ---------- */
function openDelivery() {
  if (data.delivery.url) { window.open(data.delivery.url, '_blank', 'noopener'); return; }
  openSheet($('#delivery-sheet'));
}

/* ---------- Global clicks ---------- */
document.addEventListener('click', (e) => {
  const t = e.target;
  const item = t.closest('[data-item]');
  if (item) { e.preventDefault(); lastTrigger = item; return openItem(item.dataset.item); }
  if (t.closest('[data-open-order]')) {
    e.preventDefault();
    toastEl.hidden = true;
    if (itemSheet.open) closeSheet(itemSheet);
    return openOrder();
  }
  if (t.closest('[data-delivery]')) { e.preventDefault(); return openDelivery(); }
  const toggle = t.closest('[data-menu-toggle]');
  if (toggle) {
    const menu = $('#mobile-menu');
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    $('.sr-only', toggle).textContent = open ? 'Close the menu' : 'Open the menu';
    menu.hidden = !open;
    return;
  }
  if (t.closest('#mobile-menu a')) {
    $('[data-menu-toggle]').setAttribute('aria-expanded', 'false');
    $('#mobile-menu').hidden = true;
  }
});

/* ---------- Nav, action bar, menu index, scroll moment ---------- */
const nav = $('[data-nav]');
const bar = $('[data-actionbar]');
let heroActionVisible = true;
let closeVisible = false;
function updateActionBar() {
  if (!bar) return;
  const show = !heroActionVisible && !closeVisible && !openSheets;
  bar.toggleAttribute('data-show', show);
}
const heroAction = $('[data-hero-action]');
if (heroAction) {
  new IntersectionObserver(([en]) => { heroActionVisible = en.isIntersecting; updateActionBar(); }).observe(heroAction);
}
const closeActions = $('.close__actions');
if (closeActions) {
  new IntersectionObserver(([en]) => { closeVisible = en.isIntersecting; updateActionBar(); }).observe(closeActions);
}

const links = new Map($$('[data-cat-link]').map((a) => [a.dataset.catLink, a]));
const cats = $$('[data-cat]');
const indexList = $('.menu__index ul');
const ink = $('.menu__ink');
let activeCat = null;
function placeInk() {
  const a = links.get(activeCat);
  if (!ink || !a) return;
  ink.style.setProperty('--ink-x', `${a.offsetLeft}px`);
  ink.style.setProperty('--ink-w', a.offsetWidth);
  ink.style.setProperty('--ink-on', 1);
}
function updateIndex() {
  if (!cats.length) return;
  const line = (nav?.offsetHeight || 64) + (indexList?.offsetHeight || 52) + 80;
  let id = cats[0].dataset.cat;
  for (const s of cats) if (s.getBoundingClientRect().top <= line) id = s.dataset.cat;
  if (id === activeCat) return;
  activeCat = id;
  links.forEach((a, k) => a.setAttribute('aria-current', String(k === id)));
  placeInk();
  const a = links.get(id);
  if (a && indexList) {
    const li = a.parentElement;
    const left = li.offsetLeft - 24;
    const right = li.offsetLeft + li.offsetWidth + 24 - indexList.clientWidth;
    if (indexList.scrollLeft > left) indexList.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
    else if (indexList.scrollLeft < right) indexList.scrollTo({ left: right, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
}
addEventListener('resize', placeInk);
document.fonts?.ready.then(placeInk);

/* ---------- Clocks: every clock on the page tells the time in Tagum (Asia/Manila) ---------- */
function tagumNow() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  return { h: get('hour') % 24, m: get('minute') };
}
const timeText = ({ h, m }) => `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;


// The order band: the watch's face, blown up, keeps the time in Tagum; the barista raises a wrist to read it.
const clock = $('[data-clock]');
function tickClock() {
  if (!clock) return;
  $('[data-clock-time]', clock).textContent = timeText(tagumNow()).replace(/ (AM|PM)$/, (m) => m.toLowerCase());
}
tickClock();
setInterval(tickClock, 20000);

/* ---------- Once in view: reveals, and the figures' moments ---------- */
const seen = (el, fn, opts = { threshold: 0.3, rootMargin: '0px 0px -6% 0px' }) => {
  if (!el) return;
  if (reduceMotion || !('IntersectionObserver' in window)) return fn();
  new IntersectionObserver(([en], io) => { if (en.isIntersecting) { io.disconnect(); fn(); } }, opts).observe(el);
};
// A masked photograph is watched through its parent: while it is clipped shut it has no visible box of its own.
$$('[data-m]').forEach((el) => seen(el.dataset.m === 'mask' ? el.parentElement : el, () => el.classList.add('is-in'), { threshold: el.dataset.m === 'draw' ? 0.15 : 0.3, rootMargin: '0px 0px -6% 0px' }));

const clockFigure = clock && $('[data-clock-figure] [data-figure]', clock);
if (clockFigure && !reduceMotion) {
  applyPose(clockFigure, poseOf('carry'));
  seen(clock, () => setTimeout(() => pose(clockFigure, 'watch', { dur: 800 }), 350), { threshold: 0.5 });
}

/* ---------- The hero: the barista walks in from the right, past the cup, turns, and raises a cup ---------- */
const enterHero = $('.hero[data-enter]');
const heroBox = $('[data-hero-figure]');
const heroFigure = heroBox && $('[data-figure]', heroBox);
let heroDone = !enterHero || reduceMotion;
function heroLanded() {
  heroDone = true;
  enterHero?.removeAttribute('data-enter');
  heroBox?.style.removeProperty('translate');
  heroFigure?.classList.remove('is-mirror');
  requestAnimationFrame(layoutThread);
}
if (enterHero && heroFigure && !reduceMotion) {
  const walkIn = 1500;
  heroFigure.classList.add('is-mirror');
  applyPose(heroFigure, poseOf('carry'));
  // Pin the start (offstage right, from the CSS) inline, so the move has a committed place to start from.
  heroBox.style.translate = getComputedStyle(heroBox).translate;
  setTimeout(() => {
    walk(heroFigure);
    void heroBox.offsetWidth;
    heroBox.style.transition = `translate ${walkIn}ms cubic-bezier(0.25, 0.1, 0.3, 1)`;
    requestAnimationFrame(() => { heroBox.style.translate = '0 0'; });
    setTimeout(() => { heroBox.style.translate = '0 0'; }, 60);
  }, 400);
  setTimeout(() => {
    heroFigure.classList.remove('is-mirror');
    pose(heroFigure, 'stand', { dur: 220 }).then(() => pose(heroFigure, 'cheers', { dur: 650 }));
  }, 400 + walkIn);
  // The entrance is decoration: if the animation clock stalls (background tab, capture tools), land it.
  setTimeout(() => { if (!heroDone) { applyPose(heroFigure, poseOf('cheers')); } heroLanded(); }, 3300);
} else if (enterHero) {
  setTimeout(heroLanded, reduceMotion ? 0 : 2800);
}

/* ---------- The usual: the barista on the arch takes a sip now and then ---------- */
const usualFigure = $('[data-figure-idle="sip"] [data-figure]');
if (usualFigure && !reduceMotion) {
  let sipping = null;
  const sip = async () => { await pose(usualFigure, 'sitSip', { dur: 700 }); await new Promise((r) => setTimeout(r, 1100)); await pose(usualFigure, 'sit', { dur: 700 }); };
  seen(usualFigure, () => { sip(); sipping = setInterval(sip, 6500); }, { threshold: 0.6 });
}

/* ---------- Visit: the barista walks in along the route, stops, and points to the pin ---------- */
const visitHead = $('[data-visit]');
const visitBox = $('[data-visit-figure]');
const visitFigure = visitBox && $('[data-figure]', visitBox);
if (visitHead) {
  const arrive = () => {
    if (!visitFigure || reduceMotion) { visitHead.classList.add('is-pointing'); return; }
    const dist = Math.min(innerWidth * 0.5, 520);
    visitBox.style.translate = `${-dist}px 0`;
    applyPose(visitFigure, poseOf('carry'));
    void visitBox.offsetWidth;
    walk(visitFigure);
    visitBox.style.transition = 'translate 1400ms cubic-bezier(0.3, 0.1, 0.35, 1)';
    visitBox.style.translate = '0 0';
    setTimeout(() => {
      pose(visitFigure, 'point', { dur: 700 });
      setTimeout(() => visitHead.classList.add('is-pointing'), 350);
    }, 1400);
  };
  if (visitFigure && !reduceMotion) { visitBox.style.translate = `${-Math.min(innerWidth * 0.5, 520)}px 0`; applyPose(visitFigure, poseOf('carry')); }
  seen(visitHead, arrive, { threshold: 0.6 });
}

/* ---------- What goes in the cup: the three scenes play in turn as the section arrives ----------
   Tamp (two presses, a puff each), the arrow, the shot runs while the barista checks the watch, the arrow,
   the jug tips and a heart blooms in the cup. Without motion everything is shown done. */
const proc = $('[data-process]');
if (proc) {
  const steps = $$('[data-step]', proc);
  const links = $$('.process__link', proc);
  const fig = (el) => el && $('[data-figure]', el);
  const showAll = () => [...steps, ...links].forEach((el) => el.classList.add('is-on'));
  if (reduceMotion || !('IntersectionObserver' in window) || steps.length < 3) showAll();
  else {
    const [tamp, pull, pour] = steps;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    applyPose(fig(tamp), poseOf('tampUp'));
    applyPose(fig(pull), poseOf('carry'));
    applyPose(fig(pour), poseOf('pourReady'));
    const play = async () => {
      tamp.classList.add('is-on');
      for (let i = 0; i < 2; i++) {
        await pose(fig(tamp), 'tampDown', { dur: 240 });
        tamp.classList.add('is-tamp');
        await wait(180);
        tamp.classList.remove('is-tamp');
        if (i === 0) await pose(fig(tamp), 'tampUp', { dur: 260 });
      }
      links[0]?.classList.add('is-on');
      await wait(450);
      pull.classList.add('is-on');
      await pose(fig(pull), 'watch', { dur: 700 });
      await wait(600);
      links[1]?.classList.add('is-on');
      await wait(450);
      pour.classList.add('is-on');
      await pose(fig(pour), 'pour', { dur: 800 });
    };
    // If the page is captured or backgrounded mid-play, the steps still end shown.
    seen(proc, () => { play(); setTimeout(showAll, 6000); }, { threshold: 0.35 });
  }
}

/* ---------- The thread: one crema line, drawn by the scroll, from the hero's hill down to the usual's arch,
   where it becomes the arch's frame. Wide screens only: on a phone it would cross the words. ---------- */
const threadEnd = $('[data-thread-end]');
const sun = $('.hero__sun');
let thread = null;
function layoutThread() {
  if (!threadEnd || !sun) return;
  const wide = matchMedia('(min-width: 900px)').matches;
  if (!wide || reduceMotion) {
    thread?.remove(); thread = null;
    threadEnd.style.setProperty('--frame-off', 0);
    return;
  }
  const doc = document.documentElement;
  const sy = scrollY;
  const s = sun.getBoundingClientRect();
  const e = threadEnd.getBoundingClientRect();
  const hill = $('.hero').getBoundingClientRect();
  // Out of the ground beside the cup, a swoop to the left, one loop like a pen flourish, down the gap between
  // the arch and the words, and in from below at the arch's foot, so the line carries on as the arch's frame.
  const sleeve = $('.sleeve')?.getBoundingClientRect();
  const body = $('.usual__body')?.getBoundingClientRect();
  const S = { x: s.right - s.width * 0.12, y: hill.bottom + sy - 40 };
  const E = { x: e.right, y: e.bottom + sy };
  const G = { x: body ? (e.right + body.left) / 2 : e.right + 50, y: e.top + sy + e.height * 0.3 };
  const M = { x: G.x + (S.x - G.x) * 0.5, y: (sleeve ? sleeve.bottom + sy : S.y + 200) + 56 };
  const r = 30;
  const d = [
    `M${S.x} ${S.y}`,
    `C ${S.x + 40} ${S.y + 110} ${M.x + 260} ${M.y - 10} ${M.x} ${M.y}`,
    `a ${r} ${r} 0 1 1 0 ${-2 * r} a ${r} ${r} 0 1 1 0 ${2 * r}`,
    `C ${M.x - 200} ${M.y + 10} ${G.x} ${G.y - 240} ${G.x} ${G.y}`,
    `C ${G.x} ${G.y + 280} ${E.x + 14} ${E.y + 80} ${E.x} ${E.y}`,
  ].join(' ');
  if (!thread) {
    thread = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    thread.setAttribute('class', 'thread');
    thread.setAttribute('aria-hidden', 'true');
    thread.innerHTML = '<path/>';
    document.body.appendChild(thread);
  }
  thread.setAttribute('height', doc.scrollHeight);
  thread.style.height = `${doc.scrollHeight}px`;
  const path = thread.firstChild;
  path.setAttribute('d', d);
  const len = path.getTotalLength();
  const samples = [];
  for (let i = 0; i <= 160; i++) { const l = (len * i) / 160; samples.push([l, path.getPointAtLength(l).y]); }
  thread._data = { len, samples, endY: E.y, archTop: e.top + sy };
  path.style.setProperty('--len', len);
  drawThread();
}
function drawThread() {
  if (!thread?._data) return;
  const { len, samples, endY, archTop } = thread._data;
  const line = scrollY + innerHeight * 0.92;
  let drawn = 0;
  for (const [l, y] of samples) { if (y > line) break; drawn = l; }
  if (!heroDone) drawn = 0;
  thread.firstChild.style.setProperty('--off', (len - drawn).toFixed(1));
  // The frame takes over from the line once it has arrived, and is drawn as the arch comes fully into view.
  const reached = drawn >= len - 1;
  const p = reached ? Math.min(1, Math.max(0, (line - endY) / 220)) : 0;
  threadEnd.style.setProperty('--frame-off', (1 - p).toFixed(3));
}

/* ---------- Scroll: the sleeve of words slides with the page ---------- */
const ticker = $('[data-ticker]');
const tickerRun = ticker && $('.sleeve__run', ticker);
function scrollMotion() {
  if (reduceMotion) return;
  const vh = innerHeight;
  if (tickerRun) {
    const r = ticker.getBoundingClientRect();
    if (r.bottom > -40 && r.top < vh + 40) {
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      tickerRun.style.setProperty('--tx', `${(-4 - p * 22).toFixed(2)}%`);
    }
  }
  drawThread();
}

let ticking = false;
function onScroll() {
  nav?.toggleAttribute('data-scrolled', scrollY > 8);
  updateIndex();
  scrollMotion();
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
let resizeTimer;
addEventListener('resize', () => { requestAnimationFrame(onScroll); clearTimeout(resizeTimer); resizeTimer = setTimeout(layoutThread, 150); });
document.fonts?.ready.then(() => layoutThread());
addEventListener('load', () => layoutThread());

layoutThread();
onScroll();
syncBadges();
