# Umojah Sound System — setup notes

Operational steps that live outside the codebase. Keep this updated as
things get configured.

---

## Contact form — Resend + environment variables

The form at `#contact` posts to `app/api/contact/route.js`, which sends
through [Resend](https://resend.com)'s REST API. No SDK — it's one `fetch`
call, so the project carries no extra dependency for it.

### Status

| | |
|---|---|
| Recipients | `umojahsoundsystem@gmail.com`, `j.a.savla@gmail.com` |
| `.env.local` | created and populated |
| Domain verified on Resend | **yes** — 2 Aug, DKIM + SPF + MX + DMARC all green |
| `CONTACT_FROM` | `bookings@umojahsoundsystem.com` |
| Vercel env vars | **not set yet** |
| Tested end to end | **yes** — locally, 2 Aug |

If any of the three variables is missing, the form returns *"The form
isn't configured yet — please email us directly."* rather than failing
silently.

**Still open:** the API key currently lives in `.env.local`. Moving it to
a shell variable (`export RESEND_API_KEY=...` in `~/.zshrc`) keeps it out
of the project folder entirely — agreed for a later pass.

### The three variables

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from <https://resend.com/api-keys> |
| `CONTACT_TO` | `"umojahsoundsystem@gmail.com, j.a.savla@gmail.com"` — comma-separated, each is a direct recipient and they don't see each other |
| `CONTACT_FROM` | display name + address, e.g. `"Umojah Website <bookings@umojahsoundsystem.com>"` |

### 1. Local (`.env.local`)

Already created and git-ignored (`.gitignore` line `.env*.local`). Paste
the API key into the blank `RESEND_API_KEY=`, then restart the dev server
— Next.js only reads `.env.local` at boot.

### 2. Resend account and sender

Done. `CONTACT_FROM` is `bookings@umojahsoundsystem.com` — the mailbox
doesn't need to exist, since `reply_to` is set to whoever filled in the
form.

### 3. Verify the domain — DONE

Completed 2 Aug. Nameservers are Vercel's, so Resend's **Auto configure**
wrote the records straight into Vercel DNS. Records now live:

| Name | Type | Purpose |
|---|---|---|
| `resend._domainkey` | TXT | DKIM |
| `send` | TXT | SPF |
| `send` | MX | bounce/complaint feedback (priority 10) |
| `_dmarc` | TXT | DMARC, `p=none` (reporting only) |

Verification took ~28 minutes from records being written to Resend showing
Verified — mostly DNS propagation. "Pending" during that window is normal.

If the domain is ever moved off Vercel's nameservers, these records must
move with it or the form stops sending.

### 4. Vercel

Project → **Settings → Environment Variables** → add all three, ticked for
**Production, Preview and Development** (Preview matters, or branch
deploys can't send).

Then **redeploy** — Vercel only picks up environment changes on a new
build. An existing deployment will not see them.

### 5. Test

Submit a real enquiry and confirm:

- it arrives at both addresses (post-verification)
- the subject reads e.g. `Hire the Equipment — Jane Doe`
- hitting reply goes to the enquirer, not to yourself (`reply_to` is set
  to whatever they typed)

---

## SEO

### Where things live

| File | Holds |
|---|---|
| `lib/site.js` | name, URL, descriptions, social profiles — one source of truth so meta tags and JSON-LD can't drift apart |
| `lib/equipment.js` | hire inventory and the searches each category targets |
| `components/StructuredData.jsx` | `MusicGroup` + `LocalBusiness` JSON-LD |
| `app/robots.js`, `app/sitemap.js` | generated at build. **Add a sitemap entry whenever a route is added** — nothing discovers pages automatically |
| `app/opengraph-image.png` | link preview, picked up by file convention |

### Google Search Console — verification IN PROGRESS

Started 3 Aug. The `google-site-verification` TXT record has been added to
Vercel DNS; Google reported it couldn't see the record yet and asked to
retry after a few hours. **Retry the Verify button** — nothing else to do,
and no need to re-add the record.

Once verified:

- Submit the sitemap: Search Console → Sitemaps → `sitemap.xml`
- Leave it a few weeks before expecting data in the Performance report

### Keyword research

**Findings so far live in `SEO-RESEARCH.txt`** — competitors, the terms
worth targeting, and how to run autocomplete research yourself. Read that
first; the notes below are the method behind it.


1. **Search Console is the best source** once it has data, because it shows what you *actually* rank for rather than an estimate. It only reports from the point of verification, so the sooner it's live the better.
2. **Google Keyword Planner** (free with an Ads account) for volumes. Set location to Kenya. Expect wide ranges unless you're spending.
3. **Autocomplete and "People also ask"** — free, and often better than tools for local markets. Type "sound system hire nai…" and read what Google suggests. Those are real queries.
4. **Check competitors.** Search your target terms, see who ranks in Nairobi, look at their page titles and headings.

Caveat: Kenya-specific volumes are small enough that tools often report "insufficient data". That means the tool can't measure it, not that demand is absent. For local markets, autocomplete and competitor pages beat volume estimates.

### The biggest open opportunity: a `/hire` page

The equipment list in `lib/equipment.js` targets commercial searches the site currently can't answer — "generator hire Nairobi", "mixing desk hire", "turntable hire". A dedicated page listing what's available, with real specifics (models, quantities, day rates), is probably the highest-value page that could be added.

Specifics matter: "Funktion One" and "Pioneer CDJ" get searched by name; "DJ equipment" much less so.

### Deliberately not done

- **`keywords` meta tag stuffing.** Google has ignored it for years. Keywords earn their keep in headings, body copy and structured data.
- **Anything that dilutes the two service lines.** "Hire" and "custom build" are different searches with different buyers; merging them into one message would cost the higher-value one.

## Still to do

- **WhatsApp** — agreed for a later pass. Number confirmed:
  `+254 718 173 343`, stored in `lib/links.js` as `CONTACT.whatsapp` in the
  format `wa.me` expects. Intended as a link beside the enquiry form with
  the service pre-filled in the message.
- **Contact section appearance** — functional-first, not signed off.
  Behaviour (month dropdown, service preselect, handler) is settled; the
  look is open.
- **Mobile sizing** — desktop first by agreement. The proportional
  `--stage` sizing makes form fields smaller than a comfortable touch
  target on phones.
- **Spotify / Apple Music** — both render inert until LANDR distributes a
  release and the Spotify for Artists profile is claimed. Add the URLs to
  `STREAMING` in `lib/links.js`.
- **Per-product merch links** — all four cards currently fall back to the
  shop. Fill `MERCH.products` in `lib/links.js` to point each at its own
  product page.
