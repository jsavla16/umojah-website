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
| `.env.local` | holds `CONTACT_TO` and `CONTACT_FROM` only |
| `RESEND_API_KEY` | shell variable in `~/.zshrc` — **not** in the project folder |
| Domain verified on Resend | **yes** — 2 Aug, DKIM + SPF + MX + DMARC all green |
| `CONTACT_FROM` | `bookings@umojahsoundsystem.com` |
| Vercel env vars | **set** — 2 Aug |
| Tested end to end | **yes** — locally and in production, 2 Aug |

If any of the three variables is missing, the form returns *"The form
isn't configured yet — please email us directly."* rather than failing
silently.

### The three variables

| Variable | Where it lives | Value |
|---|---|---|
| `RESEND_API_KEY` | `~/.zshrc` locally, Vercel in production | from <https://resend.com/api-keys> |
| `CONTACT_TO` | `.env.local` + Vercel | `"umojahsoundsystem@gmail.com, j.a.savla@gmail.com"` — comma-separated, each is a direct recipient and they don't see each other |
| `CONTACT_FROM` | `.env.local` + Vercel | display name + address, e.g. `"Umojah Website <bookings@umojahsoundsystem.com>"` |

### 1. Local

`.env.local` is git-ignored (`.gitignore` line `.env*.local`) and holds
the two non-secret variables. Restart the dev server after changing it —
Next.js only reads it at boot.

**The API key is deliberately not in the project folder.** It's a shell
variable instead:

```sh
echo 'export RESEND_API_KEY="re_..."' >> ~/.zshrc
source ~/.zshrc
```

`process.env.RESEND_API_KEY` picks it up identically, so no code changed.
Real shell variables also take precedence over `.env` files, so there's no
ambiguity if a stray copy ever reappears.

The reasoning: anything inside the project folder is read by editors,
backup and sync tools, screen shares and AI assistants. A secret that
never enters the folder can't leak from it. Production is unaffected —
Vercel injects its own copy.

**Gotcha:** apps launched from the Dock or Spotlight don't always source
`~/.zshrc`. If the form suddenly reports "not configured" locally, start
the dev server from a normal Terminal window and check with
`echo $RESEND_API_KEY`.

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

### 4. Vercel — DONE

Project → **Settings → Environment Variables**, all three set for
**Production, Preview and Development** (Preview matters, or branch
deploys can't send). Confirmed working in production 2 Aug.

**If the key is ever rotated, Vercel needs the new value too** — and then
a **redeploy**, because Vercel only picks up environment changes on a new
build. An existing deployment will not see them.

### Troubleshooting — two real failures, 3 Aug

**"The form isn't configured yet"** (HTTP 503) means a variable is *absent*,
not wrong. A bad key fails later and gives a different message. Cause that
day: `CONTACT_TO` and `CONTACT_FROM` had never been added to Vercel.
`.env.local` is gitignored, so **pushing to master does not carry it** —
Vercel only knows what's in its own settings. The three variables must be
set in both places independently.

**"Couldn't send just now"** (HTTP 502) means Resend rejected the send. The
route logs `Resend rejected the send:` with the status:

| Status | Meaning |
|---|---|
| 401 | wrong API key — e.g. Vercel still holds a key that's been rotated out |
| 403 | sending from `onboarding@resend.dev`, which **only delivers to the address the Resend account was registered with**. Any second recipient fails the whole send |
| 422 | malformed recipient — usually stray quotes, see below |

**Quotes: `.env.local` yes, Vercel no.** In `.env.local` the surrounding
double quotes are shell syntax and get stripped. Vercel's value field takes
the string literally, so pasting `"a@x.com, b@y.com"` produces recipients
with quote characters attached and Resend rejects them. Paste values into
Vercel **unquoted**.

**Env changes need a redeploy.** Vercel applies them at build time only; an
existing deployment will never see them.

### 5. Test

Submit a real enquiry and confirm:

- it arrives at both addresses (post-verification)
- the subject reads e.g. `Hire the Equipment — Jane Doe`
- hitting reply goes to the enquirer, not to yourself (`reply_to` is set
  to whatever they typed)

---

## Umojah Records mailing list

The subscribe field in the Music section posts to `app/api/subscribe/route.js`,
which adds the address to a **Resend Audience** — same account and same API
key as the contact form, so no new vendor and no new dependency.

### One-time setup

1. Go to <https://resend.com/audiences> and create an audience (call it
   something like *Umojah Records*).
2. Copy its ID.
3. Add `UMOJAH_RECORDS_AUDIENCE_ID` to `.env.local` **and** to Vercel (Production,
   Preview and Development), then **redeploy** — Vercel only picks up
   environment changes on a new build.

It isn't a secret, so unlike the API key it can live in `.env.local`.

Until it's set the form returns *"Signups aren't set up yet"* rather than
failing silently, and the route logs which variable is missing.

### Behaviour worth knowing

- **Re-subscribing isn't an error.** Resend rejects a duplicate contact;
  the route catches that and returns success. Telling someone their second
  attempt failed invites a third, and they're already on the list.
- `unsubscribed: false` is sent explicitly. Without it a contact can land
  in an unsubscribed state and never receive anything.
- There's a honeypot field, as on the contact form.

- **Consent wording is shown under the button**, not buried in a policy:
  *"New music from Umojah Records and event news, roughly once a month.
  Unsubscribe any time."* It's replaced by the status message once someone
  subscribes, so the layout doesn't shift under a click.

### Watch out for

**An audience ID is not an API key.** Both are 36 characters, which caught
us out on 7 Aug. The difference:

| | |
|---|---|
| API key | starts `re_`, no hyphens, from resend.com/api-keys |
| Audience ID | a UUID with four hyphens, e.g. `d6a4f02c-2a50-...` |

The reliable place to find the audience ID is the **browser address bar**
when you open the audience — the URL ends in it. If the value you're
copying begins with `re_`, you're on the API Keys page.

### Still to do

- **Unsubscribe.** Resend handles the mechanics for broadcasts, so this is
  largely a matter of using its unsubscribe token when the first campaign
  goes out rather than anything the site needs.

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
