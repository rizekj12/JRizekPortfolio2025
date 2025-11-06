// /api/send-email.js  (Vercel Node.js function - CommonJS)
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const { name, email, subject, message, botField } = body;

    // 1) Honeypot: if filled, silently accept but don't send
    if (botField) {
      return res
        .status(200)
        .json({ ok: true, skipped: true, reason: "honeypot" });
    }

    // 2) Validate
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 3) Build payload for Resend REST API
    const payload = {
      from: process.env.FROM_EMAIL, // e.g. "Portfolio <onboarding@resend.dev>"
      to: [process.env.TO_EMAIL], // your inbox
      subject: `Portfolio Contact — ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      reply_to: email, // Resend REST uses "reply_to"
    };

    // 4) Call Resend
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    // 5) Surface errors clearly
    if (!r.ok) {
      console.error("Resend error:", r.status, data);
      return res
        .status(502)
        .json({ error: "ResendFailed", status: r.status, detail: data });
    }

    // Success: Resend returns an id like { id: "xxxxxxxx" }
    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    console.error("send-email error:", err);
    return res.status(500).json({ error: "ServerError" });
  }
};
