import Image from "next/image";
import warriorLeft from "@/public/images/hero/warrior-left-trim.png";
import warriorRight from "@/public/images/hero/warrior-right-trim.png";
import Medallion from "@/components/Medallion";
import { HERO_STAGE as STAGE, stageFraction } from "@/lib/stage";
import Link from "next/link";

// Home / 1.1 Hero.
//
// TWO LAYOUTS, ONE DESIGN
// Desktop keeps the proportional "stage": every value measured off the
// Canva mockup (Home page.png, 2732px wide, hero band ending at y=1536)
// and expressed as a fraction of that artboard, so the composition scales
// as one and matches the design at any width.
//
//   stage aspect        2732 x 1536
//   medallion           x 527-2171 (left 19.29%, width 60.18%), top edge
//                       cropped by the page frame, tassels running 685px
//                       (25.03% of width) BELOW the hero into Music
//   warriors            height 962 (62.63% of stage height), centres at
//                       x 347 / 2385 (12.72% / 87.28%), feet at y 1239
//                       (19.34% up from the stage bottom)
//   Services/Music      y 1253-1353 — a clear band BELOW the warriors'
//                       feet, not overlapping them, centred under each
//                       warrior, 385px wide (14.09%)
//
// Below `md` (768px) that composition stops working, and not because
// things are merely small. The stage is capped by viewport WIDTH, so on a
// 390px phone HERO_STAGE resolves to 294px and every fraction of it
// collapses: SOUND SYSTEM to 5.7px, the buttons to 5.2px text in a 10.8px
// box — roughly a quarter of the 44px minimum touch target. Scaling type
// back up in place is not possible either, because the wordmark lives
// INSIDE the medallion's ring; its size is welded to the badge's size.
//
// So mobile changes the composition rather than the scale. The medallion
// goes from 60% of the stage to the full column width, which makes the
// ring contents legible for free (see components/Medallion.jsx), and the
// warriors move from flanking the badge to standing above their own
// buttons — the same relationship the mockup has, stacked instead of
// spread. Buttons become real 48px touch targets.
//
// Sizing notes:
// - The medallion's top crop is baked into medallion-crop.png (6.56% off
//   the top, matching the mockup) instead of being done with CSS
//   overflow. Earlier attempts to crop in CSS kept clipping the tassels
//   too, because a negative margin also changes what height flexbox
//   thinks the item needs. Cropping the asset removes that class of bug —
//   and is why there are no negative margins in the mobile layout either.
// - --stage remains the one knob for desktop scale.

const s = stageFraction(STAGE);

// Desktop: positioned on the stage, sized as a fraction of it.
// Anchors stay plain <a>; routes go through next/link.
//
// The Hero buttons used to be two same-page anchors. Music has since moved
// to its own route, so "#music" scrolled to nothing — a click with no
// response at all, which reads as a broken site rather than a broken link.
//
// Picking the element from the href means the next time a target moves,
// changing the href is the whole change. A hardcoded <a href="/music">
// would work too, but would force a full page reload instead of a
// client-side navigation.
function Control({ href, className, style, children }) {
  const isAnchor = href.startsWith("#");
  const Tag = isAnchor ? "a" : Link;

  return (
    <Tag href={href} className={className} style={style}>
      {children}
    </Tag>
  );
}

function StageButton({ href, label, centre }) {
  return (
    <Control
      href={href}
      className="font-display absolute z-20 flex -translate-x-1/2 items-center justify-center rounded-md border-2 border-earth bg-bone uppercase tracking-[0.1em] text-earth transition-colors hover:bg-earth hover:text-bone"
      style={{
        left: centre,
        bottom: "11.91%",
        width: s(0.1409),
        height: s(0.0366),
        fontSize: s(0.0176),
      }}
    >
      {label}
    </Control>
  );
}

// Mobile: a real control. Fixed 48px height rather than a fraction of
// anything — touch targets are an absolute ergonomic minimum, not a
// proportion of the artwork.
function TapButton({ href, label }) {
  return (
    <Control
      href={href}
      className="font-display flex h-12 flex-1 items-center justify-center rounded-md border-2 border-earth bg-bone text-sm uppercase tracking-[0.1em] text-earth"
    >
      {label}
    </Control>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="paper relative bg-bone px-4 md:px-12">
      {/* ---------------------------------------------------------------
          MOBILE — normal flow, no fixed aspect. The section is as tall as
          its contents, which is what lets the type stay readable.
          --------------------------------------------------------------- */}
      <div className="md:hidden">
        {/* Full column width, so the ring contents scale up with it.
            Passed as an absolute length, not 100%, because percentage
            font-sizes resolve against the parent's font-size rather than
            its width — calc() on a length is the only thing that works
            here. `calc(100vw - 32px)` is the section's px-4 gutters. */}
        <Medallion
          width="calc(100vw - 32px)"
          className="relative mx-auto mt-6"
          priority
        />

        {/* No warriors here, deliberately. On desktop they flank the
            medallion and read as a guard; at phone width they shrink to
            decoration, and they pushed the two CTAs down the screen for
            no gain. The badge is strong enough alone, and the tassels
            now lead the eye straight into the buttons. The figures still
            carry the motif on desktop and elsewhere on the site. */}
        <div className="flex gap-3 pb-10 pt-3">
          <TapButton href="#services" label="Services" />
          <TapButton href="/music" label="Music" />
        </div>
      </div>

      {/* ---------------------------------------------------------------
          DESKTOP — the proportional stage, unchanged.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, aspectRatio: "2732 / 1536" }}
      >
        {/* Left warrior */}
        <div
          className="absolute -translate-x-1/2"
          style={{ left: "12.72%", bottom: "19.34%", height: "62.63%" }}
        >
          <Image
            src={warriorLeft}
            alt=""
            priority
            className="h-full w-auto max-w-none object-contain"
            sizes="20vw"
          />
        </div>

        {/* Right warrior */}
        <div
          className="absolute translate-x-1/2"
          style={{ right: "12.72%", bottom: "19.34%", height: "62.63%" }}
        >
          <Image
            src={warriorRight}
            alt=""
            priority
            className="h-full w-auto max-w-none object-contain"
            sizes="20vw"
          />
        </div>

        {/* Medallion — now the uncropped asset, so the top of the badge is
            visible instead of running off the page frame. It overflows the
            bottom of the hero so the tassels run on into the section
            below; z-10 keeps it above that section's background, which
            would otherwise paint over it since it comes later in the DOM.

            `top` is the single knob for vertical position. It replaced
            `top-0`, which pinned the badge flush to the band. Note the
            uncrop already moved the ring down ~79px on its own, by adding
            51 asset-pixels above it — so this offset is deliberately
            small. Raise it toward s(0.02) for more, or set it to 0 and let
            the uncrop do all the work. */}
        <Medallion
          width={s(0.6018)}
          className="absolute z-10"
          style={{ left: "19.29%", top: s(0.005) }}
          priority
        />

        <StageButton href="#services" label="Services" centre="12.72%" />
        <StageButton href="/music" label="Music" centre="87.28%" />
      </div>
    </section>
  );
}
