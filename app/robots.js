import { SITE } from "@/lib/site";

// Generates /robots.txt at build time.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The contact endpoint is POST-only and has nothing to index.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
