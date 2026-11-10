// Bean O' Clock's illustration kit (V4, character system V7).
//
// THE REGULAR. The character is everyday coffee, not a clock: a small line-drawn figure whose head is the
// logo's own bean (solid, its crease cut out), with a watch on its wrist and a cup in hand. Time lives in its
// props and its day (the watch, the cup, the ride), never in its body. Every appearance is an action: it
// tamps, pulls a shot, pours, raises a cup, sips, carries the extras, checks the time with an order in hand,
// rides to the shop, and waves goodbye.
//
// One pen draws everything: lines of one weight (CSS --lw, non-scaling), round caps, solid shapes only for the
// bean head, the hands, the shoes and the crema accents (the cup sleeve, the watch face, the helmet).
// Colours come from CSS: --fig-line (the pen, the head), --fig-fill (the ground it is cut from), --fig-accent (crema).
//
// The figure is a rig. Every joint is a <g data-j> placed by translate and turned by rotate, so app.js can pose
// it, tween between poses and walk it, using the same pose table and rig (both printed into the page).

const f = (n) => Number(Number(n).toFixed(2));
const RAD = Math.PI / 180;

// Skeleton, in figure units. Origin: the ground point between the feet; y runs up as negative numbers.
// The upper body (torso, head, arms) turns about the waist, so the figure can lean into a job.
export const rig = {
  shoulderF: [17, -158], shoulderB: [-17, -158],
  hipF: [8, -94], hipB: [-8, -94],
  waist: [0, -94],
  neck: [2, -168],
  upperArm: 38, foreArm: 36, thigh: 44, shin: 44,
};

// Poses: joint angles in degrees. An arm or leg at 0 hangs straight down; SVG turns positive angles clockwise,
// so on the front (right-hand) side negative swings forward and up, on the back side positive swings out.
// `sp` leans the upper body (positive forward); `y` lifts or drops the whole figure; `cup` tilts the held cup.
export const poses = {
  stand:  { sF: -10, eF: -64, sB: 8, eB: 10, hF: 0, kF: 0, hB: 0, kB: 0, hd: 0 },
  carry:  { sF: -14, eF: -66, sB: 14, eB: 16, hF: 0, kF: 0, hB: 0, kB: 0, hd: -4 },
  cheers: { sF: -152, eF: -22, sB: 38, eB: -112, hF: 0, kF: 0, hB: 6, kB: 0, hd: -10 },
  sip:    { sF: -104, eF: -118, sB: 34, eB: -108, hF: 0, kF: 0, hB: 0, kB: 0, hd: -14, cup: -28 },
  watch:  { sF: -40, eF: -120, sB: 12, eB: 22, hF: 0, kF: 0, hB: 0, kB: 0, hd: 18 },
  // A second look at the watch, wrist up to the face: the order band answers a hover on its button with it.
  watchCheck: { sF: -58, eF: -116, sB: 12, eB: 22, hF: 0, kF: 0, hB: 0, kB: 0, hd: 26, sp: 4 },
  point:  { sF: -96, eF: -4, sB: 12, eB: 18, hF: 0, kF: 0, hB: 0, kB: 0, hd: -6 },
  shrug:  { sF: -54, eF: -112, sB: 54, eB: 112, hF: 0, kF: 0, hB: 0, kB: 0, hd: -12 },
  sit:    { sF: -20, eF: -92, sB: 26, eB: -60, hF: -84, kF: 76, hB: -78, kB: 92, hd: -6, y: 0 },
  sitSip: { sF: -96, eF: -122, sB: 26, eB: -60, hF: -84, kF: 76, hB: -78, kB: 92, hd: -14, cup: -26 },
  lean:   { sF: -10, eF: -64, sB: 40, eB: -116, hF: 0, kF: 0, hB: -14, kB: 30, hd: -6 },
  // Leaning on the stamp, cup raised to wave goodbye; app.js swings the forearm.
  wave:   { sF: -148, eF: -34, sB: 40, eB: -116, hF: 0, kF: 0, hB: -14, kB: 30, hd: -12 },
  present:{ sF: -58, eF: -14, sB: 14, eB: 20, hF: 0, kF: 0, hB: 0, kB: 0, hd: 8 },
  // Both forearms level under a tray of extras, carried carefully, eyes on the tray.
  tray:   { sF: -14, eF: -76, sB: -16, eB: -76, hF: 0, kF: 0, hB: 0, kB: 0, hd: 14, sp: 3 },
  // Click acts (app.js plays them as beats). The usual raises its cup in a toast from the arch; the board's
  // barista holds its list's drink out toward the list; the order barista holds the pickup bag up, on time.
  sitToast: { sF: -146, eF: -26, sB: 26, eB: -60, hF: -84, kF: 76, hB: -78, kB: 92, hd: -16, cup: 6 },
  offer:  { sF: -74, eF: -6, sB: 14, eB: 20, hF: 0, kF: 0, hB: 0, kB: 0, hd: 16, sp: 6 },
  orderShow: { sF: -40, eF: -120, sB: -28, eB: -30, hF: 0, kF: 0, hB: 0, kB: 0, hd: 8, sp: 3 },
  // The walk is a cycle, not a pose: app.js swings these joints around `carry`.
};

// Turn a point about the waist.
function turn(x, y, a) {
  const [cx, cy] = rig.waist;
  const c = Math.cos(a * RAD), s = Math.sin(a * RAD);
  const dx = x - cx, dy = y - cy;
  return [cx + dx * c - dy * s, cy + dx * s + dy * c];
}
const clamp1 = (v) => Math.max(-1, Math.min(1, v));

// Reaching: the two angles of one arm that put its hand on a point (scene units), for a body leaning `sp` and
// dropped `y`. `bend` picks the elbow: 1 bends it up and out (pressing down), -1 down and under (reaching up,
// holding handlebars, pouring).
function reach(tx, ty, { side = 'F', sp = 0, y = 0, bend = 1 } = {}) {
  const [lx, ly] = turn(tx, ty - y, -sp);
  const [sx, sy] = side === 'F' ? rig.shoulderF : rig.shoulderB;
  const L1 = rig.upperArm, L2 = rig.foreArm;
  const dx = lx - sx, dy = ly - sy;
  const d = Math.max(1, Math.min(Math.hypot(dx, dy), L1 + L2 - 0.01));
  const t = Math.atan2(-dx, dy) / RAD;
  const a = Math.acos(clamp1((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))) / RAD;
  const b = Math.acos(clamp1((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2))) / RAD;
  return { [`s${side}`]: f(t - bend * a), [`e${side}`]: f(bend * (180 - b)) };
}

// Where a hand is, in scene units, for a pose: the same sums app.js does to keep a lever in the hand.
export function handAt(p, side = 'F') {
  const [sx, sy] = side === 'F' ? rig.shoulderF : rig.shoulderB;
  const s = (p[`s${side}`] || 0) * RAD, e = ((p[`s${side}`] || 0) + (p[`e${side}`] || 0)) * RAD;
  const ex = sx - rig.upperArm * Math.sin(s), ey = sy + rig.upperArm * Math.cos(s);
  const [hx, hy] = turn(ex - rig.foreArm * Math.sin(e), ey + rig.foreArm * Math.cos(e), p.sp || 0);
  return [f(hx), f(hy + (p.y || 0) + (p.bob || 0))];
}

/* ---------------------------------------------------------------------------------------------
   The coffee process at one counter (top at y -112), three frames of one small film: the same portafilter
   is tamped, then locked into the machine; the same cup takes the shot, then the milk.
     TAMP  leans in over the basket, elbow high, pressing the tamper down; the other hand holds the handle.
     PULL  leans back and pulls the machine's lever down from above its head; the shot runs into the cup.
     POUR  stands tall, hand on hip, the jug held out high and tipped; the milk runs down into the cup.
   --------------------------------------------------------------------------------------------- */
const COUNTER = -112;
// The tamper's foot sits 24 below the hand: in the basket it rests on the grounds (y -121).
const TAMP = { sp: 13, y: 3, hF: -12, kF: 22, hB: 10, kB: 14, cup: 0 };
const tampAt = (lift) => ({ ...TAMP, ...reach(82, -145 - lift, { sp: TAMP.sp, y: TAMP.y }), ...reach(46, -121, { side: 'B', sp: TAMP.sp, y: TAMP.y, bend: -1 }) });
// The lever turns about its pivot on the group's neck; `a` is degrees from upright, toward the barista.
const LEVER = { x: 80, y: -194, len: 40 };
const leverEnd = (a) => [LEVER.x - LEVER.len * Math.sin(a * RAD), LEVER.y - LEVER.len * Math.cos(a * RAD)];
const PULL_READY = { sp: 2, y: 2, hF: -8, kF: 4, hB: 8, kB: 4, sB: 22, eB: 26, hd: -12 };
const PULLED = { sp: -10, y: 3, hF: -16, kF: 6, hB: 12, kB: 8, sB: 34, eB: 36, hd: 12 };
// The tamper sits over the basket (centre x 83); the back hand holds the portafilter by its handle.
// The jug is held by its handle: tipped `cup` degrees its spout is at the hand + (31, 1).
const POUR = { sp: 4, y: 1, hF: -6, kF: 10, hB: 5, kB: 2, sB: 40, eB: -100 };
Object.assign(poses, {
  tampUp:    { ...tampAt(13), hd: 12 },
  tampDown:  { ...tampAt(0), hd: 18 },
  // The click act: the tamper raised clear of the basket, then driven down.
  tampHigh:  { ...tampAt(26), hd: 6 },
  pullReady: { ...PULL_READY, ...reach(...leverEnd(50), { sp: PULL_READY.sp, y: PULL_READY.y, bend: -1 }) },
  pull:      { ...PULLED, ...reach(...leverEnd(135), { sp: PULLED.sp, y: PULLED.y, bend: -1 }) },
  pourReady: { ...POUR, ...reach(76, -166, { sp: POUR.sp, y: POUR.y, bend: -1 }), hd: 12, cup: 0 },
  pour:      { ...POUR, ...reach(82, -172, { sp: POUR.sp, y: POUR.y, bend: -1 }), hd: 20, cup: 58 },
});

// The hero: braced, leaning in, pushing the clock's minute hand up toward the cup at twelve with one hand, a
// takeaway cup in the other. The dial (the logo's) stands behind it; its minute hand turns to the barista's
// hand, wherever the pose puts it (aimAt, and app.js), so pushing it moves the time.
const DIAL = { x: 118, y: -140, r: 140 };
const PUSH = { sp: 10, y: 3, hF: -22, kF: 18, hB: 18, kB: 4, sB: 26, eB: -24, hd: -14 };
Object.assign(poses, {
  pushStart: { ...PUSH, sp: 3, hd: 6, ...reach(36, -176, { sp: 3, y: PUSH.y, bend: -1 }) },
  push:      { ...PUSH, ...reach(52, -212, { sp: PUSH.sp, y: PUSH.y, bend: -1 }) },
});
// When the hand gets away: stands back, hand on hip, the coffee kept, eyes on the clock (app.js turns the head
// to follow the hand round). A shrug, when tapped while it waits.
const WAIT = { sp: -3, y: 0, hF: -5, kF: 3, hB: 6, kB: 2, sB: 22, eB: -34, hd: -16 };
Object.assign(poses, {
  letGo:     { ...WAIT, ...reach(22, -103, { sp: WAIT.sp, bend: 1 }) },
  letGoShrug:{ ...WAIT, sF: -50, eF: -112, sB: 48, eB: 104, y: -1.5 },
});

// The add-ons act: the free hand reaches over to the tray (the syrup bottle stands at the holding hand + this
// offset), lifts the bottle up beside the head, and puts it back. The tray's own bottle hides while it is held.
const TRAY_BOTTLE = [1 + 1.25 * -5, 6 + 1.25 * -23];
{
  const lean = { ...poses.stand, ...poses.tray, sp: 7 };
  const [hx, hy] = handAt(lean);
  Object.assign(poses, {
    trayReach: { ...poses.tray, sp: 7, hd: 22, ...reach(hx + TRAY_BOTTLE[0], hy + TRAY_BOTTLE[1], { side: 'B', sp: 7, bend: -1 }) },
    trayShow:  { ...poses.tray, sp: 1, hd: -10, ...reach(46, -197, { side: 'B', sp: 1, bend: -1 }) },
  });
}

// Riding: seated, leaning into the bars, both hands on the grips, eyes up the road.
const RIDE = { sp: 12, y: 0, hF: -84, kF: 76, hB: -80, kB: 86, hd: -4 };
Object.assign(poses, {
  ride: { ...RIDE, ...reach(64, -134, { sp: RIDE.sp, bend: -1 }), ...reach(58, -136, { side: 'B', sp: RIDE.sp, bend: -1 }) },
});

// The bean of the logo (a 120x156 bean centred on 120,120) and its crease.
const BEAN = 'M120 42 C 158 42 180 80 180 122 C 180 166 156 198 120 198 C 82 198 60 166 60 122 C 60 80 84 42 120 42 Z';
const CREASE = 'M127 34 C 104 66 102 92 119 117 C 136 142 138 172 112 206';
// A half-face helmet for the ride, in the bean's own units: a crema shell over the top, a short peak over the
// eyes, a band round it. The face stays open.
const HELMET = `<path class="f-accent f-helmet" d="M52 108 C 46 52 86 18 124 18 C 164 18 196 52 190 100 C 162 88 92 88 52 108 Z"/>
  <path class="f-helmet-line" d="M60 92 C 100 72 158 70 190 84"/><path class="f-helmet-line" d="M176 86 C 196 86 210 92 216 102"/>`;

// Props, drawn upright with the gripping hand at 0,0.
const cupShapes = {
  hot: `<path class="f-fill" d="M-10 -30 H10 L8 2 H-8 Z"/><path class="f-accent" d="M-9.3 -19 H9.3 L8.7 -8 H-8.7 Z"/><rect class="f-fill" x="-12.5" y="-36" width="25" height="7" rx="2.5"/><path class="f-solid" d="M-6 -36 Q 0 -41 6 -36 Z"/>
    <g class="f-steam"><path d="M-2 -46 c -6 -6 6 -10 0 -17"/><path d="M5 -44 c -4 -4 4 -7 0 -11"/></g>`,
  iced: `<path class="f-fill" d="M-10 -28 H10 L7.5 2 H-7.5 Z"/><path class="f-fill" d="M-11.5 -28 C -11.5 -40 11.5 -40 11.5 -28 Z"/><path class="f-accent" d="M-9.1 -12 H9.1 L8.5 -3 H-8.5 Z"/><path d="M3 -36 L9 -52 H14"/>`,
  // The hot cup under a cloud of salty cream (the Cloudy series), and the iced cup with a matcha leaf on the lid.
  cloud: `<path class="f-fill" d="M-10 -30 H10 L8 2 H-8 Z"/><path class="f-accent" d="M-9.3 -19 H9.3 L8.7 -8 H-8.7 Z"/><path class="f-fill" d="M-12.5 -29 C -16 -37 -7 -42 -3.5 -36.5 C -1 -44 10 -43 9 -35.5 C 15 -37 16.5 -29 12.5 -29 Z"/>`,
  matcha: `<path class="f-fill" d="M-10 -28 H10 L7.5 2 H-7.5 Z"/><path class="f-fill" d="M-11.5 -28 C -11.5 -40 11.5 -40 11.5 -28 Z"/><path class="f-accent" d="M-9.1 -12 H9.1 L8.5 -3 H-8.5 Z"/><path class="f-fill" d="M1 -37 C 3 -46 13 -48 17 -46 C 16 -40 9 -36 1 -37 Z M2 -37.5 L13 -44"/>`,
  // The tamper: a handle in the hand, a flat foot 24 below it (the group adds 6).
  tamper: `<rect class="f-fill" x="-4.5" y="-10" width="9" height="20" rx="4.5"/><rect class="f-accent" x="-13" y="10" width="26" height="8" rx="2"/>`,
  // The milk jug: held by its handle, the spout up and to the right.
  jug: `<path class="f-fill" d="M-8 -26 H11 L17 -32 L15 -22 L13 6 H-11 Z"/><path d="M-8 -20 C -20 -20 -20 -2 -10 -2"/><path class="f-accent" d="M-10.2 -6 H12.7 L12.4 0 H-10.6 Z"/>`,
  // The extras on a tray carried on the flat of the hand: a shot glass, a syrup bottle with its pump, a cup of
  // salty cream. It sways a little as it is carried (CSS, .f-prop--tray).
  tray: `<g transform="scale(1.25)"><rect class="f-fill" x="-34" y="-12" width="62" height="5" rx="2.5"/>
    <path class="f-fill" d="M-28 -26 H-18 L-19.5 -12 H-26.5 Z"/><path class="f-accent" d="M-27 -21 H-19 L-19.6 -16 H-26.4 Z"/>
    <g class="f-tray-pick"><path class="f-fill" d="M-12 -12 V-30 Q-12 -34 -8 -34 H-2 Q2 -34 2 -30 V-12 Z"/><path d="M-5 -34 V-42 H3"/><rect class="f-accent" x="-12" y="-27" width="14" height="6"/></g>
    <path class="f-fill" d="M8 -12 L7 -24 H21 L20 -12 Z"/><path class="f-fill" d="M5.5 -24 C 3 -31 10 -35 13 -30.5 C 15 -36 24 -35 22.5 -29 C 27 -30 28 -24 24.5 -24 Z"/></g>`,
  // A paper pickup bag hanging from the hand by its handles, folded at the top, a crema label on its face.
  bag: `<path d="M-6 2 C -6 -8 6 -8 6 2"/><path class="f-fill" d="M-13 2 H13 L15 36 H-15 Z"/><path d="M-13 8 H13"/><rect class="f-accent" x="-7" y="16" width="14" height="10" rx="2"/>`,
  // The tray's syrup bottle as the other hand holds it, gripped round the middle (shown only while lifted).
  syrup: `<g transform="scale(1.25)"><path class="f-fill" d="M-7 11 V-7 Q-7 -11 -3 -11 H3 Q7 -11 7 -7 V11 Z"/><path d="M0 -11 V-19 H8"/><rect class="f-accent" x="-7" y="-4" width="14" height="6"/></g>`,
};

function seg(len) {
  return `<path class="f-limb" d="M0 0 L0 ${len}"/>`;
}
// A trouser leg: a capsule, outlined, so the legs have body while the arms stay a single line.
function trouser(len, w = 6.2) {
  return `<path class="f-fill f-trouser" d="M${-w} 0 L${-w} ${len} A${w} ${w} 0 0 0 ${w} ${len} L${w} 0 A${w} ${w} 0 0 0 ${-w} 0 Z"/>`;
}

// One joint: placed at (x,y) in its parent, turned by a.
const joint = (name, x, y, a, inner) => `<g data-j="${name}" data-x="${x}" data-y="${y}" transform="translate(${x} ${y}) rotate(${f(a)})">${inner}</g>`;

/**
 * The Regular, as inline SVG.
 * @param {object} o
 * @param {string}  [o.pose]   a key of `poses`
 * @param {string}  [o.cup]    a key of `cupShapes`, or '' for empty hands: what the holding hand carries
 * @param {string}  [o.hold]   'front' | 'back'
 * @param {boolean} [o.smile]
 * @param {boolean} [o.helmet] the half-face helmet, for the ride
 * @param {string}  [o.cls]
 * @param {string}  [o.label]  accessible name; decorative when absent
 * A scene passes `box` (its viewBox, in figure units around the feet) and draws its set in the same
 * coordinates: `under` beneath everything and still, `before` and `after` behind and in front of the figure,
 * moving with it inside `.figure__body`, `over` on top of everything.
 */
export function regular({ pose = 'stand', cup = 'hot', hold = 'front', spare = '', smile = false, helmet = false, cls = '', label = '', attrs = '', box = null, under = '', before = '', after = '', over = '' } = {}) {
  const p = { ...poses.stand, ...poses[pose] };
  const R = rig;
  const upright = (side) => f(-((p.sp || 0) + (side === 'front' ? p.sF + p.eF : p.sB + p.eB)) + (p.cup || 0));
  const holdCup = (side) => {
    if (cup && hold === side) return `<g data-hold="${side}" transform="rotate(${upright(side)})"><g class="f-prop f-prop--${cup}" transform="translate(1 6)">${cupShapes[cup]}</g></g>`;
    // `spare`: a second thing for the other hand, hidden until an act hands it over (the tray's bottle).
    if (spare && hold !== side) return `<g data-hold="${side}" transform="rotate(${upright(side)})"><g class="f-spare">${cupShapes[spare]}</g></g>`;
    return '';
  };
  const hand = `<circle class="f-solid" cx="0" cy="${R.foreArm}" r="5.2"/>`;
  // The watch rides on the front forearm, a crema face on a strap.
  const watch = `<g class="f-watch"><path class="f-limb f-strap" d="M-4.6 ${R.foreArm - 9} H4.6"/><circle class="f-accent f-face" cx="0" cy="${R.foreArm - 9}" r="5.4"/></g>`;
  const arm = (side) => {
    const [x, y] = side === 'front' ? R.shoulderF : R.shoulderB;
    const s = side === 'front' ? p.sF : p.sB;
    const e = side === 'front' ? p.eF : p.eB;
    const cupG = holdCup(side);
    return joint(side === 'front' ? 'sF' : 'sB', x, y, s,
      seg(R.upperArm) + joint(side === 'front' ? 'eF' : 'eB', 0, R.upperArm, e,
        seg(R.foreArm) + (side === 'front' ? watch : '') + (cupG ? `<g transform="translate(0 ${R.foreArm})">${cupG}</g>` : '') + hand));
  };
  const shoe = `<path class="f-solid" d="M-5 -1 Q -5 -7 1 -7 L 5 -7 Q 14 -6 15 1 L 15 4 L -5 4 Z"/>`;
  const leg = (side) => {
    const [x, y] = side === 'front' ? R.hipF : R.hipB;
    const h = side === 'front' ? p.hF : p.hB;
    const k = side === 'front' ? p.kF : p.kB;
    return joint(side === 'front' ? 'hF' : 'hB', x, y, h,
      joint(side === 'front' ? 'kF' : 'kB', 0, R.thigh, k, trouser(R.shin - 2) + `<g transform="translate(0 ${R.shin - 2})">${shoe}</g>`) + trouser(R.thigh));
  };
  // The head: the logo's bean, solid, its crease and a face cut out of it. It looks right, the way it walks.
  const face = `<ellipse class="f-cut" cx="145" cy="108" rx="6.5" ry="9"/><ellipse class="f-cut" cx="167" cy="103" rx="6" ry="8.5"/>${smile ? '<path class="f-cut-line" d="M146 136 Q 157 146 169 133"/>' : ''}`;
  const head = joint('hd', R.neck[0], R.neck[1], p.hd,
    `<g class="f-headbob"><path class="f-limb" d="M0 2 L0 -12"/><g transform="translate(0 -44) rotate(-12) scale(0.5) translate(-120 -120)"><path class="f-head" d="${BEAN}"/><path class="f-crease" d="${CREASE}"/>${face}${helmet ? HELMET : ''}</g></g>`);
  // A shirt, and over it the barista's apron in crema: the keeper of good coffee and good timing.
  const torso = `<path class="f-fill" d="M-18 -164 C -7 -170 9 -170 19 -164 L 18 -96 C 6 -90 -6 -90 -17 -96 Z"/>
    <path class="f-limb" d="M-6 -150 L-3 -166 M9 -150 L6 -166"/>
    <path class="f-accent f-apron" d="M-11 -150 H12 L13 -124 C 16 -122 18 -100 19 -82 H-18 C -17 -100 -15 -122 -12 -124 Z"/>
    <path class="f-limb" d="M-3 -112 H9 V-100 H-3 Z"/>`;
  // The upper body hangs from the waist in two layers, so the front leg still passes between the arms.
  const [wx, wy] = R.waist;
  const upper = (inner) => joint('sp', wx, wy, p.sp || 0, `<g transform="translate(${-wx} ${-wy})">${inner}</g>`);

  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  const [rx, ry] = box ? [0, 0] : [120, 304];
  const vb = box ? box.join(' ') : '0 0 240 320';
  // An invisible body-sized target, so a tap does not have to land on a line (live only on a clickable figure).
  const hit = `<rect class="f-hit" x="-32" y="-262" width="68" height="266" rx="32"/>`;
  return `<svg class="regular${box ? ' regular--box' : ''} ${cls}" viewBox="${vb}" ${a11y} data-figure data-pose="${pose}" ${attrs}>
    ${under ? `<g class="set set--under">${under}</g>` : ''}
    <g class="figure__body">
    ${box ? `<g class="set">${before}</g>` : ''}
    <g data-j="root" data-x="${rx}" data-y="${ry}" transform="translate(${rx} ${f(ry + (p.y || 0))})">
      ${leg('back')}${upper(arm('back'))}${leg('front')}${upper(torso + head + arm('front'))}${hit}
    </g>
    ${box ? `<g class="set">${after}</g>` : ''}
    </g>
    ${over ? `<g class="set set--over">${over}</g>` : ''}
  </svg>`;
}

/* ---------------------------------------------------------------------------------------------
   The process scenes, drawn in the same pen as the figure. Each moving part carries a data-* hook app.js plays
   when the scene comes into view; without JS each is drawn done.
   --------------------------------------------------------------------------------------------- */
const COUNTER_BOX = `<path class="f-fill" d="M40 ${COUNTER} H262 V0 H40 Z"/><path d="M32 ${COUNTER} H270"/><path class="f-limb" d="M40 -60 H262" stroke-dasharray="2 9"/>`;
// The cup that takes the shot and then the milk, on the counter or the drip tray at `base`.
const cupAt = (cx, base) => `<path class="f-fill" d="M${cx - 15} ${base - 18} H${cx + 15} C ${cx + 15} ${base - 5} ${cx + 8} ${base} ${cx} ${base} C ${cx - 8} ${base} ${cx - 15} ${base - 5} ${cx - 15} ${base - 18} Z"/><path d="M${cx + 15} ${base - 14} c 8 0 8 9 0 9"/>`;
const SCENES = {
  tamp: {
    pose: 'tampDown', cup: 'tamper',
    // A grinder at the back, beans in its hopper; on a crema mat the portafilter, its handle toward the barista,
    // a mound of fresh grounds in its basket. The basket's wall is drawn in front, so the tamper goes in.
    before: `${COUNTER_BOX}
      <path class="f-fill" d="M178 -258 H236 L226 -206 H188 Z"/>
      <g transform="translate(196 -244) rotate(-20) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <g transform="translate(214 -236) rotate(14) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <g transform="translate(205 -226) rotate(-4) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <rect class="f-fill" x="186" y="-206" width="42" height="94" rx="6"/><path d="M196 -170 H218 M207 -170 V-150"/><circle class="f-accent" cx="207" cy="-188" r="5"/>
      <rect class="f-accent" x="57" y="${COUNTER - 3}" width="52" height="3" rx="1.5"/>
      <rect class="f-fill" x="36" y="-124" width="35" height="6" rx="3"/>
      <path class="scene__grounds" data-grounds d="M71.5 -121 C 73 -134 93 -134 94.5 -121 Z"/>`,
    after: `<path class="f-fill" d="M68 -127 H98 L95 -115 H71 Z"/><path d="M66 -127 H100"/>
      <g class="scene__press" data-press><path d="M112 -184 V-150 M103 -160 L112 -150 L121 -160"/></g>
      <g class="scene__puff" data-puff><path d="M62 -131 l -8 -5 M104 -131 l 8 -5 M60 -122 h -9 M106 -122 h 9"/></g>`,
  },
  pull: {
    pose: 'pull', cup: '',
    // A lever machine: its body and gauge, the group on a neck, the tamped portafilter locked under it, the lever
    // on top (its end stays in the barista's hand, app.js), the cup on the drip tray taking the shot.
    before: `${COUNTER_BOX}
      <path class="f-fill" d="M110 ${COUNTER} V-240 Q110 -248 118 -248 H238 Q246 -248 246 -240 V${COUNTER}"/>
      <circle class="f-fill" cx="212" cy="-218" r="15"/><path d="M212 -218 L220 -226"/><path d="M201 -218 h3 M223 -218 h-3 M212 -229 v3"/>
      <rect class="f-accent" x="196" y="-170" width="32" height="8" rx="4"/>
      <path class="f-fill" d="M110 -194 H72 V-180 H110"/>
      <rect class="f-fill" x="66" y="-180" width="30" height="10" rx="2"/>
      <path class="f-fill" d="M68 -170 H94 L92 -160 H70 Z"/><rect class="f-fill" x="40" y="-168" width="30" height="6" rx="3"/>
      <path d="M81 -160 V-155"/>
      <rect class="f-fill" x="54" y="${COUNTER - 6}" width="62" height="6" rx="2"/>
      ${cupAt(81, COUNTER - 6)}
      <ellipse class="f-accent scene__crema" data-crema cx="81" cy="${COUNTER - 24}" rx="13" ry="2.6"/>
      <path class="scene__stream" data-stream pathLength="1" d="M81 -155 V${COUNTER - 25}"/>
      <g class="scene__steam" data-steam><path d="M76 -146 c -5 -5 5 -8 0 -14"/><path d="M87 -144 c -4 -4 4 -7 0 -11"/></g>`,
    after: (p) => { const [hx, hy] = handAt(p); return `<path class="scene__lever" data-follow="F" data-from="${LEVER.x} ${LEVER.y}" d="M${LEVER.x} ${LEVER.y} L${hx} ${hy}"/><circle class="f-fill" cx="${LEVER.x}" cy="${LEVER.y}" r="4"/>`; },
  },
  pour: {
    pose: 'pour', cup: 'jug',
    // The same cup, on its saucer: milk runs down from the jug held high, a heart blooms on the crema.
    before: `${COUNTER_BOX}
      <path d="M96 ${COUNTER - 1} H134"/>
      ${cupAt(115, COUNTER - 2)}
      <ellipse class="f-accent" cx="115" cy="${COUNTER - 20}" rx="13" ry="2.6"/>
      <path class="scene__heart" data-heart d="M115 ${COUNTER - 19} c -6 -4 -9 -1 -6 2 l 6 4 l 6 -4 c 3 -3 0 -6 -6 -2 z"/>
      <path class="scene__stream" data-stream pathLength="1" d="M113.5 -170 C 114 -158 115 -146 115 ${COUNTER - 21}"/>
      <g class="scene__splash" data-splash><path d="M104 ${COUNTER - 26} q -4 -3 -7 -1 M126 ${COUNTER - 26} q 4 -3 7 -1"/></g>`,
    after: '',
  },
};
// A scene drawn at its last frame, or at any pose of its film (`pose`), e.g. to export frames for motion work.
export function processScene(step, { pose } = {}) {
  const s = SCENES[step];
  if (!s) return '';
  const name = pose || s.pose;
  const p = { ...poses.stand, ...poses[name] };
  const part = (x) => (typeof x === 'function' ? x(p) : x);
  return regular({ pose: name, cup: s.cup, cls: `scene scene--${step}`, box: [-60, -280, 340, 292], before: part(s.before), after: part(s.after) });
}

/* ---------------------------------------------------------------------------------------------
   The ride: the barista on a small scooter, half-face helmet on, heading to the shop. The wheels, the road,
   the speed lines and the exhaust sit still in `under`; the scooter's body and its rider ride together in
   `.figure__body`, so the suspension shows. Everything that moves is a class CSS loops (40-motion.css).
   --------------------------------------------------------------------------------------------- */
const wheel = (cx, r) => `<g class="moto__wheel"><circle class="f-fill moto__tyre" cx="${cx}" cy="-20" r="${r}"/><circle cx="${cx}" cy="-20" r="${r - 7}"/><path d="M${cx} ${-20 - (r - 7)} V${-20 + (r - 7)} M${cx - (r - 7)} -20 H${cx + (r - 7)}"/><circle class="f-solid" cx="${cx}" cy="-20" r="3.5"/></g>`;
export function moto({ cls = '' } = {}) {
  const under = `<path class="moto__road" d="M-132 2 H126"/>
    <g class="moto__speed"><path d="M-100 -70 H-128 M-92 -100 H-114 M-106 -128 H-124"/></g>
    <g class="moto__puff"><circle cx="-100" cy="-30" r="5"/><circle cx="-112" cy="-38" r="7"/><circle cx="-124" cy="-30" r="4"/></g>
    ${wheel(-48, 20)}${wheel(88, 18)}`;
  const before = `<path d="M70 -30 C 74 -44 100 -44 106 -30"/>
    <path class="f-fill" d="M-80 -38 C -82 -58 -70 -76 -50 -80 H24 C 30 -80 32 -74 32 -68 V-44 H4 L-16 -28 H-62 C -72 -28 -79 -32 -80 -38 Z"/>
    <path class="f-accent" d="M-70 -58 H18 V-52 H-73 Z"/><rect class="f-accent" x="-86" y="-62" width="6" height="9" rx="2"/>
    <path d="M-30 -24 L-86 -28"/><rect class="f-fill" x="-96" y="-33" width="12" height="8" rx="3.5"/>
    <path class="f-solid" d="M-54 -80 C -54 -88 -48 -90 -38 -90 H14 C 22 -90 26 -86 24 -80 Z"/>
    <rect class="f-fill" x="26" y="-44" width="40" height="7" rx="2"/>
    <path d="M84 -122 L90 -22"/>
    <path d="M52 -138 L80 -131"/><path d="M72 -133 L76 -152"/><ellipse class="f-fill" cx="77" cy="-155" rx="5" ry="3.5"/>`;
  const after = `<path class="f-fill" d="M58 -44 C 60 -76 64 -104 72 -126 L86 -126 C 84 -98 86 -68 98 -46 C 100 -41 97 -37 92 -37 H58 Z"/>
    <path class="f-fill" d="M78 -136 C 92 -138 100 -128 97 -116 L82 -116 Z"/><circle class="f-accent" cx="93" cy="-125" r="4"/>`;
  return regular({ pose: 'ride', cup: '', helmet: true, cls: `moto ${cls}`, box: [-136, -262, 266, 270], under, before, after });
}

/* ---------------------------------------------------------------------------------------------
   The hero: the Timekeeper. The barista pushes the big crema minute hand up toward the cup at twelve, its own
   coffee in the other hand: setting the clock to bean o'clock. The dial is the logo's, ticks on an open ring
   rising behind its ground, EST. and the year at the ground's ends. All of the clock sits in `under`, behind
   the figure; the minute hand (data-aim) turns to the figure's front hand, here and in app.js.
   --------------------------------------------------------------------------------------------- */
const pt = (a, r) => [f(DIAL.x + r * Math.sin(a * RAD)), f(DIAL.y - r * Math.cos(a * RAD))];
const aimAt = (p) => f(Math.atan2(handAt(p)[0] - DIAL.x, -(handAt(p)[1] - DIAL.y)) / RAD);
// The shove (tap the barista while it holds the hand): draws the hand back a little, then drives it on round,
// letting go at the end of the reach. Both are reaches to points on the hand itself.
{
  const p = { ...poses.stand, ...poses.push };
  const home = aimAt(p);
  const [hx, hy] = handAt(p);
  const r = Math.hypot(hx - DIAL.x, hy - DIAL.y);
  Object.assign(poses, {
    shoveBack: { ...PUSH, sp: 5, hd: -6, ...reach(...pt(home - 8, r - 6), { sp: 5, y: PUSH.y, bend: -1 }) },
    shoveOut:  { ...PUSH, sp: 15, hd: -22, hF: -26, kF: 22, ...reach(...pt(home + 16, r + 2), { sp: 15, y: PUSH.y, bend: -1 }) },
  });
}
export function heroScene({ est = '', cls = '' } = {}) {
  const p = { ...poses.stand, ...poses.push };
  const { x, y, r } = DIAL;
  let ticks = '';
  for (let i = 1; i < 60; i++) {
    const long = i % 5 === 0;
    const [x1, y1] = pt(i * 6, r - (long ? 15 : 7));
    const [x2, y2] = pt(i * 6, r);
    ticks += `<line pathLength="1" style="--i:${i}"${long ? ' class="long"' : ''} x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
  }
  const [ax, ay] = pt(-150, r + 9);
  const [bx, by] = pt(150, r + 9);
  const under = `
    <path class="hero__ring" pathLength="1" d="M${ax} ${ay} A${r + 9} ${r + 9} 0 1 1 ${bx} ${by}"/>
    <g class="hero__ticks">${ticks}</g>
    <g class="hero__noon" transform="translate(${x} ${y - r - 6}) scale(0.82)"><g class="hero__noon-in">${cupShapes.hot}</g></g>
    <g data-clock-hand="h" transform="rotate(-3 ${x} ${y})"><path class="f-fill hero__hour" d="M${x - 4.5} ${y + 10} L${x - 2.2} ${y - 80} H${x + 2.2} L${x + 4.5} ${y + 10} Z"/></g>
    <g class="hero__hand" data-clock-hand="m" data-aim="F" data-from="${x} ${y}" transform="rotate(${aimAt(p)} ${x} ${y})"><path class="f-accent" d="M${x - 5.5} ${y + 16} L${x - 2.4} ${y - 124} H${x + 2.4} L${x + 5.5} ${y + 16} Z"/><circle class="f-accent" cx="${x}" cy="${y + 22}" r="8"/></g>
    <circle class="f-fill" cx="${x}" cy="${y}" r="6.5"/>
    <path class="hero__groundline" pathLength="1" d="M-70 4 Q${x} -12 ${2 * x + 70} 4"/>
    ${est ? `<text class="hero__est-t" x="-66" y="28">EST.</text><text class="hero__est-t" x="${2 * x + 66}" y="28" text-anchor="end">${est}</text>` : ''}`;
  // The hands' tap targets, on top of everything and wider than the hands, turning with them (app.js). The
  // minute hand's covers its outer part, the hour hand's its own length, so each stays reachable when they cross.
  const over = `<g class="clock-hit" data-clock-hit="m" data-clock-hand="m" data-aim="F" data-from="${x} ${y}" transform="rotate(${aimAt(p)} ${x} ${y})"><path d="M${x} ${y - 54} V${y - 132}"/></g>
    <g class="clock-hit" data-clock-hit="h" data-clock-hand="h" transform="rotate(-3 ${x} ${y})"><path d="M${x} ${y - 14} V${y - 84}"/></g>`;
  return regular({ pose: 'push', cup: 'hot', hold: 'back', smile: true, cls: `hero-scene ${cls}`, box: [-82, -318, 400, 354], under, over });
}

/* ---------------------------------------------------------------------------------------------
   The pattern: the brand's small things (beans, tiny clocks, cups, a run of dial ticks, a shine, a dot) laid
   out like a packaging paper, not a grid: a jittered staggered field, each mark a little turned and sized,
   thinning to nothing round a clear oval where the character stands. Deterministic (seeded), so the paper is
   the same on every build. Colour comes from CSS (currentColor; .is-accent for the few crema marks).
   --------------------------------------------------------------------------------------------- */
export function pattern({ w = 760, h = 520, seed = 20, clear = [0.45, 0.52, 0.27, 0.36], id = 'pat', cls = '' } = {}) {
  let s = seed >>> 0;
  const rnd = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const kinds = [['bean', 34], ['clock', 17], ['cup', 17], ['ticks', 10], ['shine', 9], ['dot', 13]];
  const pick = () => { let v = rnd() * 100; for (const [k, wt] of kinds) if ((v -= wt) < 0) return k; return 'dot'; };
  const step = 62;
  let marks = '';
  for (let row = 0, gy = step / 2; gy < h + step / 2; row++, gy += step * 0.88) {
    for (let gx = step / 2 + (row % 2) * (step / 2); gx < w + step / 2; gx += step) {
      const mx = gx + (rnd() - 0.5) * 34, my = gy + (rnd() - 0.5) * 30;
      const d = Math.hypot((mx / w - clear[0]) / clear[2], (my / h - clear[1]) / clear[3]);
      const keep = d < 1 ? 0.05 : Math.min(0.9, 0.3 + (d - 1) * 0.75);
      if (rnd() > keep) continue;
      const k = pick();
      const sc = k === 'dot' ? 1 : 0.78 + rnd() * 0.5;
      const rot = (rnd() - 0.5) * (k === 'bean' ? 150 : k === 'dot' ? 0 : 56);
      marks += `<use href="#${id}-${k}"${rnd() < 0.1 ? ' class="is-accent"' : ''} transform="translate(${f(mx)} ${f(my)}) rotate(${f(rot)}) scale(${f(sc)})"/>`;
    }
  }
  const defs = `<defs>
    <g id="${id}-bean"><g transform="scale(0.1) translate(-120 -120)"><path d="${BEAN}"/><path d="${CREASE}"/></g></g>
    <g id="${id}-clock"><circle r="8"/><path d="M0 0 V-5 M0 0 L3.6 2.2 M0 -8 v2 M8 0 h-2 M0 8 v-2 M-8 0 h2"/></g>
    <g id="${id}-cup"><path d="M-5 -6 H5 L4 7 H-4 Z M-6.5 -9.5 H6.5 V-6 H-6.5 Z M-1 -12 c -2.2 -2 2.2 -3 0 -5.5"/></g>
    <g id="${id}-ticks"><path d="M-13 1 l-1.4 -4 M-6.6 -2.6 l-0.7 -4.2 M0 -3.8 v-5 M6.6 -2.6 l0.7 -4.2 M13 1 l1.4 -4"/></g>
    <g id="${id}-shine"><path d="M0 -7 V-2.5 M6.5 -4.5 L3.6 -1 M-6.5 -3.5 L-3 -0.8"/></g>
    <g id="${id}-dot"><circle class="pattern__dot" r="1.7"/></g>
  </defs>`;
  return `<svg class="pattern ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${defs}<g class="pattern__marks">${marks}</g></svg>`;
}

/* ---------------------------------------------------------------------------------------------
   Small drawings in the same pen: the menu's category icons, the time icons, the map pin.
   --------------------------------------------------------------------------------------------- */
const ICONS = {
  hot: '<path class="f-fill" d="M15 17 H33 L31 41 H17 Z"/><path class="f-accent" d="M15.9 26 H32.1 L31.6 33 H16.4 Z"/><rect class="f-fill" x="13" y="12" width="22" height="6" rx="2"/><path d="M22 7 c -3 -3 3 -5 0 -8" transform="translate(0 3)"/>',
  iced: '<path class="f-fill" d="M15 19 H33 L30.5 42 H17.5 Z"/><path class="f-fill" d="M13.5 19 C 13.5 9 34.5 9 34.5 19 Z"/><path class="f-accent" d="M16.2 30 H31.8 L31.3 36 H16.7 Z"/><path d="M27 12 L32 2 H36"/>',
  cloud: '<path class="f-fill" d="M15 21 H33 L31 42 H17 Z"/><path class="f-fill" d="M12.5 21 C 10 13 18 9 21 14 C 23 7 33 8 32 15 C 38 14 39 21 35.5 21 Z"/><path class="f-accent" d="M16 29 H32 L31.5 35 H16.5 Z"/>',
  leaf: '<path class="f-fill" d="M15 19 H33 L30.5 42 H17.5 Z"/><path class="f-fill" d="M13.5 19 C 13.5 9 34.5 9 34.5 19 Z"/><path class="f-accent" d="M16.2 30 H31.8 L31.3 36 H16.7 Z"/><path class="f-fill" d="M25 12 C 27 3 37 1 41 3 C 40 9 33 13 25 12 Z M26 11.5 L37 5"/>',
  plus: '<circle class="f-fill" cx="24" cy="24" r="15"/><path d="M24 16 V32 M16 24 H32"/>',
  bean: `<g transform="translate(24 24) rotate(-12) scale(0.17) translate(-120 -120)"><path class="f-head" d="${BEAN}"/><path class="f-crease" d="${CREASE}"/></g>`,
  clock: '<circle class="f-fill" cx="24" cy="25" r="15"/><path d="M24 25 V16 M24 25 L30 29"/><path d="M19 7 H29"/>',
  pin: '<path class="f-fill" d="M24 43 C 24 43 11 30 11 20 A 13 13 0 0 1 37 20 C 37 30 24 43 24 43 Z"/><circle class="f-accent" cx="24" cy="20" r="4.5"/>',
};
export function icon(name, cls = '') {
  return `<svg class="ico ${cls}" viewBox="0 0 48 48" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

// A round stamp: words set around a ring (as on a cup sticker), a mark in the middle. It turns slowly.
export function stamp({ text, mark = 'bean', cls = '' }) {
  const id = `st${Math.random().toString(36).slice(2, 7)}`;
  return `<svg class="stamp ${cls}" viewBox="0 0 200 200" aria-hidden="true">
    <defs><path id="${id}" d="M100 100 m -74 0 a 74 74 0 1 1 148 0 a 74 74 0 1 1 -148 0"/></defs>
    <circle class="stamp__disc" cx="100" cy="100" r="98"/>
    <g class="stamp__ring"><text><textPath href="#${id}" textLength="462" lengthAdjust="spacing">${text}</textPath></text></g>
    <g transform="translate(64 64) scale(1.5)">${ICONS[mark] ? `<g class="stamp__mark">${ICONS[mark]}</g>` : ''}</g>
  </svg>`;
}

// Three short ticks of the dial, used as a shine beside a product: the clock as punctuation.
export function shine(cls = '') {
  return `<svg class="shine ${cls}" viewBox="0 0 60 60" aria-hidden="true"><path d="M30 6 V20 M50 14 L42 24 M8 22 L19 28"/></svg>`;
}

// A hand-drawn arrow for annotations: it bends, the way a pen would draw it.
export function arrow(cls = '', d = 'M6 54 C 26 54 52 44 64 14', head = 'M52 18 L64 13 L68 26') {
  return `<svg class="scrawl ${cls}" viewBox="0 0 80 64" aria-hidden="true"><path pathLength="1" d="${d}"/><path pathLength="1" class="scrawl__head" d="${head}"/></svg>`;
}

// The "O" of the wordmark: an O with one clock hand. Sized in em by CSS, so it sits in a line of type.
export function oHand(cls = '') {
  return `<svg class="ohand ${cls}" viewBox="0 0 114 100" aria-hidden="true">
    <circle class="ohand__ring" cx="48" cy="50" r="38"/>
    <g class="ohand__hand" data-ohand><line x1="48" y1="50" x2="106" y2="50"/></g>
    <circle class="ohand__pin" cx="48" cy="50" r="10"/>
  </svg>`;
}

// The bean on its own, for small marks.
export function bean(cls = '') {
  return `<svg class="beanmark ${cls}" viewBox="56 30 128 180" aria-hidden="true"><path class="f-head" d="${BEAN}"/><path class="beanmark__crease" d="${CREASE}"/></svg>`;
}

// A coffee branch in line-art, after the ones behind the shop's posters.
export function branch(cls = '') {
  const leaf = (x, y, r, s = 1) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path pathLength="1" d="M0 0 C 24 -26 76 -26 104 0 C 76 26 24 26 0 0 Z"/><path pathLength="1" d="M4 0 H96"/></g>`;
  const cherry = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
  return `<svg class="branch ${cls}" viewBox="0 0 520 420" aria-hidden="true" fill="none">
    <path pathLength="1" d="M18 404 C 120 330 210 250 300 170 C 360 116 430 70 506 30"/>
    ${leaf(118, 326, -78, 0.9)}${leaf(132, 316, 20, 1)}${leaf(214, 252, -70, 1.05)}${leaf(232, 238, 26, 0.9)}
    ${leaf(320, 158, -60, 0.95)}${leaf(334, 150, 34, 1)}${leaf(426, 88, -48, 0.8)}${leaf(440, 80, 40, 0.85)}
    ${cherry(262, 214, 13)}${cherry(284, 222, 12)}${cherry(272, 236, 12)}${cherry(372, 132, 11)}${cherry(390, 140, 12)}
  </svg>`;
}
