import Image from "next/image";
import festivalsMedallion from "@/public/images/about/medallion-festivals.png";
import artistsMedallion from "@/public/images/about/medallion-artists.png";
import { STAGE, s } from "@/lib/stage";

// About / 2.3 Collaborations & Festivals.
//
// Measured off the Canva mockup (About us page.png, band y 3072-4608).
// Bone ground, header top-left, and two large beaded medallions — the
// terracotta one carrying festivals, the indigo one artists — cropped by
// the page top with their tassels running off the bottom.
//
// Both medallion SVGs were Canva duotone exports (a white silhouette plus
// a colour layer combined through an feColorMatrix filter), and each holds
// a mirrored PAIR of medallions. They've been recovered the same way as
// the hero badge: rebuild the alpha from the silhouette layer, take the
// left medallion only, and cut above the shadow ellipse.
//
// Per the build brief both lists are Sanity-driven in Phase 5; the arrays
// below are the mockup's content standing in until then.


const MEDALLION = { width: 0.4136, top: 0.0073 };

const GROUPS = [
  {
    id: "festivals",
    image: festivalsMedallion,
    alt: "Beaded medallion listing the festivals Umojah has played",
    centre: 0.2928,
    items: [
      "Nyege Nyege",
      "Kilifi New Year",
      "Beneath the Baobab",
      "Kilele Summit",
      "Boiler Room",
    ],
  },
  {
    id: "artists",
    image: artistsMedallion,
    alt: "Beaded medallion listing the artists Umojah has hosted",
    centre: 0.7141,
    items: [
      "King Shiloh",
      "Lavosti",
      "Kare",
      "Jah Pila",
      "Tippy I",
      "Black Chariot",
      "Micah Shemaiah",
      "10000 Lions",
    ],
  },
];

function Medallion({ group }) {
  const { image, alt, centre, items } = group;
  return (
    <div
      className="absolute -translate-x-1/2"
      style={{
        left: s(centre),
        top: s(MEDALLION.top),
        width: s(MEDALLION.width),
      }}
    >
      <Image src={image} alt={alt} className="h-auto w-full" sizes="42vw" />
      {/* The list sits in the ring's hollow, centred on 32.2% of the
          medallion's height — measured, rather than the geometric centre,
          because the mockup sets it slightly low in the opening. */}
      <ul
        className="font-body absolute inset-x-[22%] -translate-y-1/2 text-center font-bold uppercase tracking-[0.04em] text-earth"
        style={{ top: "32.2%", fontSize: s(0.0135), lineHeight: 1.42 }}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Collaborations() {
  return (
    <section id="collaborations" className="paper relative bg-bone">
      <div
        className="relative mx-auto"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        {GROUPS.map((group) => (
          <Medallion key={group.id} group={group} />
        ))}

        <p
          className="font-body absolute z-20 font-bold uppercase tracking-[0.3em] text-earth"
          style={{ left: s(0.0523), top: s(0.0202), fontSize: s(0.0137) }}
        >
          Our Journey
        </p>
        <h2
          className="font-display absolute z-20 whitespace-nowrap uppercase leading-none tracking-[0.04em] text-earth"
          style={{
            left: s(0.0527),
            top: s(0.0427),
            fontSize: s(0.0254),
            WebkitTextStrokeWidth: "0.035em",
            WebkitTextStrokeColor: "var(--color-gold)",
            paintOrder: "stroke fill",
          }}
        >
          Collaborations and Festivals
        </h2>
      </div>
    </section>
  );
}
