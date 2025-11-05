// /api/send-email.js  (Vercel Serverless Function)
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { name, email, subject, message, botField } = req.body || {};
    if (botField) return res.status(200).json({ ok: true }); // silently ignore bots

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const TO = process.env.TO_EMAIL; // your inbox
    const FROM = process.env.FROM_EMAIL; // e.g. "Portfolio <onboarding@resend.dev>" (must be verified)

    const text = [
      `New portfolio contact`,
      `From: ${name} <${email}>`,
      `Subject: ${subject}`,
      ``,
      message,
    ].join("\n");

    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Portfolio Contact — ${subject}`,
      reply_to: email,
      text,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Email failed." });
  }
}
