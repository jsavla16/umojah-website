import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Services from "@/components/Services";
import Merch from "@/components/Merch";

export default function Home() {
  return (
    <>
      <ShukaBackground />
      {/* Horizontal padding lives on the sections, not here, so bands like
          Music can run full-bleed to the page edges (with the shuka
          borders overlaying them) the way the mockup does. */}
      <main className="min-h-screen">
        <Hero />
        <Music />
        <Services />
        <Merch />
      </main>
      <ViewportBadge />
    </>
  );
}
