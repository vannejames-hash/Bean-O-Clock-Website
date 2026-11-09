// Bean O' Clock's illustration kit (V4).
//
// THE REGULAR. The character is everyday coffee, not a clock: a small line-drawn figure whose head is the
// logo's own bean (solid, its crease cut out), with a watch on its wrist and a to-go cup in hand. Time lives in
// its props and its day (the watch, the cup, the walk), never in its body. It walks, checks the time, raises
// the cup, sips, points the way, sits on an edge and shrugs at an empty cart.
//
// One pen draws everything: lines of one weight (CSS --lw, non-scaling), round caps, solid shapes only for the
// bean head, the hands, the shoes and the crema accents (the cup sleeve, the watch face).
// Colours come from CSS: --fig-line (the pen, the head), --fig-fill (the ground it is cut from), --fig-accent (crema).
//
// The figure is a rig. Every joint is a <g data-j> placed by translate and turned by rotate, so app.js can pose
// it, tween between poses and walk it, using the same pose table (exported below and printed into the page).

const f = (n) => Number(Number(n).toFixed(2));

// Skeleton, in figure units. Origin: the ground point between the feet; y runs up as negative numbers.
export const rig = {
  shoulderF: [17, -158], shoulderB: [-17, -158],
  hipF: [8, -94], hipB: [-8, -94],
  neck: [2, -168],
  upperArm: 38, foreArm: 36, thigh: 44, shin: 44,
};

// Poses: joint angles in degrees. An arm or leg at 0 hangs straight down; SVG turns positive angles clockwise,
// so on the front (right-hand) side negative swings forward and up, on the back side positive swings out.
// `y` lifts or drops the whole figure; `cup` tilts the held cup away from upright.
export const poses = {
  stand:  { sF: -10, eF: -64, sB: 8, eB: 10, hF: 0, kF: 0, hB: 0, kB: 0, hd: 0 },
  carry:  { sF: -14, eF: -66, sB: 14, eB: 16, hF: 0, kF: 0, hB: 0, kB: 0, hd: -4 },
  cheers: { sF: -152, eF: -22, sB: 38, eB: -112, hF: 0, kF: 0, hB: 6, kB: 0, hd: -10 },
  sip:    { sF: -104, eF: -118, sB: 34, eB: -108, hF: 0, kF: 0, hB: 0, kB: 0, hd: -14, cup: -28 },
  watch:  { sF: -40, eF: -120, sB: 12, eB: 22, hF: 0, kF: 0, hB: 0, kB: 0, hd: 18 },
  point:  { sF: -96, eF: -4, sB: 12, eB: 18, hF: 0, kF: 0, hB: 0, kB: 0, hd: -6 },
  shrug:  { sF: -54, eF: -112, sB: 54, eB: 112, hF: 0, kF: 0, hB: 0, kB: 0, hd: -12 },
  sit:    { sF: -20, eF: -92, sB: 26, eB: -60, hF: -84, kF: 76, hB: -78, kB: 92, hd: -6, y: 0 },
  sitSip: { sF: -96, eF: -122, sB: 26, eB: -60, hF: -84, kF: 76, hB: -78, kB: 92, hd: -14, cup: -26 },
  lean:   { sF: -10, eF: -64, sB: 40, eB: -116, hF: 0, kF: 0, hB: -14, kB: 30, hd: -6 },
  present:{ sF: -58, eF: -14, sB: 14, eB: 20, hF: 0, kF: 0, hB: 0, kB: 0, hd: 8 },
  // The walk is a cycle, not a pose: app.js swings these joints around `carry`.
};

// Reaching: the front arm's two angles that put the hand on a point (figure units), elbow out.
function reach(tx, ty) {
  const [sx, sy] = rig.shoulderF;
  const L1 = rig.upperArm, L2 = rig.foreArm;
  const dx = tx - sx, dy = ty - sy;
  const d = Math.min(Math.hypot(dx, dy), L1 + L2 - 0.01);
  const deg = (r) => (r * 180) / Math.PI;
  const t = deg(Math.atan2(-dx, dy));
  const a = deg(Math.acos((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d)));
  const b = deg(Math.acos((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2)));
  return { sF: f(t - a), eF: f(180 - b) };
}
// The coffee process, at the counter (counter top at y -112). The tamper's foot sits 24 below the hand;
// the jug's spout, tipped 40 degrees, sits at the hand + (28, -8).
const COUNTER = -112;
Object.assign(poses, {
  tampUp:   { ...poses.stand, ...reach(84, COUNTER - 12 - 24 - 8), sB: 10, eB: 14, hd: 16 },
  tampDown: { ...poses.stand, ...reach(84, COUNTER - 12 - 24), sB: 10, eB: 14, hd: 18 },
  pourReady:{ ...poses.stand, ...reach(70, -158), sB: 10, eB: 14, hd: 12, cup: 0 },
  pour:     { ...poses.stand, ...reach(72, -152), sB: 10, eB: 14, hd: 16, cup: 40 },
});

// The bean of the logo (a 120x156 bean centred on 120,120) and its crease.
const BEAN = 'M120 42 C 158 42 180 80 180 122 C 180 166 156 198 120 198 C 82 198 60 166 60 122 C 60 80 84 42 120 42 Z';
const CREASE = 'M127 34 C 104 66 102 92 119 117 C 136 142 138 172 112 206';

// Cups, drawn upright with the gripping hand at 0,0.
const cupShapes = {
  hot: `<path class="f-fill" d="M-10 -30 H10 L8 2 H-8 Z"/><path class="f-accent" d="M-9.3 -19 H9.3 L8.7 -8 H-8.7 Z"/><rect class="f-fill" x="-12.5" y="-36" width="25" height="7" rx="2.5"/><path class="f-solid" d="M-6 -36 Q 0 -41 6 -36 Z"/>
    <g class="f-steam"><path d="M-2 -46 c -6 -6 6 -10 0 -17"/><path d="M5 -44 c -4 -4 4 -7 0 -11"/></g>`,
  iced: `<path class="f-fill" d="M-10 -28 H10 L7.5 2 H-7.5 Z"/><path class="f-fill" d="M-11.5 -28 C -11.5 -40 11.5 -40 11.5 -28 Z"/><path class="f-accent" d="M-9.1 -12 H9.1 L8.5 -3 H-8.5 Z"/><path d="M3 -36 L9 -52 H14"/>`,
  // The tamper: a handle in the hand, a flat foot 24 below it (the group adds 6).
  tamper: `<rect class="f-fill" x="-4.5" y="-10" width="9" height="20" rx="4.5"/><rect class="f-accent" x="-13" y="10" width="26" height="8" rx="2"/>`,
  // The milk jug: held by its handle, the spout up and to the right.
  jug: `<path class="f-fill" d="M-8 -26 H11 L17 -32 L15 -22 L13 6 H-11 Z"/><path d="M-8 -20 C -20 -20 -20 -2 -10 -2"/><path class="f-accent" d="M-10.2 -6 H12.7 L12.4 0 H-10.6 Z"/>`,
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
 * @param {string}  [o.cup]    'hot' | 'iced' | '' : what the front hand (or back hand, with hold:'back') carries
 * @param {string}  [o.hold]   'front' | 'back'
 * @param {boolean} [o.smile]
 * @param {string}  [o.cls]
 * @param {string}  [o.label]  accessible name; decorative when absent
 */
export function regular({ pose = 'stand', cup = 'hot', hold = 'front', smile = false, cls = '', label = '', attrs = '', box = null, before = '', after = '' } = {}) {
  const p = { ...poses.stand, ...poses[pose] };
  const R = rig;
  const holdCup = (side) => {
    if (!cup || hold !== side) return '';
    const total = side === 'front' ? p.sF + p.eF : p.sB + p.eB;
    return `<g data-hold="${side}" transform="rotate(${f(-total + (p.cup || 0))})"><g transform="translate(1 6)">${cupShapes[cup]}</g></g>`;
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
    `<path class="f-limb" d="M0 2 L0 -12"/><g transform="translate(0 -44) rotate(-12) scale(0.5) translate(-120 -120)"><path class="f-head" d="${BEAN}"/><path class="f-crease" d="${CREASE}"/>${face}</g>`);
  // A shirt, and over it the barista's apron in crema: the keeper of good coffee and good timing.
  const torso = `<path class="f-fill" d="M-18 -164 C -7 -170 9 -170 19 -164 L 18 -96 C 6 -90 -6 -90 -17 -96 Z"/>
    <path class="f-limb" d="M-6 -150 L-3 -166 M9 -150 L6 -166"/>
    <path class="f-accent f-apron" d="M-11 -150 H12 L13 -124 C 16 -122 18 -100 19 -82 H-18 C -17 -100 -15 -122 -12 -124 Z"/>
    <path class="f-limb" d="M-3 -112 H9 V-100 H-3 Z"/>`;

  const a11y = label ? `role="img" aria-label="${label}"` : 'aria-hidden="true"';
  // A scene (box, in figure units around the feet) draws its set in the same coordinates: `before` behind
  // the figure, `after` in front of it.
  const [rx, ry] = box ? [0, 0] : [120, 304];
  const vb = box ? box.join(' ') : '0 0 240 320';
  return `<svg class="regular ${cls}" viewBox="${vb}" ${a11y} data-figure data-pose="${pose}" ${attrs}>
    ${box ? `<g class="set">${before}</g>` : ''}
    <g data-j="root" data-x="${rx}" data-y="${ry}" transform="translate(${rx} ${f(ry + (p.y || 0))})">
      ${leg('back')}${arm('back')}${leg('front')}${torso}${head}${arm('front')}
    </g>
    ${box ? `<g class="set">${after}</g>` : ''}
  </svg>`;
}

/* ---------------------------------------------------------------------------------------------
   The coffee process: three small scenes at the counter, drawn in the same pen as the figure.
   Each moving part carries a data-* hook app.js plays when the scene comes into view.
   --------------------------------------------------------------------------------------------- */
const COUNTER_BOX = `<path class="f-fill" d="M40 ${COUNTER} H262 V0 H40 Z"/><path d="M32 ${COUNTER} H270"/><path class="f-limb" d="M40 -60 H262" stroke-dasharray="2 9"/>`;
const SCENES = {
  tamp: {
    pose: 'tampDown', cup: 'tamper',
    // A grinder at the back of the counter, beans in its hopper; the portafilter on the counter, its basket full.
    before: `${COUNTER_BOX}
      <path class="f-fill" d="M178 -258 H236 L226 -206 H188 Z"/>
      <g transform="translate(196 -244) rotate(-20) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <g transform="translate(214 -236) rotate(14) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <g transform="translate(205 -226) rotate(-4) scale(0.1) translate(-120 -120)"><path class="f-head" d="${BEAN}"/></g>
      <rect class="f-fill" x="186" y="-206" width="42" height="94" rx="6"/><path d="M196 -170 H218 M207 -170 V-150"/><circle class="f-accent" cx="207" cy="-188" r="5"/>
      <path class="f-fill" d="M66 ${COUNTER} L70 ${COUNTER - 12} H100 L104 ${COUNTER} Z"/><rect class="f-fill" x="104" y="${COUNTER - 9}" width="52" height="7" rx="3.5"/>`,
    after: `<g class="scene__puff" data-puff><path d="M58 ${COUNTER - 16} l -9 -5 M112 ${COUNTER - 16} l 9 -5 M56 ${COUNTER - 6} h -10"/></g>`,
  },
  pull: {
    pose: 'watch', cup: '',
    // The machine: a body on the counter, its pressure gauge (a small dial), the group, a cup under the stream.
    before: `${COUNTER_BOX}
      <path class="f-fill" d="M74 ${COUNTER} V-246 Q74 -254 82 -254 H242 Q250 -254 250 -246 V${COUNTER}"/>
      <path class="f-fill" d="M90 ${COUNTER} V-206 H190 V${COUNTER}"/>
      <rect class="f-fill" x="122" y="-206" width="40" height="12" rx="2"/>
      <path class="f-fill" d="M126 -194 H158 L154 -184 H130 Z"/><rect class="f-fill" x="70" y="-192" width="58" height="7" rx="3.5"/>
      <circle class="f-fill" cx="222" cy="-222" r="15"/><path d="M222 -222 L230 -230"/><path d="M211 -222 h3 M233 -222 h-3 M222 -233 v3"/>
      <rect class="f-accent" x="206" y="-170" width="32" height="8" rx="4"/>
      <path d="M100 ${COUNTER - 6} H182"/>
      <path class="f-fill" d="M130 ${COUNTER - 24} H154 L151 ${COUNTER - 6} H133 Z"/><path d="M154 ${COUNTER - 20} c 8 0 8 10 0 10"/>
      <path class="scene__stream" data-stream pathLength="1" d="M142 -184 V${COUNTER - 25}"/>`,
    after: '',
  },
  pour: {
    pose: 'pour', cup: 'jug',
    // A wide cup on its saucer; milk runs from the jug's spout into it and a heart blooms on top.
    before: `${COUNTER_BOX}
      <path d="M84 ${COUNTER} H138"/>
      <path class="f-fill" d="M88 ${COUNTER - 26} H134 C 134 ${COUNTER - 6} 122 ${COUNTER - 2} 111 ${COUNTER - 2} C 100 ${COUNTER - 2} 88 ${COUNTER - 6} 88 ${COUNTER - 26} Z"/>
      <path d="M134 ${COUNTER - 20} c 12 0 12 12 0 12"/>
      <ellipse class="f-accent" cx="111" cy="${COUNTER - 26}" rx="23" ry="4.5"/>
      <path class="scene__heart" data-heart d="M111 ${COUNTER - 24} c -6 -4 -9 -1 -6 2 l 6 4 l 6 -4 c 3 -3 0 -6 -6 -2 z"/>
      <path class="scene__stream" data-stream pathLength="1" d="M100 -160 C 104 -150 110 -146 111 ${COUNTER - 28}"/>`,
    after: '',
  },
};
export function processScene(step) {
  const s = SCENES[step];
  if (!s) return '';
  return regular({ pose: s.pose, cup: s.cup, cls: `scene scene--${step}`, box: [-60, -280, 340, 292], before: s.before, after: s.after });
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
