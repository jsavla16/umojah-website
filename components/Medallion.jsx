import Image from "next/image";
// The uncropped original, not medallion-crop.png.
//
// The crop took 51px off the top (534x772 -> 534x721) to match the
// artboard, where the badge runs off the top of the page frame. Revealing
// it again makes the image 7% taller, and since it's anchored by its top
// edge, everything inside moves DOWN by that 51px — about 79px at the
// desktop size. That's most of the downward shift on its own.
//
// It also invalidates every vertical mark below, because they're
// percentages of the image's HEIGHT. Each was reconverted as
// (old% x 721 + 51) / 772. The horizontal marks and both font sizes are
// fractions of WIDTH, which didn't change, so they're untouched.
import medallion from "@/public/images/hero/medallion.png";
import stackLogo from "@/public/images/hero/stack-logo-trim.svg";

// The beaded medallion badge and the three things inside its ring.
//
// WHY THIS IS ITS OWN COMPONENT
// The ring contents used to be sized as fractions of --stage, which tied
// them to the desktop composition: the medallion is 60.18% of the stage,
// so the wordmark was really "4.75% of a thing that happens to be 60.18%
// of another thing". On a 390px phone that resolved to 5.7px type.
//
// Sizing them off the MEDALLION'S OWN WIDTH instead makes the badge
// self-contained — hand it any width and everything inside stays in
// proportion. Desktop passes 60.18% of the stage and looks identical to
// before; mobile passes the full viewport width and the same markup
// becomes legible without a single override.
//
// The fractions below are the mockup's stage-fractions divided by 0.6018,
// so they describe the same design, just measured against a different
// ruler:
//
//   UMOJAH        0.0475 / 0.6018 = 0.0789 of medallion width
//   SOUND SYSTEM  0.0193 / 0.6018 = 0.0321 of medallion width
//
// Vertical marks stay as percentages of the wrapper's own height, which
// were already self-relative and needed no change.
//
// NOTE: this component deliberately sets no `position`. The caller must
// supply one via className (`relative` in flow, `absolute` on the desktop
// stage) — the absolute children need a positioning context either way,
// and having both the component and the caller set it caused the class
// order to decide the layout, which is not a thing to leave to chance.

export default function Medallion({
  width,
  className = "",
  style,
  priority = false,
}) {
  // Every length inside the ring, as a fraction of the badge's width.
  const m = (fraction) => `calc(${width} * ${fraction})`;

  return (
    <div className={className} style={{ width, ...style }}>
      <Image
        src={medallion}
        alt="Umojah Sound System beaded medallion badge"
        priority={priority}
        className="h-auto w-full"
        sizes="(max-width: 767px) 100vw, 62vw"
      />

      {/* --- Contents of the ring's hollow -----------------------------
          The hollow is a circle: centre 49.8%/33.3% of the medallion
          image, radius 26.6% of its width. It is a tight fit — in the
          mockup UMOJAH spans almost the full inner diameter — so each
          element is positioned absolutely at its measured mark rather
          than flowing one after another. Flow was what pushed SOUND
          SYSTEM down onto the ring: it inherited UMOJAH's line box
          height plus a margin, landing ~30px below its true position.

          The group sits 2.26% (of medallion height) above the mockup's
          marks so it centres in the hollow. Measured at the mockup's own
          positions the block's midpoint lands ~34px low against a 1098px
          medallion, which reads as bottom-heavy. */}

      {/* Speaker stack — cap top 23.05% of medallion width */}
      <div
        className="absolute -translate-x-1/2"
        style={{ left: "50%", top: "20.43%", width: "25.43%" }}
      >
        <Image src={stackLogo} alt="" className="h-auto w-full" />
      </div>

      {/* UMOJAH — cap top 50.30% of medallion width. Sized a touch under
          the mockup so it clears the ring rather than grazing it (the
          mockup's own wordmark is within ~1px of touching). */}
      <h1
        className="font-display absolute inset-x-0 text-center uppercase leading-none tracking-[0.04em] text-earth"
        style={{ top: "38.58%", fontSize: m(0.0789) }}
      >
        Umojah
      </h1>

      {/* SOUND SYSTEM — cap top 57.91% of medallion width. Deep earth
          fill with a gold outline; paint-order keeps the stroke behind
          the fill so the letterforms stay full weight instead of being
          eaten into from both sides. */}
      <p
        className="font-heading absolute inset-x-0 text-center uppercase leading-none tracking-[0.16em] text-earth"
        style={{
          top: "44.25%",
          fontSize: m(0.0321),
          WebkitTextStrokeWidth: "0.055em",
          WebkitTextStrokeColor: "var(--color-gold)",
          paintOrder: "stroke fill",
        }}
      >
        Sound System
      </p>
    </div>
  );
}
