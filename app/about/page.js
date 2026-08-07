import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import Nav from "@/components/Nav";
import NavClearance from "@/components/NavClearance";
import SoundSystem from "@/components/SoundSystem";
import Crew from "@/components/Crew";
import Collaborations from "@/components/Collaborations";
import { OG_DEFAULTS } from "@/lib/site";

// The title picks up the layout's template, rendering as
// "About Us · Umojah Sound System".
export const metadata = {
  title: "About Us",
  description:
    "Kenya's first and only traditional reggae/dub sound system. Hand-built in Nairobi since 2016 — the stack, the crew, and the festivals and artists we've shared it with.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "About Umojah Sound System",
    description:
      "Hand-built in Nairobi since 2016. The stack, the crew, and the festivals and artists we've shared it with.",
    url: "/about",
  },
};

export default function About() {
  return (
    <>
      <ShukaBackground />
      <Nav />
      <main className="min-h-screen">
        {/* Nav clearance — adjust these two numbers. This page opens on
            the speaker stack, which the nav was sitting over. */}
        <NavClearance desktop={0.03} mobile={56} />
        <SoundSystem />
        <Crew />
        <Collaborations />
      </main>
      <ViewportBadge />
    </>
  );
}
