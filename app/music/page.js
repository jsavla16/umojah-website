import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import Nav from "@/components/Nav";
import Music from "@/components/Music";
import NavClearance from "@/components/NavClearance";
import { OG_DEFAULTS } from "@/lib/site";
import Footer from "@/components/Footer";

// Music moved off the homepage and onto its own route.
//
// WHY: the mobile design splits streaming links and Umojah Records into
// two full sections, which on the homepage meant a seven-section scroll
// before anyone reached Merch. Giving it a page solves that — and the
// alternative, keeping it on the homepage for desktop and paginating only
// on mobile, would have put the same content at two URLs, splitting
// ranking signals between them and doubling the maintenance.
//
// One structure, both breakpoints, one canonical URL.
export const metadata = {
  title: "Music",
  description:
    "Roots, reggae and dub from Umojah Sound System. Listen on YouTube, Bandcamp and SoundCloud, and hear Umojah Records releases first.",
  alternates: { canonical: "/music" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Umojah Sound System · Music",
    description:
      "Roots, reggae and dub from East Africa's foundation sound. Listen on your platform of choice, and be first to hear Umojah Records releases.",
    url: "/music",
  },
};

export default function MusicPage() {
  return (
    <>
      <ShukaBackground />
      <Nav />
      <main className="min-h-screen">
        {/* Nav clearance — adjust these two numbers to move the Music band
            up or down relative to the nav. Was 0.05 / 76px, which pushed
            it further than it needed. */}
        <NavClearance desktop={0.03} mobile={56} />
        <Music />
      </main>
      <Footer />
      <ViewportBadge />
    </>
  );
}
