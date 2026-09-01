// Every outbound link on the site, in one place.
//
// The build brief lists these as to-be-supplied, so they're stubbed as
// null until the real ones land. Anything left null renders as a disabled
// control rather than a dead "#" link — a button that visibly does nothing
// is worse than one that's obviously not ready yet.
//
// To go live: replace a null with the URL string. Nothing else to change.

export const CONTACT = {
  // The contact form posts to /api/contact and reads its recipients from
  // the CONTACT_TO environment variable, so no address is needed here.
  email: null,

  // TWO WHATSAPP DESTINATIONS, DELIBERATELY SEPARATE.
  //
  // They serve opposite intents and must never sit in the same block, or
  // the visitor has to work out which WhatsApp they want:
  //
  //   whatsapp  — one-to-one chat with Umojah. A TRANSACTIONAL route.
  //               Belongs beside the enquiry form, on /hire, and on the
  //               Services panels. Kenya is a negotiating market and
  //               people want a person before a price, so this carries
  //               real weight — not a footnote to the form.
  //
  //   community — the Sound System Culture Kenya group. A BELONGING
  //               route, for events and cultural updates. Belongs in the
  //               Events section and the footer, never next to the
  //               enquiry CTA.
  //
  // Number is stored in international format without the + or spaces,
  // which is what wa.me expects. Build links with whatsappLink() below so
  // the prefilled message stays encoded.
  whatsapp: "254718173343",
  phone: "+254 718 173 343",

  // ?mode=gi_t stripped — it's a WhatsApp share-tracking parameter, not
  // part of the invite.
  community: "https://chat.whatsapp.com/CC1NykWo3Ri2sdgNGRQzpd",
  communityName: "Sound System Culture Kenya",
};

// Prefilling the first message means enquiries arrive pre-labelled, which
// matters when the same number handles hire, builds and everything else.
export const whatsappLink = (message) =>
  CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}${
        message ? `?text=${encodeURIComponent(message)}` : ""
      }`
    : null;

export const STREAMING = {
  // Found via the Nairobi Dub Club store's own social links.
  youtube: "https://youtube.com/@umojahsoundsystem6952",

  // Was "umojahsoundsytem" (missing an s) — a genuine misspelling in the
  // Bandcamp subdomain, since corrected. Verified live.
  bandcamp: "https://umojahsoundsystem.bandcamp.com/",

  soundcloud: "https://soundcloud.com/umojah-soundsystem",

  // Needs a release distributed to Spotify first (via LANDR), then the
  // artist profile claimed through Spotify for Artists. Renders inert
  // until then.
  spotify: null,

  // Not live yet; arrives with the LANDR distribution.
  appleMusic: null,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/umojahsoundsystem/",
  facebook: "https://www.facebook.com/umojahsoundsystem/",
  // X dropped — the account is dormant, and pointing people (or Google's
  // sameAs graph) at a profile with nothing on it is worse than not
  // mentioning it. Add it back here if it becomes active.
  tiktok: "https://www.tiktok.com/@umojah.sound.system",
  mixcloud: null,
};

// Merch: either give each product its own URL, or set `shop` and leave the
// per-product entries null — they'll all fall back to the shop.
export const MERCH = {
  shop: "https://umojahsoundsystem.hustlesasa.shop/",
  products: {
    "warrior-stackz": null,
    "herby-stackz": null,
    sticker: null,
    cap: null,
  },
};

// --- helpers ---------------------------------------------------------

export const merchHref = (id) => MERCH.products[id] ?? MERCH.shop ?? null;

export const contactHref = () =>
  CONTACT.email ? `mailto:${CONTACT.email}` : null;

// Props for an <a> that may not have a destination yet. When href is null
// the element is still rendered (so the layout is unaffected) but is inert
// and announced as unavailable.
export const linkProps = (href, { external = true } = {}) =>
  href
    ? {
        href,
        ...(external && href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {}),
      }
    : {
        href: undefined,
        role: "link",
        "aria-disabled": "true",
        title: "Link coming soon",
        className: "cursor-not-allowed",
      };
