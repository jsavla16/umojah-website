import Image from "next/image";
import warriorLeft from "@/public/images/hero/warrior-left-trim.png";
import warriorRight from "@/public/images/hero/warrior-right-trim.png";
import medallion from "@/public/images/hero/medallion-crop.png";
import stackLogo from "@/public/images/hero/stack-logo-trim.svg";
import { HERO_STAGE as STAGE, stageFraction } from "@/lib/stage";

// Home / 1.1 Hero.
//
// Rebuilt as a proportional "stage" rather than a flex row. Every value
// below was measured directly off the Canva mockup
// (Umojah_Website_Design_Final_Canva/Home page.png, 2732px wide, hero band
// ending at y=1536) and expressed as a fraction of that artboard, so the
// whole composition scales as one and matches the design at any width:
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
//   inside the ring     stack logo 25.43% of medallion width at 23.05%
//                       down; UMOJAH cap-top at 50.30%; SOUND SYSTEM at
//                       57.91% (all as fractions of medallion width)
//
// Sizing notes:
// - The top crop is baked into medallion-crop.png (6.56% off the top,
//   matching the mockup) instead of being done with CSS overflow. Earlier
//   attempts to crop in CSS kept clipping the tassels too, because a
//   negative margin also changes what height flexbox thinks the item
//   needs. Cropping the asset removes that whole class of bug.
// - --stage is the one knob for overall scale; every length derives from
//   it, so nothing can drift out of proportion.


const s = stageFraction(STAGE);

function AnchorButton({ href, label, centre }) {
  return (
    <a
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
    </a>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="paper relative bg-bone px-12">
      {/* Proportional stage — matches the mockup's hero artboard ratio. */}
      <div
        className="relative mx-auto"
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

        {/* Medallion — top already cropped in the asset; overflows the
            bottom of the hero so the tassels run into the Music section.
            z-10 keeps it above Music's terracotta background, which would
            otherwise paint over it since Music comes later in the DOM. */}
        <div
          className="absolute top-0 z-10"
          style={{ left: "19.29%", width: "60.18%" }}
        >
          <Image
            src={medallion}
            alt="Umojah Sound System beaded medallion badge"
            priority
            className="h-auto w-full"
            sizes="62vw"
          />

          {/* --- Contents of the ring's hollow ---------------------------
              The hollow is a circle: centre 49.8%/28.6% of the medallion
              image, radius 26.6% of its width. It is a tight fit — in the
              mockup UMOJAH spans almost the full inner diameter — so each
              element is positioned absolutely at its measured mark rather
              than flowing one after another. Flow was what pushed SOUND
              SYSTEM down onto the ring: it inherited UMOJAH's line box
              height plus a margin, landing ~30px below its true position.

              Percentages are of the medallion wrapper's HEIGHT, converted
              from the mockup's width-fractions by dividing by the image's
              1.3502 aspect. Cap-top marks are nudged up slightly to allow
              for the leading above the caps in the line box. */}

          {/* The whole group is lifted 2.26% (of medallion height) above the
              mockup's marks so it sits on the hollow's true centre. Measured
              at the mockup's own positions the block's midpoint lands ~34px
              low against a 1098px medallion, which reads as bottom-heavy. */}

          {/* Speaker stack mark — cap top 23.05% of medallion width */}
          <div
            className="absolute -translate-x-1/2"
            style={{ left: "50%", top: "14.80%", width: "25.43%" }}
          >
            <Image src={stackLogo} alt="" className="h-auto w-full" />
          </div>

          {/* UMOJAH — cap top 50.30% of medallion width. Sized a touch
              under the mockup so it clears the ring rather than grazing
              it (the mockup's own wordmark is within ~1px of touching). */}
          <h1
            className="font-display absolute inset-x-0 text-center uppercase leading-none tracking-[0.04em] text-earth"
            style={{ top: "34.24%", fontSize: s(0.0475) }}
          >
            Umojah
          </h1>

          {/* SOUND SYSTEM — cap top 57.91% of medallion width.
              Deep earth fill with an earth gold outline; paint-order keeps
              the stroke behind the fill so the letterforms stay full
              weight instead of being eaten into from both sides. */}
          <p
            className="font-heading absolute inset-x-0 text-center uppercase leading-none tracking-[0.16em] text-earth"
            style={{
              top: "40.31%",
              fontSize: s(0.0193),
              WebkitTextStrokeWidth: "0.055em",
              WebkitTextStrokeColor: "var(--color-gold)",
              paintOrder: "stroke fill",
            }}
          >
            Sound System
          </p>
        </div>

        <AnchorButton href="#services" label="Services" centre="12.72%" />
        <AnchorButton href="#music" label="Music" centre="87.28%" />
      </div>
    </section>
  );
}
