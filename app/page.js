import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import StructuredData from "@/components/StructuredData";
import Nav from "@/components/Nav";
import NavClearance from "@/components/NavClearance";
import Hero from "@/components/Hero";
import Events from "@/components/Events";
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
        {/* Nav clearance — zero by default here, because the medallion is
            meant to sit high in the frame and any clearance pushes it
            down. The knob is present so it's adjustable without hunting:
            raise `desktop` toward 0.02 and `mobile` toward 40 if the nav
            crowds the top of the badge. */}
        <NavClearance desktop={0} mobile={0} />
        <Hero />
        {/* Music has moved to its own route at /music. */}
        <Events />
        <Services />
        <Merch />
        <Contact />
      </main>
      <ViewportBadge />
    </>
  );
}
