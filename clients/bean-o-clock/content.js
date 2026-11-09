// Page copy and image slots. Copy only restates facts from business.js and menu.js; the voice is the shop's:
// short, warm, a little cheeky, one time pun a section at most, never a claim about opening hours.
// Images marked `standIn: true` are licensed library photographs standing in until
// the shop supplies its own; replace the file and keep the key.

export default {
  seo: {
    title: "Bean O' Clock Coffee To-Go · Tagum City",
    description: "Espresso iced or hot, salty cream coffee and Kyoto matcha in Tagum City. See the full menu with prices, order ahead for pickup, or get it delivered.",
  },

  nav: [
    { label: 'Our coffee', href: '#coffee' },
    { label: 'Menu', href: '#menu' },
    { label: 'Visit', href: '#visit' },
  ],

  hero: {
    // Two lines of display type; the "o" of o'clock is the wordmark's O with its clock hand.
    title: "It's bean o'clock.",
    lines: ["It's bean", "o'clock"],
    lede: 'Coffee to go in Tagum City: espresso iced or hot, salty cream on top and ceremonial matcha from Kyoto.',
    primary: 'Order ahead',
    secondary: 'Get it delivered',
    image: 'latte',
  },

  // The round sticker that rides on the hero's cup. Every word is on the logo.
  stamp: "Coffee to-go · Tagum City · Est. 2020 ·",

  // The cup sleeve under the hero: words true of the menu boards, each with its cup.
  ticker: [
    { text: 'Iced or hot', icon: 'iced' },
    { text: 'Single or double', icon: 'hot' },
    { text: 'Salty cream on top', icon: 'cloud' },
    { text: 'Matcha from Kyoto', icon: 'leaf' },
  ],

  bestSellers: {
    title: 'The usual.',
    lede: 'What Tagum orders most, straight off the board.',
    note: 'Add a shot to any of them',
    image: 'pour',
  },

  newDrinks: {
    title: 'New on the board.',
    lede: 'Three cold ones with Oreo, from matcha to white chocolate.',
    sticker: 'New on the board · New on the board ·',
  },

  menu: {
    title: 'The whole board.',
    lede: 'Every drink and every price on the board. Tap one to add it to your order.',
    addOnsTitle: 'Add-ons',
    // Each category's mark: its cup, drawn in the brand's pen.
    marks: { espresso: 'hot', 'salty-cream': 'cloud', matcha: 'leaf', 'non-coffee': 'iced' },
  },

  coffee: {
    title: 'What goes in the cup.',
    // The process, drawn: the barista at the counter, one scene a step (brand.js processScene).
    steps: [
      { scene: 'tamp', word: 'Tamp', note: 'Ground coffee, pressed level in the basket.' },
      { scene: 'pull', word: 'Pull', note: 'Single or double, with one eye on the clock.' },
      { scene: 'pour', word: 'Pour', note: 'Iced or hot, salty cream on top if you like.' },
    ],
    claimIcons: { 'salty-cream': 'cloud', matcha: 'leaf', espresso: 'hot' },
    statement: 'Since 2020 we have pulled espresso iced or hot, single or double, topped it with salty cream, and whisked ceremonial grade matcha from Kyoto.',
    // Each claim is printed on the shop's own menu boards and links to its category.
    claims: [
      { title: 'Salty cream on top', text: 'The Cloudy series: espresso under a cap of salty cream.', category: 'salty-cream' },
      { title: 'Ceremonial matcha from Kyoto', text: 'Seven matcha drinks, from latte to float.', category: 'matcha' },
      { title: 'Iced or hot, single or double', text: 'Every espresso drink, your way. Add a shot any time.', category: 'espresso' },
    ],
  },

  close: {
    title: 'Pick a time. Skip the wait.',
    lede: "Order ahead, choose when you'll pass by, and pay at the counter.",
    clockLabel: 'in Tagum right now',
  },

  visit: {
    title: 'This way.',
    place: ['Tagum City,', 'Davao del Norte'],
    lede: 'Find the map pin, or call before you come.',
    hoursNote: 'Opening hours are not listed yet. Call or message before you come.',
  },

  footer: {
    signoff: "It's always Bean O'Clock somewhere.",
  },

  // Words the ordering drawer uses (app.js reads them from the page's data).
  order: {
    emptyTitle: 'Nothing in the cup yet.',
    emptyText: 'Pick a drink from the menu and it will wait here while you choose a pickup time.',
    added: 'added',
  },

  demo: {
    banner: 'Demo storefront',
    orderNote: "This is a demo. Orders are not sent to Bean O' Clock yet.",
    deliveryNote: "This button will open Bean O' Clock on Foodpanda once the shop confirms its listing. For now, call or message the shop to arrange delivery.",
    pickupNote: 'Pickup times are a demo until the shop confirms its hours.',
  },

  images: {
    logo: { src: 'logo.webp', w: 550, h: 550, alt: "Bean O' Clock Coffee To-Go logo" },
    mark: { src: 'logo-mark.webp', w: 300, h: 300, alt: '' },
    latte: {
      src: 'photo-f61713250-disc.webp',
      srcset: 'photo-f61713250-disc-440.webp 440w, photo-f61713250-disc.webp 820w',
      w: 820, h: 820,
      alt: 'A cappuccino seen from above, a tulip poured in the foam',
      standIn: true,
    },
    glass: {
      src: 'photo-m28146075.webp',
      srcset: 'photo-m28146075-500.webp 500w, photo-m28146075-960.webp 960w, photo-m28146075.webp 1280w',
      w: 1280, h: 1910, pos: '50% 58%',
      alt: 'Espresso running into a small glass under the group head',
      standIn: true,
    },
    stream: {
      src: 'photo-m61713028.webp',
      srcset: 'photo-m61713028-500.webp 500w, photo-m61713028-960.webp 960w, photo-m61713028.webp 1280w',
      w: 1280, h: 853, pos: '60% 50%',
      alt: 'Espresso running from a bottomless portafilter in one thin stream',
      standIn: true,
    },
    pour: {
      src: 'photo-m61714648-960.webp',
      srcset: 'photo-m61714648-500.webp 500w, photo-m61714648-960.webp 960w',
      w: 960, h: 1433, pos: '62% 66%',
      alt: 'Espresso poured from a small jug into a white cup on a wooden bar',
      standIn: true,
    },
    tamp: {
      src: 'photo-m187311853-1200.webp',
      srcset: 'photo-m187311853-640.webp 640w, photo-m187311853-1200.webp 1200w',
      w: 1200, h: 800, pos: '62% 50%',
      alt: "A barista's hands tamping ground coffee into a portafilter beside the machine",
      standIn: true,
    },
    whiteChocOreo: { src: 'drink-white-choc-oreo.webp', w: 500, h: 600, pos: '50% 40%', alt: 'White Chocolate with Oreo Cream in a tall glass on a marble table' },
    strawberryOreo: { src: 'drink-strawberry-oreo.webp', w: 360, h: 360, pos: '50% 50%', alt: 'Strawberry Oreo Latte, pink strawberry under milk and crushed Oreo', round: true },
    matchaOreo: { src: 'drink-matcha-oreo.webp', w: 360, h: 360, pos: '50% 50%', alt: 'Matcha Oreo Latte, green matcha under crushed Oreo', round: true },
  },
};
