import ShukaBackground from "@/components/ShukaBackground";
import ViewportBadge from "@/components/ViewportBadge";
import Nav from "@/components/Nav";
import SoundSystem from "@/components/SoundSystem";
import Crew from "@/components/Crew";
import Collaborations from "@/components/Collaborations";

export const metadata = {
  title: "About Us · Umojah Sound System",
  description:
    "Kenya's first and only traditional reggae/dub sound system — the stack, the crew, and the festivals and artists we've shared it with.",
};

export default function About() {
  return (
    <>
      <ShukaBackground />
      <Nav />
      <main className="min-h-screen">
        <SoundSystem />
        <Crew />
        <Collaborations />
      </main>
      <ViewportBadge />
    </>
  );
}
