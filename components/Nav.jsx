"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { s } from "@/lib/stage";

// Site nav.
//
// DESKTOP keeps the original brief: the Canva artboards have no nav, and
// both pages open straight onto artwork deliberately cropped by the top
// edge (the hero medallion, the speaker stack). A conventional bar would
// either push that crop down or sit on top of it, so it stays slight —
// wordmark left, links right, no background, in the corners the
// compositions leave empty. Everything scales off --stage so it can't
// drift out of proportion with the sections.
//
// MOBILE can't do that. Four labels at --stage proportions on a 360px
// phone would be about 4px of text with no usable tap area, and there is
// no corner space to put them in. So below `md` it becomes a wordmark, a
// menu button, and a full-screen drawer where the links can be as large
// as they need to be. Fixed pixel sizes there, not stage fractions —
// touch targets are an ergonomic minimum, not a proportion of artwork.
//
// z-50 puts it above the shuka borders (z-40); the open drawer sits at
// z-[60] so it covers those too.

// `ready: false` renders the item visible but inert. Events and Hire are
// agreed as real routes but aren't built yet, and a nav item that 404s is
// worse than one that visibly isn't ready — people click nav items. Flip
// these to true when app/events and app/hire exist. Same reasoning as
// linkProps() in lib/links.js, which does this for outbound URLs.
const PAGES = [
  { href: "/", label: "Home", ready: true },
  { href: "/about", label: "About", ready: true },
  { href: "/events", label: "Events", ready: false },
  { href: "/hire", label: "Hire", ready: false },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The Home hero already carries the wordmark at full size inside the
  // medallion, so a second UMOJAH in the corner is pure repetition — and
  // as a link it points at the page you're already on. Other pages need
  // it, both as identity and as the way back.
  const showWordmark = pathname !== "/";

  // Close on navigation. Without this the drawer stays open over the new
  // page, because a client-side route change doesn't remount the nav.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape to close, and lock body scroll while open — otherwise the page
  // behind scrolls under the drawer, which on a phone feels broken.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-50">
        {/* Mobile bar. Previously wrapped in `display: contents` so it
            could share the nav's own flex row — that broke the menu
            button. `display: contents` removes the element's box, and
            browsers have long-standing bugs where descendants then drop
            out of the accessibility tree and stop receiving events. Not
            worth the saved div. */}
        <div className="pointer-events-auto flex items-center justify-between px-5 pt-4 md:hidden">
          {showWordmark ? <Wordmark className="text-base" /> : <span />}
          <MenuButton open={open} onClick={() => setOpen(true)} />
        </div>

        <div
          className="hidden items-center justify-between md:flex"
          style={{
            paddingLeft: s(0.055),
            paddingRight: s(0.055),
            paddingTop: s(0.014),
          }}
        >
          {showWordmark ? <Wordmark style={{ fontSize: s(0.0125) }} /> : <span />}

          <div className="pointer-events-auto flex" style={{ gap: s(0.022) }}>
            {PAGES.map((page) => (
              <DesktopLink key={page.href} page={page} pathname={pathname} />
            ))}
          </div>
        </div>
      </nav>

      {/* --- Mobile drawer ------------------------------------------- */}
      {open && (
        <div
          id="mobile-nav"
          className="paper fixed inset-0 z-[60] flex flex-col bg-bone md:hidden"
        >
          <div className="flex items-center justify-between px-5 pt-4">
            <Wordmark full className="text-base" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-12 w-12 items-center justify-center text-earth"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 3 L19 19 M19 3 L3 19" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-5 pt-8">
            {PAGES.map((page) => (
              <DrawerLink key={page.href} page={page} pathname={pathname} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// `full` spells out the whole name. Used in the open drawer, where the
// menu is the only thing on screen and there's room to say who this is —
// as opposed to the top bar, where it sits over artwork and stays short.
function Wordmark({ className = "", style, full = false }) {
  return (
    <Link
      href="/"
      className={`font-display pointer-events-auto uppercase leading-none tracking-[0.08em] text-earth mix-blend-multiply transition-opacity hover:opacity-70 ${className}`}
      style={style}
    >
      {full ? "Umojah Sound System" : "Umojah"}
    </Link>
  );
}

function MenuButton({ open, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open menu"
      aria-expanded={open}
      aria-controls="mobile-nav"
      // 48px square: the tap area is the point, even though the glyph
      // inside it is small. No mix-blend-multiply and no negative margin
      // here — both were cosmetic, and both are the kind of thing that
      // muddies a hit-testing problem when you're trying to isolate one.
      className="pointer-events-auto relative z-50 flex h-12 w-12 items-center justify-center text-earth"
    >
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M1 1h22M1 8h22M1 15h22" />
      </svg>
    </button>
  );
}

function DesktopLink({ page, pathname }) {
  const { href, label, ready } = page;
  const active = pathname === href;

  const base =
    "font-body uppercase tracking-[0.2em] text-earth mix-blend-multiply";

  if (!ready) {
    return (
      <span
        aria-disabled="true"
        title="Coming soon"
        className={`${base} cursor-default font-medium opacity-35`}
        style={{ fontSize: s(0.0105) }}
      >
        {label}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} transition-opacity hover:opacity-70 ${
        active ? "font-bold" : "font-medium opacity-70"
      }`}
      style={{ fontSize: s(0.0105) }}
    >
      {label}
    </Link>
  );
}

function DrawerLink({ page, pathname }) {
  const { href, label, ready } = page;
  const active = pathname === href;

  // Generous vertical padding: each row is a comfortable target and the
  // list reads as a menu rather than a paragraph of links.
  //
  // Note there's no justify-between here. Pushing the status to the far
  // right stranded it across the screen from the word it describes —
  // sitting it right after the label makes it read as part of the item.
  const base =
    "font-display flex items-baseline gap-3 py-4 text-2xl uppercase tracking-[0.06em] text-earth";

  if (!ready) {
    return (
      <span aria-disabled="true" className={`${base} opacity-35`}>
        {label}
        <span className="font-body text-[0.6rem] tracking-[0.18em]">
          Coming soon
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${base} ${active ? "opacity-100" : "opacity-70"}`}
    >
      {label}
    </Link>
  );
}
