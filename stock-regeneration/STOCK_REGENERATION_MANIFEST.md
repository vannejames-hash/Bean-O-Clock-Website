# STOCK REGENERATION MANIFEST

Bean O' Clock storefront, prepared 2026-11-09 against the V5 build (`dist/bean-o-clock/index.html`).
Nothing here has been regenerated. The files in `originals/` are copies; the live files in
`clients/bean-o-clock/assets/img/` are untouched.

How images were classified: every photograph's origin was checked against
`clients/bean-o-clock/assets/img/credits.json` (licence records from Wikimedia Commons) and
`clients/bean-o-clock/SOURCES.md` (what the shop supplied). An image is called **stock** only when it has
a library licence record there. Nothing was classified on looks alone, so there is no "uncertain" image in
this pass.

**Before replacing anything, three rules carried over from the project:**
1. A generated image must never depict, or be read as, the Bean O' Clock shop, its staff or its counter.
   Keep replacements generic (hands only, no faces, no signage, no logos, no readable text).
2. The site currently credits stand-ins on `credits.html` from `credits.json`. A generated replacement has
   no licence to credit, so add a line such as "Illustrative product photography" there instead, and
   remove the old stand-in's record when its file is replaced.
3. Keep the file key in `clients/bean-o-clock/content.js` (`latte`, `pour`) and swap the file, srcset sizes
   and `alt` text, so no code changes are needed.

---

## A. Asset inventory (every image file in the project)

| # | Filename | Path | Section used | Type | Class | Dimensions | Aspect | Display crop | Subject |
|---|---|---|---|---|---|---|---|---|---|
| | `logo.webp` | `clients/bean-o-clock/assets/img/` | none directly (source of the logo tile) | logo | **real business** | 550×550 | 1:1 | n/a | The shop's logo: bean rising in a dial over a ground arc, EST. 2020, wordmark |
| | `logo.jpg` | `clients/bean-o-clock/assets/source/` | not shipped; reference | logo | **real business** | 550×550 | 1:1 | n/a | Same logo, from the Food Runners listing |
| | `logo-mark.webp` | `assets/img/` | nav brand tile | logo crop | **real business** | 300×300 | 1:1 | 44px tile | The logo's mark |
| | `icon.png` | `assets/img/` | favicon, touch icon | logo crop | **real business** | 192×192 | 1:1 | icon | The logo's mark |
| | `share.jpg` | `assets/img/` | social share image (og:image) | logo on brand green | **real business** (graphic layout of the shop's logo) | 1200×630 | 1.91:1 | full | Logo centred on green |
| | `drink-white-choc-oreo.webp` | `assets/img/` | New on the board; menu thumbnail; item sheet | product photo (poster crop) | **real business** | 500×600 | 5:6 | round sticker | White Chocolate with Oreo Cream in a tall glass |
| | `drink-strawberry-oreo.webp` | `assets/img/` | New on the board; menu thumbnail; item sheet | product photo (poster crop) | **real business** | 360×360 | 1:1 | round sticker | Strawberry Oreo Latte |
| | `drink-matcha-oreo.webp` | `assets/img/` | New on the board; menu thumbnail; item sheet | product photo (poster crop) | **real business** | 360×360 | 1:1 | round sticker | Matcha Oreo Latte |
| | `b1.png`, `b2.png` | `assets/source/` | not shipped; source of drink crops and prices | shop posters | **real business** | ~351×490 | ~5:7 | n/a | "New drink!" posters |
| | `b3.png`, `b4.png` | `assets/source/` | not shipped; source of the menu | menu boards | **real business** | ~328×479 | ~2:3 | n/a | The shop's menu boards |
| 01 | `photo-f61713250-disc.webp` (+ `-disc-440`, and uncropped `photo-f61713250*.webp`) | `assets/img/` | **Hero** (live) | coffee product photo | **stock** (CC0, Brigitte Tohm via Wikimedia) | 820×820 crop of 1920×1280 | 1:1 used | circle, lower ~18% hidden under the hero's ground arc | Top-down cappuccino with rosetta art on a white saucer, wood table |
| 02 | `photo-m61714648-960.webp` (+ `-500`) | `assets/img/` | **The usual** (live) | coffee prep photo | **stock** (CC0, Nathan Dumlao via Wikimedia) | 960×1440 | 2:3 file, 4:5 used | 4:5 arch, round top; `object-position: 62% 66%` | Hand pouring espresso from a jug into a white cup beside a sparkling water glass, wet wooden bar |
| 03 | `photo-m28146075*.webp` | `assets/img/` | none since V5 (was craft "Pour") | coffee prep photo | **stock** (CC BY-SA 2.0, Sander van der Wel) | 1280×1920 | 2:3 | n/a | Espresso running into a double-walled glass under a group head |
| 04 | `photo-m61713028*.webp` | `assets/img/` | none since V5 (was craft "Pull") | coffee prep photo | **stock** (CC0, Blake Richard Verdoorn) | 1280×853 | 3:2 | n/a | Bottomless portafilter, single espresso stream |
| 05 | `photo-m187311853-*.webp` | `assets/img/` | none since V5 (was craft "Tamp") | coffee prep photo | **stock** (CC BY 2.0, Shixart1985) | 1200×800 | 3:2 | n/a | Barista hands tamping a portafilter at a machine, blue shirt |
| 06 | `photo-m201752739*.webp` | `assets/img/` | never shipped | coffee prep photo | **stock** (CC BY 2.0, Shixart1985) | 1280×1917 | 2:3 | n/a | Hands steaming milk in a red pitcher at the wand |
| | fonts, the barista, icons, stamps, the branch, the process scenes | `src/fonts/`, `clients/bean-o-clock/brand.js` | throughout | **graphic / identity** (drawn in code) | graphic | vector | n/a | n/a | Not raster images; nothing to regenerate |

**Count:** 6 stock photographs. **2 are live on the site** (01 hero, 02 the usual) and are the real
regeneration targets. 03–06 are stock files still in the repo but not displayed since V5 (the process is now
drawn by the barista); they are listed as a **reserve** in case photography returns to a section later. No
real business photograph is included in this pack.

---

## B. Regeneration entries

## 01 — Hero cappuccino (LIVE)

Current file:
`clients/bean-o-clock/assets/img/photo-f61713250-disc.webp` (820×820; also `-disc-440.webp`). Copy: `originals/01.webp` (the uncropped 1920×1280 source).

Used in:
Hero, right-hand emblem (the logo rebuilt: the coffee rises like the logo's sun).

Role:
The page's one hero product image: the "sun" of the emblem.

Subject:
A cappuccino seen from directly above in a white cup on a pale blue-white saucer, a rosetta (leaf) pour in
the foam, the cup's handle to the right, a spoon resting at upper left, on a warm wooden table.

Composition:
Straight top-down. The cup fills about 85% of the square crop, centred. Soft, flat daylight from the upper
left, low contrast, warm foam. Shallow depth only at the table edge. The site shows it inside a **circle**,
with roughly the **bottom 18% hidden** behind a curved ground line, and the barista illustration overlapping
its **left edge**. The badge sits over its **upper right**.

Desired replacement:
Premium coffee-campaign still life. Same top-down cappuccino, but the crema and microfoam rendered with real
texture and gloss, a crisper and more symmetrical latte art (rosetta or tulip), a richer two-tone crema ring,
and a calm matte background that reads well in a circle. Keep the art centred and slightly high so nothing
important falls in the hidden bottom fifth.

Aspect ratio:
`1:1`

Suggested generation size:
2048 × 2048 (export 820 and 440 webp crops)

### GPT IMAGE PROMPT

```
Top-down overhead photograph of a single cappuccino in a plain white ceramic cup on a matching white saucer,
shot straight down at 90 degrees. Glossy, velvety microfoam with a crisp, symmetrical rosetta latte-art
pattern in the centre, a rich hazelnut-brown crema ring around the edge with fine natural speckling. The cup
is centred and fills about 80 percent of the square frame; the latte art sits slightly above centre. A small
plain teaspoon rests on the saucer at the upper left. The cup handle points to the right. Background: a
warm, finely grained light oak tabletop, matte, evenly lit, with no other objects. Soft diffused daylight
from the upper left, gentle natural shadow falling down and right, no harsh highlights. Premium specialty
coffee campaign photography, editorial product still life, realistic textures, true-to-life colour, warm
cream and coffee-brown palette, calm and clean. Sharp focus across the whole cup, 100mm macro lens feel.
No text, no logos, no branding, no hands, no people, no props other than the spoon. Square format.
```

---

## 02 — The pour (LIVE)

Current file:
`clients/bean-o-clock/assets/img/photo-m61714648-960.webp` (960×1440; also `-500.webp`). Copy: `originals/02.webp`.

Used in:
"The usual." (best sellers), left column.

Role:
The product-desire photograph beside the three best sellers. The barista illustration sits on top of its
arch, and a crema line is drawn around it as a frame.

Subject:
A hand (no face) pouring espresso from a small steel milk jug into a small white ceramic cup on a worn, wet
wooden bar; a short faceted glass of sparkling water stands at left; a chrome machine and steel tins blurred
behind.

Composition:
Vertical, eye level, slightly above the bar. The cup sits lower right of centre, the jug and hand above it
entering from the right, the water glass lower left. Very shallow depth of field, background in heavy bokeh,
cool window light from behind left with warm wood. The site crops it to a **4:5 arch with a fully round
top** (`object-position: 62% 66%`), so the **top corners are cut away** and the top centre sits under the
illustrated barista; the action needs to live in the **lower 60%**.

Desired replacement:
Cleaner, warmer, more premium version of the same moment: the espresso ribbon clearly visible and glossy,
the cup and glass in sharper focus, a darker and calmer background with fewer distracting reflections, warm
natural side light, and quiet negative space in the upper third for the illustration.

Aspect ratio:
`4:5`

Suggested generation size:
1638 × 2048 (export 960 and 500 widths)

### GPT IMAGE PROMPT

```
Vertical photograph at bar height of a hand pouring a fresh shot of espresso from a small brushed-steel
pitcher into a small white ceramic espresso cup on a dark, worn wooden coffee bar. A glossy ribbon of
espresso with golden-brown crema falls into the cup. Only the hand and wrist are visible, entering from the
upper right, no face, no jewellery. To the lower left, a short faceted glass of sparkling water with fine
bubbles. The cup sits slightly right of centre in the lower half of the frame; the upper third is calm,
softly out-of-focus cafe background (warm dark tones, a hint of a chrome espresso machine), left as negative
space. Warm natural window light from the left raking across the wood grain, soft highlights on the steel
and the water glass, rich shadows. Shallow depth of field, 85mm lens at f/2 feel, focus on the stream and
the cup rim. Premium specialty coffee campaign photography, cinematic but realistic, tactile textures,
palette of espresso brown, warm wood, cream and soft steel. No text, no logos, no signage, no branding.
4:5 portrait format.
```

---

## Reserve (not displayed on the site since V5)

These four are stock files kept in the repo. Regenerate them only if photography returns to a section (for
example, social posts or a future craft gallery). Each prompt keeps hands-only, unbranded framing.

## 03 — Shot in a glass (reserve)

Current file: `clients/bean-o-clock/assets/img/photo-m28146075.webp` (1280×1920). Copy: `originals/03.webp`.
Used in: not displayed (was the "Pour" frame in V4's "What goes in the cup").
Role: Supporting coffee-craft photography.
Subject: Espresso running from a portafilter spout into a double-walled clear glass on a drip tray.
Composition: Vertical close-up, machine chrome at top, glass centred lower, warm amber espresso, dark background, shallow focus.
Desired replacement: Crisper crema layers through the glass, cleaner chrome, darker moody background, warm rim light.
Aspect ratio: `4:5`
Suggested generation size: 1638 × 2048

### GPT IMAGE PROMPT

```
Close-up vertical photograph of espresso pouring from the twin spouts of a chrome portafilter into a clear
double-walled glass resting on a stainless drip tray. Distinct layers visible through the glass: dark coffee
below, a thick golden-tan crema on top, two thin streams still falling. Polished chrome group head at the top
of the frame, softly reflective. Background in deep warm shadow. Warm rim light from behind right outlining
the glass and the streams, soft fill from the front. Shallow depth of field, 100mm macro feel, focus on the
crema line. Premium coffee advertising photography, realistic, tactile, palette of espresso brown, amber,
chrome and black. No text, no logos, no branding, no people. 4:5 portrait format.
```

## 04 — Bottomless pull (reserve)

Current file: `clients/bean-o-clock/assets/img/photo-m61713028.webp` (1280×853). Copy: `originals/04.webp`.
Used in: not displayed (was the "Pull" frame in V4).
Role: Supporting coffee-craft photography.
Subject: A bottomless portafilter with a single thick stream of espresso.
Composition: Horizontal, low angle under the basket, stream centred, chrome machine filling the top, grey blurred background.
Desired replacement: Richer "tiger-striped" extraction, one honey-like stream, darker background, warm key light.
Aspect ratio: `3:2` (or `1:1` for a disc)
Suggested generation size: 2400 × 1600

### GPT IMAGE PROMPT

```
Low-angle close-up photograph from just below a bottomless portafilter during an espresso extraction: the
underside of the basket shows rich tiger-striped crema, and a single smooth, honey-thick stream of espresso
falls straight down through the centre of the frame. Polished chrome machine body and handle across the top
third, slightly out of focus. Background: deep, warm, near-black shadow. Warm golden key light from the left
making the crema glow, soft reflections on the chrome. Shallow depth of field, 100mm macro lens feel, focus
on the stream where it leaves the basket. Premium coffee campaign photography, realistic, dramatic but clean,
palette of amber, caramel, chrome and black. No text, no logos, no branding, no people. 3:2 landscape format.
```

## 05 — Tamp (reserve)

Current file: `clients/bean-o-clock/assets/img/photo-m187311853-1200.webp` (1200×800). Copy: `originals/05.webp`.
Used in: not displayed (was the "Tamp" frame in V4).
Role: Supporting coffee-craft photography.
Subject: A barista's hands tamping ground coffee into a portafilter beside a machine.
Composition: Horizontal, three-quarter angle, hands centre right, busy machine and tools at left, cool light, blue shirt sleeves.
Desired replacement: Simpler, warmer, hands-only close-up with a clean counter and no busy equipment.
Aspect ratio: `4:5`
Suggested generation size: 1638 × 2048

### GPT IMAGE PROMPT

```
Close-up photograph of two hands tamping freshly ground coffee into a stainless-steel portafilter basket on a
clean, matte light-wood counter. One hand presses a heavy steel tamper with a dark wooden handle straight
down; the other steadies the portafilter handle. Visible texture of the fine coffee grounds and a few loose
grains on the counter. Sleeves: plain neutral cream cotton rolled at the wrist, no watch, no jewellery, no
face in frame. Three-quarter angle from slightly above. Background: soft, warm, out-of-focus cafe interior.
Warm natural side light from the left, gentle shadows. Shallow depth of field, 85mm lens feel, focus on the
tamper and the grounds. Premium specialty coffee editorial photography, realistic, tactile, palette of
espresso brown, steel, warm wood and cream. No text, no logos, no branding. 4:5 portrait format.
```

## 06 — Milk pitcher (reserve)

Current file: `clients/bean-o-clock/assets/img/photo-m201752739.webp` (1280×1917). Copy: `originals/06.webp`.
Used in: never displayed.
Role: Supporting coffee-craft photography.
Subject: Hands steaming milk in a red pitcher under a steam wand, wristwatch visible.
Composition: Vertical, close, pitcher centre, machine at left, dark background.
Desired replacement: Brushed-steel pitcher, glossy microfoam visible, warm light, cleaner frame.
Aspect ratio: `4:5`
Suggested generation size: 1638 × 2048

### GPT IMAGE PROMPT

```
Close-up vertical photograph of a hand holding a brushed stainless-steel milk pitcher tilted under the steam
wand of a chrome espresso machine, a small swirl of glossy white microfoam visible at the pitcher's rim, a
soft wisp of steam rising. Only the hand and forearm are in frame, plain dark sleeve, no face, no jewellery.
The pitcher sits slightly right of centre; the steam wand enters from the upper left. Background: deep, warm,
out-of-focus cafe shadows. Warm key light from the right catching the steam and the steel, subtle reflections.
Shallow depth of field, 85mm lens feel, focus on the foam at the rim. Premium coffee campaign photography,
realistic, tactile, palette of steel, cream, espresso brown and soft black. No text, no logos, no branding.
4:5 portrait format.
```

---

## C. Recommended order

1. **01 Hero cappuccino** — the first image every visitor sees, and the largest photograph on the page.
2. **02 The pour** — the only other live photograph; it carries the best-seller list and the illustration.
3. **04 Bottomless pull** — the strongest reserve image if a craft photograph is ever brought back (a disc crop would echo the hero).

03, 05 and 06 add little until a section needs them again.

The shop's own drink photographs (the three "New on the board" stickers) are low resolution, but they are
real products and are **not** in this pack. A phone shoot of those three drinks would improve the page more
than any generated image.
