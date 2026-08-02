// Contact form handler.
//
// Sends via Resend's REST API using plain fetch — deliberately no SDK, so
// the project gains no new dependency for one HTTP call.
//
// Required environment variables (set these in Vercel → Settings →
// Environment Variables, and in .env.local for dev):
//
//   RESEND_API_KEY    from resend.com
//   CONTACT_TO        where enquiries land. Comma-separate for several,
//                     e.g. "umojahsoundsystem@gmail.com, j.a.savla@gmail.com"
//   CONTACT_FROM      a verified sender on your domain,
//                     e.g. "Umojah Website <site@umojahsoundsystem.com>"
//
// Resend requires the sending domain to be verified. Until then the API
// will reject the send and the form surfaces the error rather than
// silently swallowing it.

const SERVICE_LABELS = {
  hire: "Hire the Equipment",
  build: "Build a Bespoke System",
  experience: "Hire Umojah (Full Experience)",
  general: "General Enquiry",
};

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, service, date, venue, message, ...rest } = body;

  // Honeypot: bots fill hidden fields humans never see.
  if (Object.keys(rest).some((k) => k.startsWith("_"))) {
    return Response.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim()) {
    return Response.json(
      { error: "Name and email are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email looks wrong" }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) {
    console.error("Contact form: missing RESEND_API_KEY / CONTACT_TO / CONTACT_FROM");
    return Response.json(
      { error: "The form isn't configured yet — please email us directly." },
      { status: 503 },
    );
  }

  const label = SERVICE_LABELS[service] ?? "General Enquiry";
  const lines = [
    `Service:  ${label}`,
    `Name:     ${name}`,
    `Email:    ${email}`,
    date ? `Date:     ${date}` : null,
    venue ? `Venue:    ${venue}` : null,
    "",
    message || "(no message)",
  ].filter(Boolean);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      // Comma-separated list -> array, so enquiries can land in more than
      // one inbox without either address being cc'd (each is a direct
      // recipient, and neither sees the other).
      to: CONTACT_TO.split(",").map((address) => address.trim()).filter(Boolean),
      reply_to: email,
      subject: `${label} — ${name}`,
      text: lines.join("\n"),
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("Resend rejected the send:", res.status, detail);
    return Response.json(
      { error: "Couldn't send just now — please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
