import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FIELDS = ["name", "phone", "organization", "email", "state", "members", "message"] as const;
const LIMITS: Record<(typeof FIELDS)[number], number> = {
  name: 120,
  phone: 20,
  organization: 200,
  email: 200,
  state: 80,
  members: 40,
  message: 2000,
};

/** A SadasyaSetu demo request from /sadasyasetu, mailed to the team like the contact form. */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  // Honeypot: report success without sending, so bots learn nothing.
  if (body["bot-field"]) {
    return NextResponse.json({ ok: true });
  }

  const data = Object.fromEntries(
    FIELDS.map((key) => [key, String(body[key] ?? "").trim().slice(0, LIMITS[key])]),
  ) as Record<(typeof FIELDS)[number], string>;

  if (!data.name || !data.organization || !/^[0-9+ -]{10,15}$/.test(data.phone)) {
    return NextResponse.json({ error: "Name, organization and a phone number are needed" }, { status: 400 });
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return NextResponse.json({ error: "Email is not valid" }, { status: 400 });
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!fromEmail || !toEmail) {
    console.error("Demo request: CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL is not set");
    return NextResponse.json({ error: "Email is not configured" }, { status: 500 });
  }

  const lines = [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Organization: ${data.organization}`,
    `Email: ${data.email || "-"}`,
    `State: ${data.state || "-"}`,
    `Members this year: ${data.members || "-"}`,
    "",
    data.message || "(no message)",
  ];

  try {
    const { error } = await resend.emails.send({
      from: `SadasyaSetu <${fromEmail}>`,
      to: toEmail,
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `SadasyaSetu demo request: ${data.organization}`,
      text: lines.join("\n"),
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Demo request send failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
