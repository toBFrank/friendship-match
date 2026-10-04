#!/usr/bin/env node
// US-3.011: Admin script to manually trigger a match run and export pairs to CSV.
// Usage: node scripts/match-run/run-match.js --input <participants.json> [--output <pairs.csv>]

import { readFileSync, writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { normalizeParticipants, runMatch } from "./lib/matchRun.js";
import { pairsToCsv } from "./lib/csv.js";

const USAGE = `Usage: node scripts/match-run/run-match.js --input <participants.json> [--output <pairs.csv>]

  -i, --input   JSON array of questionnaire submissions (required)
  -o, --output  CSV file to write (default: match-run-<timestamp>.csv in the current directory)
  -h, --help    Show this message`;

function defaultOutputPath(now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace("T", "-").slice(0, 15);
  return `match-run-${stamp}.csv`;
}

function main(argv) {
  const { values } = parseArgs({
    args: argv,
    options: {
      input: { type: "string", short: "i" },
      output: { type: "string", short: "o" },
      help: { type: "boolean", short: "h" },
    },
  });

  if (values.help) {
    console.log(USAGE);
    return 0;
  }
  if (!values.input) {
    console.error(`Missing --input.\n\n${USAGE}`);
    return 1;
  }

  const records = JSON.parse(readFileSync(values.input, "utf8"));
  const { participants, warnings } = normalizeParticipants(records);
  warnings.forEach((w) => console.error(`warning: ${w}`));

  if (participants.length < 2) {
    console.error(`Need at least 2 valid participants to run a match, got ${participants.length}.`);
    return 1;
  }

  const { pairs, unmatched } = runMatch(participants);
  const outputPath = values.output ?? defaultOutputPath();
  writeFileSync(outputPath, pairsToCsv(pairs));

  console.log(`Matched ${pairs.length} pair(s) from ${participants.length} participant(s).`);
  unmatched.forEach((p) => console.log(`Unmatched: ${p.email}`));
  console.log(`Wrote ${outputPath}`);
  return 0;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (err) {
  console.error(`error: ${err.message}`);
  process.exitCode = 1;
}
