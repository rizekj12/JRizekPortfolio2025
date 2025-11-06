// /api/send-email.js — Vercel serverless (Node 18/20, CommonJS)

const REQUIRED_ENVS = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"];

// OPTIONAL: set this to your site origin if you need cross-origin testing.
// For same-origin calls (fetch("/api/send-email")), you can leave it undefined.
const ALLOW_ORIGIN = process.env.ALLOWED_ORIGIN; // e.g. "https://your-app.vercel.app"

function setHeaders(res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (ALLOW_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
}

module.exports = async (req, res) => {
  setHeaders(res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).end(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }));

  try {
    // 1) Env guard
    const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
    if (missing.length) {
      return res.status(500).end(
        JSON.stringify({
          error: "MISSING_ENV",
          missing,
          note: "Add these in Vercel → Project → Settings → Environment Variables and redeploy.",
        })
      );
    }

    // 2) Parse body (Vercel may give string or object)
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const { name, email, subject, message, botField } = body;

    // 3) Honeypot
    if (botField)
      return res
        .status(200)
        .end(JSON.stringify({ ok: true, skipped: true, reason: "honeypot" }));

    // 4) Field validation
    if (!name || !email || !subject || !message) {
      return res.status(400).end(
        JSON.stringify({
          error: "MISSING_FIELDS",
          fields: {
            name: !!name,
            email: !!email,
            subject: !!subject,
            message: !!message,
          },
        })
      );
    }

    // 5) Build Resend payload (REST)
    const payload = {
      from: process.env.FROM_EMAIL, // e.g. "Portfolio <onboarding@resend.dev>"
      to: [process.env.TO_EMAIL], // your inbox
      subject: `Portfolio Contact — ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      reply_to: email, // REST field name is reply_to
    };

    // 6) Send via Resend REST
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json().catch(() => ({}));

    if (!r.ok) {
      // Surface exact reason as JSON (so your front-end .json() works)
      return res.status(502).end(
        JSON.stringify({
          error: "RESEND_FAILED",
          status: r.status,
          detail: data,
        })
      );
    }

    // Success — Resend returns { id }
    return res
      .status(200)
      .end(JSON.stringify({ ok: true, id: data.id || null }));
  } catch (err) {
    // Always JSON (no plain text) so r.json() doesn't blow up
    return res.status(500).end(
      JSON.stringify({
        error: "SERVER_ERROR",
        message: String(err?.message || err),
      })
    );
  }
};
