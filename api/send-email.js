// /api/send-email.js  — Vercel serverless function (Node.js 20.x runtime)

const REQUIRED_ENVS = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"];

module.exports = async (req, res) => {
  // Allow only POST requests (the contact form submits via POST)
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  try {
    // ✅ 1. Make sure environment variables exist
    const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
    if (missing.length) {
      console.error("Missing environment variables:", missing);
      return res.status(500).json({
        error: "MISSING_ENV",
        missing,
        note: "Set these in Vercel → Project → Settings → Environment Variables and redeploy.",
      });
    }

    // ✅ 2. Parse the incoming request body
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const { name, email, subject, message, botField } = body;

    // ✅ 3. Honeypot check (spam prevention)
    if (botField) {
      return res
        .status(200)
        .json({ ok: true, skipped: true, reason: "honeypot" });
    }

    // ✅ 4. Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "MISSING_FIELDS",
        fields: {
          name: !!name,
          email: !!email,
          subject: !!subject,
          message: !!message,
        },
      });
    }

    // ✅ 5. Build Resend API request
    const payload = {
      from: process.env.FROM_EMAIL, // e.g. "Portfolio <onboarding@resend.dev>"
      to: [process.env.TO_EMAIL], // your inbox
      subject: `Portfolio Contact — ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      reply_to: email,
    };

    // ✅ 6. Send email using Resend's REST API
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));

    // ✅ 7. Handle Resend errors
    if (!r.ok) {
      console.error("Resend error:", r.status, data);
      return res.status(502).json({
        error: "RESEND_FAILED",
        status: r.status,
        detail: data,
        hint: "Check that your FROM_EMAIL is valid (e.g. 'Portfolio <onboarding@resend.dev>'), your Resend API key is correct, and your sender is verified.",
      });
    }

    // ✅ 8. Success
    return res.status(200).json({ ok: true, id: data.id || null });
  } catch (err) {
    console.error("send-email fatal error:", err);
    return res
      .status(500)
      .json({ error: "SERVER_ERROR", message: String(err?.message || err) });
  }
};
