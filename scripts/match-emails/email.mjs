import { createHash } from "node:crypto";

const APP_NAME = "My Flock";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function firstName(name) {
  return name.split(/\s+/)[0];
}

// Score is a 0–100 compatibility percentage, shown like the PRD's "99.99% Match".
function formatScore(score) {
  return `${Number(score.toFixed(2))}% match`;
}

// Groups pairs so each participant gets a single email listing all of their matches.
export function groupMatchesByRecipient(pairs) {
  const recipients = new Map();

  const add = (person, match, score) => {
    if (!recipients.has(person.email)) {
      recipients.set(person.email, { recipient: person, matches: [] });
    }
    recipients.get(person.email).matches.push({ ...match, score });
  };

  for (const { a, b, score } of pairs) {
    add(a, b, score);
    add(b, a, score);
  }

  return [...recipients.values()];
}

export function buildMatchEmail({ recipient, matches }) {
  const plural = matches.length > 1;
  const subject = plural
    ? `You have ${matches.length} new matches on ${APP_NAME}!`
    : `You've been matched on ${APP_NAME}!`;

  const textLines = matches.map((match) => {
    const details = [`email: ${match.email}`];
    if (match.instagram) details.push(`Instagram: @${match.instagram}`);
    if (match.score !== null) details.push(formatScore(match.score));
    return `- ${match.name} (${details.join(", ")})`;
  });

  const text = [
    `Hi ${firstName(recipient.name)},`,
    "",
    plural ? "Your matches are in:" : "Your match is in:",
    "",
    ...textLines,
    "",
    "Say hi and make a plan to meet up. Good luck!",
    "",
    `- The ${APP_NAME} team`,
  ].join("\n");

  const htmlItems = matches
    .map((match) => {
      const instagram = match.instagram
        ? ` &middot; Instagram: <a href="https://instagram.com/${encodeURIComponent(match.instagram)}">@${escapeHtml(match.instagram)}</a>`
        : "";
      const score = match.score !== null ? ` &middot; ${escapeHtml(formatScore(match.score))}` : "";
      return `<li><strong>${escapeHtml(match.name)}</strong> &middot; <a href="mailto:${escapeHtml(match.email)}">${escapeHtml(match.email)}</a>${instagram}${score}</li>`;
    })
    .join("");

  const html = [
    `<p>Hi ${escapeHtml(firstName(recipient.name))},</p>`,
    `<p>${plural ? "Your matches are in:" : "Your match is in:"}</p>`,
    `<ul>${htmlItems}</ul>`,
    "<p>Say hi and make a plan to meet up. Good luck!</p>",
    `<p>The ${APP_NAME} team</p>`,
  ].join("\n");

  return { to: recipient.email, subject, text, html };
}

// Stable per recipient + match set, so re-running the script within Resend's
// 24h idempotency window doesn't send the same result twice.
export function idempotencyKey({ recipient, matches }) {
  const matchEmails = matches.map((match) => match.email).sort().join(",");
  const digest = createHash("sha256").update(`${recipient.email}|${matchEmails}`).digest("hex");
  return `match-result/${digest}`;
}
