// /api/send-email.js
export const config = { runtime: "nodejs" };

const REQUIRED_ENVS = ["RESEND_API_KEY", "FROM_EMAIL", "TO_EMAIL"];
const ALLOW_ORIGIN = process.env.ALLOWED_ORIGIN; // optional; omit for same-origin

function json(res, code, body) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (ALLOW_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  res.status(code).end(JSON.stringify(body));
}

export default async function handler(req, res) {
  try {
    if (req.method === "OPTIONS") return json(res, 204, {});
    if (req.method !== "POST")
      return json(res, 405, { error: "METHOD_NOT_ALLOWED" });

    const missing = REQUIRED_ENVS.filter((k) => !process.env[k]);
    if (missing.length)
      return json(res, 500, { error: "MISSING_ENV", missing });

    let body;
    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};
    } catch (e) {
      return json(res, 400, {
        error: "BAD_JSON",
        detail: String(e?.message || e),
      });
    }

    const { name, email, subject, message, botField } = body;

    if (botField)
      return json(res, 200, { ok: true, skipped: true, reason: "honeypot" });
    if (!name || !email || !subject || !message) {
      return json(res, 400, {
        error: "MISSING_FIELDS",
        fields: {
          name: !!name,
          email: !!email,
          subject: !!subject,
          message: !!message,
        },
      });
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

    let data = {};
    try {
      data = await r.json();
    } catch {}

    if (!r.ok)
      return json(res, 502, {
        error: "RESEND_FAILED",
        status: r.status,
        detail: data,
      });

    return json(res, 200, { ok: true, id: data.id || null });
  } catch (err) {
    return json(res, 500, {
      error: "SERVER_ERROR",
      message: String(err?.message || err),
    });
  }
}
