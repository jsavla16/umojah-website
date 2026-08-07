import Image from "next/image";
import warriorLeft from "@/public/images/hero/warrior-left-trim.png";
import warriorRight from "@/public/images/hero/warrior-right-trim.png";
import { STAGE, s } from "@/lib/stage";
import { ABOUT_MOBILE, shift } from "@/lib/aboutMobile";

// About / 2.3 Collaborations & Festivals — v3.
//
// REDESIGNED. The medallions are gone. The band is now split down the
// middle: artists on terracotta with a warrior at the left edge, festivals
// on bone with a warrior at the right edge. Both warriors face inward,
// toward their lists, the same way they flank the hero medallion.
//
// The medallion version couldn't have carried this content anyway — the
// artist list has grown from 8 names to 22, and a ring's hollow is a fixed
// circle. A flat column has no such limit, which is presumably why the
// design moved.
//
// Measured off collaborations v3.png (2732x1536, the usual 0.5622 band):
//
//   panel split        0.505 -> rendered as a clean 50/50
//   heading            left 0.055, top 0.0427
//   artists list       centred on 0.3625, first item 0.0875, pitch 0.01795
//   festivals list     centred on 0.665, block centred on 0.2565
//   warriors           0.37 tall (of stage WIDTH), left edge 0.0625 and
//                      right edge 0.95
//
// ===================================================================
// TUNING: the constants below are the knobs. LIST_* moves the type,
// WARRIOR_* moves the figures. Nothing else affects placement.
// ===================================================================

const WARRIOR = {
  // Height as a fraction of stage WIDTH, so it scales with everything
  // else. The asset is 1023x1521 (1.487 tall per 1 wide), so width follows
  // from this automatically — don't set both.
  height: 0.37,
  left: 0.0625, // left warrior, distance from the page's left edge
  right: 0.05, // right warrior, distance from the page's right edge
  bottom: 0.09, // both, up from the band's floor
};

// MOBILE TUNING LIVES IN lib/aboutMobile.js — warrior widths, list font
// sizes, and x/y offsets for all four elements. Nothing mobile is
// configured in this file.

// DESKTOP list placement.
const LIST = {
  artistsCentre: 0.3625,
  artistsTop: 0.0875,
  festivalsCentre: 0.665,
  festivalsCentreY: 0.2565, // the festivals block is centred, not top-set
  font: 0.0133,
  lineHeight: 1.35,
};

// NOTE ON THE CONTENT, both worth a second look:
//
//   1. The artboard and brief both read "Black Chariot Inernational".
//      Shortened to "Black Chariot" on the client's instruction, which
//      also disposes of the misspelling.
//   2. "Long Fingah" appeared TWICE in the supplied list (after 10000
//      Lions and again after Eva Lazurus). Listed once here — a repeat on
//      a credits roll reads as an error rather than an emphasis. Confirmed
//      by the client.
const ARTISTS = [
  "King Shiloh",
  "Lidj Shiloh",
  "Lavosti",
  "Kare",
  "Jah Pila",
  "Zikki",
  "Tippy I",
  "Black Chariot",
  "Micah Shemaiah",
  "10000 Lions",
  "Long Fingah",
  "Mungos Hi-Fi",
  "Charlie P",
  "Cian Finn",
  "Kelissa",
  "Yaardcore",
  "Black Omolo",
  "Eva Lazurus",
  "Uwe Banton",
  "DJ Vadim",
  "Mark Irie",
  "Thristian",
];

const FESTIVALS = [
  "Nyege Nyege",
  "Kilifi New Year",
  "Beneath the Baobab",
  "Kilele Summit",
  "Boiler Room",
];

const HEADING = "Collaborations and Festivals";

// Weight of the dark brown outline around each letter of the headline.
// BIGGER = heavier. Expressed in `em`, so it scales with the type size and
// stays proportionate on both breakpoints — a fixed px value would look
// heavy on mobile and thin on desktop.
//
// 0.035em was the site's usual weight, borrowed from the other headlines,
// but those sit on bone. This one sits on terracotta, where a sand fill
// and a mid-tone ground are much closer in value, so it needs more edge to
// separate. Past about 0.09em the counters in the letterforms start to
// close up, so that's the practical ceiling.
const HEADING_STROKE = "0.065em";

function Heading({ className = "", style }) {
  return (
    <h2
      className={`font-display uppercase leading-none tracking-[0.04em] text-sand ${className}`}
      style={{
        // Dark brown outline on every letter, both breakpoints — the
        // Heading component is shared, so setting it here covers desktop
        // and mobile at once. Gold was tried first and read as almost
        // nothing: against a sand fill the two colours are close in both
        // hue and lightness, so a 0.035em edge disappeared. Earth gives
        // the separation the artboard has.
        //
        // paint-order puts the stroke behind the fill so the letterforms
        // keep their full weight instead of being eaten into from both
        // sides.
        WebkitTextStrokeWidth: HEADING_STROKE,
        WebkitTextStrokeColor: "var(--color-earth)",
        paintOrder: "stroke fill",
        ...style,
      }}
    >
      {HEADING}
    </h2>
  );
}

// MOBILE — the two panels become two stacked blocks, each a two-column
// row of warrior and list. The artboard puts the warrior on the outside
// edge in both cases (left on terracotta, right on bone), so the pair
// still face inward toward their names.
function MobileCollaborations() {
  return (
    <div className="md:hidden">
      <div className="paper bg-terracotta px-4 pb-8 pt-8">
        <Heading className="text-3xl" />

        <div className="mt-6 flex items-start gap-2">
          <Image
            src={warriorLeft}
            alt=""
            // shrink-0 matters here. These are flex items, and flex
            // shrinks items below their set width when the row is tight —
            // which is exactly what was happening: the width was being
            // honoured as a suggestion, then quietly reduced, and because
            // height is auto the figures got shorter too. With shrink-0
            // the width below is the width you get, and height follows
            // from the asset's 1023x1521 proportions.
            className="h-auto shrink-0"
            style={{
              width: ABOUT_MOBILE.warriorArtists.width,
              transform: shift(ABOUT_MOBILE.warriorArtists),
            }}
            sizes="50vw"
          />
          {/* min-w-0 lets flex-1 actually shrink this column. Without it a
              flex item won't go below its content's intrinsic width, so a
              long name pushes the whole row wider instead of wrapping. */}
          <ul
            className="font-body min-w-0 flex-1 text-center font-bold uppercase leading-[1.45] tracking-[0.04em] text-bone"
            style={{
              fontSize: ABOUT_MOBILE.listArtists.font,
              transform: shift(ABOUT_MOBILE.listArtists),
            }}
          >
            {ARTISTS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="paper bg-bone px-4 pb-8 pt-10">
        <div className="flex items-center gap-2">
          <ul
            className="font-body min-w-0 flex-1 text-center font-bold uppercase leading-[1.45] tracking-[0.04em] text-earth"
            style={{
              fontSize: ABOUT_MOBILE.listFestivals.font,
              transform: shift(ABOUT_MOBILE.listFestivals),
            }}
          >
            {FESTIVALS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Image
            src={warriorRight}
            alt=""
            // shrink-0 matters here. These are flex items, and flex
            // shrinks items below their set width when the row is tight —
            // which is exactly what was happening: the width was being
            // honoured as a suggestion, then quietly reduced, and because
            // height is auto the figures got shorter too. With shrink-0
            // the width below is the width you get, and height follows
            // from the asset's 1023x1521 proportions.
            className="h-auto shrink-0"
            style={{
              width: ABOUT_MOBILE.warriorFestivals.width,
              transform: shift(ABOUT_MOBILE.warriorFestivals),
            }}
            sizes="60vw"
          />
        </div>
      </div>
    </div>
  );
}

export default function Collaborations() {
  return (
    <section id="collaborations" className="paper relative bg-bone">
      <MobileCollaborations />

      {/* ---------------------------------------------------------------
          DESKTOP — two grounds, split at the middle of the page.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {/* Terracotta half. The section's own ground is bone, so only the
            left needs painting. Full-bleed left so it runs under the shuka
            border rather than stopping short of it. */}
        <div
          aria-hidden="true"
          className="paper absolute inset-y-0 left-0 z-0 w-1/2 bg-terracotta"
        />

        <Image
          src={warriorLeft}
          alt=""
          className="absolute z-10 h-auto max-w-none"
          style={{
            left: s(WARRIOR.left),
            bottom: s(WARRIOR.bottom),
            width: s(WARRIOR.height / 1.4868),
          }}
          sizes="25vw"
        />

        <Image
          src={warriorRight}
          alt=""
          className="absolute z-10 h-auto max-w-none"
          style={{
            right: s(WARRIOR.right),
            bottom: s(WARRIOR.bottom),
            width: s(WARRIOR.height / 1.4868),
          }}
          sizes="25vw"
        />

        <Heading
          className="absolute z-20 whitespace-nowrap"
          style={{
            left: s(0.055),
            top: s(0.0427),
            fontSize: s(0.0254),
          }}
        />

        {/* Spear rule under the headline, flush left with the C.
            Same `left` value as the heading, so the tip starts directly
            beneath the first letter rather than being nudged out like the
            Services rule is. Bone, because it sits on terracotta — the
            artwork is bone already, so it's used as a mask and filled
            rather than tinted. */}
        <div
          aria-hidden="true"
          className="absolute z-20"
          style={{
            left: s(0.055),
            top: s(0.0742),
            width: s(0.2888),
            height: s(0.0107),
            backgroundColor: "var(--color-bone)",
            WebkitMaskImage: "url(/images/about/arrow-left-trim.png)",
            maskImage: "url(/images/about/arrow-left-trim.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        {/* Artists — top-set, because 22 names nearly fill the band. */}
        <ul
          className="font-body absolute z-20 -translate-x-1/2 text-center font-bold uppercase tracking-[0.04em] text-bone"
          style={{
            left: s(LIST.artistsCentre),
            top: s(LIST.artistsTop),
            fontSize: s(LIST.font),
            lineHeight: LIST.lineHeight,
          }}
        >
          {ARTISTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {/* Festivals — only five names, so the block is centred on the
            panel rather than hung from the top. */}
        <ul
          className="font-body absolute z-20 -translate-x-1/2 -translate-y-1/2 text-center font-bold uppercase tracking-[0.04em] text-earth"
          style={{
            left: s(LIST.festivalsCentre),
            top: s(LIST.festivalsCentreY),
            fontSize: s(LIST.font),
            lineHeight: LIST.lineHeight,
          }}
        >
          {FESTIVALS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
