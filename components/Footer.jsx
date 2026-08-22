import Link from "next/link";
import { LEGAL, copyrightYear } from "@/lib/legal";

// Site footer — on every page.
//
// Deliberately plain. It carries obligations, not design: the copyright
// holder, both companies with their registration numbers, the trade mark
// notice, and the route to the privacy notice.
//
// Charcoal ground so it reads as a base rather than another band of the
// composition, and so it works under any section that precedes it.

export default function Footer() {
  const marks = LEGAL.marks.map((mark) => `${mark}™`);
  // "A, B and C" — an Oxford-comma-free list, built rather than hardcoded
  // so adding a fourth brand doesn't need the sentence rewritten.
  const markList =
    marks.slice(0, -1).join(", ") + " and " + marks[marks.length - 1];

  return (
    <footer className="paper bg-charcoal px-5 py-10 text-bone md:px-12">
      <div className="mx-auto max-w-4xl space-y-4 text-center text-[0.7rem] leading-relaxed md:text-[0.75rem]">
        <p>
          &copy; {copyrightYear()} {LEGAL.owner.name}. All rights reserved.
        </p>

        <p className="text-bone/70">
          {LEGAL.owner.name} is registered in {LEGAL.owner.jurisdiction},
          company number {LEGAL.owner.number}. Operations in Kenya are carried
          out by {LEGAL.operator.name}, company number {LEGAL.operator.number}.
        </p>

        {/* ™ not ® — none of these are registered yet. See lib/legal.js. */}
        <p className="text-bone/70">
          {markList} are trade marks of {LEGAL.owner.name}. All artwork,
          photography, illustration and copy on this site are owned by{" "}
          {LEGAL.owner.name} and may not be reproduced without permission.
        </p>

        <p className="text-bone/70">
          This site sets no tracking cookies and does not profile visitors.{" "}
          <Link href="/privacy" className="underline hover:text-bone">
            Privacy notice
          </Link>
        </p>
      </div>
    </footer>
  );
}
