// Fixed left/right page borders built from the shuka check artwork.
//
// Source files: the original shuka-left.png / shuka-right.png are
// full 2732x1536 canvases where the pattern only occupies a narrow strip
// down one edge — and the right-hand file's "background" is opaque white
// rather than transparent, which silently broke the mask (an all-opaque
// alpha channel means nothing gets cut out). The *-strip.png files used
// here are cropped-to-content, properly-transparent versions of the same
// artwork.
//
// Scale — this is the part that was wrong before. The mask was sized
// `100% auto`, which squeezes the pattern's ENTIRE width into the border,
// shrinking the motifs into a busy ribbon. Measuring the Canva mockup
// (2732px page) shows the opposite treatment:
//
//   border width          74px      = 2.71% of page width
//   pattern drawn at      1536px tall (its natural height at that page
//                         size), so only the outermost ~38% of the
//                         pattern's width is visible — the motifs are
//                         large and cropped by the page edge
//
// So the mask is sized by HEIGHT (2.71vw x 20.757 = 56.22vw, i.e. the
// mockup's 1536/2732) and the element's narrow width crops it. Both
// values derive from the same expression so the crop ratio holds at any
// viewport.
//
// Colour — sampling the mockup's border gives #A86C6C over bone. The
// artwork's own alpha peaks at 76%, so the fill behind it works out to
// roughly #914C4C, which is Terracotta (#9B4E45) within measurement
// error. Hence the terracotta default rather than ochre.
//
// Note: in the mockup the border is recoloured per section (indigo
// alongside the terracotta Music band, for example). This component is a
// single fixed overlay for the whole page, so it can't do that yet —
// worth revisiting when the lower sections are built.
//
// Because CSS masks need a plain url() reference (not the optimised/
// srcset output next/image produces), this component reads the files
// straight from /public rather than through next/image.

const BORDER_WIDTH = "min(2.71vw, 74px)";
const PATTERN_HEIGHT = `calc(${BORDER_WIDTH} * 20.757)`;

function ShukaEdge({ side, backgroundColor, width, patternHeight }) {
  const src = `/images/borders/shuka-${side}-strip.png`;

  return (
    <div
      aria-hidden="true"
      // Desktop only. At phone width the border resolves to a ~10px strip
      // (2.71vw), which crops the shuka pattern down to a sliver of noise
      // rather than a recognisable check — it stopped reading as the motif
      // and just ate horizontal space that mobile has none of. Hiding it
      // also drops two masked PNGs from the mobile payload, on the
      // connections most likely to be metered.
      className="hidden md:block"
      style={{
        position: "fixed",
        top: 0,
        [side]: 0,
        width,
        height: "100vh",
        backgroundColor,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "repeat-y",
        maskRepeat: "repeat-y",
        WebkitMaskPosition: `${side} top`,
        maskPosition: `${side} top`,
        WebkitMaskSize: `auto ${patternHeight}`,
        maskSize: `auto ${patternHeight}`,
        pointerEvents: "none",
        zIndex: 40,
      }}
    />
  );
}

export default function ShukaBackground({
  backgroundColor = "var(--color-terracotta)",
  width = BORDER_WIDTH,
  patternHeight = PATTERN_HEIGHT,
}) {
  return (
    <>
      <ShukaEdge
        side="left"
        backgroundColor={backgroundColor}
        width={width}
        patternHeight={patternHeight}
      />
      <ShukaEdge
        side="right"
        backgroundColor={backgroundColor}
        width={width}
        patternHeight={patternHeight}
      />
    </>
  );
}
