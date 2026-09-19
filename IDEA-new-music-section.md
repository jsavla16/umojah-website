# Idea: a "new music" section fed by the scraper

Captured 2026-09-04. Raw thought, not a spec — to be turned into a proper
prompt later. Nothing here is decided.

## The idea

The music scraper at `~/Desktop/Umojah/lionvibes_music_scraper` finds new
reggae/dub releases across record shops and already generates a page showing
them. Use that page as the prototype for a new section or route on this site.

## What already exists on the scraper side

Verified working as of 2026-09-04. Every run produces a dated folder containing
`index.html`, `new_releases.csv`, `images/` and `audio/`. Per release it has:

  source_site, product_url, title, artist, format, producer, label, condition,
  price, currency, stock_status, audio_preview_url, image_url,
  local_image_path, local_audio_path, scraped_at

Cover art is downloaded and named `Artist - Title (Label).jpg`; audio previews
are downloaded where the shop serves a file, under the *same* filename stem, so
pairing them needs no lookup. Sources are Lion Vibes and Dub Vendor. Every
request is robots.txt-checked.

So the content problem is solved. Anything built here is a presentation layer
over data that already arrives on a schedule.

## Correcting the framing

The original thought was "use the index.html as a prototype". Worth being
precise, because this site has no `index.html` — it is Next.js 16.3.4 with the
App Router, React 19, Tailwind 3.4, deployed on Vercel, written in JavaScript.

So the scraper's `index.html` is a **layout and content reference**, not markup
to port. Its card grid, field ordering and the way it handles missing data are
the useful parts. The actual build is a new route plus a component, styled with
the existing Tailwind config and reusing `Nav`, `Footer`, `ShukaBackground` and
`NavClearance` like every other page.

## Where it would live

There is already an `/music` route (`app/music/page.js`), rendering a `Music`
component. Two options:

  (a) a section inside `/music`
  (b) a new route, e.g. `/music/new-releases`

Worth reading the comment at the top of `app/music/page.js` before choosing.
Music was deliberately moved off the homepage to avoid a seven-section scroll on
mobile, and the note explicitly rejects having the same content at two URLs
because it splits ranking signals. Same reasoning applies here: pick one
canonical URL and commit to it. A new route would also need adding to
`app/sitemap.js`.

## How the data would get here

Options, cheapest first:

1. **Build-time JSON.** The scraper writes a JSON file and the images into
   `public/`, committed to this repo; the page reads it at build time. Static,
   fast, no runtime cost, works with the existing Vercel deploy. Downside: the
   site only updates when it is rebuilt.
2. **ISR / scheduled revalidation.** Same JSON, fetched from somewhere the site
   can reach, with `revalidate`. Keeps the page current without a manual deploy.
3. **API route.** There are already `app/api/contact` and `app/api/subscribe`
   routes, so the pattern exists — but this needs a data store the site can
   read, which the scraper does not currently expose.

Option 1 is almost certainly the right first move. The scraper runs on Jay's
Mac, so a run could write into this repo directly.

Note: the scraper is migrating from CSV to SQLite. That does not change any of
the above — the export for the site would be a JSON view either way.

## Staleness

A handoff folder is a snapshot; a public page is a claim about what is current.
Sold-out records and dead preview links read worse in public than in a working
folder. Needs a rule for how long a release stays visible, and what happens when
`stock_status` changes. The scraper stores `scraped_at` per row, so "as of" is
available and should probably be shown.

## Editorial framing — the real question

The handoff sheet is a work queue: it shows price, stock and a link to the shop.
A public page is a different act. Is Umojah recommending these records, showing
what it is playing, or reporting new arrivals?

That choice decides whether prices and shop links belong on the page at all, and
it changes the copy entirely. "New arrivals at these shops" is a listing. "What
we've been playing" is a recommendation, and carries more weight with an
audience that knows this music.

## The blocker

Rights. Republishing record shop product photography, label artwork and audio
previews in a folder the social media manager opens is one thing. Putting it on
Umojah's own public site, under Umojah's name, is a further and much more
visible step.

This is already logged as an open question blocking the scraper's social
editorial stage. It blocks this harder. It needs answering before anything ships
publicly, not before something is prototyped locally.

## Smallest useful first version

A single page listing recent arrivals — cover, artist, title, label, and a link
to the shop that sells it. No audio, no prices, framed as "what we've been
listening to". That sidesteps most of the rights question, needs no new
pipeline, and can be generated from data that already exists.

Build that, look at it, then decide whether it deserves more.

## Open questions for Jay

- Section inside `/music`, or its own route?
- Listing, or recommendation? This is the one that changes everything else.
- How current does it need to be — every scrape, weekly, or manual?
- Does the scraper write into this repo, or export somewhere the site fetches?
