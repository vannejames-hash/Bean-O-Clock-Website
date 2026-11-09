// Business facts. Every value here comes from a source listed in SOURCES.md.
// `null` means unknown: the templates hide what is null instead of inventing it.
export default {
  id: 'bean-o-clock',
  name: "Bean O' Clock",
  fullName: "Bean O' Clock Coffee To-Go",
  established: 2020,
  category: 'Coffee to go',

  location: {
    street: null,
    city: 'Tagum City',
    province: 'Davao del Norte',
    country: 'PH',
    plusCode: 'CRX3+M45',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CRX3%2BM45%20Tagum%2C%20Davao%20del%20Norte',
  },

  phone: { display: '0917 708 7556', tel: '+639177087556' },

  social: [
    { network: 'Facebook', handle: 'beanoclockPH', url: 'https://www.facebook.com/beanoclockPH' },
  ],

  rating: { value: 4.8, count: 69, source: 'Google' },

  // Hours are not published anywhere we could verify.
  hours: null,

  ordering: {
    pickup: {
      enabled: true,
      // Pickup windows are a demo assumption until the shop confirms its hours.
      window: { open: '08:00', close: '20:00', assumed: true },
      slotMinutes: 15,
      leadMinutes: 20,
      daysAhead: 3,
    },
    delivery: {
      provider: 'Foodpanda',
      // No verified Foodpanda listing yet. When null, the CTA opens a demo notice.
      url: null,
    },
  },

  site: {
    url: null,
    locale: 'en_PH',
    demo: true,
  },
};
