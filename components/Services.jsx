import Image from "next/image";
import flightCase from "@/public/images/services/flight-case-trim.png";
import bassBins from "@/public/images/services/bass-bins-trim.png";
import venue from "@/public/images/services/venue-trim.png";
import { STAGE, s } from "@/lib/stage";

// Home / 1.3 Services — "Feel the Vibrations".
//
// Measured off the Canva mockup (2732px page, Services band y 3072-4608).
// Three full-height panels running edge to edge, with the section header
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
    title: "Hire the Equipment",
    audience: ["Corporates", "Weddings", "Birthdays"],
    body: "Your event, your DJs, our sound. We deliver, set up and tune the system so your night sounds exactly right — then we pack it down and disappear.",
    bodyWidth: "74%",
    cta: "Get a Quote",
    image: flightCase,
    imageAlt: "Illustration of a stacked pair of flight cases",
    imageLeft: 0.0996,
    imageWidth: 0.1552,
    imageBottom: 0.0128,
    // The left shuka border covers 74px of this panel, so the mockup
    // nudges its centred content right to sit optically centred in the
    // visible area rather than in the panel box.
    centreOffset: 0.012,
    ctaRight: 0.022,
    dark: false,
  },
  {
    id: "build",
    title: "Build a Bespoke System",
    audience: ["Restaurants", "Bars", "Audiophiles"],
    body: "Bespoke sound built with intention. We design, build, install and maintain a system tuned to your space — from an intimate bar to a full venue install. No compromises.",
    bodyWidth: "80%",
    cta: "Start a Conversation",
    image: bassBins,
    imageAlt: "Illustration of a stack of bass bin speaker cabinets",
    imageLeft: 0.0589,
    imageWidth: 0.2024,
    imageBottom: 0.0095,
    centreOffset: 0,
    ctaRight: 0.0095,
    dark: true,
  },
  {
    id: "experience",
    title: "Experience It",
    audience: ["Festivals", "Clubs", "Serious Events"],
    body: "Equipment, selektors and MCs. The full session, the full experience. We bring the stacks, the sound and the culture — and we play till the dance is done.",
    bodyWidth: "68%",
    cta: "Book Now",
    image: venue,
    imageAlt: "Illustration of the Umojah stack installed in a venue",
    imageLeft: 0.0029,
    // Trimmed back from the mockup's 34% so the artwork stops just inside
    // the shuka border instead of running underneath it.
    imageWidth: 0.3221,
    imageBottom: 0,
    centreOffset: 0,
    // clears the 2.71%-wide shuka border on the page edge
    ctaRight: 0.038,
    dark: false,
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
    dark,
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
              width: s(0.252),
              height: s(0.0187),
              fontSize: s(0.0102),
              paddingLeft: s(0.008),
              paddingRight: s(0.008),
            }}
          >
            {audience.join(" ● ")}
          </span>
        </div>

        <p
          className={`font-body absolute left-1/2 -translate-x-1/2 text-center font-normal leading-[1.45] ${ink}`}
          style={{ top: s(0.1647), width: bodyWidth, fontSize: s(0.0136) }}
        >
          {body}
        </p>

        </div>

        {/* CTA — right-aligned within the panel */}
        <div
          className="absolute flex justify-end"
          style={{ top: s(0.2683), left: 0, right: s(ctaRight) }}
        >
          <a
            href="#contact"
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

export default function Services() {
  return (
    <section id="services" className="paper relative bg-bone">
      <div
        className="relative mx-auto overflow-hidden"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: "32.39fr 32.10fr 35.51fr" }}
        >
          {PANELS.map((panel) => (
            <Panel key={panel.id} panel={panel} />
          ))}
        </div>

        {/* Soft right edge of the terracotta tile, washing over panel 3 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-[15] h-full bg-terracotta opacity-25"
          style={{ left: s(0.6449), width: s(0.0311) }}
        />

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
