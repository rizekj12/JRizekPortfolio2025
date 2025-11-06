// /api/send-email.js — Vercel serverless (CommonJS, Node 20)
module.exports.config = { runtime: "nodejs20.x" };

const REQUIRED_ENVS = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"];
const ALLOW_ORIGIN = process.env.ALLOWED_ORIGIN; // optional

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
    const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
    if (missing.length) {
      return res
        .status(500)
        .end(JSON.stringify({ error: "MISSING_ENV", missing }));
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
    const { name, email, subject, message, botField } = body;

    if (botField)
      return res
        .status(200)
        .end(JSON.stringify({ ok: true, skipped: true, reason: "honeypot" }));
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .end(
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

    const payload = {
      from: process.env.FROM_EMAIL, // e.g. "Portfolio <onboarding@resend.dev>"
      to: [process.env.TO_EMAIL],
      subject: `Portfolio Contact — ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      reply_to: email, // REST field name
    };

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
      return res
        .status(502)
        .end(
          JSON.stringify({
            error: "RESEND_FAILED",
            status: r.status,
            detail: data,
          })
        );
    }

    return res
      .status(200)
      .end(JSON.stringify({ ok: true, id: data.id || null }));
  } catch (err) {
    return res
      .status(500)
      .end(
        JSON.stringify({
          error: "SERVER_ERROR",
          message: String(err?.message || err),
        })
      );
  }
};
