// Shared sizing basis for every full-bleed band on the site.
//
// The Canva artboard is 2732px wide with each section 1536px tall — a
// ratio of 0.5622. Sized off width alone, that makes a band 1079px tall at
// a 1920px viewport, which is taller than the ~950px a 1920x1080 browser
// window actually offers. The mockup runs content to within 4% of the
// band's floor (the SoundCloud pill bottoms out at 96.4%), so the last
// rows fell below the fold.
//
// STAGE therefore takes the SMALLER of the width-driven and height-driven
// sizes. On a short window the whole composition scales down and centres,
// and because each <section> paints its own colour full-bleed behind the
// stage, the side gutters just read as more of that section's ground —
// nothing is letterboxed and nothing is cut off.
//
// Every position on the site is a fraction of this one value, so the
// proportions are identical at any size; only the scale changes.

export const BAND_ASPECT = 0.5622;

export const STAGE = `min(100vw, 2200px, calc(100vh / ${BAND_ASPECT}))`;

// Hero sits inside the section's own 48px horizontal padding.
export const HERO_STAGE = `min(calc(100vw - 96px), 2200px, calc(100vh / ${BAND_ASPECT}))`;

export const stageFraction = (stage) => (fraction) =>
  `calc(${stage} * ${fraction})`;

export const s = stageFraction(STAGE);
