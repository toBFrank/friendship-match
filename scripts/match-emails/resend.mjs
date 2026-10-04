// Thin client for Resend's REST API (https://resend.com/docs/api-reference/emails/send-email).

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const MAX_RATE_LIMIT_RETRIES = 3;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function createResendClient({ apiKey, from, replyTo, fetchImpl = fetch, wait = sleep }) {
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  if (!from) throw new Error("MATCH_EMAIL_FROM is not set");

  async function sendEmail({ to, subject, text, html }, { idempotencyKey } = {}) {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;

    const body = JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    });

    for (let attempt = 0; ; attempt++) {
      const response = await fetchImpl(RESEND_EMAILS_URL, { method: "POST", headers, body });

      if (response.status === 429 && attempt < MAX_RATE_LIMIT_RETRIES) {
        const retryAfterSeconds = Number(response.headers.get("retry-after")) || 1;
        await wait(retryAfterSeconds * 1000);
        continue;
      }

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(`Resend ${response.status}: ${payload.message ?? response.statusText}`);
      }
      return payload; // { id }
    }
  }

  return { sendEmail };
}
