"use client";

import { useState } from "react";
import { s } from "@/lib/stage";

// Umojah Records signup.
//
// Its own client component so Music.jsx can stay a server component — the
// only interactive thing in that whole section is this form, and marking
// the entire band "use client" to get it would ship the streaming links,
// the artwork and all the copy to the browser as JavaScript for no reason.
//
// Both breakpoints render from here rather than from two copies in
// Music.jsx, so there's one submit handler, one piece of state and one set
// of element ids. The `variant` prop only changes presentation.

// What people are agreeing to, said before they agree to it rather than
// in a policy page nobody opens. Three things, because those are the three
// a reasonable person wants to know: what you'll send, how often, and how
// to stop. Kenya's Data Protection Act 2019 applies here.
const CONSENT =
  "New music from Umojah Records and event news, roughly once a month. Unsubscribe any time.";

export default function SubscribeForm({ variant = "mobile" }) {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;

    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _hp: form._hp.value }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Something went wrong");

      setStatus("done");
      setMessage(
        data.alreadySubscribed
          ? "You're already on the list."
          : "You're on the list.",
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  // Hidden from people, offered to bots. Not `type="hidden"` — that's the
  // first thing a scraper skips; a visually hidden real field catches more.
  const honeypot = (
    <input
      type="text"
      name="_hp"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="pointer-events-none absolute h-0 w-0 opacity-0"
    />
  );

  const busy = status === "sending";

  if (variant === "desktop") {
    return (
      <form onSubmit={onSubmit} className="contents">
        {honeypot}
        <label htmlFor="records-email" className="sr-only">
          Email address
        </label>
        <input
          id="records-email"
          name="email"
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
        <button
          type="submit"
          disabled={busy}
          className="font-display absolute flex -translate-x-1/2 items-center justify-center whitespace-nowrap rounded-full border-2 border-earth bg-terracotta uppercase tracking-[0.1em] text-bone transition-colors hover:bg-deepred disabled:opacity-60"
          style={{
            left: s(0.7724),
            top: s(0.4898),
            width: s(0.1318),
            height: s(0.0381),
            fontSize: s(0.0105),
          }}
        >
          {busy ? "Sending…" : "Subscribe"}
        </button>

        {/* Consent line, and the status message in the same slot. Once
            someone has subscribed the terms have served their purpose, so
            the result replaces them rather than stacking underneath and
            shifting the layout. */}
        <p
          role="status"
          aria-live="polite"
          className="font-body absolute -translate-x-1/2 text-center text-earth/80"
          style={{
            left: s(0.7724),
            top: s(0.5322),
            width: s(0.24),
            fontSize: s(0.0092),
            lineHeight: 1.4,
          }}
        >
          {message || CONSENT}
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      {honeypot}
      <label htmlFor="records-email-mobile" className="sr-only">
        Email address
      </label>
      <input
        id="records-email-mobile"
        name="email"
        type="email"
        required
        placeholder="your@email.com"
        className="font-display h-12 w-full rounded-full border-2 border-earth bg-bone text-center text-xs uppercase tracking-[0.1em] text-earth placeholder:text-earth/60 focus:outline-none focus:ring-2 focus:ring-gold"
      />
      <button
        type="submit"
        disabled={busy}
        className="font-display mt-3 flex h-12 w-full items-center justify-center rounded-full border-2 border-earth bg-terracotta text-xs uppercase tracking-[0.1em] text-bone disabled:opacity-60"
      >
        {busy ? "Sending…" : "Subscribe"}
      </button>
      <p
        role="status"
        aria-live="polite"
        className="font-body mt-3 text-center text-[0.7rem] leading-relaxed text-earth/80"
      >
        {message || CONSENT}
      </p>
    </form>
  );
}
