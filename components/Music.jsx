import Image from "next/image";
import gramophone from "@/public/images/music/gramophone-trim.png";
import vinyl from "@/public/images/music/vinyl-trim.png";
import smokeCloud from "@/public/images/music/smoke-cloud-trim.png";
import arrowLeft from "@/public/images/music/arrow-left-trim.png";
import { STAGE, s } from "@/lib/stage";
import { STREAMING, linkProps } from "@/lib/links";

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
const SMOKE_CENTRES = [0.2816, 0.8156];

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
      {SMOKE_CENTRES.map((centre) => (
        <Image
          key={centre}
          src={smokeCloud}
          alt=""
          className="absolute max-w-none -translate-x-1/2 select-none opacity-80"
          style={{
            left: s(centre),
            top: s(SMOKE.top),
            width: s(SMOKE.width),
            height: s(SMOKE.height),
          }}
          sizes="45vw"
        />
      ))}
    </div>
  );
}

export default function Music() {
  return (
    <section id="music" className="paper relative bg-terracotta">
      <SmokeLayer />

      {/* z-20 lifts the content above the hero medallion (z-10) whose
          tassels hang into this section — they should read as a background
          layer behind the type. The section itself deliberately carries no
          z-index, so its terracotta stays below the medallion. */}
      <div
        className="relative z-20 mx-auto"
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

        {/* ---- right column header ---- */}
        <h2
          className="font-display absolute -translate-x-1/2 whitespace-nowrap uppercase leading-none tracking-[0.04em] text-bone"
          style={{ left: s(0.7734), top: s(0.0794), fontSize: s(0.0432) }}
        >
          Umojah
        </h2>
        <p
          className="font-heading absolute -translate-x-1/2 whitespace-nowrap uppercase leading-none tracking-[0.2em] text-bone"
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

        <form className="contents">
          <label htmlFor="records-email" className="sr-only">
            Email address
          </label>
          <input
            id="records-email"
            type="email"
            required
            placeholder="your@email.com"
            className="font-display absolute -translate-x-1/2 rounded-full border-2 border-earth bg-bone text-center uppercase tracking-[0.1em] text-earth placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-gold"
            style={{
              left: s(0.7724),
              top: s(0.4462),
              width: s(0.1395),
              height: s(0.0377),
              fontSize: s(0.0105),
            }}
          />
          <Pill
            submit
            filled
            style={{
              left: s(0.7724),
              top: s(0.4898),
              width: s(0.1318),
              height: s(0.0381),
              transform: "translateX(-50%)",
            }}
          >
            Subscribe
          </Pill>
        </form>
      </div>
    </section>
  );
}
