import { SITE } from "@/lib/site";

// Generates /sitemap.xml at build time. Add an entry here whenever a route
// is added — nothing discovers pages automatically.
export default function sitemap() {
  const now = new Date();
  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
