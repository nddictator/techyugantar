import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, "bot-field": botField } = body as Record<string, string>;

  // Honeypot: real users never fill this hidden field, so a filled value means a bot.
  // Report success without sending mail, so bots don't learn the field is being checked.
  if (botField) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    console.error("Contact form: CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not set");
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }

  try {
    const { error } = await resend.emails.send({
      from: `Tech Yugantar Support <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `New support ticket from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
