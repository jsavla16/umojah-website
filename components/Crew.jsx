import Image from "next/image";
import smokeCloud from "@/public/images/crew/smoke-cloud-trim.png";
import { STAGE, s } from "@/lib/stage";

// About / 2.2 The Crew.
//
// Measured off the Canva mockup (About us page.png, band y 1536-3072).
// Terracotta ground; the speaker stack from the section above bleeds down
// over the top of it. Centred header between two spear-tipped rules, an
// intro paragraph, then three crew columns.
//
// Within each column the role pill and the name are LEFT-aligned while the
// bio is centred on the column — that mix is deliberate in the mockup, not
// drift, and it's what gives the block its slightly hand-set feel.
//
// Content sits at z-20 so the speaker stack (z-10, owned by the previous
// section) passes behind the type rather than over it.


const COLUMN_WIDTH = 0.2562;

const CREW = [
  {
    id: "jay",
    role: ["Founder", "Selektor"],
    name: "Selekta Jay",
    bio: "The selector at the heart of Umojah. Jay's ear for roots and dub has driven the sound from day one. Responsible for the planning, logistics and operations that keep the machine running — and for reading the crowd when the stacks are up.",
    left: 0.0556,
  },
  {
    id: "joe",
    role: ["Founder", "Engineer"],
    name: "Rigmasta Joe",
    bio: "The architect behind the hardware. Joe built Umojah's stacks from scratch. He was a former crew member of Highness Sound System in Nottingham and an engineering degree holder — he makes it loud, clear and right.",
    left: 0.3745,
  },
  {
    id: "steppa",
    role: ["Producer", "Designer"],
    name: "Dread Steppa",
    bio: "The creative force behind the sound and the visuals. Dread Steppa's production work spans East Africa's leading music projects — Santuri Safari, Feke, Midi Minds. He shapes how Umojah sounds on record and how it looks on the street.",
    left: 0.6867,
  },
];

function Rule({ left, width, flip }) {
  const src = `/images/crew/arrow-${flip ? "right" : "left"}-trim.png`;
  return (
    <div
      aria-hidden="true"
      className="absolute z-20 -translate-y-1/2"
      style={{
        left: s(left),
        top: s(0.1468),
        width: s(width),
        height: s(0.0102),
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

function Member({ member }) {
  const { role, name, bio, left } = member;
  return (
    <div
      className="absolute z-20"
      style={{ left: s(left), top: s(0.2314), width: s(COLUMN_WIDTH) }}
    >
      {/* Smoke sits behind the whole column. It used to live inside the bio,
          which put it later in the DOM than the name and washed the
          lettering out. */}
      <Image
        src={smokeCloud}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 z-0 max-w-none -translate-x-1/2 select-none opacity-80"
        style={{ top: s(0.012), width: s(0.31) }}
        sizes="32vw"
      />

      <div className="relative z-10">
        <span
          className="font-body inline-flex items-center rounded-md bg-earth font-bold uppercase tracking-[0.06em] text-bone"
          style={{
            height: s(0.0216),
            fontSize: s(0.0112),
            paddingLeft: s(0.009),
            paddingRight: s(0.009),
          }}
        >
          {role.join(" ● ")}
        </span>

        <h3
          className="font-display uppercase leading-none tracking-[0.04em] text-earth"
          style={{ fontSize: s(0.0254), marginTop: s(0.008) }}
        >
          {name}
        </h3>

        <p
          className="font-body text-center text-earth"
          style={{
            marginTop: s(0.0146),
            fontSize: s(0.0165),
            lineHeight: 1.45,
          }}
        >
          {bio}
        </p>
      </div>
    </div>
  );
}

export default function Crew() {
  return (
    <section id="crew" className="paper relative bg-terracotta">
      <div
        className="relative mx-auto"
        style={{ width: STAGE, height: s(0.5622) }}
      >
        <Rule left={0.1244} width={0.2416} />
        <Rule left={0.6402} width={0.239} flip />

        <h2
          className="font-heading absolute inset-x-0 z-20 text-center uppercase leading-none tracking-[0.02em] text-bone"
          style={{ top: s(0.1370), fontSize: s(0.0208) }}
        >
          The Crew
        </h2>

        <p
          className="font-heading absolute left-1/2 z-20 -translate-x-1/2 text-center uppercase tracking-[0.06em] text-bone"
          style={{ top: s(0.1556), width: s(0.665), fontSize: s(0.013), lineHeight: 1.45 }}
        >
          Kenya&rsquo;s first and only traditional reggae/dub sound system. 20
          years in the making, built from the ground up in Nairobi. Three
          people. One mission &mdash; propagate sound system culture across
          East Africa.
        </p>

        {CREW.map((member) => (
          <Member key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}
