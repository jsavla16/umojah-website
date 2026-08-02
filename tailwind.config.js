/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Brand colours are defined once as CSS custom properties in
      // app/globals.css. Tailwind utilities below just point at them so
      // hex values never get hardcoded into component markup.
      colors: {
        bone: "var(--color-bone)",
        sand: "var(--color-sand)",
        earth: "var(--color-earth)",
        black: "var(--color-black)",
        terracotta: "var(--color-terracotta)",
        ochre: "var(--color-ochre)",
        deepred: "var(--color-deepred)",
        indigo: "var(--color-indigo)",
        gold: "var(--color-gold)",
        charcoal: "var(--color-charcoal)",
      },
      fontFamily: {
        display: "var(--font-display)",
        heading: "var(--font-heading)",
        body: "var(--font-body)",
      },
    },
  },
  plugins: [],
};
