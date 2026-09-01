# Umojah Sound System

The website for [Umojah Sound System](https://umojahsoundsystem.com) —
Kenya's first traditional reggae and dub sound system, hand-built in
Nairobi.

Built from Canva artboards by someone who isn't a professional developer,
working with an AI assistant. The interesting parts of this repo are the
problems, so they're documented below rather than hidden.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 3.4 |
| Hosting | Vercel |
| Email | Resend — enquiry form and mailing list, via plain `fetch`, no SDK |
| Inbound mail | ImprovMX forwarding |
| Analytics | Vercel Analytics (cookieless) |
| Fonts | Nextrue Extended, Nord, Inter — self-hosted |

```sh
npm install
npm run dev
```

Environment variables are documented in `.env.example`. Operational setup
— DNS, Resend, email forwarding, Search Console — is in `SETUP.md`.

---

## Architecture

### One sizing basis

The design arrived as Canva artboards: a 2732px-wide page divided into
bands of 1536px, a ratio of 0.5622. Rather than converting each measurement
to pixels, every length on the desktop site is a **fraction of a single
value**:

```js
// lib/stage.js
export const STAGE = `min(100vw, 2200px, calc(100vh / 0.5622))`;
```

Taking the smaller of the width-driven and height-driven sizes matters: at
1920px wide, a band sized off width alone is 1079px tall — taller than the
window — and the mockup runs content to within 4% of the band floor, so the
last row fell below the fold. Capping by height means the whole composition
scales down and centres instead.

Every position is then `s(0.1647)` rather than `225px`, so the proportions
hold at any window size and there is one knob for overall scale.

### Two layouts, not one scaled

Below 768px the proportional system is abandoned rather than shrunk. Each
section has a second layout in normal document flow with real type sizes
and 48px touch targets. Some elements are dropped entirely — see the mobile
note below for why.

### Recurring patterns

- **Artwork as CSS masks.** Bone-coloured PNGs used as `mask-image` and
  filled with a colour, so one asset serves several sections in different
  colours (`ShukaBackground`, the spear rules, the smoke clouds).
- **Cross-section bleeds.** The hero medallion's tassels hang into the
  section below; the speaker stack runs from About into The Crew. Handled
  with a three-layer z-index convention: artwork at `z-10`, section
  backgrounds unstyled, copy at `z-20`.
- **Inert links.** Destinations that don't exist yet render disabled rather
  than as dead links — `linkProps()` in `lib/links.js`, and the `ready`
  flag in the nav.

---

## Three things that went wrong

### The mobile mistake

Everything was built desktop-first. Because every length is a fraction of
`--stage`, and `--stage` is capped by viewport width, the whole composition
collapsed together on a phone: **body copy computed to 5.3px** and buttons
to 10.8px tall — a quarter of the minimum comfortable touch target.

Kenya's traffic is overwhelmingly mobile. The site was illegible to most of
the people it existed for while looking perfect on the machine it was built
on.

The fix wasn't scaling — it was rearranging. The Hero's two warriors flank
the medallion on desktop and read as a guard; at phone width they became
decoration and pushed the CTAs off screen, so on mobile they're gone
entirely.

> Mobile isn't the desktop layout scaled down. Elements that are
> load-bearing at 1920px can be noise at 360px.

### A honeypot that blocked everyone

The mailing list reported success for every submission and added nobody.
`200 OK` in the logs, "You're on the list" on screen, no error anywhere, an
empty audience.

The spam check tested whether a hidden field *existed* rather than whether
it had a *value*. The form always sends it — empty for a human — so every
real submission was classified as a bot and **never reached Resend at
all.**

It was caught by an absence rather than an error: the route logs
`Resend rejected the contact:` on failure, and a 200 with no such line
meant the code never got that far.

> A silent success is worse than a loud failure. It removes the one signal
> that would have told you.

### Width drives height

Widening an illustration from 0.36 to 0.472 of the stage made the paragraph
above it disappear. The asset is 883×777 and anchored to the panel floor,
so extra width becomes extra height and the top edge climbs — from y=381 to
y=201, above the paragraph starting at y=225.

Several components now carry an explicit height budget in a comment,
including the arithmetic, because the layout is absolutely positioned and
cannot express a collision on its own.

---

## SEO

- Metadata and Open Graph in `app/layout.js`, per-page overrides in each
  route. Note that Next **shallow-merges** metadata — a page defining its
  own `openGraph` replaces the parent's rather than merging, which silently
  dropped `og:type` sitewide until Facebook's debugger caught it. Hence
  `OG_DEFAULTS` in `lib/site.js`.
- JSON-LD in `components/StructuredData.jsx`: `MusicGroup` and
  `LocalBusiness`, plus `Event` for confirmed Nairobi Dub Club sessions.
  Unconfirmed dates get no markup at all — inaccurate event data can get
  rich results dropped wholesale.
- `lib/site.js` is the single source of truth, so meta tags and structured
  data can't drift apart.

---

## Copyright

© 2026 Umojah Records Limited (England & Wales, 17350381). All rights
reserved.

The source in this repository is published for reference. No permission is
granted to use, copy, modify, distribute, sublicense or create derivative
works from it without prior written permission.

Umojah Records™, Umojah Sound System™ and Nairobi Dub Club™ are trade marks
of Umojah Records Limited. The name, logos, artwork, photography and music
are protected by applicable copyright and trade mark law.
