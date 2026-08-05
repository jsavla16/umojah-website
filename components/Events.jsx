import Image from "next/image";
import { STAGE, s } from "@/lib/stage";
import { upcomingEvents, nextEvent, TICKETS_URL, VENUE } from "@/lib/events";
import { CONTACT } from "@/lib/links";

// Home / 1.2 Nairobi Dub Club.
//
// Measured off band 2 of Home page v2.png (1366x768):
//
//   left margin      x 78            (0.0571)
//   eyebrow          y 50            (0.0366), ~15px
//   headline         y 85            (0.0622), ~36px
//   paragraph        y 125           (0.0915), ~17px, width 0.887
//   tickets button   x 78, y 188     (0.1376), 247x46
//   poster row       y 248           (0.1815), first poster x 100 (0.0732)
//   posters          273 wide (0.1999), gap 20 (0.0146), 4 across
//
// The posters are 2160x3840 (aspect 1.778) and the artboard draws them at
// 273x480 (1.758), so they're shown whole rather than cropped.
//
// The Hero medallion's tassels bleed down into the top of this band. That
// works because the medallion carries z-10 inside Hero, and Hero creates
// no stacking context of its own, so it paints above this section's
// background even though this section comes later in the DOM.

const POSTER = { width: 0.1999, gap: 0.0146 };

function Eyebrow({ className = "", style }) {
  return (
    <p
      className={`font-body font-bold uppercase tracking-[0.3em] text-bone ${className}`}
      style={style}
    >
      The Home of Roots, Reggae, Dub
    </p>
  );
}

function Headline({ className = "", style }) {
  return (
    <h2
      className={`font-display uppercase leading-none tracking-[0.04em] text-sand ${className}`}
      style={{
        WebkitTextStrokeWidth: "0.035em",
        WebkitTextStrokeColor: "var(--color-earth)",
        paintOrder: "stroke fill",
        ...style,
      }}
    >
      Nairobi Dub Club
    </h2>
  );
}

const BLURB =
  "Nairobi Dub Club is a renowned destination for roots reggae and dub, featuring Umojah's very own selectors and a host of international artists. Check out upcoming events and tickets.";

// Alt text carries the session number and, where it's known, the date —
// the poster artwork itself is the only place that information appears
// visually, and baked-in text is invisible to search and screen readers.
function posterAlt(event) {
  const when = event.displayDate ?? "date to be confirmed";
  return `Nairobi Dub Club session ${event.session} at ${VENUE.name}, ${VENUE.locality} — ${when}`;
}

export default function Events() {
  const events = upcomingEvents();
  const next = nextEvent();

  // Self-collapsing: nothing upcoming, nothing rendered. Better an absent
  // section than one advertising a gig that has already happened.
  if (events.length === 0) return null;

  return (
    <section id="events" className="paper relative bg-charcoal">
      {/* ---------------------------------------------------------------
          MOBILE — the next session only, in normal flow.
          --------------------------------------------------------------- */}
      <div className="px-5 pb-10 pt-8 md:hidden">
        <Eyebrow className="text-[0.65rem]" />
        <Headline className="mt-1 text-3xl" />
        <p className="font-body mt-3 text-[0.95rem] leading-relaxed text-bone">
          {BLURB}
        </p>

        {next && (
          <Image
            src={next.poster}
            alt={posterAlt(next)}
            className="mt-6 h-auto w-full"
            sizes="100vw"
          />
        )}

        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display mt-6 flex h-12 w-full items-center justify-center rounded-full bg-bone text-sm uppercase tracking-[0.1em] text-earth"
        >
          Tickets
        </a>

        {/* Community, not enquiries — this is the group link, and the only
            WhatsApp route on this page. The direct chat lives on the
            enquiry form and the Services panels; the two must never appear
            together, or the visitor has to work out which WhatsApp they
            want. Outline rather than solid so Tickets stays the primary
            action. */}
        {CONTACT.community && (
          <a
            href={CONTACT.community}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display mt-3 flex h-12 w-full items-center justify-center rounded-full border-2 border-bone text-sm uppercase tracking-[0.1em] text-bone"
          >
            Join the Community
          </a>
        )}
      </div>

      {/* ---------------------------------------------------------------
          DESKTOP — the proportional stage, all four posters.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {/* Header rhythm is borrowed wholesale from Services rather than
            measured independently — they're the same construction (eyebrow
            over outlined display headline over rule) and the two bands sit
            close enough on the page that any difference reads as a mistake.
            Services: eyebrow 0.031, headline 0.0518, gap 0.0208. Matched
            here from this band's own eyebrow mark of 0.0366. The eyebrow
            also takes Services' 0.0135 size — 0.011 was visibly smaller. */}
        {/* EVERY TEXT ELEMENT CARRIES z-20.
            The Hero medallion's tassels hang into this band at z-10, and
            they were being drawn over the paragraph. Lifting the whole
            text column above them fixes it outright — no translucent
            backing plate needed, which is the better answer: a bubble
            would have been a patch over a stacking-order problem, and it
            would have sat awkwardly on a section whose whole design is
            flat colour. */}
        <Eyebrow
          className="absolute z-20"
          style={{ left: s(0.0571), top: s(0.0366), fontSize: s(0.0135) }}
        />

        <Headline
          className="absolute z-20 whitespace-nowrap"
          style={{
            left: s(0.0571),
            top: s(0.0574),
            fontSize: s(0.0264),
          }}
        />

        {/* The spear, directly under the headline and left-aligned with it
            — the same relationship Services has between "Feel the
            Vibrations" and its rule. Same asset and mask technique too:
            the artwork is bone, so it's used as a mask and filled, letting
            one file serve both sections in different colours.

            Everything below it shifted down to make room. The old marks
            put the paragraph 8px under the spear, which read as collision
            rather than spacing. */}
        <div
          aria-hidden="true"
          className="absolute z-20"
          style={{
            // Flush with the headline's left edge, so the spear starts
            // directly under the N of "Nairobi". Services offsets its rule
            // slightly left of its headline; that's its own composition,
            // not a rule to copy.
            left: s(0.0571),
            top: s(0.0862),
            width: s(0.3038),
            height: s(0.0107),
            backgroundColor: "var(--color-bone)",
            WebkitMaskImage: "url(/images/services/arrow-left-trim.png)",
            maskImage: "url(/images/services/arrow-left-trim.png)",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        />

        <p
          className="font-body absolute z-20 leading-[1.45] text-bone"
          style={{
            left: s(0.0571),
            top: s(0.1),
            width: s(0.887),
            fontSize: s(0.0125),
          }}
        >
          {BLURB}
        </p>

        <a
          href={TICKETS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display absolute z-20 flex items-center justify-center rounded-full bg-bone uppercase tracking-[0.1em] text-earth transition-colors hover:bg-sand"
          style={{
            left: s(0.0571),
            top: s(0.145),
            width: s(0.1808),
            height: s(0.0337),
            fontSize: s(0.011),
          }}
        >
          Tickets
        </a>

        {/* Community CTA, sitting to the right of Tickets.
            Tickets runs 0.0571 to 0.2379 (left + width); this starts at
            0.25, leaving a 0.0121 gap. Wider than Tickets because the
            label is three words rather than one. Outline rather than solid
            keeps Tickets as the primary action. */}
        {CONTACT.community && (
          <a
            href={CONTACT.community}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display absolute z-20 flex items-center justify-center whitespace-nowrap rounded-full border-2 border-bone uppercase tracking-[0.1em] text-bone transition-colors hover:bg-bone hover:text-earth"
            style={{
              left: s(0.25),
              top: s(0.145),
              width: s(0.24),
              height: s(0.0337),
              fontSize: s(0.011),
            }}
          >
            Join the Community
          </a>
        )}

        {/* Poster row. Positioned individually rather than with a flex row
            so each poster keeps its measured x — with four fixed-width
            items and a fixed gap there's nothing for flex to distribute,
            and absolute placement matches how the rest of the band is
            built. */}
        {events.map((event, index) => (
          <a
            key={event.id}
            href={TICKETS_URL}
            target="_blank"
            rel="noopener noreferrer"
            // z-20 puts the posters above the Hero medallion's tassels,
            // which hang down into this band at z-10. The tassels should
            // read as a background layer bleeding behind the section, not
            // as something draped over the artwork. Same fix Music uses
            // for its own content column.
            className="absolute z-20 block transition-transform hover:-translate-y-1"
            style={{
              left: s(0.0732 + index * (POSTER.width + POSTER.gap)),
              top: s(0.1815),
              width: s(POSTER.width),
            }}
          >
            <Image
              src={event.poster}
              alt={posterAlt(event)}
              className="h-auto w-full"
              sizes="20vw"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
