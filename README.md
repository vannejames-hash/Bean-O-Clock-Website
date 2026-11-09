# Bean O' Clock — storefront demo

A premium digital storefront demo for Bean O' Clock Coffee To-Go in Tagum City.
One-page, dependency-free, static Node build. Designed as both a working order-ahead
storefront and a reusable client-agnostic template.

- Brand system: [DESIGN.md](DESIGN.md)
- Direction contract: [.impeccable/surfaces/dist-bean-o-clock-index-html.md](.impeccable/surfaces/dist-bean-o-clock-index-html.md)
- Shipped review captures: [.impeccable/review/](.impeccable/review/)

## Run

Requires Node 22+.

```bash
node build.mjs
node serve.mjs bean-o-clock 4321
```

Then open http://localhost:4321.

## Structure

- `clients/<id>/` — one client is five files: `business.js`, `menu.js`, `theme.js`,
  `content.js`, and an optional `brand.js` illustration kit. Add `assets/img/` and a
  `credits.json` beside them.
- `src/sections/` — the page's sections, rendered server-side.
- `src/styles/` — concatenated at build time into `site.css`.
- `src/client/app.js` — the storefront behaviour (cart, item sheet, order flow,
  figure engine, reveals, the crema thread).
- `build.mjs` — reads the client config and writes `dist/<id>/`.
- `serve.mjs` — serves a built client over http.

## Notes

- Nothing here invents business facts. Hours, the street address and a Foodpanda
  URL are still owed by the shop, along with its own photos and a vector logo.
- Stand-in photos are licensed library images, credited in
  `clients/bean-o-clock/assets/img/credits.json` and listed on the built
  `credits.html` page.
- The barista character is a proposal for the shop; the page never names it.
