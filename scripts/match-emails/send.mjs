import { buildMatchEmail, groupMatchesByRecipient, idempotencyKey } from "./email.mjs";

// Resend's default rate limit is a few requests per second per team.
export const DEFAULT_DELAY_MS = 600;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Emails every participant their match result. One failed recipient doesn't stop
// the rest; failures are returned so the caller can report them and re-run.
export async function sendMatchEmails({
  pairs,
  client,
  dryRun = true,
  delayMs = DEFAULT_DELAY_MS,
  log = console.log,
  wait = sleep,
}) {
  const groups = groupMatchesByRecipient(pairs);
  const sent = [];
  const failed = [];

  for (const [index, group] of groups.entries()) {
    const email = buildMatchEmail(group);

    if (dryRun) {
      log(`[dry run] ${email.to}: "${email.subject}"\n${email.text}\n`);
      sent.push({ to: email.to, id: null });
      continue;
    }

    if (index > 0 && delayMs > 0) await wait(delayMs);

    try {
      const { id } = await client.sendEmail(email, { idempotencyKey: idempotencyKey(group) });
      log(`sent ${email.to} (${id})`);
      sent.push({ to: email.to, id });
    } catch (error) {
      log(`FAILED ${email.to}: ${error.message}`);
      failed.push({ to: email.to, error: error.message });
    }
  }

  return { sent, failed };
}
