"use client";

import { useEffect, useState } from "react";
import { STAGE, s } from "@/lib/stage";
import { SOCIAL, whatsappLink } from "@/lib/links";

// Home / 1.5 Contact — "Book Umojah".
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │ APPEARANCE IS NOT SIGNED OFF. Agreed with the client that the       │
// │ visual treatment of this section gets revisited later — the layout  │
// │ below is functional-first, not a design decision. Behaviour (the    │
// │ month dropdown, service preselect, form handler) is settled; the    │
// │ look is open.                                                       │
// │                                                                     │
// │ Also open: a WhatsApp route alongside the form, and whether the     │
// │ social strip becomes an embedded feed.                              │
// └─────────────────────────────────────────────────────────────────────┘
//
// This section is NOT in the Canva file; the brief lists it as the fifth
// Home band, so it's built in the established language rather than
// measured: same 0.5622 band, paper texture, the Merch section's rule
// treatment, and the pill/field styling from Music's newsletter form.
//
// Terracotta ground so it reads against the charcoal Merch band above it,
// and so the bone form fields carry.
//
// Each Services CTA links to its own anchor inside this section
// (#contact-hire etc.), which both scrolls here and preselects the matching
// service — so an enquiry arrives already labelled with what it's about.

const SERVICES = [
  { id: "hire", label: "Hire the Equipment" },
  { id: "build", label: "Build a Bespoke System" },
  { id: "experience", label: "Hire Umojah (Full Experience)" },
  { id: "general", label: "General Enquiry" },
];

const FIELD = { height: 0.0377, font: 0.0105, label: 0.0092 };

// The date field is an approximate-month dropdown rather than a free text
// box or a calendar: enquiries usually come in before a date is fixed, and
// a list that starts at the current month makes a past date impossible to
// pick by construction.
//
// Built on the client only. Generating it at module scope would bake the
// list in at BUILD time, so a site deployed in August would still be
// offering August months a year later. Rendering a placeholder until mount
// also avoids a hydration mismatch between the statically rendered HTML
// and the visitor's actual "today".
const MONTHS_AHEAD = 18;

function upcomingMonths() {
  const now = new Date();
  return Array.from({ length: MONTHS_AHEAD }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });
    return { value, label };
  });
}

const SOCIALS = [
  {
    id: "instagram",
    label: "Instagram",
    href: SOCIAL.instagram,
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: SOCIAL.facebook,
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z",
  },
  {
    id: "tiktok",
    label: "TikTok",
    path: "M16.6 5.82a4.28 4.28 0 01-1.03-2.72h-3.3v11.6a2.59 2.59 0 01-2.6 2.51 2.59 2.59 0 01-2.6-2.58 2.59 2.59 0 013.4-2.46V8.8a5.87 5.87 0 00-.8-.06A5.88 5.88 0 003.8 14.62a5.88 5.88 0 005.87 5.88 5.88 5.88 0 005.88-5.88V9.01a7.53 7.53 0 004.4 1.41V7.12a4.3 4.3 0 01-3.35-1.3z",
    href: SOCIAL.tiktok,
  },
  // .filter keeps this array honest: a platform with no URL yet simply
  // doesn't render, rather than becoming a dead icon.
].filter((item) => item.href);

function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="c-label font-body block font-bold uppercase tracking-[0.2em] text-bone"
    >
      {children}
    </label>
  );
}

const fieldClass =
  "c-field font-body w-full rounded-md border-2 border-earth bg-bone text-earth placeholder:text-earth/50 focus:outline-none focus:ring-2 focus:ring-gold";

export default function Contact() {
  const [service, setService] = useState("general");
  const [months, setMonths] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  // Preselect from the hash the Services CTA arrived on.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#contact-", "");
      if (SERVICES.some((option) => option.id === id)) setService(id);
    };
    fromHash();
    setMonths(upcomingMonths());
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    const payload = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Send failed");
      setStatus("sent");
      event.target.reset();
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    // The custom properties below hand the desktop measurements to CSS.
    // They can't be applied to the elements directly: inline styles beat
    // classes, so a --stage fraction set inline would win at every width
    // and mobile could never override it. Passing them down as properties
    // and consuming them inside a min-width media query inverts that —
    // see the CONTACT SECTION block in globals.css.
    <section
      id="contact"
      className="paper relative bg-terracotta px-5 py-10 md:p-0"
      style={{
        "--c-stage-w": STAGE,
        "--c-stage-h": s(0.5622),
        "--c-eyebrow": s(0.0132),
        "--c-title": s(0.029),
        "--c-blurb": s(0.0136),
        "--c-blurb-w": s(0.5),
        "--c-label": s(FIELD.label),
        "--c-label-mb": s(0.005),
        "--c-field-h": s(FIELD.height),
        "--c-field-f": s(FIELD.font),
        "--c-field-p": s(0.012),
        "--c-textarea-h": s(0.075),
        "--c-form-w": s(0.52),
        "--c-gap": s(0.018),
        "--c-actions-mt": s(0.022),
        "--c-actions-gap": s(0.016),
        "--c-submit-h": s(0.0406),
        "--c-submit-f": s(0.0105),
        "--c-submit-p": s(0.03),
        "--c-status-f": s(0.0105),
        "--c-social-gap": s(0.018),
        "--c-social-f": s(0.0092),
        "--c-social-icon": s(0.0165),
      }}
    >
      {/* Anchor targets for the three Services CTAs */}
      {SERVICES.map(({ id }) => (
        <span key={id} id={`contact-${id}`} className="block" />
      ))}

      <div className="c-stage relative mx-auto">
        <p
          className="c-eyebrow font-body text-center font-bold uppercase tracking-[0.3em] text-bone md:absolute md:inset-x-0"
          style={{ top: s(0.0247) }}
        >
          Get in Touch
        </p>

        {[
          { left: 0.0564, width: 0.2728, flip: false },
          { left: 0.6589, width: 0.283, flip: true },
        ].map(({ left, width, flip }) => (
          <div
            key={left}
            aria-hidden="true"
            className="absolute hidden -translate-y-1/2 md:block"
            style={{
              left: s(left),
              top: s(0.0564),
              width: s(width),
              height: s(0.0098),
              backgroundColor: "var(--color-bone)",
              WebkitMaskImage: `url(/images/merch/arrow-${flip ? "right" : "left"}-trim.png)`,
              maskImage: `url(/images/merch/arrow-${flip ? "right" : "left"}-trim.png)`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          />
        ))}

        <h2
          className="c-title font-display whitespace-nowrap text-center uppercase leading-none tracking-[0.04em] text-sand md:absolute md:inset-x-0"
          style={{
            top: s(0.0415),
            WebkitTextStrokeWidth: "0.035em",
            WebkitTextStrokeColor: "var(--color-earth)",
            paintOrder: "stroke fill",
          }}
        >
          Book Umojah
        </h2>

        <p
          className="c-blurb font-body text-center text-bone md:absolute md:left-1/2 md:-translate-x-1/2"
          style={{ top: s(0.088) }}
        >
          Festivals &middot; Club nights &middot; Residencies &middot; Custom
          builds &middot; Private events &mdash; across East Africa and beyond.
        </p>

        <form
          onSubmit={onSubmit}
          className="c-form md:absolute md:left-1/2 md:-translate-x-1/2"
          style={{ top: s(0.128) }}
        >
          {/* Honeypot. Invisible to people, visible to bots — they fill
              every field they find, so anything arriving with this set is
              automated and gets binned quietly by the route.

              Not `type="hidden"`: that's the first thing a scraper skips.
              A real text input, hidden with CSS, catches more.

              tabIndex={-1} keeps it out of keyboard navigation and
              autoComplete="off" stops browsers helpfully filling it in —
              either would otherwise turn a real visitor into a "bot".

              The route tests this field's VALUE, not its presence. It sends
              empty for every human, and reading that as a bot signal is
              what silently broke the subscribe form on 7 Aug. */}
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />

          <div className="c-grid grid grid-cols-1 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className={fieldClass}
              />
            </div>

            <div>
              <Label htmlFor="service">Service</Label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={fieldClass}
              >
                {SERVICES.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="date">Approximate date</Label>
              <select
                id="date"
                name="date"
                defaultValue=""
                disabled={months.length === 0}
                className={fieldClass}
              >
                <option value="">Not sure yet</option>
                {months.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="c-mt">
            <Label htmlFor="venue">Location / Venue</Label>
            <input
              id="venue"
              name="venue"
              placeholder="City and venue"
              className={fieldClass}
            />
          </div>

          <div className="c-mt">
            <Label htmlFor="message">Tell us more</Label>
            <textarea
              id="message"
              name="message"
              placeholder="Expected attendance, brief, budget range…"
              className={`${fieldClass} c-textarea resize-none`}
            />
          </div>

          <div
            className="c-actions flex flex-col items-center justify-center md:flex-row"
          >
            <button
              type="submit"
              disabled={status === "sending"}
              className="c-submit font-display flex items-center justify-center whitespace-nowrap rounded-full border-2 border-earth bg-earth uppercase tracking-[0.1em] text-bone transition-colors hover:bg-black disabled:opacity-60"
            >
              {status === "sending" ? "Sending…" : "Send Enquiry"}
            </button>

            {/* Direct chat, not the community group.
                Given equal billing rather than treated as a footnote: this
                is a negotiating market, people want a person before a
                price, and a form that promises a reply later serves a
                different temperament from a conversation that starts now.

                The message is prefilled so enquiries arrive pre-labelled —
                the same number handles hire, builds and everything else,
                and knowing which before you open the thread is worth the
                few extra characters in the URL. */}
            {whatsappLink() && (
              <a
                href={whatsappLink(
                  "Hi Umojah — I'd like to talk about an enquiry from your website.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="c-submit font-display flex items-center justify-center whitespace-nowrap rounded-full border-2 border-earth bg-bone uppercase tracking-[0.1em] text-earth transition-colors hover:bg-sand"
              >
                Chat on WhatsApp
              </a>
            )}

            <p
              role="status"
              aria-live="polite"
              className="c-status font-body text-bone"
            >
              {status === "sent" && "Thanks — we'll be in touch."}
              {status === "error" && `Couldn't send: ${error}`}
            </p>
          </div>
        </form>

        {/* Social strip.
            Until now Instagram and Facebook sat unused in lib/links, so the
            site gave visitors no route to the channels Umojah is actually
            active on. Deliberately minimal for this pass — a fuller
            treatment (embedded feeds and so on) is a later decision. */}
        {SOCIALS.length > 0 && (
          <div
            className="c-social flex items-center justify-center md:absolute md:inset-x-0"
            style={{ bottom: s(0.026) }}
          >
            <span
              className="c-social-label font-body font-bold uppercase tracking-[0.3em] text-bone/70"
            >
              Follow
            </span>
            {SOCIALS.map(({ id, label, href, path }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="text-bone transition-opacity hover:opacity-70"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="c-social-icon"
                >
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
