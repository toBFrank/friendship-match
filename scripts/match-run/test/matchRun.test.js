import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeParticipants, runMatch } from "../lib/matchRun.js";
import { interestSimilarity, personalitySimilarity, scoreParticipants } from "../lib/score.js";
import { escapeCsvValue, pairsToCsv, PAIR_COLUMNS } from "../lib/csv.js";

const SCRIPT = fileURLToPath(new URL("../run-match.js", import.meta.url));
const SAMPLE = fileURLToPath(new URL("../sample-participants.json", import.meta.url));

function person(id, interests = [], answers = []) {
  return {
    id,
    firstName: id,
    lastName: "",
    email: `${id}@example.com`,
    instagram: "",
    interests,
    personalityAnswers: answers.map(([questionId, likertValue]) => ({ questionId, likertValue })),
  };
}

test("interestSimilarity is Jaccard and null when a side is empty", () => {
  assert.equal(interestSimilarity(person("a", [1, 2, 3]), person("b", [2, 3, 4])), 0.5);
  assert.equal(interestSimilarity(person("a", [1]), person("b", [])), null);
});

test("personalitySimilarity compares only shared questions", () => {
  const a = person("a", [], [[1, 4], [2, 1], [3, 2]]);
  const b = person("b", [], [[1, 4], [2, 4], [9, 1]]);
  // q1 identical (1), q2 opposite ends (0) -> mean 0.5
  assert.equal(personalitySimilarity(a, b), 0.5);
  assert.equal(personalitySimilarity(a, person("c", [], [[9, 1]])), null);
});

test("scoreParticipants averages available dimensions and stays in [0, 1]", () => {
  const a = person("a", [1, 2], [[1, 4]]);
  assert.equal(scoreParticipants(a, person("b", [1, 2], [[1, 4]])), 1);
  assert.equal(scoreParticipants(a, person("c", [3], [[1, 1]])), 0);
  assert.equal(scoreParticipants(a, person("d", [1, 2])), 1);
  assert.equal(scoreParticipants(person("e"), person("f")), 0);
});

test("normalizeParticipants skips missing/duplicate emails and lowercases", () => {
  const { participants, warnings } = normalizeParticipants([
    { firstName: "A", email: " A@Example.com ", instagram: "@a.handle", interests: [1, "x"] },
    { firstName: "Dup", email: "a@example.com", interests: [1] },
    { firstName: "NoEmail", interests: [1] },
  ]);
  assert.equal(participants.length, 1);
  assert.equal(participants[0].email, "a@example.com");
  assert.equal(participants[0].id, "a@example.com");
  assert.equal(participants[0].instagram, "a.handle");
  assert.deepEqual(participants[0].interests, [1]);
  assert.equal(warnings.length, 2);
  assert.throws(() => normalizeParticipants({}), /JSON array/);
});

test("runMatch pairs best matches one-to-one and reports the odd one out", () => {
  const people = [
    person("a", [1, 2]),
    person("b", [3, 4]),
    person("c", [1, 2]),
    person("d", [3, 4]),
    person("e", [5]),
  ];
  const { pairs, unmatched } = runMatch(people);
  assert.deepEqual(
    pairs.map((p) => [p.a.id, p.b.id, p.score]),
    [["a", "c", 1], ["b", "d", 1]],
  );
  assert.deepEqual(unmatched.map((p) => p.id), ["e"]);
});

test("runMatch is deterministic regardless of input order", () => {
  const people = [person("a", [1]), person("b", [1]), person("c", [1]), person("d", [1])];
  const ids = (r) => r.pairs.map((p) => `${p.a.id}-${p.b.id}`);
  assert.deepEqual(ids(runMatch(people)), ids(runMatch([...people].reverse())));
});

test("escapeCsvValue quotes special chars and neutralizes formulas", () => {
  assert.equal(escapeCsvValue("plain"), "plain");
  assert.equal(escapeCsvValue('say "hi", ok'), '"say ""hi"", ok"');
  assert.equal(escapeCsvValue("=HYPERLINK(1)"), "'=HYPERLINK(1)");
  assert.equal(escapeCsvValue(3), "3");
});

test("pairsToCsv writes a header plus one row per pair", () => {
  const csv = pairsToCsv([{ a: person("a"), b: person("b"), score: 0.5 }]);
  const lines = csv.trimEnd().split("\r\n");
  assert.equal(lines[0], PAIR_COLUMNS.join(","));
  assert.equal(lines[1], "1,0.5000,a,a,,a@example.com,,b,b,,b@example.com,");
});

test("CLI writes pairs CSV for the sample input", () => {
  const out = join(mkdtempSync(join(tmpdir(), "match-run-")), "pairs.csv");
  const stdout = execFileSync(process.execPath, [SCRIPT, "--input", SAMPLE, "--output", out], {
    encoding: "utf8",
  });
  assert.match(stdout, /Matched 2 pair\(s\) from 5 participant\(s\)/);
  assert.match(stdout, /Unmatched: emerson@example\.com/);
  const rows = readFileSync(out, "utf8").trimEnd().split("\r\n");
  assert.equal(rows.length, 3);
  // Highest-scoring pair comes first.
  assert.match(rows[1], /^1,0\.80\d\d,.*casey@example\.com.*devon@example\.com/);
  assert.match(rows[2], /^2,0\.73\d\d,.*avery@example\.com.*blake@example\.com/);
});

test("CLI fails with fewer than 2 valid participants", () => {
  const dir = mkdtempSync(join(tmpdir(), "match-run-"));
  const input = join(dir, "one.json");
  writeFileSync(input, JSON.stringify([{ email: "solo@example.com", interests: [1] }]));
  assert.throws(
    () => execFileSync(process.execPath, [SCRIPT, "--input", input, "--output", join(dir, "x.csv")], { stdio: "pipe" }),
    (err) => err.status === 1 && /at least 2 valid participants/.test(err.stderr.toString()),
  );
});
