// /api/ping.js
module.exports.config = { runtime: "nodejs20.x" };

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.status(200).end(
    JSON.stringify({
      ok: true,
      node: process.versions.node,
      env: {
        RESEND_API_KEY: !!process.env.RESEND_API_KEY,
        FROM_EMAIL: !!process.env.FROM_EMAIL,
        TO_EMAIL: !!process.env.TO_EMAIL,
      },
    })
  );
};
