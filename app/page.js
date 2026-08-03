import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import StructuredData from "@/components/StructuredData";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Services from "@/components/Services";
import Merch from "@/components/Merch";
import Contact from "@/components/Contact";

// Home had no metadata at all until now — it inherited the layout's
// defaults, which meant the page most likely to rank had no description
// of its own and no canonical. The title deliberately leads with the
// service rather than the brand name: nobody searches "Umojah", they
// search "sound system hire Nairobi".
export const metadata = {
  title: "Sound System Hire & Custom Builds, Nairobi",
  description:
    "Kenya's first traditional reggae and dub sound system. Hire the rig for your event, book the full session with selektors and MCs, or commission a custom build for your venue.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Umojah Sound System · Sound System Hire & Custom Builds, Nairobi",
    description:
      "Kenya's first traditional reggae and dub sound system, hand-built in Nairobi. Hire the rig, book the session, or commission a custom build.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <ShukaBackground />
      <Nav />
      {/* Horizontal padding lives on the sections, not here, so bands like
          Music can run full-bleed to the page edges (with the shuka
          borders overlaying them) the way the mockup does. */}
      <main className="min-h-screen">
        <Hero />
        <Music />
        <Services />
        <Merch />
        <Contact />
      </main>
      <ViewportBadge />
    </>
  );
}
