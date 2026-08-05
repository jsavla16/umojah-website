import september from "@/public/images/events/ndc-september-2026.png";
import october from "@/public/images/events/ndc-october-2026.png";
import november from "@/public/images/events/ndc-november-2026.png";
import december from "@/public/images/events/ndc-december-2026.png";

// Nairobi Dub Club sessions.
//
// CONFIRMED vs UNCONFIRMED — this distinction is the whole point of the
// file. Only session 19 has a fixed date. The rest are planned but not
// locked, so they show as posters with NO date and get NO structured
// data. Inaccurate Event markup is worse than none: Google can drop your
// event rich results entirely rather than ignoring the bad entries, and a
// wrong date sends someone to Westlands on a night with no gig.
//
// `sortDate` exists only for ordering and expiry — it is never rendered.
// For unconfirmed sessions it's a nominal end-of-month value, which is
// enough to keep them in sequence and to let them age out on their own.
//
// SELF-COLLAPSING: upcomingEvents() filters on sortDate, so the section
// empties itself once everything has passed rather than advertising a gig
// from last March. No toggle to remember, no CMS switch to forget.

export const VENUE = {
  name: "The Mall, Westlands",
  locality: "Nairobi",
  country: "KE",
};

export const TICKETS_URL = "https://nairobidubclub.hustlesasa.shop/";

const EVENTS = [
  {
    id: "session-19",
    session: 19,
    poster: september,
    confirmed: true,
    sortDate: "2026-09-29",
    // Rendered on the page and used in structured data. Only ever set on
    // confirmed sessions.
    displayDate: "Saturday 29 September 2026",
    startDate: "2026-09-29T20:00:00+03:00",
  },
  {
    id: "session-20",
    session: 20,
    poster: october,
    confirmed: false,
    sortDate: "2026-10-31",
    displayDate: null,
    startDate: null,
  },
  {
    id: "session-21",
    session: 21,
    poster: november,
    confirmed: false,
    sortDate: "2026-11-30",
    displayDate: null,
    startDate: null,
  },
  {
    id: "session-22",
    session: 22,
    poster: december,
    confirmed: false,
    sortDate: "2026-12-31",
    displayDate: null,
    startDate: null,
  },
];

// Everything still to come, soonest first.
export function upcomingEvents(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return EVENTS.filter((event) => event.sortDate >= today).sort((a, b) =>
    a.sortDate.localeCompare(b.sortDate),
  );
}

// Mobile shows one poster, not four — the next session only.
export function nextEvent(now = new Date()) {
  return upcomingEvents(now)[0] ?? null;
}

// Only confirmed sessions are eligible for Event markup. See the note at
// the top of this file before relaxing that.
export function structuredDataEvents(now = new Date()) {
  return upcomingEvents(now).filter((event) => event.confirmed);
}
