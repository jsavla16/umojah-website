// Every outbound link on the site, in one place.
//
// The build brief lists these as client-supplied, so they're stubbed as
// null until the real ones land. Anything left null renders as a disabled
// control rather than a dead "#" link — a button that visibly does nothing
// is worse than one that's obviously not ready yet.
//
// To go live: replace a null with the URL string. Nothing else to change.

export const CONTACT = {
  // The contact form posts to /api/contact and reads its recipients from
  // the CONTACT_TO environment variable, so no address is needed here.
  email: null,

  // TODO — WhatsApp, agreed for a later pass. Client-confirmed number.
  // Intended use: a wa.me link beside the enquiry form with the service
  // pre-filled in the message, e.g.
  //   https://wa.me/254718173343?text=Hi%20Umojah%20—%20equipment%20hire%20enquiry
  // Stored in international format without the + or spaces, which is what
  // wa.me expects.
  whatsapp: "254718173343",
  phone: "+254 718 173 343",
};

export const STREAMING = {
  // Found via the Nairobi Dub Club store's own social links.
  youtube: "https://youtube.com/@umojahsoundsystem6952",

  // Was "umojahsoundsytem" (missing an s) — a genuine misspelling in the
  // Bandcamp subdomain, since corrected by the client. Verified live.
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
  x: "https://x.com/umojahsoundsyst",
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
