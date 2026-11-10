# Compiled Photos

All photos from the Bean O' Clock storefront, organized by usage. Copies only: the site builds from
`clients/bean-o-clock/assets/img/`.

## Enhanced Photos (generated stand-ins, used since V6)

`Enhanced Photos/` holds the regenerated versions of the six stock photos. Each was matched to its old
slot, cropped to that slot and saved as WebP in the client's image folder.

| Enhanced file | Size | Replaces | Use on the site | Web files |
|----|----|----|----|----|
| Overhead Cappuccino with Tulip Latte Art | 1536×1024 | 01 hero cappuccino (f61713250) | Hero disc (square crop around the cup) | photo-g01-disc.webp 760, -460 |
| Espresso Pour and Sparkling Water | 1024×1536 | 02 pour (m61714648) | The usual's arch (4:5 crop) | photo-g02-1024.webp, -560 |
| Cinematic Espresso Extraction Close-Up | 1024×1536 | 03 glass (m28146075) | Menu board, Espresso-based plate (4:5 crop) | photo-g03-720.webp, -420 |
| Espresso Crema in Chrome Close-Up | 1536×1024 | 04 bottomless pull (m61713028) | Reserve: no slot uses it | photo-g04-1280.webp, -640 |
| Precision Espresso Tamping at the Café Station | 1536×1024 | 05 tamp (m187311853) | Reserve: no slot uses it | photo-g05-1280.webp, -640 |
| Iced-Out Watch Frothing Milk at Espresso Machine | 1025×1535 | 06 milk pitcher (m201752739) | Not used: the watch shows a legible third-party brand (crown and wordmark) | none |

The credits page lists the used ones as generated for the demo, not photographs taken at the shop.
A regeneration of the milk-steaming shot with a plain, unbranded watch would fit the "Pick a time" band.

### The shop's own drinks, enhanced (used since V7)

Enhanced versions of the shop's own poster photographs: the same drinks, glasses, coasters and tables.
Matched by content, not filename.

| Product | Enhanced file | Size | Web files |
|----|----|----|----|
| White Chocolate with Oreo Cream | Caramel Cookie Crumb Iced Latte (misnamed: same glass, coaster and table as the poster) | 1145×1374 | drink-white-choc-oreo-640.webp, -360 |
| Strawberry Oreo | Strawberry Cookies-and-Cream Delight | 1536×1024 | drink-strawberry-oreo-640.webp, -360 |
| Matcha Oreo Latte | Iced Matcha Latte with Cookie Crumble Foam | 1536×1024 | drink-matcha-oreo-640.webp, -360 |

All three are cropped square with the glass at the same size in each circle. The white chocolate drink came
back caramel-tan and the matcha more saturated than the posters, so both are toned back toward the
originals. The poster crops they replace are in `clients/bean-o-clock/assets/source/` and in `live/`.

## Live (before V6)

- **photo-f61713250-disc.webp**: the old hero cappuccino (library photo, replaced by g01)
- **photo-m61714648-960.webp**: the old pour (library photo, replaced by g02)

## Stock (the library originals, 01–06)

| ID | Source | Status |
|----|--------|--------|
| 01.webp | photo-f61713250 | Replaced by g01 |
| 02.webp | photo-m61714648-960 | Replaced by g02 |
| 03.webp | m28146075 | Replaced by g03 |
| 04.webp | m61713028 | Superseded by g04 (reserve) |
| 05.webp | m187311853-1200 | Superseded by g05 (reserve) |
| 06.webp | m201752739 | Still the only usable version (unused) |

See `stock-regeneration/STOCK_REGENERATION_MANIFEST.md` for the prompts.
