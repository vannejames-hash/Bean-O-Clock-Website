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
    lede: 'Every drink and every price on the board. Pick a list, then tap a drink to add it to your order.',
    addOnsTitle: 'Add-ons',
    addOnsNote: 'Add them to any drink when you order.',
    // Each list's mark on its tag: its cup, drawn in the brand's pen.
    marks: { espresso: 'hot', 'salty-cream': 'cloud', matcha: 'leaf', 'non-coffee': 'iced', 'add-ons': 'plus' },
    // Each list's face on the board: one picture (a stand-in photograph, the shop's own poster drink, or the
    // stamp) and the barista holding that list's cup. `item` makes the picture the drink's own add button.
    faces: {
      espresso: { image: 'glass', pose: 'sip', cup: 'hot' },
      'salty-cream': { stamp: 'Salty cream on top · Salty cream on top ·', pose: 'cheers', cup: 'cloud' },
      matcha: { item: 'matcha-oreo-latte', pose: 'present', cup: 'matcha' },
      'non-coffee': { item: 'strawberry-oreo', pose: 'carry', cup: 'iced' },
      'add-ons': { pose: 'tray', cup: 'tray', spare: 'syrup' },
    },
  },

  coffee: {
    title: 'What goes in the cup.',
    // The process, drawn: the barista at the counter, one scene a step (brand.js processScene).
    steps: [
      { scene: 'tamp', word: 'Tamp', note: 'Ground coffee, pressed level in the basket.' },
      { scene: 'pull', word: 'Pull', note: 'Lever down: a single or double shot runs into the cup.' },
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
    // The enhanced set (compiled-photos/Enhanced Photos): generated stand-ins for the library photographs,
    // cropped to their slots. Credited as generated on the credits page; none shows the shop.
    latte: {
      src: 'photo-g01-disc.webp',
      srcset: 'photo-g01-disc-460.webp 460w, photo-g01-disc.webp 760w',
      w: 760, h: 760,
      alt: 'A cappuccino seen from above, a tulip poured in the foam',
      standIn: true, generated: true,
    },
    glass: {
      src: 'photo-g03-720.webp',
      srcset: 'photo-g03-420.webp 420w, photo-g03-720.webp 720w',
      w: 720, h: 900,
      alt: 'Espresso running from a double spout into a small glass',
      standIn: true, generated: true,
    },
    stream: {
      src: 'photo-g04-1280.webp',
      srcset: 'photo-g04-640.webp 640w, photo-g04-1280.webp 1280w',
      w: 1280, h: 853, pos: '62% 50%',
      alt: 'Espresso running from a bottomless portafilter in one thin stream',
      standIn: true, generated: true,
    },
    pour: {
      src: 'photo-g02-1024.webp',
      srcset: 'photo-g02-560.webp 560w, photo-g02-1024.webp 1024w',
      w: 1024, h: 1280,
      alt: 'Espresso poured from a small steel jug into a white cup, a glass of sparkling water beside it on a wooden bar',
      standIn: true, generated: true,
    },
    tamp: {
      src: 'photo-g05-1280.webp',
      srcset: 'photo-g05-640.webp 640w, photo-g05-1280.webp 1280w',
      w: 1280, h: 853, pos: '58% 50%',
      alt: "A barista's hands tamping ground coffee into a portafilter beside the machine",
      standIn: true, generated: true,
    },
    // The shop's own poster drinks, enhanced for the web (compiled-photos/Enhanced Photos): the same drinks,
    // glasses and tables, cropped square with each glass at the same size, colour kept near the posters'.
    // The poster crops they replace are in assets/source/.
    whiteChocOreo: { src: 'drink-white-choc-oreo-360.webp', srcset: 'drink-white-choc-oreo-360.webp 360w, drink-white-choc-oreo-640.webp 640w', w: 640, h: 640, alt: 'White Chocolate with Oreo Cream in a tall glass, crushed Oreo on top, on a marble table', round: true, enhanced: true },
    strawberryOreo: { src: 'drink-strawberry-oreo-360.webp', srcset: 'drink-strawberry-oreo-360.webp 360w, drink-strawberry-oreo-640.webp 640w', w: 640, h: 640, alt: 'Strawberry Oreo Latte, strawberry under milk and crushed Oreo, Oreos on a plate beside it', round: true, enhanced: true },
    matchaOreo: { src: 'drink-matcha-oreo-360.webp', srcset: 'drink-matcha-oreo-360.webp 360w, drink-matcha-oreo-640.webp 640w', w: 640, h: 640, alt: 'Matcha Oreo Latte, green matcha under milk and crushed Oreo', round: true, enhanced: true },
  },
};
