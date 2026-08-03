// Hire inventory — client-supplied, 3 Aug.
//
// WHY THIS FILE EXISTS
// Each line here is a search someone makes with money in their pocket.
// Right now the site says "hire the equipment" and stops, so none of that
// intent can find us. This is the raw material for:
//
//   1. LocalBusiness structured data (wired up in StructuredData.jsx)
//   2. A dedicated /hire page — see SEO-RESEARCH.txt
//   3. Services section copy once it's rewritten
//
// NAMED MODELS MATTER. Competitors rank on them: soundhirenairobi.co.ke
// has a whole page for "Pioneer CDJ 2000 rental". "Allen & Heath Xone 92"
// is a low-competition, high-intent search — the DJ who wants that mixer
// knows exactly what they want. Generic "amplifier hire" was dropped for
// exactly the opposite reason.

export const HIRE_CATEGORIES = [
  {
    id: "sound-system",
    name: "Sound system",
    items: [
      "Umojah reggae/dub stack — hand-built",
      "Speakers for large events",
      "Speakers for small events",
    ],
    search: [
      "sound system hire Nairobi",
      "reggae sound system hire Kenya",
      "PA system hire Nairobi",
      "public address system hire Kenya",
    ],
  },
  {
    id: "dj",
    name: "DJ equipment",
    items: [
      "Allen & Heath Xone:92 DJ mixer",
      "Pioneer CDJs",
      "Technics SL1210 mark II Turntable"
    ],
    search: [
      "Allen and Heath Xone 92 hire Nairobi",
      "Pioneer CDJ hire Nairobi",
      "CDJ rental Kenya",
      "DJ equipment hire Nairobi",
      "DJ decks hire Kenya",
    ],
  },
  {
    id: "mixing",
    name: "Live mixing",
    items: ["Behringer live mixing booth", "Microphones"],
    search: [
      "live mixing desk hire Nairobi",
      "Behringer mixer hire Kenya",
      "microphone hire Nairobi",
      "sound engineer hire Nairobi",
    ],
  },
  {
    id: "power",
    name: "Power",
    items: ["30kVA generator", "Power cables and distribution"],
    search: [
      "generator hire Nairobi",
      "30kva generator hire Kenya",
      "event power hire Nairobi",
    ],
  },
];

export const HIRE_ITEMS = HIRE_CATEGORIES.flatMap((c) => c.items);

// Deliberately NOT dumped into the keywords meta tag — Google has ignored
// that for years. These belong in real page copy, headings and structured
// data, which is where they carry weight.
export const HIRE_SEARCH_TERMS = HIRE_CATEGORIES.flatMap((c) => c.search);
