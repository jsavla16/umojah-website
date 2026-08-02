"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { s } from "@/lib/stage";

// Site nav.
//
// The Canva artboards have no nav — both pages open straight onto artwork
// that's deliberately cropped by the top edge (the hero medallion, the
// speaker stack). A conventional bar would either push that crop down or
// sit on top of it, so this is kept deliberately slight: a wordmark left,
// two links right, no background, in the corners the compositions leave
// empty.
//
// z-50 puts it above the shuka borders (z-40); everything scales off the
// same --stage value as the sections so it can't drift out of proportion.

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between"
      style={{
        paddingLeft: s(0.055),
        paddingRight: s(0.055),
        paddingTop: s(0.014),
      }}
    >
      <Link
        href="/"
        className="font-display pointer-events-auto uppercase leading-none tracking-[0.08em] text-earth mix-blend-multiply transition-opacity hover:opacity-70"
        style={{ fontSize: s(0.0125) }}
      >
        Umojah
      </Link>

      <div
        className="pointer-events-auto flex"
        style={{ gap: s(0.022) }}
      >
        {PAGES.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`font-body uppercase tracking-[0.2em] text-earth mix-blend-multiply transition-opacity hover:opacity-70 ${
                active ? "font-bold" : "font-medium opacity-70"
              }`}
              style={{ fontSize: s(0.0105) }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
