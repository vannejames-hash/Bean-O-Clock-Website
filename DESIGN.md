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
    fontSize: "min(clamp(58px, 9.4vw, 148px), 19.5cqi)"
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
    fontSize: "clamp(42px, 5.8vw, 92px)"
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
  section-pad: "clamp(72px, 8vw, 128px)"
  wrap: "1160px"
  wrap-narrow: "820px"
  nav-h: "64px"
  nav-h-desktop: "76px"
  index-h: "56px"
  hero-sun: "clamp(300px, 31vw, 450px)"
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
  menu-row:
    typography: "{typography.body}"
    padding: "10px 0"
    height: "60px"
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
  menu-index-pill:
    backgroundColor: "{colors.crema-soft}"
    textColor: "{colors.espresso}"
    rounded: "{rounded.pill}"
    height: "36px"
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

# Design System: Digital Storefront (instance: Bean O' Clock Coffee To-Go, V4)

## Overview

**Creative North Star: "A Day with the Regular"**

This is a shared storefront system whose job is to carry each shop's own identity. A client is a folder, `clients/<id>/`, of five config files: `business.js` (name, contact, location, ordering), `menu.js` (categories, groups, items, prices, add-ons, featured picks), `theme.js` (colour roles and the display and text faces, injected at build as `:root` custom properties `--c-*`, `--font-display`, `--display-wght`, `--font-text`, plus `@font-face` rules), `content.js` (copy, images with alt text and a `standIn` flag) and the optional `brand.js` (an illustration kit: a posable figure rig and its pose table, icons, stamp, shine, arrow, branch, wordmark O, bean). Everything in `src/` (spacing, radius, easing, the type-size clamps, component anatomy, the motion verbs, the figure engine) is system-level and identical for every client. `build.mjs` loads `brand.js` only if it exists; every section checks for each kit part and falls back to type and photographs: no figure, no stamp, no shine; the visit pin falls back to the plain UI pin; the drawer's pickup readout falls back to a small dial whose hands turn to the chosen time; the placed order falls back to a drawn check mark. The values in the frontmatter are Bean O' Clock's.

Bean O' Clock V4 is the shop's two-tone logo world (logo green, logo cream) made into an everyday coffee world: a soft, warm serif in sentence case with its italic as the brand's aside, a friendly geometric sans for everything functional, crema as the one accent, and one pen that draws a small barista whose head is the logo's own bean. Time lives in the barista's props and day (a watch, a to-go cup, a walk), never in its body. The logo is rebuilt as the hero scene: the coffee rises behind a cream hill like the logo's sun, inside an arc of dial ticks, with EST. and the year set on the ground. Photographs are opened out of arches and discs; the shop's own poster drinks are die-cut stickers. It is a storefront first: the menu is a working priced list, and ordering is never behind a brand moment.

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
- **Logo Green** (brand): the drenched field for the nav, the hero, "New on the board" and the order band; the dark-button hover; the second (italic) line of the Visit place; the pick-dial hands in the kit-less fallback.
- **Deep Bench Green** (brand-deep): the footer ground; the default button fill, selected chips, checked boxes, the drawer progress bar, the focus outline on light grounds, add-buttons' hover fill; the pen colour of the kit on the cream ground, paper and in the sleeve; group labels in the menu.

### Secondary
- **Crema** (crema): the one accent. The barista's apron and watch face, cup sleeves in every icon, the stamp disc, the full stop that ends display lines, the minute tracks, the crema thread and the arch frame, the craft line, the shines, the NEW tag, the count badge, the step-number discs, the blown-up watch face, the dotted visit route, the text selection.
- **Crema Foam** (crema-soft): only the travelling pill behind the active menu-index link.

### Tertiary
- **Espresso** (espresso): the dark ground of the craft band ("What goes in the cup"); the text colour on every crema or cream-on-green fill (light button, stamps, tag, count, watch face); the base the printed button edge is mixed toward.

### Neutral
- **Roast Ink** (ink): body text and headings on light grounds; the toast; the 1.5px rule over the best sellers and visit columns; the quiet button's hover ring.
- **Faded Roast** (ink-soft): ledes on light grounds, row descriptions, notes, hints, unselected menu-index links.
- **Logo Cream** (ground): the page ground, the hero's hill, the sticky menu index, the packaging labels on espresso, the lines of the process scenes and their step words.
- **Paper** (paper): raised surfaces only: sheets, the visit panel, the phone action bar, the selected segment, the menu category mark discs. The drawer's barista is cut from paper.
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
- **Display hero** (760, `min(clamp(58px, 9.4vw, 148px), 19.5cqi)`, 0.92, -0.03em): the two-line lockup "It's *bean* / o'clock." fitted to its copy column with container units; each line sits in its own clip so it can rise. Phones run `min(21cqi, 104px)`.
- **Display place** (760, clamp(64px, 10vw, 160px), 0.82): the Visit heading "This way." (clamp(64px, 21vw, 100px) on phones).
- **Headline** (760, clamp(42px, 5.8vw, 92px), 0.96): section h2s.
- **Sign-off** (740, clamp(42px, 6.6vw, 104px), 1.0, max 12ch): the footer line, the shop's name in the italic.
- **Aside band** (italic 480, clamp(30px, 4.2vw, 62px), 1.1): the cup sleeve, one line of menu facts each with its cup icon.
- **Step word** (italic 600, clamp(30px, 2.8vw, 42px), 1.0): Tamp. Pull. Pour. under each process scene in cream, after a crema number disc, with a one-line note in Figtree 16px.
- **Title** (760, clamp(24px, 2vw, 30px), 1.08): h3s; menu category heads run clamp(28px, 2.6vw, 38px); sheet titles 28px at 700; empty and ticket headings 24 to 28px; packaging-label titles clamp(22px, 1.8vw, 27px) at 680; the phone menu's links 32px at 700.
- **Item name** (640, clamp(24px, 2.2vw, 32px), 1.05): best-seller rows (22px on phones).
- **Poster name** (italic 560, clamp(24px, 2vw, 30px), 1.08): the shop's poster drinks.
- **Readouts** (display 700 to 720, tabular): the Visit map-pin code clamp(36px, 3.2vw, 48px); the watch face's time clamp(44px, 5.2vw, 80px).
- **Statement** (lede scale, max 46ch): the craft paragraph, set beside the heading on espresso.
- **Lede** (Figtree 400, clamp(18px, 1.45vw, 21px), 1.5, max 44ch): section intros. The hero lede is clamp(17px, 1.35vw, 20px), max 40ch.
- **Body** (Figtree 400, 17px, 1.55): running text; menu names and prices at 500; descriptions 16px.
- **Action** (Figtree 750, 16px, +0.005em, sentence case): buttons and text actions (15px on the small button).
- **Label** (Figtree 750, 12.5px, +0.14em, uppercase): form legends, menu group heads, footer and visit column heads, the pickup day. The stamp ring text (800, +0.16em), EST./year (800, +0.24em) and the nav wordmark (800, 15px, +0.12em, over "COFFEE TO-GO" at +0.3em) are the same voice, set as the logo sets "COFFEE TO-GO".

### Named Rules
**The Sentence Case Rule.** Display is always sentence case in the soft serif. Uppercase exists only in the label voice: small, tracked (0.12em to 0.3em), heavy, in the text face.
**The One Aside Rule.** At most one word or phrase per display line goes to the italic (the noun "bean", the shop's name, a place's second line); whole lines in italic are reserved for the asides themselves: the sleeve, poster names, photo words, notes.
**The Crema Stop Rule.** Display sentences end on a full stop in crema (`stop()` wraps sentence-final stops in `.stop`). A decimal point is never coloured.
**The Tabular Price Rule.** Every price, count, slot time, total, clock time and map pin uses tabular numerals.

## Layout

A 1160px wrap (an 820px narrow wrap for reading) with a 20px gutter (40px from 640px) on a 12-column grid with a 24px gap, so a 1366px screen keeps deliberate outer margins; only the hero hill, the sleeve, the thread and the minute tracks run full bleed. Sections pad by clamp(60px, 6.4vw, 100px). The hero is about two-thirds of the viewport (min-height clamp(360px, 66svh minus the crest, 540px)) so the sleeve shows in the first screen at 1366x768. Section heads put the h2 in columns 1 to 7 and the lede in 9 to 12, bottom-aligned. The menu runs a sticky category head (columns 1 to 4) beside its rows (5 to 9, or 5 to 12 in two CSS columns for split categories). The nav is sticky at 64px (76px from 1024px); the menu index sticks beneath it at 56px; scroll padding accounts for both.

The hero is a grid of the copy column and the sun column (`hero-sun`), at least clamp(480px, 82svh minus nav and crest, 660px) tall. The hero does not end on an edge: a cream ellipse many screens wide rises under it as the logo's hill, crest centred beneath the cup, so the green field ends on a horizon. Below the hero, the sleeve runs full-bleed between two minute tracks. Asymmetry is deliberate: the middle poster drink and the third craft frame drop lower than their neighbours; packaging labels tilt a degree or two.

Breakpoints are 640px, 900px and 1024px (420px hides wide-only text, 400px shrinks the nav wordmark). Below 900px every grid collapses to one column, the sun shrinks to min(64vw, 300px) under the copy, hero and close actions go full width, the nav collapses to a toggle and the order button, the watch moves above the order copy, and a fixed action bar appears. Below 640px sheets become bottom sheets, poster drinks become 92px round rows, craft frames go two-up with the third centred below, and the Visit figure and route sit above the heading. Touch targets hold at 44px minimum.

## Elevation & Depth

The page is mostly flat; depth comes from the four grounds, the hill, paper for raised surfaces and inset hairlines (`box-shadow: inset 0 0 0 1px` or 1.5px in `line`). Two kinds of object lift off the page: die-cut things (the poster stickers and the watch face) and overlays. Buttons have a printed edge rather than a shadow.

### Shadow Vocabulary
- **Printed edge** (`0 2px 0` in the button colour mixed 62% toward espresso; `0 3px 0` on hover, `0 1px 0` pressed): every solid pill button. Vertical only, tonal to its own fill.
- **Sticker lift** (`0 22px 30px -14px` black at 50%, under a 9px on-brand ring; `0 12px 18px -10px` with a 5px ring on phones): the poster drinks. The watch face uses the same lift (`0 30px 40px -24px`) under a 10px cream ring.
- **Sheet lift** (`0 24px 64px` ink at 18%): order drawer, item sheet, delivery note.
- **Toast lift** (`0 12px 32px` ink at 24%): the add-to-order toast.
- **Segment press** (`0 1px 2px` ink at 12%, `0 2px 8px` ink at 6%): the selected option in a segmented control.
- **Scrim** (ink at 45%): the sheet backdrop.

### Named Rules
**The Die-Cut Lift Rule.** In-page shadows belong only to die-cut objects (round stickers, the watch face) and always come with a cream ring; panels, labels, rows and photographs in shapes stay flat and are outlined by an inset hairline or nothing.
**The Printed Edge Rule.** A button's edge is its own colour, darker, straight down, 2px; it grows to 3px on hover and compresses to 1px as the button presses 2px down. Never an x-offset, never black or ink, never on anything but a solid pill button.

## Shapes

Soft. The workhorse radius is 18px (fields, the visit panel, packaging labels); centred sheets round 6px; phone bottom sheets round 16px at the top with a 40 by 4px grab handle; checkboxes 4px. Every button, chip, segmented control, stepper, tag, badge, toast and the menu-index pill is a full pill (999px). Circles are for add-buttons, icon buttons, menu thumbnails (48px), category marks (76px paper discs), the hero sun, the poster stickers, the watch face and the craft step numbers.

The brand's shapes come from the logo and the shop's packaging:
- **The sun over the hill** (hero): a disc photograph rising behind the cream hill's arc, inside an open arc of 17 dial ticks (every fourth long) in cream at 55%.
- **The arch** (the usual): a 4:5 frame with a full round top (`border-radius: 50% 50% 7% 7% / 40% 40% 5.6% 5.6%`), four columns wide, a crema frame drawn round it.
- **The process scenes** (craft, V5): no photographs. The barista at a counter in the one pen (`processScene()` in brand.js): tamping beside a grinder, timing the shot on its watch at the machine, pouring milk into a cup where a heart blooms; a crema hand-drawn arrow between scenes on desktop; on a phone each scene sits beside its words.
- **Die-cut stickers** (New on the board): the shop's own poster drinks circled with a 9px cream ring, each turned a few degrees (they straighten on hover).
- **Packaging labels** (craft claims): three cream die-cuts on espresso, each its own form: a hang tag with a punched hole and a minute track, an oval jar label, an arch-topped bag label with a crema band at its foot.
- **The minute track**: the logo's dial unrolled into a strip of ticks (a 70px repeat of five 2px round ticks, the first long), 14px tall, in crema by default. The brand's border: above and below the sleeve, along the top of the footer (cream at 80%), inside the hang tag and the visit panel.

### Illustration (the kit in `brand.js`)
One pen draws it all: lines of one weight (`--lw: 2.4px`, `vector-effect: non-scaling-stroke`, so it keeps its weight at any size), round caps and joins. Solids only for the bean head, hands, shoes and crema accents. Colours come from three properties: `--fig-line` (the pen and the head), `--fig-fill` (the ground it is cut from, filling the shirt, trousers and cups) and `--fig-accent` (crema). On green it is cream cut from green; on the cream ground and in the menu it is deep green cut from cream; in the drawer, cut from paper; on espresso, cream cut from espresso; in the footer, cut from deep green.
- **The barista** (`regular()`): a small line figure whose head is the logo's bean, solid, its crease and two eyes cut out (an optional cut smile), tilted -12deg; a shirt, a crema apron with a pocket, trouser legs as outlined capsules, solid shoes, single-line arms ending in solid hands, a watch with a crema face on the front forearm, and a to-go cup (hot with drifting steam, or iced with a straw) in either hand that counter-rotates to stay upright. It is a proposal for the shop and is never named on the page.
- **Category cups** (`icon()`, 48-unit): hot, iced, cloud (salty cream), leaf (matcha), each with a crema sleeve; plus bean, clock, plus and the map pin with a crema centre.
- **The stamp** (`stamp()`): words set around a ring on a crema disc in espresso label caps (the footer inverts to cream and deep green), a cup in the middle, turning once every 40s.
- **The shine** (`shine()`): three short crema dial ticks beside a product, the clock as punctuation.
- **The arrow** (`arrow()`): a hand-drawn bending arrow in crema for annotations.
- **The coffee branch** (`branch()`): the posters' line-art branch (leaves and cherries), 1.5 stroke, in cream at 24% opacity behind the poster drinks, drawn on by the pen.
- The kit also exports the wordmark's O with one clock hand (`oHand()`) and the bare bean (`bean()`); the V4 page does not place either.

### The barista's poses
A pose table of joint angles (`poses` in `brand.js`, printed into the page as `#figure-poses`): stand, carry, cheers, sip, watch, point, shrug, sit, sitSip, lean, present; the walk is a cycle around carry. One figure per section at most, each doing that section's job:
- **Hero:** cheers, smiling, hot cup raised beside the sun.
- **The usual:** sits on the arch's top, legs over the edge; takes a sip every 6.5s.
- **Menu:** present, mirrored, iced cup in the back hand, standing on the category bar.
- **Order band:** checks the watch beside the blown-up crema watch face that keeps the time in Tagum (Asia/Manila).
- **Visit:** walks in on the dotted route and points to the pin.
- **Footer:** leans on the stamp, cup in hand.
- **Drawer:** shrugs at an empty cart, checks the watch at the pickup time, raises a cup to a placed order.

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
- **Menu row:** a full-width button, 60px minimum, three columns (name and description, tabular price, 40px add-button), ruled by a bottom hairline; an optional 48px round thumbnail leads. The name slides 4px on hover. New items carry a small crema pill tag in espresso label caps.
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
A sticky logo-green bar: the shop's raster logo tile at 44px and the name in tracked capitals over "COFFEE TO-GO"; 16px links at 600 with drawn underlines; a light small button "Order ahead" with a bag icon and a crema count badge that bumps (scale 1.25, 360ms) when items are added; a hairline fades in once the page scrolls. Below 900px the links collapse into a toggle that opens 32px display-face links ruled by cream hairlines. The menu index is a sticky, horizontally scrolling row of 15px links at 700 on the cream ground; one crema-foam pill travels behind the active link (420ms, drawer curve) and the active link turns espresso.

### Packaging labels
The boards' three claims on espresso, each a link: cream ground, ink text, the category's cup icon at 56px, a display title, ink-soft text and a deep-green "From" price with an arrow. Each is its own die-cut (hang tag, oval jar label, arch-topped bag label), tilted -2 to 1.5 degrees; on hover it straightens and lifts 4px (380ms, pop curve).

### The watch
The order band's centrepiece: the barista's watch face blown up, a crema disc with 60 espresso minute ticks (every fifth long), a 10px cream ring and the sticker lift; the display-face time in Tagum, updated every 20s, over a label-caps caption.

### The drawer and sheets
Native dialogs on a paper panel over an ink scrim. The order drawer slides in from the right (500px max) over 460ms on the drawer curve and leaves in 280ms; item and note sheets are centred (540px max, 6px radius) and rise from 98% scale. Under 640px all three become bottom sheets (92dvh, 16px top radius, grab handle). Each has a display-face title, a step line and a 2px deep-green progress bar, a scrolling body and a hairline-topped footer with a full-width button. The pickup step pins a readout to the top of the body (the barista checking its watch, or the fallback dial, beside the day label and a 30px tabular time). The placed-order ticket is ruled with dashed hairlines.

### Phone action bar and toast
Below 900px a fixed paper bar with a top hairline slides up (360ms, drawer curve) once the hero's action is out of view, holding the two ordering paths (1.4fr to 1fr), then the cart total. The toast is an ink pill centred at the bottom (above the bar on phones) with a cream pill button; it rises 16px over 360ms.

### Motion
Four curves: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for state, hover, press and reveals; ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for the pen; the drawer curve `cubic-bezier(0.32, 0.72, 0, 1)` for sheets, the action bar, masks, the rising sun and the menu pill; pop `cubic-bezier(0.34, 1.56, 0.64, 1)` for stickers, stamps, labels and the pin. Plain `ease` for colour. Seven verbs, each with one job:
- **Reveal** (`data-m="rise"`): a headline rises 115% into its own clipped line (1000ms) once in view.
- **Mask** (`data-m="mask"`): a photograph opens upward out of its arch, or outward from the centre of its disc (1200ms), settling from 1.15 scale.
- **Draw** (`data-m="draw"`): a line is drawn by the pen (2000ms): the branch, the dotted route, the process arrows (a wipe), the shot and the milk (stream paths). The crema thread, on wide screens only, is drawn by the scroll from the ground beside the hero's cup, loops once like a pen flourish, runs down beside the usual's arch and becomes its frame.
- **Scale** (`data-m="pop"`): a sticker, stamp or watch is slapped on from 0.4 scale and -18deg with overshoot (620ms), staggered 120ms.
- **Slide:** the sleeve travels from -4% to -26% across its pass through the viewport; the one scroll-linked slide.
- **Drift:** steam rises off hot cups (3.2s loop); stamps turn (40s a turn). Slow, endless, small.
- **The process (V5):** as the section arrives the scenes play in turn: two tamps (a puff each), the arrow, the shot runs while the barista raises its watch, the arrow, the jug tips, the milk runs and a heart blooms. About 4s, once; shown complete without motion.
- **Transform:** the barista changes pose. `applyPose` sets every joint; `pose()` tweens between poses with a cubic ease-in-out (700ms default) and always lands, even if frames stall; `loop()` runs idles; `walk()` is an 860ms cycle of swinging legs, bending knees, a counter-swinging arm and a bob.
- **The hero sequence:** "It's bean" rises at 100ms and "o'clock." at 220ms (900ms); the sun rises behind the hill from 300ms (1300ms) as the photograph settles from 1.18; from 800ms the ticks are drawn on left to right (32ms stagger); EST. and the year wipe in at 1100 and 1250ms; the barista walks in from the right across the cup (from 400ms, 1500ms), turns, and raises its cup; the stamp is slapped on at 1300ms. The entrance releases itself by 3.3s.
- **Under reduced motion** everything rests: no entrance, figures stand in their drawn poses, the route and pin are already out, the thread is off and the arch frame is drawn, the sleeve does not slide, steam and stamps are still, smooth scrolling is off, and remaining animations and transitions collapse to 1ms.

## Do's and Don'ts

### Do:
- **Do** read every colour, face and display weight from the theme properties; a new client is new config files, and optionally a `brand.js`.
- **Do** keep every section working without the kit: type, photographs, the plain pin, the small dial, the check mark.
- **Do** set display in the soft serif in sentence case, send at most one aside per line to the italic, and end display sentences on the crema stop.
- **Do** keep crema to marks: the apron, sleeves, stamps, stops, ticks, lines, badges, the watch face; set words on crema in espresso.
- **Do** draw kit additions with the one pen (2.4px non-scaling stroke, round ends, details cut from solids) and give the barista one pose and one job per section.
- **Do** open photographs out of arches and discs, and circle only the shop's own drinks as stickers with a cream ring.
- **Do** use the minute track as the brand's border where a section or label needs an edge.
- **Do** keep every interactive target at 44px or more, set prices, counts and times in tabular numerals, and gate hover effects behind `(hover: hover) and (pointer: fine)`.
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

<!-- Provenance and open items (not rules): the hero cappuccino, the usual's pour and the three craft frames are licensed library photographs standing in for the shop's own (content.js `standIn: true`, rendered with data-source="stand-in", credited on credits.html); the poster drinks are crops of the shop's own posters. The barista is a proposal pending the shop's review. The nav uses the shop's raster logo tile; no vector logo exists yet. Open with the shop: hours, street address, the Foodpanda URL, the shop's own photographs, and the Matcha Oreo Latte price (poster ₱185, board ₱190; the site shows the board price). -->
