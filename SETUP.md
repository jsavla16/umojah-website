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
