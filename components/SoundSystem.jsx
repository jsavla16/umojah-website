import Image from "next/image";
import speakerStack from "@/public/images/about/speaker-stack-trim.png";
import { STAGE, s } from "@/lib/stage";

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


const PARAGRAPHS = [
  "The first stack was completed in early 2016 after years of planning, sourcing and hand-building every speaker box.",
  "The system today is a purpose-built instrument — each cabinet tuned, loaded and positioned to create a specific physical experience. Sub-bass you feel through your body - mids that kick and carry across crisp vocals and - tops that cut through without harshness.",
  "Every cabinet was constructed, loaded and tuned in Kenya.",
];

export default function SoundSystem() {
  return (
    <section id="sound-system" className="paper relative bg-charcoal">
      <div
        className="relative mx-auto"
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
