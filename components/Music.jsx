import Image from "next/image";
import gramophone from "@/public/images/music/gramophone-trim.png";
import vinyl from "@/public/images/music/vinyl-trim.png";
// smoke-cloud-trim.png is no longer imported here — the clouds are CSS
// masks now, so the file is referenced by public path inside SmokeLayer.
import arrowLeft from "@/public/images/music/arrow-left-trim.png";
import { STAGE, s } from "@/lib/stage";
import { STREAMING, linkProps } from "@/lib/links";
import SubscribeForm from "@/components/SubscribeForm";

// Home / 1.2 New Music & DJ Sets — "Groove to the Beat".
//
// Measured off the Canva mockup (2732px page, Music band y 1536-3072).
//
// The section is now a FIXED 56.22% of page width tall, the same as every
// other band. It previously grew to fit its own content and came out
// noticeably longer than Hero, Services and Merch. Everything inside is
// positioned absolutely against that box, so the height can't drift.
//
// Two structural points:
// - The gramophone and vinyl share a baseline at 32.43% of page width
//   (y 886 in the mockup) despite different heights.
// - Both smoke clouds share a top edge and a size, and are sized to
//   contain their column's content block (see SMOKE below). They sit on
//   their own z-10 layer — above this section's terracotta and above the
//   next section's background, but below both sections' content — so the
//   gramophone and vinyl (which live in the z-20 content layer) draw over
//   them rather than being washed out by them. They're deliberately
//   unclipped so they bleed down into Services.
//
// The lower block's vertical marks all come straight from the mockup:
//   headings 34.4% · buttons 39.7 / 44.8 / 50.1% · email 44.6% ·
//   subscribe 49.0%. Improvising these was what pushed the email field
//   up into the paragraph above it.


// Position taken from target boxes marked up on a screenshot review.
// Stage geometry was solved from two elements with known fractions (the
// YouTube and Bandcamp pill edges): a 1707px stage at a 96px offset, with
// the shot scrolled 356px. That puts the boxes at:
//
//   left  x 0.0568-0.4464   right x 0.5811-0.9701
//   both  y 0.2830-0.6040
//
// Size is unchanged (0.400 x 0.3251 vs the boxes' 0.389 x 0.321) — only
// the placement moved. The important part is the vertical: the clouds sit
// LOWER than the section's own floor at 0.5622, running ~0.042 past it so
// they wash down into the top of Services. They're on a z-10 layer, which
// keeps them above Services' panel backgrounds but below its copy and
// header (z-10 later in the DOM, and z-20), so they tint that band
// without obscuring anything.
const SMOKE = { top: 0.283, width: 0.45, height: 0.3751 };
// ===================================================================
// SMOKE CLOUDS — the two numbers you'll want to nudge are `centre`.
// ===================================================================
//
// `centre` is the cloud's horizontal midpoint as a fraction of the stage.
// Lower moves it LEFT, higher moves it RIGHT. Nothing else here affects
// horizontal position — size lives in SMOKE above, and the vertical mark
// is SMOKE.top.
//
// Both were sitting right of the content they're meant to sit behind,
// which is why the left edge of each text block was stranded on bare
// tile. Set to each column's actual content centre:
//
//   left   pills span 0.0798-0.4184, midpoint 0.2491; SoundCloud pill
//          centres on 0.2504 — so 0.250. Was 0.2816.
//   right  paragraph centres on 0.7716, heading on 0.7720 — so 0.772.
//          Was 0.8156.
//
// The trimmed asset's alpha centroid is 52.3% of its box, i.e. near
// enough symmetric, so box centre and visual centre are the same thing
// here and no fudge factor is needed.
//
// `color` recolours the cloud. The artwork is a soft alpha shape, so it's
// used as a MASK and filled — that's why this isn't a next/image any
// more. Streaming sits on terracotta and takes bone; Records sits on the
// bone half and takes terracotta.
const SMOKE_CLOUDS = [
  { id: "streaming", centre: 0.285, color: "var(--color-bone)" },
  { id: "records", centre: 0.802, color: "var(--color-terracotta)" },
];

const BUTTON = { width: 0.1512, height: 0.0406 };

const PLATFORMS = [
  { name: "YouTube", href: STREAMING.youtube, filled: true, col: 0, row: 0 },
  { name: "Bandcamp", href: STREAMING.bandcamp, filled: false, col: 1, row: 0 },
  { name: "Spotify", href: STREAMING.spotify, filled: false, col: 0, row: 1 },
  { name: "Apple Music", href: STREAMING.appleMusic, filled: true, col: 1, row: 1 },
];

const ROW_TOP = [0.3972, 0.4484, 0.5011];
const COL_LEFT = [0.0798, 0.2672];

// `submit` is explicit rather than inferred from a missing href: the
// streaming links legitimately have no href until the client supplies
// them, and inferring would have turned every unfilled platform pill into
// a stray form submit button.
function Pill({ children, href, filled, submit = false, style }) {
  const base = `font-display absolute flex items-center justify-center whitespace-nowrap rounded-full border-2 border-earth uppercase tracking-[0.1em] transition-colors ${filled
    ? "bg-terracotta text-bone hover:bg-deepred"
    : "bg-bone text-earth hover:bg-sand"
    }`;
  const merged = {
    height: s(BUTTON.height),
    fontSize: s(0.0105),
    ...style,
  };

  if (submit) {
    return (
      <button type="submit" className={base} style={merged}>
        {children}
      </button>
    );
  }

  const { className: state, ...anchor } = linkProps(href);
  return (
    <a {...anchor} className={`${base} ${state ?? ""}`} style={merged}>
      {children}
    </a>
  );
}

function SmokeLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {SMOKE_CLOUDS.map(({ id, centre, color }) => (
        <div
          key={id}
          className="absolute -translate-x-1/2 select-none opacity-80"
          style={{
            left: s(centre),
            top: s(SMOKE.top),
            width: s(SMOKE.width),
            height: s(SMOKE.height),
            backgroundColor: color,
            // Read straight from /public rather than through the static
            // import: CSS masks need a plain url(), and this is the same
            // approach ShukaBackground uses for the border artwork.
            WebkitMaskImage: "url(/images/music/smoke-cloud-trim.png)",
            maskImage: "url(/images/music/smoke-cloud-trim.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />
      ))}
    </div>
  );
}

// MOBILE — the two halves become two stacked sections.
//
// Deliberately NOT a scaled-down version of the band. The desktop layout
// puts streaming and Records side by side because there's width for it;
// at 360px there isn't, and shrinking would give ~4px type. Same content,
// different arrangement.
//
// Two departures from the artboards, both for usability rather than
// fidelity:
//
//   1. The platform pills are a 2-column grid rather than the artboard's
//      staggered arrangement. Staggering is a desktop composition device;
//      on a phone it just makes targets uneven and harder to hit.
//   2. Every pill is 48px tall. The artboard's proportions would give
//      about 20px, which is under half the minimum comfortable touch
//      target — and these are the section's only real actions.
function MobilePill({ name, href, filled }) {
  const skin = filled
    ? "bg-terracotta text-bone border-earth"
    : "bg-bone text-earth border-earth";

  // Spotify and Apple Music have no URL until LANDR distributes a
  // release. Rendering them inert beats a dead link that goes nowhere.
  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={`font-display flex h-12 items-center justify-center rounded-full border-2 text-xs uppercase tracking-[0.1em] opacity-40 ${skin}`}
      >
        {name}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-display flex h-12 items-center justify-center rounded-full border-2 text-xs uppercase tracking-[0.1em] ${skin}`}
    >
      {name}
    </a>
  );
}

function MobileMusic() {
  return (
    <div className="md:hidden">
      {/* ---- streaming, on terracotta ---- */}
      <div className="paper bg-terracotta px-5 pb-10 pt-8">
        <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-bone">
          New Music and DJ Sets
        </p>
        <h2 className="font-display mt-1 text-3xl uppercase leading-none tracking-[0.04em] text-bone">
          Groove to the Beat
        </h2>

        <Image
          src={gramophone}
          alt="Vintage gramophone illustration"
          className="mx-auto mt-6 h-auto w-2/3"
          sizes="66vw"
        />

        <h3 className="font-heading mt-6 text-center text-sm uppercase leading-snug tracking-[0.04em] text-bone">
          Head over to your preferred platform and listen now
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {PLATFORMS.map(({ name, href, filled }) => (
            <MobilePill key={name} name={name} href={href} filled={filled} />
          ))}
          {/* SoundCloud spans both columns — it's the fifth of an even
              grid, and a lone half-width pill on the last row looks like a
              mistake. */}
          <div className="col-span-2">
            <MobilePill name="SoundCloud" href={STREAMING.soundcloud} filled />
          </div>
        </div>
      </div>

      {/* ---- Umojah Records, on bone ---- */}
      <div className="paper bg-bone px-5 pb-10 pt-8">
        <h2 className="font-display text-center text-4xl uppercase leading-none tracking-[0.04em] text-deepred">
          Umojah
        </h2>
        <p className="font-heading mt-1 text-center text-base uppercase leading-none tracking-[0.2em] text-deepred">
          Records
        </p>

        <Image
          src={vinyl}
          alt="Vinyl record illustration"
          className="mx-auto mt-6 h-auto w-2/3"
          sizes="66vw"
        />

        <h3 className="font-heading mt-6 text-center text-sm uppercase leading-snug tracking-[0.04em] text-earth">
          Original music by Umojah Sound System
        </h3>
        <p className="font-body mt-3 text-center text-[0.95rem] leading-relaxed text-earth">
          Original roots and dub from East Africa&rsquo;s foundation sound.
          Productions by Dread Steppa &mdash; coming in 2026. Be the first to know
          when it drops.
        </p>

        <SubscribeForm variant="mobile" />
      </div>
    </div>
  );
}

export default function Music() {
  return (
    <section id="music" className="paper relative bg-terracotta">
      {/* THE BAND IS TWO GROUNDS, NOT ONE.
          Streaming on terracotta, Umojah Records on bone, split down the
          middle. The section keeps terracotta as its base and this panel
          lays bone over the right half, full-bleed to the page edge — so
          the split lands at the middle of the PAGE, which is what the
          artboard shows, rather than at the middle of the centred stage.
          z-0 keeps it under the smoke and under the content column. */}
      {/* Desktop-only scenery. The bone half-panel and the smoke are both
          absolutely positioned against the band's fixed height, which
          doesn't exist on mobile — there the two halves become two
          sections in normal flow and provide their own grounds. */}
      <div className="hidden md:block">
        <div
          aria-hidden="true"
          className="paper absolute inset-y-0 right-0 z-0 w-1/2 bg-bone"
        />
        <SmokeLayer />
      </div>

      <MobileMusic />

      {/* z-20 lifts the content above the hero medallion (z-10) whose
          tassels hang into this section — they should read as a background
          layer behind the type. The section itself deliberately carries no
          z-index, so its terracotta stays below the medallion. */}
      <div
        className="relative z-20 mx-auto hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {/* ---- left column header ---- */}
        <p
          className="font-body absolute font-bold uppercase tracking-[0.3em] text-bone"
          style={{ left: s(0.0549), top: s(0.0357), fontSize: s(0.0135) }}
        >
          New Music and DJ Sets
        </p>
        <h2
          className="font-display absolute whitespace-nowrap uppercase leading-none tracking-[0.04em] text-sand drop-shadow-[3px_3px_0_var(--color-deepred)]"
          style={{ left: s(0.0549), top: s(0.0536), fontSize: s(0.0259) }}
        >
          Groove to the Beat
        </h2>
        <Image
          src={arrowLeft}
          alt=""
          aria-hidden="true"
          className="absolute h-auto max-w-none"
          style={{ left: s(0.0549), top: s(0.0842), width: s(0.2969) }}
          sizes="30vw"
        />

        {/* ---- right column header ----
            Deep red, not bone. The right half sits on a bone ground (see
            the panel at the top of the section), so bone type here was
            invisible against it — the rest of this column was already
            written for a light background with text-earth, which is what
            gave the mismatch away. */}
        <h2
          className="font-display absolute -translate-x-1/2 whitespace-nowrap uppercase leading-none tracking-[0.04em] text-deepred"
          style={{ left: s(0.7734), top: s(0.0794), fontSize: s(0.0432) }}
        >
          Umojah
        </h2>
        <p
          className="font-heading absolute -translate-x-1/2 whitespace-nowrap uppercase leading-none tracking-[0.2em] text-deepred"
          style={{ left: s(0.7734), top: s(0.1233), fontSize: s(0.016) }}
        >
          Records
        </p>

        {/* ---- illustrations, sharing a baseline ---- */}
        <Image
          src={gramophone}
          alt="Vintage gramophone illustration"
          className="absolute h-auto max-w-none"
          style={{ left: s(0.168), top: s(0.1021), width: s(0.1651) }}
          sizes="17vw"
        />
        <Image
          src={vinyl}
          alt="Vinyl record illustration"
          className="absolute h-auto max-w-none -translate-x-1/2"
          style={{ left: s(0.7734), top: s(0.1512), width: s(0.1717) }}
          sizes="18vw"
        />

        {/* ---- left: streaming ---- */}
        <h3
          className="font-heading absolute -translate-x-1/2 text-center uppercase tracking-[0.08em] text-earth"
          style={{
            left: s(0.2541),
            top: s(0.3440),
            width: s(0.3763),
            fontSize: s(0.014),
            lineHeight: 1.38,
          }}
        >
          Head over to your preferred platform and listen now
        </h3>
        {PLATFORMS.map(({ name, href, filled, col, row }) => (
          <Pill
            key={name}
            href={href}
            filled={filled}
            style={{
              left: s(COL_LEFT[col]),
              top: s(ROW_TOP[row]),
              width: s(BUTTON.width),
            }}
          >
            {name}
          </Pill>
        ))}
        <Pill
          href={STREAMING.soundcloud}
          filled
          style={{
            left: s(0.2504),
            top: s(ROW_TOP[2]),
            width: s(BUTTON.width),
            transform: "translateX(-50%)",
          }}
        >
          SoundCloud
        </Pill>

        {/* ---- right: Umojah Records ---- */}
        <h3
          className="font-heading absolute -translate-x-1/2 text-center uppercase tracking-[0.08em] text-earth"
          style={{
            left: s(0.772),
            top: s(0.3447),
            width: s(0.4),
            fontSize: s(0.0145),
            letterSpacing: "0.04em",
            lineHeight: 1.38,
          }}
        >
          Original music by Umojah Sound System
        </h3>
        <p
          className="font-body absolute -translate-x-1/2 text-center font-normal text-earth"
          style={{
            left: s(0.7716),
            top: s(0.3741),
            // Widened so the copy still lands in 3 lines at the site-wide
            // body size (0.0136) — it was shrunk to 0.012 purely to dodge a
            // collision with the email field, which is fixed properly now.
            width: s(0.335),
            fontSize: s(0.0136),
            lineHeight: 1.45,
          }}
        >
          Original roots and dub from East Africa&rsquo;s foundation sound.
          Productions by Dread Steppa &mdash; coming in 2026. Be first to know
          when it drops.
        </p>

        <SubscribeForm variant="desktop" />
      </div>
    </section>
  );
}
