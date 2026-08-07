// Umojah Records mailing list.
//
// Adds a contact to a Resend Audience. Same approach as the contact form:
// one plain fetch against the REST API, no SDK, no new dependency.
//
// Required environment variables:
//
//   RESEND_API_KEY      already set — shared with the contact form. Lives
//                       in the shell locally (~/.zshrc), and in Vercel for
//                       production. NOT in .env.local.
//   UMOJAH_RECORDS_AUDIENCE_ID  new. Create an Audience at
//                       https://resend.com/audiences and copy its ID.
//
// Until now this form posted nowhere: someone typed their address, hit
// Subscribe, and it vanished. That's worse than not asking, because it
// burns the one moment a person volunteered their details.

const ENDPOINT = (audienceId) =>
  `https://api.resend.com/audiences/${audienceId}/contacts`;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, ...rest } = body;

  // Honeypot: bots fill hidden fields humans never see. Answer OK so they
  // don't learn anything from the response.
  if (Object.keys(rest).some((key) => key.startsWith("_"))) {
    return Response.json({ ok: true });
  }

  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "That email looks wrong" }, { status: 400 });
  }

  const { RESEND_API_KEY, UMOJAH_RECORDS_AUDIENCE_ID } = process.env;

  // Name the specific offender — a log line is only useful if it narrows
  // something. Values are never logged, only which names were absent.
  const missing = ["RESEND_API_KEY", "UMOJAH_RECORDS_AUDIENCE_ID"].filter(
    (key) => !process.env[key],
  );
  if (missing.length) {
    console.error(
      `Subscribe: missing environment variable(s): ${missing.join(", ")}. ` +
        "UMOJAH_RECORDS_AUDIENCE_ID comes from https://resend.com/audiences and " +
        "must also be set in Vercel, followed by a redeploy.",
    );
    return Response.json(
      { error: "Signups aren't set up yet — please try again soon." },
      { status: 503 },
    );
  }

  const res = await fetch(ENDPOINT(UMOJAH_RECORDS_AUDIENCE_ID), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      // Resend needs this explicitly; without it the contact can land in an
      // unsubscribed state and never receive anything.
      unsubscribed: false,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();

    // Already on the list. Resend treats this as an error; the subscriber
    // shouldn't. Telling someone their second attempt "failed" invites
    // them to try a third time, and they're already signed up.
    if (res.status === 409 || /already exists/i.test(detail)) {
      return Response.json({ ok: true, alreadySubscribed: true });
    }

    console.error("Resend rejected the contact:", res.status, detail);
    return Response.json(
      { error: "Couldn't sign you up just now — please try again." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
