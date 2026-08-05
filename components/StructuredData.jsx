import { SITE } from "@/lib/site";
import { CONTACT } from "@/lib/links";
import { HIRE_CATEGORIES } from "@/lib/equipment";

// JSON-LD structured data.
//
// Two types, because Umojah is genuinely two things and they rank for
// different queries:
//
//   MusicGroup     — "Umojah Sound System", the act. Connects the site to
//                    the Instagram/Bandcamp/SoundCloud profiles via
//                    sameAs, so Google treats them as one entity rather
//                    than unrelated pages.
//   LocalBusiness  — the hire/build side. This is what can surface for
//                    "sound system hire Nairobi", which is the commercial
//                    intent worth capturing.
//
// Rendered as a script tag rather than through the metadata API because
// Next has no first-class JSON-LD support — this is the documented
// approach.

export default function StructuredData() {
  const graph = [
    {
      "@type": "MusicGroup",
      "@id": `${SITE.url}/#band`,
      name: SITE.name,
      description: SITE.shortDescription,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image.png`,
      foundingDate: SITE.founded,
      foundingLocation: { "@type": "Place", name: "Nairobi, Kenya" },
      genre: ["Reggae", "Dub", "Roots"],
      sameAs: SITE.profiles,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      description: SITE.description,
      url: SITE.url,
      image: `${SITE.url}/opengraph-image.png`,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.locality,
        addressCountry: SITE.country,
      },
      // Cities named here must match the cities named in the Services copy
      // (components/Services.jsx). Structured data that claims coverage the
      // visible page doesn't is exactly the inconsistency Google discounts,
      // and the visible copy is what actually carries ranking weight — this
      // just makes the claim machine-readable.
      areaServed: [
        { "@type": "Country", name: "Kenya" },
        { "@type": "City", name: "Nairobi" },
        { "@type": "City", name: "Mombasa" },
        { "@type": "City", name: "Kisumu" },
        { "@type": "City", name: "Nakuru" },
        { "@type": "Place", name: "East Africa" },
      ],
      sameAs: SITE.profiles,
      ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sound system and equipment hire",
              description:
                "Hire the Umojah rig for your event — delivered, set up and tuned. Speakers, amplifiers, mixing desks, DJ equipment, turntables, generators and power distribution also available separately.",
              // Naming the categories explicitly gives search engines
              // something concrete to match against equipment queries,
              // which the prose alone doesn't.
              serviceType: HIRE_CATEGORIES.map((category) => category.name),
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom sound system build",
              description:
                "Bespoke sound systems designed, built and installed for venues, bars and restaurants.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Book Umojah Sound System",
              description:
                "The full session — equipment, selektors and MCs for festivals, clubs and events.",
            },
          },
        ],
      },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // Content is entirely from our own constants, no user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
