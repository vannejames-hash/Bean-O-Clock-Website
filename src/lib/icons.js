const svg = (body, size = 20, extra = '') =>
  `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;

export const icons = {
  arrow: (s) => svg('<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>', s),
  plus: (s) => svg('<path d="M12 5v14"/><path d="M5 12h14"/>', s),
  minus: (s) => svg('<path d="M5 12h14"/>', s),
  close: (s) => svg('<path d="M6 6l12 12"/><path d="M18 6 6 18"/>', s),
  check: (s) => svg('<path d="m5 12.5 4.5 4.5L19 7.5"/>', s),
  back: (s) => svg('<path d="M19 12H5"/><path d="m11 6-6 6 6 6"/>', s),
  bag: (s) => svg('<path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>', s),
  phone: (s) => svg('<path d="M6.6 3.8h2.7l1.4 4-2 1.3a11 11 0 0 0 6.2 6.2l1.3-2 4 1.4v2.7a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 4.8 5.8a1.8 1.8 0 0 1 1.8-2Z"/>', s),
  pin: (s) => svg('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>', s),
  clock: (s) => svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', s),
  menu: (s) => svg('<path d="M4 8h16"/><path d="M4 16h16"/>', s),
  // Facebook's own "f" glyph, filled, in the brand's own form.
  facebook: (s = 20) =>
    `<svg class="icon" width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z"/></svg>`,
};
