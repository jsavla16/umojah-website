// Corporate and legal facts, in one place.
//
// TWO COMPANIES, TWO JURISDICTIONS.
//
//   Umojah Records Limited (England & Wales, 17350381)
//     Owns the brands. Its Articles of Association vest all Strategic
//     Assets and Intellectual Property Rights in the company (Articles 39
//     and 40), with the brands listed as "Protected Brands" in Schedule 2.
//
//   Sound System Culture (K) Limited (Kenya, PVT-ZQUX333K)
//     Trades in Kenya — the sound system, equipment hire, Nairobi Dub Club.
//
// OPEN POINT for the lawyers, not for this file to solve: the Kenyan
// company uses marks the UK company owns, and nothing yet documents that
// right. An intra-group licence would evidence the ownership and settle
// the transfer-pricing question.
//
// NOT REGISTERED ANYWHERE YET. So the site uses ™ (a claim to a mark,
// which anyone may make) and never ® (a statement that a registration
// exists, which is an offence to make falsely).

export const LEGAL = {
  owner: {
    name: "Umojah Records Limited",
    jurisdiction: "England & Wales",
    number: "17350381",
  },
  operator: {
    name: "Sound System Culture (K) Limited",
    jurisdiction: "Kenya",
    number: "PVT-ZQUX333K",
  },

  // Order matters: the label first, since it's the owning entity.
  marks: ["Umojah Records", "Umojah Sound System", "Nairobi Dub Club"],

  // Dedicated mailbox, kept apart from booking enquiries — a deletion
  // request shouldn't have to compete for attention with a wedding
  // booking, and there are deadlines attached to these.
  //
  // MUST EXIST AND BE MONITORED. The domain is already verified with
  // Resend for sending, but that does not create an inbox. Set up
  // forwarding to a real mailbox before this goes live: publishing an
  // address that bounces is worse than publishing none.
  privacyContact: "privacy@umojahsoundsystem.com",

  // Enquiry retention. Named rather than left as "a reasonable period" —
  // a specific period is defensible; a vague one isn't.
  enquiryRetentionYears: 2,
};

// Rendered rather than hardcoded so it can't go stale in January.
export const copyrightYear = () => new Date().getFullYear();
