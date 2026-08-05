import Image from "next/image";
// flight-case-trim.png is no longer used here — it belonged to the third
// panel ("Experience It"), dropped in v2. The asset is still in
// /public/images/services if a later section wants it.
import bassBins from "@/public/images/services/bass-bins-trim.png";
import venue from "@/public/images/services/venue-trim.png";
import { STAGE, s } from "@/lib/stage";


// Home / 1.3 Services — "Feel the Vibrations".
//
// Measured off the Canva mockup. v2 is a 1366px page with 768px bands —
// exactly half v1's 2732/1536 — so every stage fraction below carries over
// unchanged; only the panel count and copy differ.
// Two full-height panels running edge to edge, with the section header
// overlaid top-left so "VIBRATIONS" bleeds across onto the terracotta
// panel exactly as in the design:
//
//   panel 1  x    0 - 885   (32.39%)  bone
//   panel 2  x  885 - 1762  (32.10%)  terracotta
//   panel 3  x 1762 - 2732  (35.51%)  bone
//
// Shared vertical rhythm (fractions of page width, from the section top):
//   title 10.43% · tag 13.47% · body 16.47% · CTA 26.83% · art 30.31%
//
// Two details taken straight from the mockup:
// - The terracotta panel has a translucent right edge (85px at ~24%
//   opacity) washing over the bone panel beside it, so the middle tile
//   reads as layered on top rather than butted against it. The left seam
//   is a hard edge — only the right one is soft.
// - The CTAs are right-aligned within each panel, and panel 3's sits on
//   top of the venue artwork, so panel content has to out-rank the art.


const PANELS = [
  {
    id: "hire",
    title: "Sound System Hire",
    // "Corporate", not "Corporates" — the v2 artboard has the typo.
    audience: ["Corporate Events", "Weddings", "Birthdays", "Festivals", "Clubs"],
    body: "Hire the full roots, reggae and dub experience — or just the gear. PA systems, speakers, amplifiers, DJ equipment, microphones, mixing desks, generators and power. Delivered across Kenya, from Nairobi to Mombasa, Kisumu and Nakuru, set up and tuned to the room by the people who built it.",
    bodyWidth: "90%",
    // Five audience labels instead of three, so this tag runs far wider
    // than the build panel's. Pinned per-panel rather than sized to its
    // own text — letting it hug the content is what made the longest
    // label swell to the full panel width and lose its margins.
    tagWidth: 0.434,
    cta: "Find Out More",
    image: venue,
    imageAlt: "Illustration of the Umojah stack installed in a venue",
    // Centred in the panel now that the CTA sits above rather than on top
    // of it, plus the 0.012 shuka nudge the copy also gets.
    imageLeft: 0.1025,
    // 0.36, not the artboard's ~0.47. IMAGE WIDTH CONTROLS IMAGE HEIGHT:
    // venue-trim.png is 883x777, so every 100px of width adds 88px of
    // height, and since the image is anchored to the panel floor, growing
    // it pushes its TOP edge upward. At 0.472 the top edge reached y=201 —
    // above the paragraph at y=225 — so the artwork covered the copy
    // completely. At 0.36 the top edge sits at y=335, clearing the
    // paragraph's last line at y=323.
    //
    // The artboard can run it wider because its paragraph is 3 lines; ours
    // is 4, because the approved copy names the cities. Copy earns its
    // place here, artwork yields.
    // 0.319, compressed again from 0.36 to open a lane for the CTA.
    // Width drives height (883x777, so 0.88 tall per 1 wide) and the image
    // is anchored to the panel floor, so shrinking it lowers its TOP edge:
    // 0.36 put the top at y=335, 0.319 puts it at y=385 — clear of the
    // CTA, which now ends at 370.
    imageWidth: 0.319,
    imageBottom: 0,
    // The left shuka border covers part of this panel, so the mockup
    // nudges its centred content right to sit optically centred in the
    // visible area rather than in the panel box.
    centreOffset: 0.012,
    ctaRight: 0.014,
    ctaHref: "#contact-hire",
    dark: false,
    // Mobile inverts desktop — see MobileService.
    mobileDark: true,
  },
  {
    id: "build",
    title: "Build a Bespoke Sound System",
    audience: ["Restaurants", "Bars", "Audiophiles"],
    body: "Bespoke sound, built with intention. We design, build, install and maintain systems tuned to your space — from an intimate bar to a full venue install. Consultations anywhere in Kenya: Nairobi, Mombasa, Kisumu, Nakuru. No compromises.",
    bodyWidth: "90%",
    tagWidth: 0.243,
    cta: "Start a Conversation",
    image: bassBins,
    imageAlt: "Illustration of a stack of bass bin speaker cabinets",
    imageLeft: 0.1455,
    // Same rule as the venue image above — bass-bins-trim.png is 563x729,
    // so it grows 1.29px tall for every 1px wide. 0.235 puts its top edge
    // at y=339, below the paragraph.
    // Same reasoning as the venue image — 563x729, so 1.29 tall per 1
    // wide. 0.209 puts its top edge at y=385 too, so both panels' artwork
    // starts on the same line.
    imageWidth: 0.209,
    imageBottom: 0.0095,
    centreOffset: 0,
    // clears the 2.71%-wide shuka border on the page edge
    ctaRight: 0.041,
    ctaHref: "#contact-build",
    dark: true,
    mobileDark: false,
  },
];

function Panel({ panel }) {
  const {
    title,
    audience,
    body,
    bodyWidth,
    cta,
    image,
    imageAlt,
    imageLeft,
    imageWidth,
    imageBottom,
    centreOffset,
    ctaRight,
    ctaHref,
    dark,
    tagWidth,
  } = panel;
  const ink = dark ? "text-bone" : "text-earth";

  return (
    <div className={`relative h-full ${dark ? "paper bg-terracotta" : ""}`}>
      {/* Artwork sits underneath the copy — panel 3's CTA overlaps it. */}
      <Image
        src={image}
        alt={imageAlt}
        className="absolute z-0 h-auto max-w-none"
        style={{
          left: s(imageLeft),
          bottom: s(imageBottom),
          width: s(imageWidth),
        }}
        sizes="35vw"
      />

      <div className="absolute inset-0 z-10">
        <div
          className="absolute inset-0"
          style={{ transform: `translateX(${s(centreOffset)})` }}
        >
          <h3
          className={`font-heading absolute inset-x-0 text-center uppercase leading-none ${ink}`}
          style={{ top: s(0.1013), fontSize: s(0.021) }}
        >
          {title}
        </h3>

        {/* Audience tag.
            In the mockup this is a fixed-width bar — 688/651/667px across
            the three panels, i.e. ~25.2% of page width regardless of how
            long the label is — centred in its panel. Letting it size to
            its own text instead is what made panel 1's (the longest label)
            swell to the full panel width and lose its margins. So the
            width is pinned to the stage, not the content, and the type is
            sized so the longest of the three labels still clears the
            padding. */}
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: s(0.1347) }}
        >
          <span
            className="font-body inline-flex items-center justify-center whitespace-nowrap rounded-md bg-earth font-bold uppercase tracking-[0.04em] text-bone"
            style={{
              width: s(tagWidth),
              height: s(0.0187),
              fontSize: s(0.0102),
              paddingLeft: s(0.008),
              paddingRight: s(0.008),
            }}
          >
            {audience.join(" ● ")}
          </span>
        </div>

        {/* THE BODY HAS A HEIGHT BUDGET. Read this before editing copy.

            Everything in this panel is absolutely positioned, so the
            paragraph cannot push the artwork down — it just runs behind
            it, which is exactly what the Canva v2 artboard does (its Hire
            paragraph ends mid-sentence on "PA Systems and"). The mockup
            didn't reveal a copy problem; it revealed a layout that can't
            express one.

            The budget, at a 1366px stage:
              body top    0.1647 * 1366  = 225px
              artwork top                ≈ 357px
              available                  = 132px

            At 90% of a 683px panel and ~0.5em average glyph width, the
            longest line holds ~73 characters. The Hire copy is 285
            characters, so 4 lines at 1.45 leading = 98px. Fits, with 34px
            spare.

            At the previous s(0.0136) it was 62 characters per line, which
            tipped Hire to 5 lines = 135px and overran the artwork by 3px.
            Three pixels, and the paragraph read as broken.

            So: if the copy grows past roughly 290 characters, this size
            has to come down again, or the artwork has to move. Don't just
            add a sentence and assume it fits. */}
        <p
          className={`font-body absolute left-1/2 -translate-x-1/2 text-center font-normal leading-[1.45] ${ink}`}
          style={{ top: s(0.1647), width: bodyWidth, fontSize: s(0.0124) }}
        >
          {body}
        </p>

        </div>

        {/* CTA — centred under the paragraph.
            It used to be right-aligned, floating at the panel edge over
            the artwork, which made it read as a label attached to the
            illustration rather than the conclusion of the copy above it.
            The artboard does right-align it, but the artboard also has a
            three-line paragraph and larger artwork; once those changed the
            alignment stopped making sense. Centred, it matches the
            full-width button on mobile and sits where the eye lands after
            the last line.

            centreOffset is applied here too so it tracks the panel's
            optical centre — the same nudge the copy block gets to allow
            for the shuka border overlapping panel 1. */}
        <div
          className="absolute flex justify-center"
          style={{
            // 0.244, moved up from 0.2683 so it sits in the lane between
            // the paragraph (ends y=323) and the artwork (now starts
            // y=385) rather than on top of the illustration. The artwork
            // was compressed to make that lane — see imageWidth above.
            top: s(0.244),
            left: 0,
            right: 0,
            transform: `translateX(${s(centreOffset)})`,
          }}
        >
          <a
            href={ctaHref}
            className={`font-display inline-flex items-center justify-center whitespace-nowrap rounded-md border-2 border-earth uppercase tracking-[0.08em] transition-colors ${
              dark
                ? "bg-earth text-bone hover:bg-black"
                : "bg-bone text-earth hover:bg-sand"
            }`}
            style={{
              height: s(0.027),
              fontSize: s(0.0163),
              paddingLeft: s(0.016),
              paddingRight: s(0.016),
            }}
          >
            {cta}
          </a>
        </div>
      </div>
    </div>
  );
}

// MOBILE SERVICE BLOCK.
//
// One full section per service, stacked, in normal flow. This is not the
// desktop panel shrunk — at 360px each desktop panel would be 180px wide
// and every measured offset would collapse.
//
// Normal flow also removes the collision class of bug entirely: here the
// paragraph pushes the artwork down instead of being painted over by it,
// so copy can grow without anyone recalculating a height budget. The
// desktop panel can't do that, which is why it needs one.
//
// The mobile artboards INVERT the desktop colours — Hire is terracotta
// here and bone on desktop, Build the reverse. Deliberate in the design,
// so `mobileDark` is a separate flag from `dark`.
function MobileService({ panel, showEyebrow }) {
  const { title, audience, body, cta, image, imageAlt, ctaHref, mobileDark } =
    panel;

  const ink = mobileDark ? "text-bone" : "text-earth";
  const pill = mobileDark ? "bg-bone text-earth" : "bg-earth text-bone";
  const button = mobileDark
    ? "border-bone bg-bone text-earth"
    : "border-earth bg-earth text-bone";

  return (
    <div
      className={`paper px-5 pb-10 pt-8 ${
        mobileDark ? "bg-terracotta" : "bg-bone"
      }`}
    >
      {showEyebrow && (
        <p
          className={`font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] ${ink}`}
        >
          Our Services
        </p>
      )}

      <h2
        className="font-display mt-1 text-2xl uppercase leading-tight tracking-[0.03em] text-gold"
        style={{
          WebkitTextStrokeWidth: "0.03em",
          WebkitTextStrokeColor: "var(--color-earth)",
          paintOrder: "stroke fill",
        }}
      >
        {title}
      </h2>

      {/* Wraps rather than scrolls — the hire panel carries five labels,
          which will not fit on one line at this width. */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {audience.map((label) => (
          <span
            key={label}
            className={`font-body rounded px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.04em] ${pill}`}
          >
            {label}
          </span>
        ))}
      </div>

      <p className={`font-body mt-4 text-[0.95rem] leading-relaxed ${ink}`}>
        {body}
      </p>

      <Image
        src={image}
        alt={imageAlt}
        className="mt-6 h-auto w-full"
        sizes="100vw"
      />

      <a
        href={ctaHref}
        className={`font-display mt-6 flex h-12 w-full items-center justify-center rounded-md border-2 text-sm uppercase tracking-[0.08em] ${button}`}
      >
        {cta}
      </a>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="paper relative bg-bone">
      {/* ---------------------------------------------------------------
          MOBILE — two stacked sections, Hire first.
          --------------------------------------------------------------- */}
      <div className="md:hidden">
        {PANELS.map((panel, index) => (
          <MobileService
            key={panel.id}
            panel={panel}
            showEyebrow={index === 0}
          />
        ))}
      </div>

      {/* ---------------------------------------------------------------
          DESKTOP — the proportional stage.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden overflow-hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {/* v2 splits the band 50/50 — the seam falls at x=684 of 1366. The
            soft terracotta wash that used to bleed over panel 3 is gone
            with it: terracotta now runs from the seam to the page edge, so
            the seam is a hard edge and needs no feathering. */}
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {PANELS.map((panel) => (
            <Panel key={panel.id} panel={panel} />
          ))}
        </div>

        {/* Section header — above the panels, deliberately running across
            the panel 1 / panel 2 seam. Set entirely in Deep Earth with an
            Earth Gold outline, so the letters that cross onto the
            terracotta panel match the rest of the word.

            IMPORTANT: this wrapper spans the whole section, so it must stay
            pointer-events-none. Without it the transparent box swallowed
            every mouse event across all three panels — the body copy
            couldn't be selected (it read as an image) and the CTA links
            underneath weren't clickable at all. The header's own elements
            opt back in with pointer-events-auto. */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <p
            className="font-body pointer-events-auto absolute font-bold uppercase tracking-[0.3em] text-earth"
            style={{ left: s(0.0472), top: s(0.031), fontSize: s(0.0135) }}
          >
            Our Services
          </p>
          <h2
            className="font-display pointer-events-auto absolute whitespace-nowrap uppercase leading-none tracking-[0.04em] text-earth"
            style={{
              left: s(0.0458),
              top: s(0.0518),
              fontSize: s(0.0259),
              WebkitTextStrokeWidth: "0.035em",
              WebkitTextStrokeColor: "var(--color-gold)",
              paintOrder: "stroke fill",
            }}
          >
            Feel the Vibrations
          </h2>

          {/* Rule under the headline — the artwork is bone, so it's used as
              a mask and filled with earth rather than tinted. */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              left: s(0.0432),
              top: s(0.0809),
              width: s(0.3038),
              height: s(0.0107),
              backgroundColor: "var(--color-earth)",
              WebkitMaskImage: "url(/images/services/arrow-left-trim.png)",
              maskImage: "url(/images/services/arrow-left-trim.png)",
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </section>
  );
}
