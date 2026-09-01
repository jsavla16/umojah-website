import Image from "next/image";
import warriorStackz from "@/public/images/merch/warrior-stackz-trim.png";
import herbyStackz from "@/public/images/merch/herby-stackz-trim.png";
import sticker from "@/public/images/merch/umojah-sticker-trim.png";
import dubClubCap from "@/public/images/merch/nairobi-dub-club-cap-trim.png";
import { STAGE, s } from "@/lib/stage";
import { merchHref, linkProps } from "@/lib/links";

// Home / 1.4 Merchandising — "Wear the Culture".
//
// Measured off the Canva mockup (2732px page, Merch band y 4608-6144).
// Charcoal band, a centred header flanked by two spear-tipped rules, and
// four product cards on a single row:
//
//   cards   x 132 / 771 / 1384 / 2014, each 574 wide (21.01%)
//           rel y 305 -> 1307 (top 11.16%, height 36.68%)
//   caption rel y 1143, two centred lines
//
// Products are rendered at their artwork's own size — in the mockup each
// sits at roughly 1:1 against the 2732px artboard — and are anchored by
// their measured top rather than centred, since they're different shapes
// and the design lines up their optical centres, not their boxes.
//
// Per the build brief these products are live and each needs a real
// purchase URL; `href` is a placeholder until those land.


const CARD = { top: 0.1116, height: 0.3668, width: 0.2101 };

const PRODUCTS = [
  {
    id: "warrior-stackz",
    lines: ["Warrior Stackz", "T-Shirt"],
    image: warriorStackz,
    alt: "Warrior Stackz t-shirt, black with the Umojah stack print",
    imageWidth: 0.2039,
    imageTop: 0.1677,
    left: 0.0483,
    bg: "bg-bone",
  },
  {
    id: "herby-stackz",
    lines: ["Herby Stackz", "T-Shirt"],
    image: herbyStackz,
    alt: "Herby Stackz t-shirt, white with the Umojah stack print",
    imageWidth: 0.1907,
    imageTop: 0.1658,
    left: 0.2822,
    bg: "bg-terracotta",
  },
  {
    id: "sticker",
    lines: ["Umojah Logo Sticker", "8cm / 5cm"],
    image: sticker,
    alt: "Umojah Sound System circular logo sticker",
    imageWidth: 0.1636,
    imageTop: 0.1969,
    left: 0.5066,
    bg: "bg-bone",
  },
  {
    id: "cap",
    lines: ["Nairobi Dub Club", "Cap"],
    image: dubClubCap,
    alt: "Nairobi Dub Club embroidered cap",
    imageWidth: 0.1728,
    imageTop: 0.1863,
    left: 0.7372,
    bg: "bg-bone",
  },
];

// The two rules either side of the headline are the same artwork mirrored,
// used as a mask so they can be filled with a brand colour rather than
// shipped pre-tinted.
function Rule({ left, width, flip }) {
  const src = `/images/merch/arrow-${flip ? "right" : "left"}-trim.png`;
  return (
    <div
      aria-hidden="true"
      className="absolute -translate-y-1/2"
      style={{
        left: s(left),
        top: s(0.0564),
        width: s(width),
        height: s(0.0098),
        backgroundColor: "var(--color-bone)",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
      }}
    />
  );
}

function ProductCard({ product }) {
  const { id, lines, image, alt, imageWidth, imageTop, left, bg } = product;
  const { className: state, ...anchor } = linkProps(merchHref(id));
  return (
    <a
      {...anchor}
      className={`paper absolute block ${bg} transition-transform hover:-translate-y-1 ${state ?? ""}`}
      style={{
        left: s(left),
        top: s(CARD.top),
        width: s(CARD.width),
        height: s(CARD.height),
      }}
    >
      <Image
        src={image}
        alt={alt}
        className="absolute left-1/2 h-auto max-w-none -translate-x-1/2"
        style={{
          width: s(imageWidth),
          // imageTop is measured from the section top, so subtract the
          // card's own offset to make it card-relative.
          top: s(imageTop - CARD.top),
        }}
        sizes="22vw"
      />
      <p
        className="font-body absolute inset-x-0 text-center font-medium uppercase leading-[1.35] tracking-[0.06em] text-earth"
        style={{ top: s(0.4184 - CARD.top), fontSize: s(0.0125) }}
      >
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </a>
  );
}

// MOBILE CARD.
//
// Four products across one row at 360px gives each card about 80px — the
// artwork becomes a smudge and the labels are unreadable. A 2x2 grid
// doubles that to ~165px and keeps all four visible, which a swipe
// carousel would not: three of the four would be hidden behind a gesture
// people frequently miss.
//
// Sized in normal flow rather than off --stage. The desktop card is a
// fixed fraction of the artboard; here the grid decides the width and the
// card fills it, so nothing needs measuring and nothing can collide.
function MobileCard({ product }) {
  const { id, lines, image, alt, bg } = product;
  const { className: state, ...anchor } = linkProps(merchHref(id));

  return (
    <a
      {...anchor}
      className={`paper block ${bg} ${state ?? ""}`}
      // aspect-[3/4] keeps every card the same shape whatever its artwork,
      // so the grid stays even without hardcoded heights.
    >
      <div className="flex aspect-[3/4] items-center justify-center p-3">
        <Image
          src={image}
          alt={alt}
          className="h-auto w-full max-w-none"
          sizes="45vw"
        />
      </div>
      <p className="font-body px-2 pb-3 text-center text-[0.6rem] font-medium uppercase leading-[1.35] tracking-[0.06em] text-earth">
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </a>
  );
}

export default function Merch() {
  return (
    <section id="merch" className="paper relative bg-charcoal">
      {/* ---------------------------------------------------------------
          MOBILE — 2x2 grid in normal flow.
          --------------------------------------------------------------- */}
      <div className="px-5 py-10 md:hidden">
        <p className="font-body text-center text-[0.7rem] font-bold uppercase tracking-[0.3em] text-bone">
          Wear the Culture
        </p>
        <h2
          className="font-display mt-2 text-center text-3xl uppercase leading-none tracking-[0.04em] text-gold"
          style={{
            WebkitTextStrokeWidth: "0.035em",
            WebkitTextStrokeColor: "var(--color-earth)",
            paintOrder: "stroke fill",
          }}
        >
          Merchandising
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <MobileCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------
          DESKTOP — the proportional stage, unchanged.
          --------------------------------------------------------------- */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        <p
          className="font-body absolute inset-x-0 text-center font-bold uppercase tracking-[0.3em] text-bone"
          style={{ top: s(0.0247), fontSize: s(0.0132) }}
        >
          Wear the Culture
        </p>

        <Rule left={0.0564} width={0.2728} />
        <Rule left={0.6589} width={0.283} flip />

        <h2
          className="font-display absolute inset-x-0 whitespace-nowrap text-center uppercase leading-none tracking-[0.04em] text-gold"
          style={{
            top: s(0.0415),
            fontSize: s(0.029),
            WebkitTextStrokeWidth: "0.035em",
            WebkitTextStrokeColor: "var(--color-earth)",
            paintOrder: "stroke fill",
          }}
        >
          Merchandising
        </h2>

        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
