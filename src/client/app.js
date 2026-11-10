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
const RIG = (() => { try { return JSON.parse($('#figure-rig')?.textContent || 'null'); } catch { return null; } })();
const JOINTS = ['sF', 'eF', 'sB', 'eB', 'hF', 'kF', 'hB', 'kB', 'hd', 'sp', 'y', 'cup', 'bob'];
// Where a hand is for a pose, in the figure's units: the same sums as the kit's handAt, so a lever stays in it.
function handAt(p, side) {
  if (!RIG) return null;
  const r = Math.PI / 180;
  const [sx, sy] = side === 'F' ? RIG.shoulderF : RIG.shoulderB;
  const s = (p[`s${side}`] || 0) * r, e = ((p[`s${side}`] || 0) + (p[`e${side}`] || 0)) * r;
  const ex = sx - RIG.upperArm * Math.sin(s), ey = sy + RIG.upperArm * Math.cos(s);
  const hx = ex - RIG.foreArm * Math.sin(e), hy = ey + RIG.foreArm * Math.cos(e);
  const [cx, cy] = RIG.waist;
  const a = (p.sp || 0) * r, c = Math.cos(a), sn = Math.sin(a);
  return [cx + (hx - cx) * c - (hy - cy) * sn, cy + (hx - cx) * sn + (hy - cy) * c + (p.y || 0) + (p.bob || 0)];
}
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
    h.setAttribute('transform', `rotate(${(-(p.sp || 0) - p[`s${s}`] - p[`e${s}`] + (p.cup || 0)).toFixed(2)})`);
  }
  // A part of the set the hand holds (the machine's lever) runs from its fixed end to the hand.
  for (const l of svg.querySelectorAll('[data-follow]')) {
    const at = handAt(p, l.dataset.follow);
    if (at) l.setAttribute('d', `M${l.dataset.from} L${at[0].toFixed(2)} ${at[1].toFixed(2)}`);
  }
  // A part that turns about a fixed point to point at the hand (the hero clock's minute hand).
  for (const g of svg.querySelectorAll('[data-aim]')) {
    const at = handAt(p, g.dataset.aim);
    if (!at) continue;
    const [cx, cy] = g.dataset.from.split(' ').map(Number);
    g.setAttribute('transform', `rotate(${((Math.atan2(at[0] - cx, -(at[1] - cy)) * 180) / Math.PI).toFixed(2)} ${cx} ${cy})`);
  }
}
function stopMotion(svg) { cancelAnimationFrame(svg._raf); clearTimeout(svg._settle); svg._loop = null; }
// Tween to a pose. Resolves when it lands.
function pose(svg, name, { dur = 700, ease = easeInOut } = {}) {
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
      const e = ease(t);
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

/* ---------- The acts' shared language ----------
   Every click act is beats on the same curves and times: a wind-up on the in-out curve (~240ms), the action
   itself quick (110-160ms: a strike accelerates into contact, a gesture lands with a small overshoot), a short
   hold, and the way back on the in-out curve (~400ms). */
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const deg = (r) => (r * 180) / Math.PI;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;
const easeBack = (t) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2);
const mixPose = (a, b, t) => { const p = {}; for (const k of JOINTS) p[k] = (a[k] || 0) + ((b[k] || 0) - (a[k] || 0)) * t; return p; };
// Play an act: each beat is a pose and its time ({ to, dur, ease }), a pause (ms), or a call.
async function beats(svg, list) {
  for (const b of list) {
    if (typeof b === 'number') await wait(b);
    else if (typeof b === 'function') b();
    else await pose(svg, b.to, { dur: b.dur, ease: b.ease || easeInOut });
  }
}
// Reaching, in the browser: the kit's two-bone solve, so an arm can follow a hand that is not in a pose.
function reachTo(tx, ty, { side = 'F', sp = 0, y = 0, bend = 1 } = {}) {
  const [cx, cy] = RIG.waist;
  const c = Math.cos(rad(-sp)), s = Math.sin(rad(-sp));
  const dx0 = tx - cx, dy0 = ty - y - cy;
  const lx = cx + dx0 * c - dy0 * s, ly = cy + dx0 * s + dy0 * c;
  const [sx, sy] = side === 'F' ? RIG.shoulderF : RIG.shoulderB;
  const L1 = RIG.upperArm, L2 = RIG.foreArm;
  const dx = lx - sx, dy = ly - sy;
  const d = clamp(Math.hypot(dx, dy), 1, L1 + L2 - 0.01);
  const t = deg(Math.atan2(-dx, dy));
  const a = deg(Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1)));
  const b = deg(Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1)));
  return { [`s${side}`]: t - bend * a, [`e${side}`]: bend * (180 - b) };
}

/* ---------- Mascots: every barista answers a click, a tap or Enter with an act of its own ----------
   One instance per figure: its act, when it is ready, a cooldown, and a reset. While an act plays, one more
   press is queued at most; the rest are dropped, so acts never stack. Without motion the figure answers with a
   short fade instead (the act's meaning is in its label). */
// A press: the mouse acts on the way down; a finger only on a tap (a scroll that starts on it is a scroll).
function onPress(el, fire) {
  let down = null;
  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') { down = { x: e.clientX, y: e.clientY, t: e.timeStamp, id: e.pointerId }; return; }
    if (e.button !== 0) return;
    e.preventDefault();
    fire(e);
  });
  el.addEventListener('pointerup', (e) => {
    if (!down || e.pointerId !== down.id) return;
    const tap = Math.hypot(e.clientX - down.x, e.clientY - down.y) < 12 && e.timeStamp - down.t < 650;
    down = null;
    if (tap) fire(e);
  });
  el.addEventListener('pointercancel', () => { down = null; });
  el.addEventListener('contextmenu', (e) => { if (e.pointerType === 'touch' || down) e.preventDefault(); });
  el.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (!e.repeat) fire(e);
  });
}
function fade(el) {
  if (!el) return;
  el.classList.remove('is-poked');
  void el.getBoundingClientRect();
  el.classList.add('is-poked');
  clearTimeout(el._poked);
  el._poked = setTimeout(() => el.classList.remove('is-poked'), 320);
}
function mascot(el, { label, act, ready = () => true, cooldown = 220, limit = 3200, reset, scene = false, faded = el } = {}) {
  if (!el || !act) return null;
  const m = { el, busy: false, queued: false };
  el.classList.add(el instanceof SVGElement ? 'mascot-hit' : 'mascot');
  if (scene) el.classList.add('mascot--scene');
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', label);
  el.removeAttribute('aria-hidden');
  m.run = async () => {
    if (!ready()) return;
    if (m.busy) { m.queued = true; return; }
    m.busy = true;
    el.classList.add('is-acting');
    if (reduceMotion) { fade(faded); await wait(300); }
    else await Promise.race([act(m), wait(limit)]);
    reset?.();
    el.classList.remove('is-acting');
    await wait(cooldown);
    m.busy = false;
    if (m.queued) { m.queued = false; m.run(); }
  };
  onPress(el, m.run);
  return m;
}
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
      ${img ? `<div class="item__photo ${img.round ? 'item__photo--round' : ''}"><img src="assets/img/${esc(img.src)}"${img.srcset ? ` srcset="${esc(img.srcset.split(',').map((s) => `assets/img/${s.trim()}`).join(', '))}" sizes="${img.round ? '200px' : '500px'}"` : ''} alt="${esc(img.alt)}" width="${img.w}" height="${img.h}" style="object-position:${esc(img.pos || '50% 50%')}"></div>` : ''}
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
  cheer(lastTrigger);
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

// A drink added from the board: that list's barista gives a small hop of approval and settles back.
function cheer(from) {
  const fig = from?.closest('.board__panel') && $('.face__figure [data-figure]', from.closest('.board__panel'));
  if (!fig || reduceMotion) return;
  const base = poseOf(fig.dataset.pose);
  pose(fig, { ...base, y: (base.y || 0) - 9, hd: (base.hd || 0) - 10 }, { dur: 170 }).then(() => pose(fig, fig.dataset.pose, { dur: 340 }));
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

/* ---------- The whole board: one list at a time ----------
   The tags are a tablist. Picking one swaps the list on the board (CSS plays the swap from .is-entering to
   .is-active, sliding from the side of travel, --dir), slides the crema track under the tag, and turns the
   new list's barista to its pose. Links to #cat-<list> anywhere on the page pick that list and bring the board
   into view. */
const board = $('[data-board]');
const boardTabs = board ? $$('[role="tab"]', board) : [];
const boardPanels = new Map(board ? $$('[role="tabpanel"]', board).map((p) => [p.dataset.panel, p]) : []);
const boardOrder = boardTabs.map((t) => t.dataset.tab);
const boardBar = board && $('.board__bar', board);
const boardHand = board && $('.board__hand', board);
const boardStage = board && $('.board__stage', board);
let boardList = boardTabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.tab || boardOrder[0];
const narrow = () => matchMedia('(max-width: 899px)').matches;
function placeHand() {
  const t = boardTabs.find((x) => x.dataset.tab === boardList);
  if (!boardHand || !t) return;
  boardHand.style.setProperty('--hand-x', `${t.offsetLeft + 10}px`);
  boardHand.style.setProperty('--hand-w', Math.max(0, t.offsetWidth - 20));
  boardHand.style.setProperty('--hand-on', 1);
}
// The barista on a list's plate turns from standing to the pose it is drawn in.
function greet(panel, delay = 60) {
  const fig = panel && $('.face__figure [data-figure]', panel);
  if (!fig || reduceMotion) return;
  applyPose(fig, poseOf('stand'));
  setTimeout(() => pose(fig, fig.dataset.pose, { dur: 460 }), delay);
}
function showList(id, { focus = false, reveal = false } = {}) {
  const next = boardPanels.get(id);
  const prev = boardPanels.get(boardList);
  if (!next) return;
  if (next !== prev) {
    boardStage.style.setProperty('--dir', boardOrder.indexOf(id) > boardOrder.indexOf(boardList) ? 1 : -1);
    boardList = id;
    boardTabs.forEach((t) => {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    prev.classList.remove('is-active', 'is-entering');
    prev.inert = true;
    next.inert = false;
    next.classList.add('is-active', 'is-entering');
    void next.offsetWidth;
    next.classList.remove('is-entering');
    greet(next);
    placeHand();
    const t = boardTabs.find((x) => x.dataset.tab === id);
    if (t && boardBar.scrollWidth > boardBar.clientWidth) {
      const left = t.offsetLeft - 24;
      const right = t.offsetLeft + t.offsetWidth + 24 - boardBar.clientWidth;
      if (boardBar.scrollLeft > left) boardBar.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
      else if (boardBar.scrollLeft < right) boardBar.scrollTo({ left: right, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
    // On a phone the lists differ in length: if the reader was deep in a long one, bring the new one's top up.
    if (narrow() && !reveal) {
      const top = boardStage.getBoundingClientRect().top;
      const under = (nav?.offsetHeight || 64) + boardBar.offsetHeight;
      if (top < under) scrollTo({ top: scrollY + top - under - 8, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  if (focus) boardTabs.find((x) => x.dataset.tab === id)?.focus();
  if (reveal) (narrow() ? board : boardBar).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}
if (board) {
  boardPanels.forEach((p, id) => { p.inert = id !== boardList; });
  board.addEventListener('click', (e) => {
    const t = e.target.closest('[role="tab"]');
    if (t) showList(t.dataset.tab);
  });
  $('[role="tablist"]', board).addEventListener('keydown', (e) => {
    const i = boardOrder.indexOf(boardList);
    const j = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: boardOrder.length - 1 }[e.key];
    if (j === undefined) return;
    e.preventDefault();
    showList(boardOrder[(j + boardOrder.length) % boardOrder.length], { focus: true });
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#cat-"]');
    const id = a?.getAttribute('href').slice(5);
    if (!id || !boardPanels.has(id)) return;
    e.preventDefault();
    showList(id, { reveal: true });
  });
  const fromHash = () => {
    const id = location.hash.startsWith('#cat-') && location.hash.slice(5);
    if (id && boardPanels.has(id)) showList(id, { reveal: true });
  };
  fromHash();
  addEventListener('hashchange', fromHash);
  // The first time the board comes into view, its barista turns to its pose.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en], io) => {
      if (en.isIntersecting) { io.disconnect(); greet(boardPanels.get(boardList), 200); }
    }, { threshold: 0.35 }).observe(boardStage);
  }
  addEventListener('resize', placeHand);
  document.fonts?.ready.then(placeHand);
  placeHand();
  // Each list's barista answers a tap by holding its drink out toward the list, a little bow and a nod: short,
  // it serves the board. The add-ons barista reaches over to its tray, lifts the syrup bottle up beside its head,
  // gives it a proud little shake and puts it back.
  boardPanels.forEach((panel) => {
    const box = $('.face__figure', panel), f = box && $('[data-figure]', box);
    if (!f) return;
    const tray = f.dataset.pose === 'tray';
    mascot(box, {
      label: tray ? 'Barista: show off an extra' : 'Barista: offer this drink',
      act: () => {
        if (!tray) {
          const o = poseOf('offer');
          return beats(f, [{ to: o, dur: 220 }, { to: { ...o, hd: o.hd + 10, sp: o.sp + 3 }, dur: 140, ease: easeBack }, { to: o, dur: 150 }, 160, { to: f.dataset.pose, dur: 380 }]);
        }
        const show = poseOf('trayShow');
        return beats(f, [
          { to: 'trayReach', dur: 260 },
          () => box.classList.add('is-picked'),
          { to: show, dur: 280, ease: easeBack },
          { to: { ...show, eB: show.eB - 12, hd: show.hd - 6 }, dur: 120 },
          { to: { ...show, eB: show.eB + 8 }, dur: 120 },
          { to: show, dur: 100 },
          80,
          { to: 'trayReach', dur: 260 },
          () => box.classList.remove('is-picked'),
          { to: 'tray', dur: 240 },
        ]);
      },
      reset: () => box.classList.remove('is-picked'),
    });
  });
}

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
// The Timekeeper (a kit's hero scene): the barista pushes the clock's minute hand up from a quarter to, then
// keeps hold of it, breathing, the push easing and pressing again on a 4s loop (the hand moves with it). From
// then on the clock is the visitor's to play with (timekeeper(), below). It runs only while the hero is on screen.
const heroScene = heroFigure && heroFigure.classList.contains('hero-scene');

/* The clock's two hands have weight. A press gives a hand a push; the push becomes angular velocity over a short
   spin-up; friction draws the velocity back to the clock's own slow creep; the angle integrates in fixed 1/120s
   steps from a clamped frame time, so it feels the same at any frame rate and never jumps, however hard it is
   pressed. The minute hand is light (quick spin-up, short coast: easy at two presses a second); the hour hand is
   about four times heavier (a fifth of the kick, four times the coast: one press every two seconds). Speeds are
   capped twice: a push only fills the room left under the cap, and the velocity is clamped.
   The barista holds the minute hand until it is pushed away, follows it round with its eyes, and catches it when
   it comes by slowly within reach, then sets it back. Tapped while it holds the hand, the barista shoves it once
   round the dial (and catches it as it comes back); tapped while it waits, it shrugs. */
const HANDS = {
  m: { kick: 120, tau: 0.7, rise: 0.05, max: 480, creep: 1.2 },
  h: { kick: 20, tau: 2.7, rise: 0.22, max: 150, creep: 0.1 },
};
const STEP = 1 / 120;
function timekeeper(svg) {
  const groups = { m: $$('[data-clock-hand="m"]', svg), h: $$('[data-clock-hand="h"]', svg) };
  if (!groups.m.length || !groups.h.length || !RIG) return null;
  const [cx, cy] = groups.m[0].dataset.from.split(' ').map(Number);
  const noon = $('.hero__noon-in', svg);
  const at = (a, r) => [cx + r * Math.sin(rad(a)), cy - r * Math.cos(rad(a))];
  const aim = (p) => { const [x, y] = handAt(p, 'F'); return deg(Math.atan2(x - cx, -(y - cy))); };
  const wrap = (a) => ((((a + 180) % 360) + 360) % 360) - 180;
  const angleOf = (g) => Number((g.getAttribute('transform').match(/rotate\(([-\d.]+)/) || [])[1]) || 0;
  const PUSH = poseOf('push'), WAITP = poseOf('letGo'), SHRUG = poseOf('letGoShrug'), GLANCE = poseOf('watchCheck');
  const HOME = aim(PUSH);
  const R = Math.hypot(handAt(PUSH, 'F')[0] - cx, handAt(PUSH, 'F')[1] - cy);
  const REACH = [-80, -50]; // where the barista can catch the minute hand coming up from nine
  const H = { m: { a: HOME, w: 0, q: 0, ...HANDS.m }, h: { a: angleOf(groups.h[0]), w: 0, q: 0, ...HANDS.h } };
  // The look: from the neck (turned with the lean) to a point near the minute hand's tip.
  const neck = RIG.neck || [2, -168];
  const gaze = (p) => {
    const [wx, wy] = RIG.waist, c = Math.cos(rad(p.sp || 0)), s = Math.sin(rad(p.sp || 0));
    const nx = wx + (neck[0] - wx) * c - (neck[1] - wy) * s, ny = wy + (neck[0] - wx) * s + (neck[1] - wy) * c + (p.y || 0) + (p.bob || 0);
    const [tx, ty] = at(H.m.a, 108);
    return clamp(deg(Math.atan2(ty - ny, Math.max(tx - nx, 10))) * 0.8 - (p.sp || 0), -36, 24);
  };

  let mode = 'held';
  let now = 0, last = 0, acc = 0, raf = 0;
  let shown = { ...(svg._pose || PUSH) };
  let from = shown, fadeT0 = 0, fadeDur = 0, fadeEase = easeInOut, modeT0 = 0;
  let lastKick = -1e9, freedAt = -1e9, noonAt = -1e9;
  let look = WAITP.hd, shrug = null, glance = null, lastGlance = -1e9, shoveStep = 0, onDone = null, doneAt = Infinity;
  // The nudge: on a touch screen, where nothing hovers, a visitor who has never played with the clock is shown
  // once that it moves. After 5s on screen untouched the barista gives the minute hand two little pushes (swings
  // it about 18° forward, releases, and nudges it again) while a faint glow runs along it. Remembered per
  // visitor; any press first cancels it. Without motion only the glow shows.
  const FOUND = `storefront:${data.name}:clock-found`;
  const found = () => { try { localStorage.setItem(FOUND, '1'); } catch { /* private mode */ } };
  let armed = matchMedia('(hover: none), (pointer: coarse)').matches && (() => { try { return !localStorage.getItem(FOUND); } catch { return true; } })();
  let nudge = null;
  const NUDGE = [[0, 0], [280, 0.9], [460, 0.25], [700, 1], [820, 1], [1300, 0]];
  const nudgeAt = (u) => {
    for (let i = 1; i < NUDGE.length; i++) {
      const [t0, v0] = NUDGE[i - 1], [t1, v1] = NUDGE[i];
      if (u <= t1) return v0 + (v1 - v0) * easeInOut((u - t0) / (t1 - t0));
    }
    return 0;
  };
  const hint = () => {
    const g = groups.m.find((x) => x.hasAttribute('data-clock-hit'));
    if (!g) return;
    g.classList.remove('is-hint');
    void g.getBoundingClientRect();
    g.classList.add('is-hint');
    setTimeout(() => g.classList.remove('is-hint'), 1500);
  };
  const disarm = () => { if (armed) { armed = false; found(); } };
  let retFrom = HOME, retDur = 400, retBody = PUSH;

  const setMode = (m, fadeMs = 0, ease = easeInOut) => { mode = m; modeT0 = now; from = { ...shown }; fadeT0 = now; fadeDur = fadeMs; fadeEase = ease; };
  const finish = () => { const d = onDone; onDone = null; doneAt = Infinity; d?.(); };
  const free = (w0) => { H.m.w = w0; H.m.q = 0; freedAt = now; look = shown.hd; setMode('free', 420, easeOut); };
  const turn = (k) => { const v = `rotate(${H[k].a.toFixed(2)} ${cx} ${cy})`; for (const g of groups[k]) g.setAttribute('transform', v); };
  const hop = () => { if (!noon) return; noon.classList.remove('is-hop'); void noon.getBoundingClientRect(); noon.classList.add('is-hop'); };

  // The pose the mode wants now; the screen fades into it from wherever it was.
  function target() {
    const t = now - modeT0;
    if (mode === 'held') {
      const ph = (t / 4000) * Math.PI * 2, s = Math.sin(ph);
      const p = { ...PUSH, sp: PUSH.sp + 1.6 * s, sF: PUSH.sF - 2.4 * s, eF: PUSH.eF + 1.4 * s, hd: PUSH.hd + 2.2 * Math.sin(ph + 0.6), bob: -0.9 * (1 - Math.cos(ph)) };
      if (nudge === null) return p;
      // Two little pushes: the barista leans in and nudges the hand a few degrees forward, back, and again.
      const sp = p.sp + 5;
      return mixPose(p, { ...p, sp, hd: p.hd - 10, ...reachTo(...at(HOME + 18, R), { sp, y: p.y + p.bob, bend: -1 }) }, nudgeAt(now - nudge));
    }
    if (mode === 'shove') return poseOf(shoveStep === 0 ? 'shoveBack' : 'shoveOut');
    if (mode === 'return') {
      const e = easeInOut(clamp(t / retDur, 0, 1));
      const b = mixPose(retBody, PUSH, e);
      return { ...b, ...reachTo(...at(retFrom + (HOME - retFrom) * e, R), { sp: b.sp, y: b.y + b.bob, bend: -1 }) };
    }
    const ph = (now / 4000) * Math.PI * 2;
    let p = { ...WAITP, sp: WAITP.sp + 1.1 * Math.sin(ph), sB: WAITP.sB + 1.5 * Math.sin(ph + 1), bob: -0.8 * (1 - Math.cos(ph)), hd: look };
    // Waiting for the hand to come round: now and then a look at the watch.
    if (glance !== null) {
      const u = now - glance;
      const k = u < 300 ? easeOut(u / 300) : u < 1000 ? 1 : u < 1400 ? 1 - easeInOut((u - 1000) / 400) : 0;
      p = mixPose(p, { ...p, sF: GLANCE.sF, eF: GLANCE.eF, hd: GLANCE.hd }, k);
    }
    if (shrug !== null) {
      const u = now - shrug;
      const k = u < 260 ? easeOut(u / 260) : u < 560 ? 1 : u < 920 ? 1 - easeInOut((u - 560) / 360) : 0;
      p = mixPose(p, { ...p, sF: SHRUG.sF, eF: SHRUG.eF, sB: SHRUG.sB, eB: SHRUG.eB, y: SHRUG.y, hd: look - 8 }, k);
    }
    if (mode === 'catch') {
      const sp = p.sp + 6;
      p = { ...p, sp, ...reachTo(...at(H.m.a, R), { sp, y: p.y + p.bob, bend: -1 }) };
    }
    return p;
  }
  // One fixed step of a hand: the pending push runs into the velocity, friction pulls it toward `creep`.
  function spin(hd, h, creep = hd.creep, tau = hd.tau) {
    const tr = hd.q * (1 - Math.exp(-h / hd.rise));
    hd.q -= tr;
    hd.w = clamp(creep + (hd.w + tr - creep) * Math.exp(-h / tau), -hd.max, hd.max);
    hd.a = wrap(hd.a + hd.w * h);
    if (!Number.isFinite(hd.a) || !Number.isFinite(hd.w) || !Number.isFinite(hd.q)) Object.assign(hd, { a: 0, w: 0, q: 0 });
  }
  function sim(h) {
    now += h * 1000;
    spin(H.h, h);
    if (mode === 'free' || mode === 'catch') {
      const was = H.m.a;
      if (mode === 'catch') spin(H.m, h, 0, 0.09); else spin(H.m, h);
      if (was < 0 && H.m.a >= 0 && now - noonAt > 380) { noonAt = now; hop(); }
      if (mode === 'free' && shrug === null && now - Math.max(lastKick, freedAt) > 450 && H.m.a >= REACH[0] && H.m.a <= REACH[1] && H.m.w < 140) {
        H.m.q = 0;
        setMode('catch', 220, easeOut);
      }
    }
    if (shrug !== null && now - shrug > 920) shrug = null;
    if (nudge !== null && now - nudge > 1300) nudge = null;
    else if (armed && mode === 'held' && now >= 5000) { disarm(); nudge = now; hint(); }
    if (glance !== null && now - glance > 1400) glance = null;
    else if (mode === 'free' && glance === null && shrug === null && Math.abs(H.m.w) < 20 && now - Math.max(lastKick, freedAt, lastGlance) > 7500) { glance = now; lastGlance = now; }
    if (onDone && now >= doneAt) finish();
    const t = now - modeT0;
    if (mode === 'catch' && t >= 220) { retFrom = H.m.a; retDur = clamp(Math.abs(HOME - retFrom) * 14, 380, 900); retBody = { ...shown }; setMode('return'); }
    else if (mode === 'return' && t >= retDur) setMode('held', 300);
    else if (mode === 'shove' && t >= fadeDur) {
      if (shoveStep === 0) { shoveStep = 1; setMode('shove', 130, easeIn); }
      else { free(185); H.m.q = 290; doneAt = now + 500; }
    }
  }
  function render(dt) {
    let p = target();
    if (fadeDur > 0 && now - fadeT0 < fadeDur) p = mixPose(from, p, fadeEase(clamp((now - fadeT0) / fadeDur, 0, 1)));
    shown = p;
    applyPose(svg, p);
    if (mode === 'free' || mode === 'catch') look += (gaze(p) - look) * (1 - Math.exp(-dt / 0.14));
    else H.m.a = aim(p);
    turn('m'); turn('h');
  }
  function tick(t) {
    raf = requestAnimationFrame(tick);
    const dt = clamp((t - last) / 1000, 0, 0.05);
    last = t;
    acc += dt;
    for (let n = 0; acc >= STEP && n < 8; n++) { acc -= STEP; sim(STEP); }
    render(dt);
  }
  const start = () => { if (raf || reduceMotion) return; last = performance.now(); raf = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  // Without motion a press sets a hand on by five minutes or an hour, at once; set back within reach, the
  // minute hand is the barista's again.
  function setOn(k) {
    H[k].a = wrap(H[k].a + 30);
    if (k === 'm') {
      const back = H.m.a >= REACH[0] && H.m.a <= HOME + 1;
      if (back) { applyPose(svg, PUSH); H.m.a = aim(PUSH); mode = 'held'; }
      else { mode = 'free'; applyPose(svg, { ...WAITP, hd: gaze(WAITP) }); }
    }
    turn('m'); turn('h');
    fade(groups[k][0]);
  }
  function kick(k) {
    disarm();
    if (reduceMotion) return setOn(k);
    const hd = H[k];
    if (k === 'm') {
      if (mode === 'held' || mode === 'return' || mode === 'shove') { finish(); free(0); }
      else if (mode === 'catch') setMode('free', 260, easeOut);
      lastKick = now;
    }
    hd.q += hd.kick * Math.max(0, 1 - (hd.w + hd.q) / hd.max);
    start();
  }
  function react() {
    disarm();
    return new Promise((resolve) => {
      if (mode === 'held') { onDone = resolve; doneAt = Infinity; shoveStep = 0; setMode('shove', 200); }
      else if (mode === 'free' && shrug === null) { onDone = resolve; shrug = now; doneAt = now + 920; }
      else resolve();
      start();
    });
  }
  // Take over from the entrance: the hands answer to the clock now, not to the pose.
  groups.m.forEach((g) => g.removeAttribute('data-aim'));
  if (reduceMotion && armed) setTimeout(() => { if (armed) { disarm(); hint(); } }, 5000);
  return { start, stop, kick, react, groups };
}

let tk = null;
let heroOnScreen = !('IntersectionObserver' in window);
function heroTakeover() {
  if (!heroScene || tk) return;
  tk = timekeeper(heroFigure);
  if (!tk) return;
  // The scene is now something to play with: it leaves the accessibility tree's shadow as a group of buttons.
  heroFigure.removeAttribute('aria-hidden');
  heroFigure.setAttribute('role', 'group');
  heroFigure.setAttribute('aria-label', 'The bean o’clock clock');
  for (const g of $$('[data-clock-hit]', heroFigure)) {
    const k = g.dataset.clockHit;
    g.classList.add('is-live');
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', k === 'm' ? 'Minute hand: give it a push' : 'Hour hand: give it a push');
    onPress(g, () => tk.kick(k));
  }
  mascot($('.f-hit', heroFigure), { label: 'Barista: push the clock round', act: () => tk.react(), faded: $('.figure__body', heroFigure) });
  if (heroOnScreen) tk.start();
}
if (heroScene && 'IntersectionObserver' in window) {
  new IntersectionObserver(([en]) => { heroOnScreen = en.isIntersecting; if (!tk) return; if (en.isIntersecting) tk.start(); else tk.stop(); }).observe(heroBox);
}
if (enterHero && heroScene && !reduceMotion) {
  applyPose(heroFigure, poseOf('pushStart'));
  setTimeout(() => pose(heroFigure, 'push', { dur: 1150 }).then(() => { if (!heroDone) { heroLanded(); heroTakeover(); } }), 450);
  setTimeout(() => { if (!heroDone) { applyPose(heroFigure, poseOf('push')); heroLanded(); heroTakeover(); } }, 3300);
} else if (enterHero && heroFigure && !reduceMotion) {
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
if (heroScene && (reduceMotion || !enterHero)) heroTakeover();

/* ---------- The usual: the barista on the arch takes a sip now and then; tapped, it raises a toast ----------
   The cup goes up, clinks (a quick lift with the cup tipped), holds, and comes back down to the knee. */
const usualFigure = $('[data-figure-idle="sip"] [data-figure]');
const usualM = usualFigure && mascot(usualFigure.parentElement, {
  label: 'Barista: raise a toast',
  act: () => {
    const up = poseOf('sitToast');
    return beats(usualFigure, [
      { to: up, dur: 260 },
      { to: { ...up, sF: up.sF - 8, cup: up.cup + 18, y: up.y - 3, hd: up.hd - 4 }, dur: 140, ease: easeBack },
      { to: up, dur: 170 },
      220,
      { to: 'sit', dur: 420 },
    ]);
  },
});
if (usualFigure && !reduceMotion) {
  let sipUntil = 0, onScreen = !('IntersectionObserver' in window);
  if (!onScreen) new IntersectionObserver(([en]) => { onScreen = en.isIntersecting; }).observe(usualFigure);
  const sip = async () => {
    if (!onScreen || usualM?.busy || Date.now() < sipUntil) return;
    sipUntil = Date.now() + 3200;
    await pose(usualFigure, 'sitSip', { dur: 700 });
    await wait(1100);
    if (!usualM?.busy) pose(usualFigure, 'sit', { dur: 700 });
  };
  seen(usualFigure, () => { sip(); setInterval(sip, 6500); }, { threshold: 0.6 });
}

/* ---------- Visit: the barista rides in a short way on the scooter, then the route runs out to the pin ----------
   The scooter stays put after that and idles, revving now and then (CSS loop); it runs only while on screen. */
const visitHead = $('[data-visit]');
const visitBox = $('[data-visit-figure]');
const ride = visitBox && $('.moto', visitBox);
if (visitHead) {
  if (!ride || reduceMotion) visitHead.classList.add('is-pointing');
  else {
    visitBox.style.translate = '-96px 0';
    seen(visitHead, () => {
      ride.classList.add('is-riding');
      void visitBox.offsetWidth;
      visitBox.style.transition = 'translate 1100ms cubic-bezier(0.2, 0.7, 0.3, 1)';
      visitBox.style.translate = '0 0';
      setTimeout(() => visitHead.classList.add('is-pointing'), 650);
    }, { threshold: 0.6 });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { if (visitHead.classList.contains('is-pointing') || en.isIntersecting) ride.classList.toggle('is-riding', en.isIntersecting); }).observe(ride);
    }
  }
}
// Tapped, it revs: the rider's head snaps back, the front lifts, the buzz hardens, a big puff and speed lines,
// then it settles back into its idle (CSS, .is-revving). The hands stay on the grips: nothing moves the arms.
mascot(ride && visitBox, {
  scene: true,
  label: 'Scooter: rev the engine',
  ready: () => visitHead?.classList.contains('is-pointing'),
  act: async () => {
    ride.classList.remove('is-revving');
    void ride.getBoundingClientRect();
    ride.classList.add('is-revving');
    await wait(1150);
  },
  reset: () => ride.classList.remove('is-revving'),
});

/* ---------- Footer: the barista leaning on the stamp raises its cup and waves goodbye, once; tapped, again ---------- */
const footFigure = $('.footer__figure [data-figure]');
const waveBye = async (lead = 300, swings = 1) => {
  await pose(footFigure, 'wave', { dur: lead });
  const wave = POSES.wave?.eF ?? -34, hd = POSES.wave?.hd ?? -12;
  loop(footFigure, 'wave', (ph) => ({ eF: wave + 22 * Math.sin(ph), hd: hd + 3 * Math.sin(ph) }), 520);
  await wait(520 * swings);
  await pose(footFigure, 'lean', { dur: 420 });
};
const footM = footFigure && mascot(footFigure.parentElement, { label: 'Barista: wave goodbye', act: () => waveBye(300, 1) });
if (footFigure && !reduceMotion) {
  seen(footFigure, () => { if (!footM?.busy) waveBye(520, 3); }, { threshold: 0.7 });
}

/* ---------- Order band: hover or focus "Order ahead" and the barista takes a second look at the watch ----------
   Tapped: right on time. Wrist up to the watch, a nod, and the pickup bag held up, ready. */
const orderM = clockFigure && mascot(clockFigure.parentElement, {
  label: 'Barista: your order, right on time',
  act: () => {
    const check = poseOf('watchCheck');
    return beats(clockFigure, [
      { to: check, dur: 220 },
      100,
      { to: { ...check, hd: check.hd + 12 }, dur: 130 },
      { to: check, dur: 140 },
      { to: 'orderShow', dur: 280, ease: easeBack },
      260,
      { to: 'watch', dur: 400 },
    ]);
  },
});
if (clockFigure && !reduceMotion) {
  let lookUntil = 0;
  const look = async () => {
    if (orderM?.busy || Date.now() < lookUntil) return;
    lookUntil = Date.now() + 1300;
    await pose(clockFigure, 'watchCheck', { dur: 260 });
    await wait(520);
    if (!orderM?.busy) pose(clockFigure, 'watch', { dur: 420 });
  };
  $$('.close__actions [data-open-order]').forEach((b) => { b.addEventListener('pointerenter', look); b.addEventListener('focus', look); });
}

/* ---------- What goes in the cup: three frames of one small film, played in turn as the section arrives ----------
   TAMP presses twice (the mound squashes on the first, impact ticks on each), the arrow, PULL brings the lever
   down from overhead and the shot runs, the arrow, POUR tips the jug, the milk runs and a heart blooms.
   Without motion everything is shown done; if play stalls (a background tab) it is shown done anyway. */
const proc = $('[data-process]');
if (proc) {
  const steps = $$('[data-step]', proc);
  const links = $$('.process__link', proc);
  const fig = (el) => el && $('[data-figure]', el);
  let procReady = false;
  const showAll = () => {
    procReady = true;
    [...steps, ...links].forEach((el) => el.classList.add('is-on', 'is-pressed', 'is-flow', 'is-done'));
    steps.forEach((s) => { const f = fig(s); if (f && f._pose) { stopMotion(f); applyPose(f, poseOf(f.dataset.pose)); } });
  };
  // Once the film has played, each frame answers a tap with its own job, done again: the whole scene is the
  // target (the machine and the jug are part of the act). TAMP raises the tamper clear and drives it down, with
  // a jolt and the impact ticks. PULL takes the lever back up (the shot stops), brings it down again and the
  // shot runs. POUR tips the jug back, then pours: the milk runs, the splash and the heart come again.
  const ACTS = {
    tamp: (s, f) => beats(f, [
      () => s.classList.remove('is-done'),
      { to: 'tampHigh', dur: 240 },
      { to: 'tampDown', dur: 110, ease: easeIn },
      () => s.classList.add('is-tamp'),
      { to: { ...poseOf('tampDown'), y: (POSES.tampDown?.y || 0) + 1.5 }, dur: 70 },
      { to: 'tampDown', dur: 150 },
      160,
      () => s.classList.remove('is-tamp'),
    ]),
    pull: (s, f) => beats(f, [
      () => s.classList.remove('is-flow'),
      { to: 'pullReady', dur: 380 },
      80,
      { to: 'pull', dur: 420, ease: easeIn },
      () => s.classList.add('is-flow'),
      { to: { ...poseOf('pull'), hd: (POSES.pull?.hd || 0) - 8 }, dur: 160, ease: easeBack },
      { to: 'pull', dur: 300 },
    ]),
    pour: (s, f) => beats(f, [
      () => s.classList.remove('is-flow'),
      { to: 'pourReady', dur: 320 },
      60,
      { to: 'pour', dur: 460 },
      () => s.classList.add('is-flow'),
      600,
    ]),
  };
  const LABEL = { tamp: 'Tamp: press the coffee down', pull: 'Pull: pull a shot', pour: 'Pour: pour the milk' };
  steps.forEach((s, i) => {
    const k = s.dataset.step, f = fig(s);
    if (!ACTS[k] || !f) return;
    mascot($('.process__scene', s), {
      scene: true,
      label: LABEL[k],
      // A frame is free once the film has moved on to the next one (the last, once the film is done).
      ready: () => procReady || !!steps[i + 1]?.classList.contains('is-on'),
      act: () => ACTS[k](s, f),
      reset: () => { s.classList.add('is-on', 'is-pressed', 'is-flow', 'is-done'); s.classList.remove('is-tamp'); },
    });
  });
  if (reduceMotion || !('IntersectionObserver' in window) || steps.length < 3) showAll();
  else {
    const [tamp, pull, pour] = steps;
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    applyPose(fig(tamp), poseOf('tampUp'));
    applyPose(fig(pull), poseOf('pullReady'));
    applyPose(fig(pour), poseOf('pourReady'));
    let done = false;
    const play = async () => {
      tamp.classList.add('is-on');
      for (let i = 0; i < 2; i++) {
        await pose(fig(tamp), 'tampDown', { dur: 260 });
        tamp.classList.add('is-tamp', 'is-pressed');
        await wait(200);
        tamp.classList.remove('is-tamp');
        if (i === 0) await pose(fig(tamp), 'tampUp', { dur: 280 });
      }
      tamp.classList.add('is-done');
      links[0]?.classList.add('is-on');
      await wait(420);
      pull.classList.add('is-on');
      await pose(fig(pull), 'pull', { dur: 720 });
      pull.classList.add('is-flow');
      await wait(1100);
      links[1]?.classList.add('is-on');
      await wait(420);
      pour.classList.add('is-on');
      await pose(fig(pour), 'pour', { dur: 760 });
      pour.classList.add('is-flow');
      done = true;
      procReady = true;
    };
    seen(proc, () => { play(); setTimeout(() => { if (!done) showAll(); }, 7500); }, { threshold: 0.35 });
  }
}

/* ---------- The thread: one crema line, drawn by the scroll, from the hero's hill down to the usual's arch,
   where it becomes the arch's frame. Wide screens only: on a phone it would cross the words. ---------- */
const threadEnd = $('[data-thread-end]');
const sun = $('.hero__sun') || $('.hero__scene');
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
