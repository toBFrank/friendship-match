import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCsv, parsePairs } from "./pairs.mjs";
import { buildMatchEmail, groupMatchesByRecipient, idempotencyKey } from "./email.mjs";
import { createResendClient } from "./resend.mjs";
import { sendMatchEmails } from "./send.mjs";

const HEADER = "a_name,a_email,a_instagram,b_name,b_email,b_instagram,score";

test("parseCsv handles quotes, escaped quotes, CRLF and blank lines", () => {
  const rows = parseCsv('name,note\r\n"Chen, Avery","said ""hi"""\r\n\r\nSam,ok\n');
  assert.deepEqual(rows, [
    ["name", "note"],
    ["Chen, Avery", 'said "hi"'],
    ["Sam", "ok"],
  ]);
});

test("parsePairs normalizes emails and instagram handles", () => {
  const { pairs, errors } = parsePairs(
    `${HEADER}\nAvery Chen, Avery@UAlberta.ca ,@avery,Jordan Patel,jordan@ualberta.ca,,91.5\n`,
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(pairs, [
    {
      a: { name: "Avery Chen", email: "avery@ualberta.ca", instagram: "avery" },
      b: { name: "Jordan Patel", email: "jordan@ualberta.ca", instagram: null },
      score: 91.5,
    },
  ]);
});

test("parsePairs only requires names and emails", () => {
  const { pairs, errors } = parsePairs("b_email,b_name,a_email,a_name\nb@x.ca,B,a@x.ca,A\n");
  assert.deepEqual(errors, []);
  assert.equal(pairs[0].score, null);
  assert.equal(pairs[0].a.instagram, null);
});

test("parsePairs reports missing columns and bad rows with line numbers", () => {
  assert.deepEqual(parsePairs("a_name,a_email\n").errors, [
    "Missing required column(s): b_name, b_email",
  ]);

  const { pairs, errors } = parsePairs(
    [
      HEADER,
      "A,a@x.ca,,B,,,",
      "A,not-an-email,,B,b@x.ca,,",
      "A,a@x.ca,,A2,A@x.ca,,",
      "A,a@x.ca,,B,b@x.ca,,high",
    ].join("\n"),
  );
  assert.equal(pairs.length, 0);
  assert.deepEqual(errors, [
    "Line 2: missing b_email",
    "Line 3: invalid email not-an-email",
    "Line 4: a@x.ca is matched with themselves",
    'Line 5: score "high" is not a number',
  ]);
});

const avery = { name: "Avery Chen", email: "avery@x.ca", instagram: "avery" };
const jordan = { name: "Jordan Patel", email: "jordan@x.ca", instagram: null };
const sam = { name: "Sam <b>Rivera</b>", email: "sam@x.ca", instagram: null };

test("each participant gets one email listing all of their matches", () => {
  const groups = groupMatchesByRecipient([
    { a: avery, b: jordan, score: 91.5 },
    { a: avery, b: sam, score: null },
  ]);
  assert.deepEqual(
    groups.map((g) => [g.recipient.email, g.matches.map((m) => m.email)]),
    [
      ["avery@x.ca", ["jordan@x.ca", "sam@x.ca"]],
      ["jordan@x.ca", ["avery@x.ca"]],
      ["sam@x.ca", ["avery@x.ca"]],
    ],
  );

  const averyEmail = buildMatchEmail(groups[0]);
  assert.equal(averyEmail.to, "avery@x.ca");
  assert.equal(averyEmail.subject, "You have 2 new matches on My Flock!");
  assert.match(averyEmail.text, /^Hi Avery,/);
  assert.match(averyEmail.text, /- Jordan Patel \(email: jordan@x\.ca, 91\.5% match\)/);

  const jordanEmail = buildMatchEmail(groups[1]);
  assert.equal(jordanEmail.subject, "You've been matched on My Flock!");
  assert.match(jordanEmail.text, /Instagram: @avery/);
  assert.match(jordanEmail.html, /href="https:\/\/instagram\.com\/avery"/);
});

test("match email HTML escapes user-provided names", () => {
  const [group] = groupMatchesByRecipient([{ a: avery, b: sam, score: null }]);
  const { html } = buildMatchEmail(group);
  assert.ok(html.includes("Sam &lt;b&gt;Rivera&lt;/b&gt;"));
  assert.ok(!html.includes("<b>Rivera</b>"));
});

test("idempotency key is stable regardless of match order", () => {
  const key1 = idempotencyKey({ recipient: avery, matches: [jordan, sam] });
  const key2 = idempotencyKey({ recipient: avery, matches: [sam, jordan] });
  const other = idempotencyKey({ recipient: avery, matches: [jordan] });
  assert.equal(key1, key2);
  assert.notEqual(key1, other);
  assert.match(key1, /^match-result\/[0-9a-f]{64}$/);
});

function fakeResponse(status, body, headers = {}) {
  return {
    status,
    ok: status >= 200 && status < 300,
    statusText: `status ${status}`,
    headers: { get: (name) => headers[name.toLowerCase()] ?? null },
    json: async () => body,
  };
}

test("Resend client posts the email with auth and idempotency headers", async () => {
  const calls = [];
  const client = createResendClient({
    apiKey: "re_test",
    from: "My Flock <match@example.com>",
    replyTo: "team@example.com",
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return fakeResponse(200, { id: "email_1" });
    },
  });

  const result = await client.sendEmail(
    { to: "avery@x.ca", subject: "S", text: "T", html: "<p>H</p>" },
    { idempotencyKey: "key-1" },
  );

  assert.deepEqual(result, { id: "email_1" });
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers.Authorization, "Bearer re_test");
  assert.equal(calls[0].init.headers["Idempotency-Key"], "key-1");
  assert.deepEqual(JSON.parse(calls[0].init.body), {
    from: "My Flock <match@example.com>",
    to: ["avery@x.ca"],
    subject: "S",
    text: "T",
    html: "<p>H</p>",
    reply_to: "team@example.com",
  });
});

test("Resend client retries on 429 and surfaces API errors", async () => {
  const responses = [
    fakeResponse(429, {}, { "retry-after": "2" }),
    fakeResponse(422, { message: "Invalid `to` field" }),
  ];
  const waits = [];
  const client = createResendClient({
    apiKey: "re_test",
    from: "f@example.com",
    fetchImpl: async () => responses.shift(),
    wait: async (ms) => waits.push(ms),
  });

  await assert.rejects(
    client.sendEmail({ to: "x", subject: "", text: "", html: "" }),
    /Resend 422: Invalid `to` field/,
  );
  assert.deepEqual(waits, [2000]);
});

test("Resend client requires an API key and sender", () => {
  assert.throws(() => createResendClient({ from: "f@example.com" }), /RESEND_API_KEY/);
  assert.throws(() => createResendClient({ apiKey: "re_test" }), /MATCH_EMAIL_FROM/);
});

test("sendMatchEmails dry run sends nothing", async () => {
  const logs = [];
  const result = await sendMatchEmails({
    pairs: [{ a: avery, b: jordan, score: null }],
    client: null,
    log: (line) => logs.push(line),
  });
  assert.equal(result.sent.length, 2);
  assert.equal(logs.length, 2);
  assert.ok(logs[0].startsWith("[dry run] avery@x.ca"));
});

test("sendMatchEmails keeps going after a failure and reports it", async () => {
  const sentTo = [];
  const client = {
    sendEmail: async (email, { idempotencyKey: key }) => {
      assert.ok(key);
      if (email.to === "jordan@x.ca") throw new Error("Resend 500: boom");
      sentTo.push(email.to);
      return { id: `id-${email.to}` };
    },
  };

  const waits = [];
  const { sent, failed } = await sendMatchEmails({
    pairs: [
      { a: avery, b: jordan, score: null },
      { a: sam, b: jordan, score: null },
    ],
    client,
    dryRun: false,
    log: () => {},
    wait: async (ms) => waits.push(ms),
  });

  assert.deepEqual(sentTo, ["avery@x.ca", "sam@x.ca"]);
  assert.deepEqual(sent.map((s) => s.id), ["id-avery@x.ca", "id-sam@x.ca"]);
  assert.deepEqual(failed, [{ to: "jordan@x.ca", error: "Resend 500: boom" }]);
  assert.equal(waits.length, 2);
});
