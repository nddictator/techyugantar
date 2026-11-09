import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, "bot-field": botField } = body as Record<string, string>;

  // Honeypot: pretend success so bots don't learn the field is checked.
  if (botField) {
    return NextResponse.json({ ok: true });
  }

  const cleanEmail = String(email ?? "").trim().toLowerCase();
  const cleanName = String(name ?? "").trim().slice(0, 80);
  if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Newsletter: RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Newsletter is not configured" }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  // Optional: put subscribers into a specific Resend segment.
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;

  const { error } = await resend.contacts.create({
    email: cleanEmail,
    firstName: cleanName || undefined,
    unsubscribed: false,
    ...(segmentId ? { segments: [{ id: segmentId }] } : {}),
  });

  // An existing contact is not a failure from the visitor's point of view.
  if (error && !/already exists/i.test(error.message)) {
    console.error("Newsletter: Resend contacts error:", error);
    return NextResponse.json({ error: "Could not subscribe right now. Please try again." }, { status: 502 });
  }

  // Let the team know — non-blocking for the visitor if it fails.
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (fromEmail && toEmail) {
    const { error: notifyError } = await resend.emails.send({
      from: `Tech Yugantar Website <${fromEmail}>`,
      to: toEmail,
      subject: `New newsletter subscriber: ${cleanEmail}`,
      text: `New subscriber\n\nName: ${cleanName || "—"}\nEmail: ${cleanEmail}`,
    });
    if (notifyError) console.error("Newsletter: notify email failed:", notifyError);
  }

  return NextResponse.json({ ok: true });
}
