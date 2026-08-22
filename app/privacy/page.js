import Nav from "@/components/Nav";
import NavClearance from "@/components/NavClearance";
import Footer from "@/components/Footer";
import { LEGAL } from "@/lib/legal";

// Privacy notice.
//
// Required, not optional: the site collects personal data in two places —
// the enquiry form and the mailing list — and Kenya's Data Protection Act
// 2019 requires people to be told what happens to it BEFORE they hand it
// over. UK GDPR applies too, since the owning company is English.
//
// Deliberately plain HTML rather than the --stage system. This is a
// document, not a composition; it should be readable at any width and
// printable, and nobody should have to fight the layout to find the
// deletion request address.
//
// NOT LEGAL ADVICE. The structure and disclosures are conventional, but a
// Kenyan-qualified lawyer should review before this is relied on —
// particularly the controller/processor split between the two companies.

export const metadata = {
  title: "Privacy Notice",
  description:
    "How Umojah Sound System collects, uses and stores personal data from enquiries and mailing list signups.",
  alternates: { canonical: "/privacy" },
  // Useful to visitors, not something we want ranking.
  robots: { index: false, follow: true },
};

const UPDATED = "August 2026";

function Section({ title, children }) {
  return (
    <section className="mt-8">
      <h2 className="font-heading text-lg uppercase tracking-[0.04em] text-earth">
        {title}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function Privacy() {
  return (
    <>
      <Nav />
      <main className="paper min-h-screen bg-bone px-5 pb-16 md:px-12">
        <NavClearance desktop={0.03} mobile={56} />

        <article className="mx-auto max-w-2xl font-body text-[0.95rem] leading-relaxed text-earth">
          <h1 className="font-display text-3xl uppercase leading-none tracking-[0.04em] text-earth">
            Privacy Notice
          </h1>
          <p className="mt-2 text-[0.8rem] text-earth/70">
            Last updated {UPDATED}
          </p>

          <Section title="Who we are">
            <p>
              This site is published by {LEGAL.owner.name}, registered in{" "}
              {LEGAL.owner.jurisdiction} under company number{" "}
              {LEGAL.owner.number}. Operations in Kenya are carried out by{" "}
              {LEGAL.operator.name}, company number {LEGAL.operator.number}.
            </p>
            <p>
              For questions about this notice, or to make any of the requests
              described below, contact{" "}
              <a href={`mailto:${LEGAL.privacyContact}`} className="underline">
                {LEGAL.privacyContact}
              </a>
              .
            </p>
          </Section>

          <Section title="What we collect">
            <p>
              <strong>If you send an enquiry:</strong> your name, email address,
              the service you selected, an approximate date, a location or venue
              if you give one, and whatever you write in the message. We collect
              this so we can reply and discuss the work.
            </p>
            <p>
              <strong>If you join the Umojah Records mailing list:</strong> your
              email address only. We use it to tell you about new music and
              events, roughly once a month.
            </p>
            <p>
              We do not collect anything else. There is no account to create, no
              profile built, and no data bought from or sold to anyone.
            </p>
          </Section>

          <Section title="Cookies and analytics">
            <p>
              This site sets <strong>no tracking cookies</strong>. We use Vercel
              Analytics, which counts page views without cookies and without
              identifying individual visitors or following them to other sites.
              There is nothing to consent to and nothing to opt out of, because
              nothing about you is stored.
            </p>
          </Section>

          <Section title="Where your data goes">
            <p>
              Enquiries and mailing list addresses are handled by{" "}
              <a href="https://resend.com" className="underline">
                Resend
              </a>
              , an email service based in the United States. The site itself is
              hosted by{" "}
              <a href="https://vercel.com" className="underline">
                Vercel
              </a>
              , also based in the United States.
            </p>
            <p>
              <strong>
                This means your data leaves Kenya and is stored outside it.
              </strong>{" "}
              We tell you this because Kenya&rsquo;s Data Protection Act 2019
              requires cross-border transfers to be disclosed. Both providers
              operate under standard contractual data protection terms.
            </p>
            <p>
              Enquiries also arrive in our email inboxes, which are hosted by
              Google.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Enquiries are kept for {LEGAL.enquiryRetentionYears} years from
              our last contact with you, then deleted. Two years because event
              work is seasonal and people often come back the following year,
              and we would rather still have the thread than ask you to explain
              it all again.
            </p>
            <p>
              Mailing list addresses are kept until you unsubscribe. There is no
              time limit on that, because the list only exists to reach people
              who chose to be on it.
            </p>
            <p>
              You can ask us to delete either sooner. See{" "}
              <em>Your rights</em> below.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              Under Kenya&rsquo;s Data Protection Act 2019 — and the UK GDPR,
              which applies because the publishing company is English — you can
              ask us to show you what we hold about you, correct it, delete it,
              or stop using it. You can also object to us using it at all.
            </p>
            <p>
              Email{" "}
              <a href={`mailto:${LEGAL.privacyContact}`} className="underline">
                {LEGAL.privacyContact}
              </a>{" "}
              and we will act on it. You do not need to give a reason, and it
              costs nothing.
            </p>
            <p>
              Every mailing list email carries an unsubscribe link. One click and
              you are removed.
            </p>
          </Section>

          <Section title="Changes">
            <p>
              If this notice changes, the date at the top changes with it. We
              will not quietly start doing something with your data that this
              page does not describe.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}
