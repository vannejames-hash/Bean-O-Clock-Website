// Transcribed from the shop's own menu boards (assets/source/b3.png, b4.png)
// and "New drink!" posters (b1.png, b2.png). Prices in PHP.
//
// Item fields:
//   id, name, price
//   choices: { label, options[] }  one required pick (flavour), from the board
//   temp:    true when the board says "iced or hot"
//   photo:   key in content.images
//   tags:    'best-seller' | 'new'

export default {
  currency: '₱',

  categories: [
    {
      id: 'espresso',
      name: 'Espresso-based',
      note: 'Iced or hot.',
      groups: [
        {
          label: 'Best sellers',
          items: [
            { id: 'signature-coffee', name: 'Signature Coffee', price: 145, temp: true, tags: ['best-seller'] },
            { id: 'caramel-macchiato', name: 'Caramel Macchiato', price: 155, temp: true, tags: ['best-seller'] },
            { id: 'white-chocolate-mocha', name: 'White Chocolate Mocha', price: 155, temp: true, tags: ['best-seller'] },
          ],
        },
        {
          label: 'Black coffee',
          items: [
            { id: 'americano', name: 'Americano', price: 120, temp: true },
            { id: 'black-honey-lemon', name: 'Black Honey Lemon', price: 145, temp: true },
            { id: 'sparkling-americano', name: 'Sparkling Americano', price: 155, choices: { label: 'Flavour', options: ['Peach', 'Raspberry', 'Passion fruit'] } },
          ],
        },
        {
          label: 'Milk-based',
          items: [
            { id: 'cappuccino', name: 'Cappuccino', price: 135, temp: true },
            { id: 'coffee-latte', name: 'Coffee Latte', price: 135, temp: true },
          ],
        },
        {
          label: 'Flavoured',
          items: [
            { id: 'cafe-mocha', name: 'Cafe Mocha', price: 145, temp: true },
            { id: 'flavoured-latte', name: 'Latte', price: 145, temp: true, choices: { label: 'Flavour', options: ['Honey', 'Hazelnut', 'Vanilla', 'Caramel', 'Salted caramel'] } },
            { id: 'white-hazelnut-mocha', name: 'White Hazelnut Mocha', price: 155, temp: true },
            { id: 'white-caramel-mocha', name: 'White Caramel Mocha', price: 155, temp: true },
            { id: 'white-oreo-mocha', name: 'White Oreo Mocha', price: 185, temp: true },
            { id: 'coffee-float', name: 'Coffee Float', price: 180, choices: { label: 'Flavour', options: ['Caramel', 'White chocolate', 'Dark chocolate'] } },
          ],
        },
        {
          label: 'Espresso + ice cream',
          items: [
            { id: 'espresso-ice-cream-caramel', name: 'Caramel', price: 170 },
            { id: 'espresso-ice-cream-dark', name: 'Dark Chocolate', price: 170 },
          ],
        },
        {
          label: 'Frappe',
          note: 'Single shot espresso',
          items: [
            { id: 'frappe', name: 'Frappe', price: 170, choices: { label: 'Flavour', options: ['Caramel', 'Java chip', 'White chocolate'] } },
          ],
        },
      ],
    },
    {
      id: 'salty-cream',
      name: 'Salty cream series',
      note: 'Espresso-based, with salty cream on top.',
      groups: [
        {
          label: null,
          items: [
            { id: 'cloudy-cold-brew', name: 'Cloudy Cold Brew', price: 150 },
            { id: 'cloudy-cafe-mocha', name: 'Cloudy Cafe Mocha', price: 160 },
            { id: 'cloudy-caramel-macchiato', name: 'Cloudy Caramel Macchiato', price: 170 },
            { id: 'cloudy-white-chocolate-mocha', name: 'Cloudy White Chocolate Mocha', price: 170 },
          ],
        },
      ],
    },
    {
      id: 'matcha',
      name: 'Matcha series',
      note: 'Ceremonial grade matcha from Kyoto, Japan.',
      groups: [
        {
          label: null,
          items: [
            { id: 'salty-cream-matcha-latte', name: 'Salty Cream Matcha Latte', price: 175 },
            { id: 'matcha-espresso-fusion', name: 'Matcha Espresso Fusion', price: 190 },
            { id: 'matchagatto', name: 'Matchagatto', price: 185 },
            { id: 'matcha-float', name: 'Matcha Float', price: 190 },
            { id: 'matcha-berry', name: 'Matcha Berry', price: 200 },
            { id: 'matcha-espresso-float', name: 'Matcha Espresso Float', price: 200 },
            // Board lists 190; the "New drink!" poster says 185. Board price used, confirm with the shop.
            { id: 'matcha-oreo-latte', name: 'Matcha Oreo Latte', price: 190, photo: 'matchaOreo', tags: ['new'] },
          ],
        },
      ],
    },
    {
      id: 'non-coffee',
      name: 'Non-coffee',
      note: null,
      groups: [
        {
          label: 'Fruit tea',
          items: [
            { id: 'fruit-tea', name: 'Fruit Tea', price: 135, choices: { label: 'Flavour', options: ['Lychee', 'Peach', 'Raspberry'] } },
          ],
        },
        {
          label: 'Signature soda',
          items: [
            { id: 'signature-soda', name: 'Signature Soda', price: 130, choices: { label: 'Flavour', options: ['Blueberry', 'Strawberry', 'Lychee', 'Peach', 'Raspberry', 'Passion fruit'] } },
          ],
        },
        {
          label: 'Milk-based',
          items: [
            { id: 'chocolate', name: 'Chocolate', price: 130 },
            { id: 'strawberry', name: 'Strawberry', price: 140 },
            // The poster calls it "Strawberry Oreo Latte", same price.
            { id: 'strawberry-oreo', name: 'Strawberry Oreo', price: 160, photo: 'strawberryOreo', tags: ['new'] },
          ],
        },
        {
          label: 'Milkshake',
          items: [
            { id: 'milkshake-strawberry', name: 'Strawberry Milkshake', price: 175 },
            { id: 'milkshake-choco-oreo', name: 'Choco Oreo Milkshake', price: 175 },
          ],
        },
        {
          label: 'Brewed tea',
          items: [
            { id: 'brewed-tea', name: 'Brewed Tea', price: 125, choices: { label: 'Tea', options: ['Mint', 'Jasmine', 'Lavender', 'Blue ternate'] } },
          ],
        },
        {
          label: 'New',
          items: [
            { id: 'white-chocolate-oreo-cream', name: 'White Chocolate with Oreo Cream', price: 185, photo: 'whiteChocOreo', tags: ['new'] },
          ],
        },
      ],
    },
  ],

  addOns: [
    { id: 'single-shot', name: 'Single shot', price: 35 },
    { id: 'double-shot', name: 'Double shot', price: 60 },
    { id: 'syrup', name: 'Syrup or sauce', price: 30 },
    { id: 'milk', name: 'Milk', price: 20 },
    { id: 'oat-milk', name: 'Sub oat milk', price: 25 },
    { id: 'whipped-cream', name: 'Whipped cream', price: 35 },
    { id: 'salty-cream', name: 'Salty cream', price: 35 },
    { id: 'choco-chips', name: 'Choco or white choco chips', price: 15 },
  ],

  featured: {
    bestSellers: ['signature-coffee', 'caramel-macchiato', 'white-chocolate-mocha'],
    newDrinks: ['white-chocolate-oreo-cream', 'strawberry-oreo', 'matcha-oreo-latte'],
  },
};
