import Image from "next/image";
import speakerStack from "@/public/images/about/speaker-stack-trim.png";
import { STAGE, s } from "@/lib/stage";
import { ABOUT_MOBILE } from "@/lib/aboutMobile";

// About / 2.1 The Sound System.
//
// Measured off the Canva mockup (About us page.png, 2732px wide, this band
// y 0-1536). Charcoal ground, copy column on the left, and the full
// speaker stack on the right running off the top of the page and down
// past the section boundary into The Crew.
//
// The stack is z-10 so it sits above the *next* section's terracotta but
// below its copy, which is at z-20 — the same three-layer arrangement the
// hero medallion uses where it hangs into Music.


// MOBILE TUNING LIVES IN lib/aboutMobile.js — the stack's width, raise,
// shiftRight and bleed are all set there.
const MOBILE_STACK = ABOUT_MOBILE.stack;

const PARAGRAPHS = [
  "The first stack was completed in early 2016 after years of planning, sourcing and hand-building every speaker box.",
  "The system today is a purpose-built instrument — each cabinet tuned, loaded and positioned to create a specific physical experience. Sub-bass you feel through your body - mids that kick and carry across crisp vocals and - tops that cut through without harshness.",
  "Every cabinet was constructed, loaded and tuned in Kenya.",
];

export default function SoundSystem() {
  return (
    <section id="sound-system" className="paper relative bg-charcoal">
      {/* ---------------------------------------------------------------
          MOBILE — copy above, stack below.
          The desktop band sets the copy in a narrow left column beside the
          stack. At 414px there's no room to sit anything beside anything,
          so the artboard stacks them: full-width copy, then the speaker
          stack running off the bottom into The Crew — the same bleed the
          desktop has, just downward instead of diagonal.
          --------------------------------------------------------------- */}
      <div className="px-5 pb-0 pt-8 md:hidden">
        <h2 className="font-heading text-xl uppercase leading-none tracking-[0.02em] text-bone">
          The Sound System
        </h2>

        {/* Bone artwork, so it needs no recolouring — same asset as
            desktop, just sized to the column. */}
        <Image
          src="/images/about/arrow-left-trim.png"
          alt=""
          aria-hidden="true"
          width={792}
          height={28}
          className="mt-2 h-auto w-2/3 max-w-none"
        />

        <div className="mt-4 space-y-4">
          {PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-body text-[0.95rem] leading-relaxed text-bone"
            >
              {paragraph}
            </p>
          ))}
          <p className="font-body text-[0.95rem] leading-relaxed text-bone">
            #MadeinKenya
          </p>
        </div>

        {/* Placement comes entirely from MOBILE_STACK at the top of this
            file — adjust it there, not here. */}
        <Image
          src={speakerStack}
          alt="The full Umojah speaker stack"
          priority
          className="relative z-10 ml-auto h-auto"
          style={{
            width: MOBILE_STACK.width,
            marginTop: MOBILE_STACK.raise,
            marginBottom: MOBILE_STACK.bleed,
            transform: `translateX(${MOBILE_STACK.shiftRight})`,
          }}
          sizes="86vw"
        />
      </div>

      {/* ---------------------------------------------------------------
          DESKTOP — the proportional stage.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {/* Speaker stack — cropped by the page top, bleeding into Crew */}
        <Image
          src={speakerStack}
          alt="The full Umojah speaker stack"
          priority
          className="absolute z-10 h-auto max-w-none"
          style={{ left: s(0.3843), top: s(-0.0175), width: s(0.6153) }}
          sizes="67vw"
        />

        <div className="absolute z-20" style={{ left: s(0.0794), top: s(0.0348) }}>
          <h2
            className="font-heading uppercase leading-none tracking-[0.02em] text-bone"
            style={{ fontSize: s(0.0249) }}
          >
            The Sound System
          </h2>
        </div>

        {/* Rule — the artwork is bone already, so it needs no recolouring */}
        <Image
          src="/images/about/arrow-left-trim.png"
          alt=""
          aria-hidden="true"
          width={792}
          height={28}
          className="absolute z-20 h-auto max-w-none"
          style={{ left: s(0.0798), top: s(0.0659), width: s(0.2888) }}
        />

        <div
          className="absolute z-20"
          style={{ left: s(0.0802), top: s(0.0947), width: s(0.29) }}
        >
          {PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph.slice(0, 24)}
              className="font-body font-normal text-bone"
              style={{
                fontSize: s(0.0136),
                lineHeight: 1.5,
                marginBottom: s(0.022),
              }}
            >
              {paragraph}
            </p>
          ))}
          <p
            className="font-body font-normal text-bone"
            style={{ fontSize: s(0.0136), marginTop: s(0.012) }}
          >
            #MadeinKenya
          </p>
        </div>
      </div>
    </section>
  );
}
