// V4 colour: the shop's own two-tone (logo green, logo cream) plus espresso, the dark of the coffee itself, for
// text and one dark ground; crema, the colour of the coffee's foam, is the one accent (the apron, the sleeve,
// stamps, stops, the line that runs through the page).
const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';

export default {
  color: {
    brand: '#516752',
    brandDeep: '#3B4D3C',
    espresso: '#2E211A',
    ink: '#2B231D',
    inkSoft: '#6A5D52',
    ground: '#F6F1EB',
    paper: '#FDF9F6',
    onBrand: '#F6F1EB',
    onBrandSoft: '#DCE2D6',
    crema: '#CF8A45',
    cremaSoft: '#EBC9A1',
    line: 'rgba(43, 35, 29, 0.14)',
    lineOnBrand: 'rgba(246, 241, 235, 0.3)',
  },
  font: {
    // Display: Fraunces at its softest, a warm, round-shouldered serif (kin to the flared serif on the shop's
    // "New drink!" posters), set in sentence case. Text: Figtree, a friendly geometric sans like the logo's lettering.
    display: 'Fraunces',
    displayWeight: 760,
    text: 'Figtree',
    faces: [
      { family: 'Fraunces', file: 'fraunces.woff2', weight: '300 900', style: 'normal', range: LATIN, preload: true },
      { family: 'Fraunces', file: 'fraunces-italic.woff2', weight: '300 900', style: 'italic', range: LATIN },
      { family: 'Figtree', file: 'figtree.woff2', weight: '300 900', style: 'normal', range: LATIN, preload: true },
    ],
  },
};
