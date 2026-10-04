#!/usr/bin/env node
// US-2.021: Email matched pairs their result via Resend.
//
// Usage:
//   node scripts/send-match-emails.mjs <pairs.csv>          # dry run: prints every email, sends nothing
//   node scripts/send-match-emails.mjs <pairs.csv> --send   # actually sends through Resend
//
// The CSV is the matched-pairs export from the admin match run (US-3.011).
// See scripts/README.md for the column format and required environment variables.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parsePairs } from "./match-emails/pairs.mjs";
import { createResendClient } from "./match-emails/resend.mjs";
import { sendMatchEmails } from "./match-emails/send.mjs";

const envFile = join(dirname(fileURLToPath(import.meta.url)), ".env");
if (existsSync(envFile)) process.loadEnvFile(envFile);

const args = process.argv.slice(2);
const send = args.includes("--send");
const csvPath = args.find((arg) => !arg.startsWith("--"));

if (!csvPath) {
  console.error("Usage: node scripts/send-match-emails.mjs <pairs.csv> [--send]");
  process.exit(1);
}

const { pairs, errors } = parsePairs(readFileSync(csvPath, "utf8"));
if (errors.length > 0) {
  console.error(`Not sending anything; fix ${csvPath} first:\n  ${errors.join("\n  ")}`);
  process.exit(1);
}
if (pairs.length === 0) {
  console.error(`No pairs found in ${csvPath}`);
  process.exit(1);
}

let client = null;
if (send) {
  try {
    client = createResendClient({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.MATCH_EMAIL_FROM,
      replyTo: process.env.MATCH_EMAIL_REPLY_TO,
    });
  } catch (error) {
    console.error(`${error.message}. Copy scripts/.env.example to scripts/.env and fill it in.`);
    process.exit(1);
  }
}

const { sent, failed } = await sendMatchEmails({ pairs, client, dryRun: !send });

console.log(
  send
    ? `\nDone: ${sent.length} sent, ${failed.length} failed (${pairs.length} pairs).`
    : `\nDry run: ${sent.length} emails for ${pairs.length} pairs. Re-run with --send to deliver.`,
);
if (failed.length > 0) process.exit(1);
