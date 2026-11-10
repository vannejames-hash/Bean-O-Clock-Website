---
name: Digital Storefront (instance: Bean O' Clock Coffee To-Go, V4)
description: A shared single-page storefront system for local food businesses, re-skinned per client from config files and an optional illustration kit; Bean O' Clock V4 is the shipped instance.
colors:
  brand: "#516752"
  brand-deep: "#3B4D3C"
  espresso: "#2E211A"
  crema: "#CF8A45"
  crema-soft: "#EBC9A1"
  ink: "#2B231D"
  ink-soft: "#6A5D52"
  ground: "#F6F1EB"
  paper: "#FDF9F6"
  on-brand: "#F6F1EB"
  on-brand-soft: "#DCE2D6"
  line: "rgba(43, 35, 29, 0.14)"
  line-on-brand: "rgba(246, 241, 235, 0.3)"
  field-white: "#FFFFFF"
  error: "#A2372A"
typography:
  display-hero:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "min(clamp(54px, 7.4vw, 116px), 18cqi)"
    fontWeight: 760
    lineHeight: 0.92
    letterSpacing: "-0.03em"
    fontVariation: "'SOFT' 100"
  display-place:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(64px, 10vw, 160px)"
    fontWeight: 760
    lineHeight: 0.82
    letterSpacing: "-0.022em"
    fontVariation: "'SOFT' 100"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(38px, 4.6vw, 70px)"
    fontWeight: 760
    lineHeight: 0.96
    letterSpacing: "-0.022em"
    fontVariation: "'SOFT' 100"
  sign-off:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(42px, 6.6vw, 104px)"
    fontWeight: 740
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'SOFT' 100"
  aside-band:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(30px, 4.2vw, 62px)"
    fontWeight: 480
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100"
  photo-word:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(40px, 5vw, 80px)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
    fontVariation: "'SOFT' 100"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(24px, 2vw, 30px)"
    fontWeight: 760
    lineHeight: 1.08
    letterSpacing: "-0.01em"
    fontVariation: "'SOFT' 100"
  item-name:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(24px, 2.2vw, 32px)"
    fontWeight: 640
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100"
  poster-name:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(24px, 2vw, 30px)"
    fontWeight: 560
    lineHeight: 1.08
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100"
  statement:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(21px, 1.9vw, 28px)"
    fontWeight: 420
    lineHeight: 1.35
    letterSpacing: "-0.015em"
    fontVariation: "'SOFT' 100"
  lede:
    fontFamily: "Figtree, 'Segoe UI', system-ui, sans-serif"
    fontSize: "clamp(18px, 1.45vw, 21px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Figtree, 'Segoe UI', system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  action:
    fontFamily: "Figtree, 'Segoe UI', system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 750
    letterSpacing: "0.005em"
  label:
    fontFamily: "Figtree, 'Segoe UI', system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 750
    lineHeight: 1.3
    letterSpacing: "0.14em"
rounded:
  check: "4px"
  dialog: "6px"
  sheet-top: "16px"
  soft: "18px"
  pill: "999px"
  circle: "50%"
spacing:
  gutter: "20px"
  gutter-wide: "40px"
  grid-gap: "24px"
  section-pad: "clamp(60px, 6.4vw, 100px)"
  wrap: "1160px"
  wrap-narrow: "820px"
  nav-h: "64px"
  nav-h-desktop: "76px"
  hero-sun: "clamp(240px, 24vw, 340px)"
  board-plate: "34%"
  board-stage: "min(56.25cqi, max(540px, 100svh - nav-h - 100px))"
components:
  button-dark:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.on-brand}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-dark-hover:
    backgroundColor: "{colors.brand}"
  button-light:
    backgroundColor: "{colors.on-brand}"
    textColor: "{colors.espresso}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-light-hover:
    backgroundColor: "{colors.field-white}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "54px"
  button-small:
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  add-button:
    backgroundColor: "transparent"
    textColor: "{colors.brand-deep}"
    rounded: "{rounded.circle}"
    size: "44px"
  add-button-hover:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.on-brand}"
  board-row:
    typography: "{typography.body}"
    padding: "5px 0"
    height: "42px"
  best-row:
    typography: "{typography.item-name}"
    padding: "18px 0"
  tag-new:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    padding: "3px 9px 2px"
  count-badge:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    height: "22px"
  board-tag:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    height: "56px"
  board-tag-picked:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  board-stage:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "26px"
  board-plate:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "44px"
  chip-selected:
    backgroundColor: "{colors.brand-deep}"
    textColor: "{colors.on-brand}"
  segmented-option-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  stepper:
    rounded: "{rounded.pill}"
    height: "44px"
  text-field:
    backgroundColor: "{colors.field-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "12px 14px"
    height: "52px"
  packaging-label:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "34px 26px 24px"
  visit-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.soft}"
    padding: "40px 30px 30px"
  watch-face:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.circle}"
    width: "clamp(260px, 29vw, 420px)"
  sheet-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    width: "500px"
  action-bar:
    backgroundColor: "{colors.paper}"
    padding: "10px 12px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.pill}"
    padding: "10px 10px 10px 20px"
  nav:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    height: "{spacing.nav-h}"
---

# Design System: Digital Storefront (instance: Bean O' Clock Coffee To-Go, V4, refined through V6)

## Overview

**Creative North Star: "A Day with the Regular"**

This is a shared storefront system whose job is to carry each shop's own identity. A client is a folder, `clients/<id>/`, of five config files: `business.js` (name, contact, location, ordering), `menu.js` (categories, groups, items, prices, add-ons, featured picks), `theme.js` (colour roles and the display and text faces, injected at build as `:root` custom properties `--c-*`, `--font-display`, `--display-wght`, `--font-text`, plus `@font-face` rules), `content.js` (copy, images with alt text and a `standIn` flag) and the optional `brand.js` (an illustration kit: a posable figure rig and its pose table, icons, stamp, shine, arrow, branch, wordmark O, bean). Everything in `src/` (spacing, radius, easing, the type-size clamps, component anatomy, the motion verbs, the figure engine) is system-level and identical for every client. `build.mjs` loads `brand.js` only if it exists; every section checks for each kit part and falls back to type and photographs: no figure, no stamp, no shine; the visit pin falls back to the plain UI pin; the drawer's pickup readout falls back to a small dial whose hands turn to the chosen time; the placed order falls back to a drawn check mark. The values in the frontmatter are Bean O' Clock's.

Bean O' Clock V4 is the shop's two-tone logo world (logo green, logo cream) made into an everyday coffee world: a soft, warm serif in sentence case with its italic as the brand's aside, a friendly geometric sans for everything functional, crema as the one accent, and one pen that draws a small barista whose head is the logo's own bean. Time lives in the barista's props and day (a watch, a to-go cup, a walk), never in its body. The logo is rebuilt as the hero scene: the coffee rises behind a cream hill like the logo's sun, inside an arc of dial ticks, with EST. and the year set on the ground. Photographs are opened out of arches and discs; the shop's own poster drinks are die-cut stickers. It is a storefront first: the menu is one working board that shows a list at a time, every drink with its price and its add button, and ordering is never behind a brand moment.

Motion has seven verbs used the same way everywhere: reveal, mask, draw, scale, slide, drift and transform. Content is in the markup and visible without JS; motion runs only with JS and without reduced motion, and every figure is drawn in its final pose before any script touches it.

**Key Characteristics:**
- Per-client colour, faces, copy, menu and optional kit; system-level everything else.
- Four grounds: logo green, the cream ground, espresso for the craft band, deep green for the footer; paper only for raised surfaces.
- Display is a soft serif in sentence case; one word per line may go to the italic; display sentences end on a crema full stop.
- One pen: one stroke weight that never scales, round ends, solids only for the bean head, hands, shoes and crema accents.
- Crema is the one accent and is never running text.
- Pill buttons with a tonal printed edge that press down.
- Photographs open out of arches and discs; the shop's own drinks are round stickers.

## Colors

The shop's two-tone (logo green and logo cream) with deep green and espresso as the strong tones and crema, the colour of the coffee's foam, as the one accent. All values are per-client theme roles; the names below are the system's role names.

### Primary
- **Logo Green** (brand): the drenched field for the nav, the hero, "New on the board" and the order band; the menu board's plate and its picked tag; the dark-button hover; the second (italic) line of the Visit place; the pick-dial hands in the kit-less fallback.
- **Deep Bench Green** (brand-deep): the footer ground; the default button fill, selected chips, checked boxes, the drawer progress bar, the focus outline on light grounds, add-buttons' hover fill; the pen colour of the kit on the cream ground, paper and in the sleeve; group labels in the menu.

### Secondary
- **Crema** (crema): the one accent. The barista's apron and watch face, cup sleeves in every icon, the stamp disc, the full stop that ends display lines, the minute tracks, the crema thread and the arch frame, the craft line, the shines, the NEW tag, the count badge, the step-number discs, the blown-up watch face, the dotted visit route, the text selection.
- **Crema Foam** (crema-soft): kept as a theme role but unused since V6, when the menu index's travelling pill became the board's crema minute track.

### Tertiary
- **Espresso** (espresso): the dark ground of the craft band ("What goes in the cup"); the text colour on every crema or cream-on-green fill (light button, stamps, tag, count, watch face); the base the printed button edge is mixed toward.

### Neutral
- **Roast Ink** (ink): body text and headings on light grounds; the toast; the 1.5px rule over the best sellers and visit columns; the quiet button's hover ring.
- **Faded Roast** (ink-soft): ledes on light grounds, row descriptions, notes, hints, the tags' drink counts.
- **Logo Cream** (ground): the page ground, the hero's hill, the tags' cup discs and the phone's sticky tag bar, the packaging labels on espresso, the lines of the process scenes and their step words.
- **Paper** (paper): raised surfaces only: sheets, the menu board and its tags, the visit panel, the phone action bar, the selected segment, the ring round the board's print and poster sticker. The drawer's barista is cut from paper.
- **Cream on Green** (on-brand): text, ticks and the kit's pen on green and deep green; the light button; the sticker rings on the poster drinks. For Bean O' Clock it equals the ground.
- **Soft Cream on Green** (on-brand-soft): ledes, facts and secondary text on green; the nav's "Coffee to-go" line.
- **Hairline** (line) and **Hairline on Green** (line-on-brand): every seam, row rule, inset button, chip and add-button outline.

### System literals (not per-client)
- **Field White** (field-white): text-field fill and the light button's hover fill.
- **Brick Error** (error): invalid-field ring and error text. Validation only.

### Named Rules
**The Theme Owns Identity Rule.** Shared code reads `--c-*`; it never names a client hue. A new client changes `theme.js` (and optionally `brand.js`), not a stylesheet.
**The One Accent Rule.** Crema marks things (an apron, a sleeve, a stamp, a stop, a tick, a line, a badge); it is never the colour of running text, links or controls. Words set on crema are espresso.
**The Grounds Rule.** A section is one of four grounds: logo green, cream, espresso or (footer only) deep green. Adjacent cream sections share the ground and are divided by a hairline or a minute track, never by a fifth tint. Dark grounds carry a fine grain (fractal noise at 0.2 opacity, multiplied) under the content, the paper of the shop's printed boards.

## Typography

**Display Font:** per-client (`--font-display`, weight from `--display-wght`); Bean O' Clock ships Fraunces (variable 300 to 900, roman and italic, self-hosted woff2) at weight 760 with `'SOFT' 100` and optical sizing, falling back to Georgia, serif.
**Body Font:** per-client (`--font-text`); Bean O' Clock ships Figtree (variable 300 to 900), falling back to 'Segoe UI', system-ui, sans-serif.

**Character:** A warm, round-shouldered serif at its softest, kin to the flared serif on the shop's own "New drink!" posters, carries every heading in sentence case; its italic is the brand's aside, a little warmer than the line around it. A friendly geometric sans like the logo's lettering does all the work of reading and ordering.

### Hierarchy
- **Display hero** (760, `min(clamp(54px, 7.4vw, 116px), 18cqi)`, 0.92, -0.03em): the two-line lockup "It's *bean* / o'clock." fitted to its copy column with container units; each line sits in its own clip so it can rise. Phones run `min(21cqi, 104px)`.
- **Display place** (760, clamp(64px, 10vw, 160px), 0.82): the Visit heading "This way." (clamp(64px, 21vw, 100px) on phones).
- **Headline** (760, clamp(38px, 4.6vw, 70px), 0.96): section h2s.
- **Sign-off** (740, clamp(42px, 6.6vw, 104px), 1.0, max 12ch): the footer line, the shop's name in the italic.
- **Aside band** (italic 480, clamp(30px, 4.2vw, 62px), 1.1): the cup sleeve, one line of menu facts each with its cup icon.
- **Step word** (italic 600, clamp(30px, 2.8vw, 42px), 1.0): Tamp. Pull. Pour. under each process scene in cream, after a crema number disc, with a one-line note in Figtree 16px.
- **Title** (760, clamp(24px, 2vw, 30px), 1.08): h3s; the board's list titles run clamp(32px, 2.9vw, 42px) (clamp(28px, 8vw, 38px) on phones); sheet titles 28px at 700; empty and ticket headings 24 to 28px; packaging-label titles clamp(22px, 1.8vw, 27px) at 680; the phone menu's links 32px at 700.
- **Item name** (640, clamp(24px, 2.2vw, 32px), 1.05): best-seller rows (22px on phones).
- **Poster name** (italic 560, clamp(24px, 2vw, 30px), 1.08): the shop's poster drinks.
- **Readouts** (display 700 to 720, tabular): the Visit map-pin code clamp(36px, 3.2vw, 48px); the watch face's time clamp(44px, 5.2vw, 80px).
- **Statement** (lede scale, max 46ch): the craft paragraph, set beside the heading on espresso.
- **Lede** (Figtree 400, clamp(18px, 1.45vw, 21px), 1.5, max 44ch): section intros. The hero lede is clamp(17px, 1.35vw, 20px), max 40ch.
- **Body** (Figtree 400, 17px, 1.55): running text. On the board, drink names are 16px at 550 and prices 16px at 650 (15px from 900 to 1099px), their flavours 13.5px in ink-soft; tag names 15px at 750 over 13px counts.
- **Action** (Figtree 750, 16px, +0.005em, sentence case): buttons and text actions (15px on the small button).
- **Label** (Figtree 750, 12.5px, +0.14em, uppercase): form legends, menu group heads, footer and visit column heads, the pickup day. The stamp ring text (800, +0.16em), EST./year (800, +0.24em) and the nav wordmark (800, 15px, +0.12em, over "COFFEE TO-GO" at +0.3em) are the same voice, set as the logo sets "COFFEE TO-GO".

### Named Rules
**The Sentence Case Rule.** Display is always sentence case in the soft serif. Uppercase exists only in the label voice: small, tracked (0.12em to 0.3em), heavy, in the text face.
**The One Aside Rule.** At most one word or phrase per display line goes to the italic (the noun "bean", the shop's name, a place's second line); whole lines in italic are reserved for the asides themselves: the sleeve, poster names, photo words, notes.
**The Crema Stop Rule.** Display sentences end on a full stop in crema (`stop()` wraps sentence-final stops in `.stop`). A decimal point is never coloured.
**The Tabular Price Rule.** Every price, count, slot time, total, clock time and map pin uses tabular numerals.

## Layout

A 1160px wrap (an 820px narrow wrap for reading) with a 20px gutter (40px from 640px) on a 12-column grid with a 24px gap, so a 1366px screen keeps deliberate outer margins; only the hero hill, the sleeve, the thread and the minute tracks run full bleed. Sections pad by clamp(60px, 6.4vw, 100px). The hero is about two-thirds of the viewport (min-height clamp(360px, 66svh minus the crest, 540px)) so the sleeve shows in the first screen at 1366x768. Section heads put the h2 in columns 1 to 7 and the lede in 9 to 12, bottom-aligned. The menu is one board (see Components): five tags over a stage that is 16:9 of the wrap but never taller than the screen leaves under the nav and the tags (`board-stage`: 1160 by 652 at 1440x900, 1160 by 592 at 1366x768, so the tags and the whole board are seen at once), with every list stacked in its one cell so the board never changes size between lists. The nav is sticky at 64px (76px from 1024px); scroll padding is the nav plus 16px, and links to a list (`#cat-<list>`) land with the tags in view.

The hero is a grid of the copy column and the emblem column (1.3 times `hero-sun`). The hero does not end on an edge: a cream ellipse many screens wide rises under it as the logo's hill, crest centred beneath the cup, so the green field ends on a horizon. Below the hero, the sleeve runs full-bleed between two minute tracks. Asymmetry is deliberate: the middle poster drink drops lower than its neighbours; packaging labels and the board's tags tilt a degree or two.

Breakpoints are 640px, 900px, 1024px and 1100px (420px hides wide-only text, 400px shrinks the nav wordmark; from 900 to 1099px the board's plate narrows to 31% and its rows step down to 15px). Below 900px every grid collapses to one column, the sun shrinks to min(50vw, 230px) under the copy, hero and close actions go full width, the nav collapses to a toggle and the order button, the board's tags ride under the nav and scroll sideways, its plate sits over its list (words beside the picture and the barista) and only the picked list is in the page, the watch moves above the order copy, and a fixed action bar appears. Below 640px sheets become bottom sheets, poster drinks become 92px round rows, each process scene sits beside its words, the board's lists run in one column of 52px rows, and the Visit figure and route sit above the heading. Touch targets hold at 44px minimum.

## Elevation & Depth

The page is mostly flat; depth comes from the four grounds, the hill, paper for raised surfaces and inset hairlines (`box-shadow: inset 0 0 0 1px` or 1.5px in `line`). Two kinds of object lift off the page: die-cut things (the poster stickers and the watch face) and overlays. Buttons have a printed edge rather than a shadow.

### Shadow Vocabulary
- **Printed edge** (`0 2px 0` in the button colour mixed 62% toward espresso; `0 3px 0` on hover, `0 1px 0` pressed): every solid pill button. Vertical only, tonal to its own fill.
- **Sticker lift** (`0 22px 30px -14px` black at 50%, under a 9px on-brand ring; `0 12px 18px -10px` with a 5px ring on phones): the poster drinks. The board's print and poster sticker take a lighter one (`0 18px 26px -14px` under a 6px paper ring). The watch face uses the same lift (`0 30px 40px -24px`) under a 10px cream ring.
- **Sheet lift** (`0 24px 64px` ink at 18%): order drawer, item sheet, delivery note.
- **Toast lift** (`0 12px 32px` ink at 24%): the add-to-order toast.
- **Segment press** (`0 1px 2px` ink at 12%, `0 2px 8px` ink at 6%): the selected option in a segmented control.
- **Scrim** (ink at 45%): the sheet backdrop.

### Named Rules
**The Die-Cut Lift Rule.** In-page shadows belong only to die-cut objects (round stickers, the watch face) and always come with a cream ring; panels, labels, rows and photographs in shapes stay flat and are outlined by an inset hairline or nothing.
**The Printed Edge Rule.** A button's edge is its own colour, darker, straight down, 2px; it grows to 3px on hover and compresses to 1px as the button presses 2px down. Never an x-offset, never black or ink. The one other place it appears is the menu board, an object on the counter: its tags carry a 3px edge in their own outline colour (pressing to 1px) and the board a 4px edge in hairline.

## Shapes

Soft. The workhorse radius is 18px (fields, the visit panel, packaging labels); centred sheets round 6px; phone bottom sheets round 16px at the top with a 40 by 4px grab handle; checkboxes 4px. Every button, chip, segmented control, stepper, NEW tag, badge and toast is a full pill (999px). The board rounds 26px and its tags 18px. Circles are for add-buttons, icon buttons, board thumbnails (30px; 34px on phones), the tags' cup marks (40px discs), the hero sun, the poster stickers, the watch face and the craft step numbers.

The brand's shapes come from the logo and the shop's packaging:
- **The Timekeeper** (hero, V8): no photograph. The right half is the brand's own world (`heroScene()` and `pattern()` in brand.js). The logo's dial stands on its ground: an open ring and 59 minute ticks (every fifth long), a steaming crema cup in place of twelve, a cream hour hand at twelve and a crema minute hand the barista, life-size for the headline, leans into and pushes up toward the cup (setting the clock to bean o'clock), its own takeaway cup in the other hand; the minute hand turns to wherever the barista's hand is (`data-aim`), so the two never part. EST. and the year sit at the ground's ends. Behind it a faint paper of beans, tiny clocks, cups, runs of ticks, shines and dots (cream at 11%, one in ten crema at 38%), a jittered field, each mark turned and sized a little differently, thinning to nothing round the character and fading toward the headline, running past the grid to the right. The scene is 470px wide at most (86vw, 360px max on a phone, under the copy); the hero stays about two-thirds of the viewport (533px at 1366x768). A client without a kit keeps the photograph rising in the dial.
- **The arch** (the usual): a 4:5 frame with a full round top (`border-radius: 50% 50% 7% 7% / 40% 40% 5.6% 5.6%`), four columns wide, a crema frame drawn round it.
- **The process scenes** (craft, V7): no photographs. Three frames of one small film at one counter (`processScene(step, { pose })` in brand.js), each action readable without its word, each body doing something different. TAMP: leaning in over the portafilter on its crema mat, the other hand on its handle, pressing the tamper into the basket (a mound of grounds above the rim before, gone into the basket after), a crema arrow pointing down and impact ticks at the basket. PULL: leaning back, pulling a lever machine's lever down from above its head (the lever's end stays in its hand), the other arm out for balance; the same portafilter locked under the group, the shot running into the cup, crema spreading, steam. POUR: standing tall, hand on hip, the jug held out high and tipped, the milk running into the same cup, a heart on the crema. A crema hand-drawn arrow between scenes on desktop; on a phone each scene (57%) sits beside its words.
- **Die-cut stickers** (New on the board): the shop's own poster drinks circled with a 9px cream ring, each turned a few degrees (they straighten on hover).
- **The menu board** (V6): the shop's printed boards made an object. A paper board (26px radius, hairline outline, 4px printed edge) whose left 34% is a logo-green plate (the list's number, its title, note and count, and at its foot the list's picture and the barista); the list on paper to its right, after the boards: group labels in label caps behind a short crema tick, drink names with a dotted leader to the price, a 32px add-button, and the coffee branch faint behind. Above it, five tags stuck on by hand (tilted -1.4 to 1.3 degrees), each with its list's cup on a cream disc, its name and how many drinks it holds; the picked tag is green and straight, its cup disc crema, and the crema minute track sits under it.
- **Packaging labels** (craft claims): three cream die-cuts on espresso, each its own form: a hang tag with a punched hole and a minute track, an oval jar label, an arch-topped bag label with a crema band at its foot.
- **The minute track**: the logo's dial unrolled into a strip of ticks (a 70px repeat of five 2px round ticks, the first long), 14px tall, in crema by default. The brand's border: above and below the sleeve, along the top of the footer (cream at 80%), inside the hang tag and the visit panel.

### Illustration (the kit in `brand.js`)
One pen draws it all: lines of one weight (`--lw: 2.4px`, `vector-effect: non-scaling-stroke`, so it keeps its weight at any size), round caps and joins. Solids only for the bean head, hands, shoes and crema accents. Colours come from three properties: `--fig-line` (the pen and the head), `--fig-fill` (the ground it is cut from, filling the shirt, trousers and cups) and `--fig-accent` (crema). On green (and on the board's plate) it is cream cut from green; on the cream ground and on the tags it is deep green cut from cream; in the drawer, cut from paper; on espresso, cream cut from espresso; in the footer, cut from deep green.
- **The barista** (`regular()`): a small line figure whose head is the logo's bean, solid, its crease and two eyes cut out (an optional cut smile), tilted -12deg; a shirt, a crema apron with a pocket, trouser legs as outlined capsules, solid shoes, single-line arms ending in solid hands, a watch with a crema face on the front forearm, and a prop in either hand that counter-rotates to stay upright: a to-go cup hot (with drifting steam) or iced (with a straw), a hot cup under a cloud of salty cream, an iced matcha with a leaf on its lid, the tamper, the milk jug, a tray of extras (a shot glass, a syrup bottle with its pump, a cup of salty cream), or a paper pickup bag with a crema label. Since V7 the upper body turns at the waist (`sp`), so it can lean into a job or back from it; arms are posed by reach (`reach()` with the elbow up for pressing, down for reaching up, gripping or pouring); `handAt()` gives a hand's place, so a part of the set can stay in it (the machine's lever). For the ride it wears a half-face helmet: a crema shell over the top of the bean with a short peak, the face left open. It is a proposal for the shop and is never named on the page.
- **Category cups** (`icon()`, 48-unit): hot, iced, cloud (salty cream), leaf (matcha), each with a crema sleeve; plus bean, clock, plus and the map pin with a crema centre.
- **The stamp** (`stamp()`): words set around a ring on a crema disc in espresso label caps (the footer inverts to cream and deep green), a cup in the middle, turning once every 40s.
- **The shine** (`shine()`): three short crema dial ticks beside a product, the clock as punctuation.
- **The arrow** (`arrow()`): a hand-drawn bending arrow in crema for annotations.
- **The coffee branch** (`branch()`): the posters' line-art branch (leaves and cherries), 1.5 stroke, in cream at 24% opacity behind the poster drinks, drawn on by the pen; and in deep green at 11% in the board's lower right, behind the lists, as the shop's boards print it.
- The kit also exports the wordmark's O with one clock hand (`oHand()`) and the bare bean (`bean()`); the V4 page does not place either.

### The barista's poses
A pose table of joint angles (`poses` in `brand.js`, printed into the page as `#figure-poses`, with the rig as `#figure-rig`): stand, carry, cheers, sip, watch, watchCheck, pushStart, push, point, shrug, sit, sitSip, lean, wave, present, tray, tampUp, tampDown, pullReady, pull, pourReady, pour, ride; the walk is a cycle around carry. The click acts (V9) add sitToast, offer, orderShow, tampHigh, letGo and letGoShrug, shoveBack and shoveOut, trayReach and trayShow; the browser also solves an arm to any point (`reachTo`, the kit's two-bone solve), so the hero can follow and catch a hand that is not in a pose. One figure per section at most, each doing that section's job, and no two jobs alike (since V7: nothing just stands):
- **Hero:** braced and leaning in, smiling up at twelve, pushing the clock's minute hand toward the cup, a takeaway cup in the other hand.
- **The usual:** sits on the arch's top, legs over the edge; takes a sip every 6.5s.
- **The board:** one barista per list, on the plate beside its picture, holding that list's cup: sips a hot cup (espresso-based), raises a cream-topped cup (salty cream), holds out a matcha (matcha), carries an iced cup (non-coffee), carries the extras on a tray that sways a little (add-ons). It turns to its pose from standing when its list comes up and the first time the board comes into view, and gives a small hop when a drink from its list is added.
- **What goes in the cup:** tamps, pulls the lever, pours (see the process scenes).
- **Order band:** checks the watch with a pickup bag in the other hand, beside the blown-up crema watch face that keeps the time in Tagum (Asia/Manila); hovering or focusing "Order ahead" there makes it take a second look, wrist to its face.
- **Visit:** rides to the shop on a small scooter, half-face helmet on (`moto()` in brand.js), at the start of the dotted route to the pin.
- **Footer:** leans on the stamp, cup in hand; the first time it comes into view it raises the cup and waves goodbye, then leans again.
- **Drawer:** shrugs at an empty cart, checks the watch at the pickup time, raises a cup to a placed order.

**Every barista answers a press (V9).** A click, a tap, or Enter or Space on it plays one short act of its own, never shared, from the same beats (a wind-up on the in-out curve, about 240ms; the action quick, 110 to 160ms, a strike accelerating into contact or a gesture landing with a small overshoot; a short hold; back on the in-out curve, about 400ms). One `mascot()` instance per figure in app.js: its act, when it is ready, a 220ms cooldown and a reset. While an act plays one more press is queued at most and the rest are dropped. A figure's lines take no clicks; an invisible body-sized target does (`.f-hit`), and the process scenes and the scooter take presses over their whole drawing. Each is a labelled button, reachable by keyboard.
- **Hero:** holding the minute hand, it shoves it once round the dial and catches it as it comes back; while it waits for the hand, it shrugs.
- **The usual:** raises its cup in a toast (up, a quick clink with the cup tipped, a hold) and puts it back on its knee.
- **What goes in the cup:** each frame does its job again once the film has moved past it: TAMP raises the tamper clear and drives it down with a jolt and the impact ticks; PULL takes the lever up (the shot stops), brings it down and the shot runs; POUR tips the jug back, then pours, the splash and the heart coming again.
- **The board:** holds its list's drink out toward the list with a small bow and a nod. The add-ons barista reaches to the tray, lifts the syrup bottle up beside its head (the tray's own bottle hides while it is held: `spare` in `regular()`), gives it a proud shake and puts it back.
- **Order band:** right on time: wrist up to the watch, a nod, the pickup bag held up.
- **Visit:** revs: the buzz hardens, the wheels and road run twice as fast, the front lifts and rocks, the rider's head snaps back, a big puff and long speed lines; about 1.1s, CSS (`.is-revving`).
- **Footer:** waves goodbye again.

### Named Rules
**The One Pen Rule.** Every kit drawing uses the same non-scaling stroke and round ends; details are cut out of solids in the ground colour, never outlined, and the only second colour is crema.
**The Props Tell Time Rule.** Time lives in the barista's props and day (the watch, the cup, the walk), never in its body; a new use picks a pose from the table and a job for that section, never decoration on its own.

## Components

### Buttons
One family: a solid pill with a printed edge, pressed down on click like a sticker on a counter.
- **Shape:** full pill (999px), 54px tall, 26px side padding, 16px text at 750, 10px gap to a trailing arrow; small variant 44px tall, 18px padding, 15px text.
- **Dark (default):** deep green fill, cream text; hover lifts to logo green.
- **Light:** cream fill with espresso text, used on green ("Order ahead" in the nav, hero and order band); hover goes to white.
- **Quiet:** transparent with a 1.5px inset hairline; hover strengthens the ring to ink without lifting.
- **Hover / Press:** on fine pointers the button rises 1px as its edge grows to 3px and the trailing icon nudges 3px right; on press it drops 2px onto a 1px edge (160ms ease-out). Disabled is 45% opacity.
- **Text action:** 16px at 750 with a permanent 1.5px underline 8px below; the arrow slides 4px on hover. Nav and plain links draw their underline from 0 to full over 320ms.

### Rows
- **Board row:** a full-width button, 42px minimum (52px on phones), unruled as on the shop's boards: the name, a dotted leader that fills to the tabular price, and a 32px add-button (36px on phones); the flavours run on a second line under the name; an optional 30px round thumbnail leads. The name slides 4px on hover. New items carry a small crema pill tag in espresso label caps. Add-ons are the same row without a button (they are picked in the item sheet).
- **Best-seller row:** display-face item name, 18px padding, 44px add-button, the name slides 6px on hover; the list hangs from a 1.5px ink rule.
- **Add-button:** a hairline circle that fills deep green on row hover and presses to 0.9. Once used it turns to a check (pop, 380ms) with three crema ticks shining out of it (600ms). On green it inverts.

### Chips, segmented control, stepper
- **Chips:** 44px pills, 16px padding, inset hairline, 16px text; selected fills deep green; disabled is 40% with a strike-through. Pickup slots sit in an auto-fill grid (min 92px).
- **Segmented control:** a pill track (ink at 6%) with a 4px inset; the checked option becomes paper with the segment-press shadow.
- **Stepper:** a hairline pill holding two 44px circular buttons and a tabular count; buttons press to 0.88.

### Inputs / Fields
- **Style:** white fill, 18px radius, 52px min height, 12px 14px padding, 1px inset hairline, 17px text; textareas from 96px.
- **Focus:** the inset ring thickens to 2px deep green; no outline.
- **Error:** 2px inset ring and 14px message in brick. Checkboxes are 22px squares (4px radius) that fill deep green when checked.

### Navigation
A sticky logo-green bar: the shop's raster logo tile at 44px and the name in tracked capitals over "COFFEE TO-GO"; 16px links at 600 with drawn underlines; a light small button "Order ahead" with a bag icon and a crema count badge that bumps (scale 1.25, 360ms) when items are added; a hairline fades in once the page scrolls. Below 900px the links collapse into a toggle that opens 32px display-face links ruled by cream hairlines.

### The board's tags
A tablist (arrow keys, Home and End move between lists; only the picked tag is in the tab order). Each tag is a paper sticker with an 18px radius, a hairline outline and a 3px printed edge: a 40px cream disc holding the list's cup, the list's name and a count ("17 drinks", "8 extras"). Unpicked tags sit a degree or two off straight and straighten and lift 2px on hover; a tag presses 1px on click. The picked tag is logo green with cream words, its disc crema, straight and lifted 3px, its disc popping as it is picked; the crema minute track sits under it and slides to the next one (380ms, drawer curve). Under 900px the tags ride under the nav in a sideways-scrolling bar that keeps the picked one in view.

### Packaging labels
The boards' three claims on espresso, each a link: cream ground, ink text, the category's cup icon at 56px, a display title, ink-soft text and a deep-green "From" price with an arrow. Each is its own die-cut (hang tag, oval jar label, arch-topped bag label), tilted -2 to 1.5 degrees; on hover it straightens and lifts 4px (380ms, pop curve).

### The watch
The order band's centrepiece: the barista's watch face blown up, a crema disc with 60 espresso minute ticks (every fifth long), a 10px cream ring and the sticker lift; the display-face time in Tagum, updated every 20s, over a label-caps caption.

### The drawer and sheets
Native dialogs on a paper panel over an ink scrim. The order drawer slides in from the right (500px max) over 460ms on the drawer curve and leaves in 280ms; item and note sheets are centred (540px max, 6px radius) and rise from 98% scale. Under 640px all three become bottom sheets (92dvh, 16px top radius, grab handle). Each has a display-face title, a step line and a 2px deep-green progress bar, a scrolling body and a hairline-topped footer with a full-width button. The pickup step pins a readout to the top of the body (the barista checking its watch, or the fallback dial, beside the day label and a 30px tabular time). The placed-order ticket is ruled with dashed hairlines.

### Phone action bar and toast
Below 900px a fixed paper bar with a top hairline slides up (360ms, drawer curve) once the hero's action is out of view, holding the two ordering paths (1.4fr to 1fr), then the cart total. The toast is an ink pill centred at the bottom (above the bar on phones) with a cream pill button; it rises 16px over 360ms.

### Motion
Four curves: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for state, hover, press and reveals; ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for the pen; the drawer curve `cubic-bezier(0.32, 0.72, 0, 1)` for sheets, the action bar, masks, the rising sun, the board's crema track and its title roll; pop `cubic-bezier(0.34, 1.56, 0.64, 1)` for stickers, stamps, labels and the pin. Plain `ease` for colour. Seven verbs, each with one job:
- **Reveal** (`data-m="rise"`): a headline rises 115% into its own clipped line (1000ms) once in view.
- **Mask** (`data-m="mask"`): a photograph opens upward out of its arch, or outward from the centre of its disc (1200ms), settling from 1.15 scale.
- **Draw** (`data-m="draw"`): a line is drawn by the pen (2000ms): the branch, the dotted route, the process arrows (a wipe), the shot and the milk (stream paths). The crema thread, on wide screens only, is drawn by the scroll from the ground beside the hero's cup, loops once like a pen flourish, runs down beside the usual's arch and becomes its frame.
- **Scale** (`data-m="pop"`): a sticker, stamp or watch is slapped on from 0.4 scale and -18deg with overshoot (620ms), staggered 120ms.
- **Slide:** the sleeve travels from -4% to -26% across its pass through the viewport; the one scroll-linked slide.
- **Drift:** steam rises off hot cups (3.2s loop); stamps turn (40s a turn). Slow, endless, small.
- **The process (V7):** as the section arrives the film plays once, about 4.6s: two tamps (the mound squashes on the first, impact ticks and the arrow nudging down on each), the arrow is drawn, the lever comes down from overhead (720ms) and the shot runs, crema spreading and steam rising, the arrow, the jug tips (760ms), the milk runs and a heart blooms. Shown complete without motion, or if play stalls.
- **The ride (V7):** the scooter rolls in 96px as Visit arrives, then the route runs out to the pin. After that it stays put and loops every 4s, only while on screen: wheels turn and the road runs back under them; the body and rider buzz on the suspension; at 55% it revs (the front lifts 2.4deg, the rider's head tips back, a puff leaves the exhaust, speed lines streak behind) and settles to idle before the loop meets itself. CSS only (`.is-riding`, toggled by app.js).
- **Small moments (V7):** the add-ons tray sways (2.8s) while that list is up; the footer barista waves once; the order barista looks at the watch again on hover; the board's barista hops when its drink is added.
- **Transform:** the barista changes pose. `applyPose` sets every joint; `pose()` tweens between poses with a cubic ease-in-out (700ms default) and always lands, even if frames stall; `loop()` runs idles; `walk()` is an 860ms cycle of swinging legs, bending knees, a counter-swinging arm and a bob. Every pose sets the lever and the held props with it, so a frame drawn on the server and a frame tweened in the browser agree.
- **The board changes list (V6):** tab content, used again and again, so nothing staggers and it is done in about 400ms. On the click the tag presses and the crema track slides under it (0ms, 380ms). The two titles roll together as one drum, the old one up out of its clipped line as the new one comes up into it, like a sign board's letters (0ms, 340ms, drawer curve): the lead. Everything else of the old list is gone by 90ms, so two lists never sit on each other; the new list's words and drinks come in 14px from the side of travel (60ms, 240 to 300ms); its picture is slapped on from 0.86 and 7deg (60ms, 420ms, pop) as its barista turns from standing to its pose (60ms, 460ms). The board itself, its plate and the branch never move. Under reduced motion the list simply changes.
- **The hero sequence (V8):** "It's bean" rises at 100ms and "o'clock." at 220ms (900ms); the ground is drawn from 150ms; the paper of beans and clocks comes up from 200ms (1600ms); the dial's ring is drawn from 300ms (1300ms) and its ticks from 500ms (12ms apart); the barista, holding the minute hand at a quarter to, pushes it up toward twelve (from 450ms, 1150ms); the cup at twelve pops on at 1450ms; EST. and the year appear at 1200ms. Then a 4s idle loop, only while the hero is on screen: the barista breathes, the push eases and presses again (the minute hand moves with it), the head tips, steam rises; the paper drifts 14px over 28s. The entrance releases itself by 3.3s.
- **The clock's hands (V9):** both hands can be pressed (wide invisible targets on top that turn with them; a faint glow on hover and focus). A press gives a hand a push that becomes angular velocity over a short spin-up; friction draws the velocity back to the clock's own creep; the angle integrates in fixed 1/120s steps from a frame time clamped to 50ms, so the feel is the same at any frame rate and nothing jumps. Minute hand: kick 120°/s, spin-up 50ms, coast time constant 0.7s (about 84° a press, comfortable at two presses a second), capped at 480°/s, creeping 1.2°/s. Hour hand, about four times heavier: kick 20°/s, spin-up 220ms, coast 2.7s (one press every two seconds), capped at 150°/s, creeping 0.1°/s. Each push only fills the room left under the cap, and the velocity is clamped. While the barista holds the minute hand it moves only with the push; pressed, the hand is knocked free and the barista lets go (hand on hip, eyes following the hand round, a look at the watch every 7.5s while it waits). When the hand comes back up from nine slowly (under 140°/s, between -80° and -50°, not within 450ms of a press), the barista catches it, damps it in about 0.1s and sets it back (380 to 900ms). Each time the minute hand reaches twelve the cup there hops. A mouse acts on press; a finger only on a tap, so a scroll that starts on a hand stays a scroll; double-tap zoom is off over the scene.
- **Under reduced motion, presses still work:** a hand press sets that hand on by five minutes or an hour at once (set back within reach, the minute hand is the barista's again); a barista's act becomes a 300ms fade of the figure.
- **The nudge (touch screens only, V9):** a visitor who has never played with the clock, on a coarse pointer, sees once that it moves. After 5s on screen untouched the barista gives the minute hand two little pushes (about 18° of forward swing, in and out of a wind-up) while a faint cream glow runs along the hand. Remembered per visitor in local storage; any press (hand or barista) before the five seconds are up cancels it. Under reduced motion only the glow shows.
- **Under reduced motion** everything rests: no entrance, figures stand in their drawn poses, the route and pin are already out, the scooter stands still, the thread is off and the arch frame is drawn, the sleeve does not slide, steam and stamps are still, smooth scrolling is off, and remaining animations and transitions collapse to 1ms.

## Do's and Don'ts

### Do:
- **Do** read every colour, face and display weight from the theme properties; a new client is new config files, and optionally a `brand.js`.
- **Do** keep every section working without the kit: type, photographs, the plain pin, the small dial, the check mark.
- **Do** set display in the soft serif in sentence case, send at most one aside per line to the italic, and end display sentences on the crema stop.
- **Do** keep crema to marks: the apron, sleeves, stamps, stops, ticks, lines, badges, the watch face; set words on crema in espresso.
- **Do** draw kit additions with the one pen (2.4px non-scaling stroke, round ends, details cut from solids) and give the barista one pose and one job per section.
- **Do** open photographs out of arches and discs (on the board, a print with a paper ring), and circle only the shop's own drinks as stickers.
- **Do** use the minute track as the brand's border where a section or label needs an edge.
- **Do** keep every interactive target at 44px or more (the board's rows are full-width targets of 42px for a mouse, 48px or more on touch), set prices, counts and times in tabular numerals, and gate hover effects behind `(hover: hover) and (pointer: fine)`.
- **Do** keep content in the markup and visible with JS or motion off; figures are drawn in their final poses.

### Don't:
- **Don't** set crema as the colour of running text, links or controls.
- **Don't** set display in capitals, and don't track capitals anywhere but the small label voice.
- **Don't** add a second button family; vary the pill by colour variant and size, and keep its edge tonal, vertical and 2px.
- **Don't** shadow in-page panels, labels or rows; lift only die-cut objects, always with their cream ring.
- **Don't** put time in the barista's body (no clock-hand arms, no dial face); time lives in its watch, cup and walk.
- **Don't** name the barista on the page; it is a proposal for the shop, not an existing mascot.
- **Don't** redraw the shop's logo as a vector; the raster logo tile appears in the nav only until the shop supplies its own vector.
- **Don't** fade content in on its own; every reveal is a shape, a line or a pen.

<!-- Provenance and open items (not rules): since V6 the usual's pour and the board's espresso print are generated (the hero cappuccino, also generated, left the hero in V8 and no longer ships) stand-ins from compiled-photos/Enhanced Photos (content.js `standIn: true, generated: true`, rendered with data-source="generated", listed on credits.html as generated for the demo and not the shop); they replaced licensed library photographs of the same subjects. The poster drinks (also on the board's matcha and non-coffee plates) are the shop's own poster photographs, since V7 in versions enhanced for the web (compiled-photos/Enhanced Photos: the same drinks, glasses and tables; cropped square with each glass at the same size; the white chocolate and matcha toned back toward the posters' colour; content.js `enhanced: true`, data-source="client-enhanced", noted on credits.html); the poster crops they replace are kept in assets/source/. The enhanced milk-steaming image was not used: its watch shows a legible third-party brand. The barista is a proposal pending the shop's review. The nav uses the shop's raster logo tile; no vector logo exists yet. Open with the shop: hours, street address, the Foodpanda URL, the shop's own photographs, and the Matcha Oreo Latte price (poster ₱185, board ₱190; the site shows the board price). -->
