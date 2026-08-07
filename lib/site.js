// Single source of truth for the facts that appear in metadata, structured
// data, the sitemap and robots.txt. Kept out of the components so the same
// description can't drift between the <meta> tag and the JSON-LD.

// Spread this into every page's `openGraph` block.
//
// Next SHALLOW-merges metadata: a page that defines `openGraph` replaces
// the layout's object outright rather than merging into it. So the type,
// siteName and locale set in app/layout.js were being dropped on every
// page that set its own title or url — which is all of them. Facebook's
// Sharing Debugger caught it as "missing og:type".
//
// Spreading these back in per page is the fix. Keeping them here rather
// than retyping them means a future page can't quietly omit them.
export const OG_DEFAULTS = {
  type: "website",
  siteName: "Umojah Sound System",
  locale: "en_KE",
};

export const SITE = {
  name: "Umojah Sound System",
  url: "https://umojahsoundsystem.com",

  // Aim for 150-160 characters: enough for Google to show it whole, and it
  // doubles as the WhatsApp/Instagram link preview text. Leads with what
  // Umojah is, then the two things people search for — hire and builds.
  description:
    "Kenya's first traditional reggae and dub sound system, hand-built in Nairobi. Hire the rig, book the full session, or commission a custom sound system build.",

  // Short form for the JSON-LD, which reads better without the CTA.
  shortDescription:
    "Kenya's first and only traditional reggae/dub sound system, hand-built in Nairobi since 2016.",

  locality: "Nairobi",
  country: "KE",
  founded: "2016",

  // Same links as lib/links.js, listed here as `sameAs` so search engines
  // can connect the site to the profiles and treat them as one entity.
  profiles: [
    "https://www.instagram.com/umojahsoundsystem/",
    "https://www.facebook.com/umojahsoundsystem/",
    "https://x.com/umojahsoundsyst",
    "https://soundcloud.com/umojah-soundsystem",
    "https://umojahsoundsystem.bandcamp.com/",
    "https://youtube.com/@umojahsoundsystem6952",
  ],
};
