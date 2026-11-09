# Bean O' Clock: where each fact comes from

| Fact | Value used | Source |
|---|---|---|
| Name | Bean O' Clock Coffee To-Go | Lead record (Tagum Listing Desk), Food Runners listing |
| Established | 2020 | The shop's logo ("EST. 2020") |
| Phone | 0917 708 7556 | Lead record, Food Runners listing |
| Facebook | facebook.com/beanoclockPH | Lead record (linked from Google Maps) |
| Rating | 4.8 on Google, 69 reviews | Lead record, checked 2026-11-08 |
| Location | Tagum City, Davao del Norte; plus code CRX3+M45 | Food Runners listing (foodrunnersph.com/tagum/store/bean-o-clock-coffee-to-go) |
| Menu and prices | Every drink and add-on | Menu boards: `assets/source/b3.png`, `b4.png` |
| New drinks | White Chocolate with Oreo Cream ₱185, Strawberry Oreo Latte ₱160, Matcha Oreo Latte | Posters: `assets/source/b1.png`, `b2.png` |
| Kyoto matcha | "Ceremonial grade matcha from Kyoto, Japan" | Menu board b3 |
| Salty cream | "Espresso-based drink w/ salty cream on top" | Menu board b4 |
| Logo and colours | Green #516752, cream #F6F1EB | `assets/source/logo.jpg` (Food Runners listing) |

## Open questions for the shop

- **Hours:** not published anywhere checked. The page says so and asks visitors to call. Pickup slots (8:00 AM to 8:00 PM) are a demo assumption in `business.js`.
- **Street address:** listings disagree (one says Sobrecarey St., another says inside Davao Regional Medical Center). The page uses the city and plus code only.
- **Foodpanda:** no listing found for this shop. `ordering.delivery.url` is `null`, so the Delivery button opens a demo note with Call and Message options.
- **Matcha Oreo Latte price:** menu board says ₱190, poster says ₱185. The board price is used.
- **Strawberry Oreo:** the board's "Strawberry Oreo" (₱160) is treated as the poster's "Strawberry Oreo Latte" (₱160).
- **Food:** reviews mention waffles, but no food appears on the boards, so none is listed.
- **Double vs single shot:** the board says "double or single shot" without a price difference; shots are offered as the board's priced add-ons.

## Photographs

- **The shop's own:** logo, and the three drink photos cropped from the posters (low resolution; a phone shoot would sharpen them).
- **Stand-ins (licensed, credited on `credits.html`):** the hero espresso, the best-seller pour, and the three bar photos in "What goes in the cup". Replace with the shop's own: the bar, hands at work, their glasses on the marble counter, and the shopfront.
