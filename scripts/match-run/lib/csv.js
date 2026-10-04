export const PAIR_COLUMNS = [
  "pair_number",
  "score",
  "user_a_id",
  "user_a_first_name",
  "user_a_last_name",
  "user_a_email",
  "user_a_instagram",
  "user_b_id",
  "user_b_first_name",
  "user_b_last_name",
  "user_b_email",
  "user_b_instagram",
];

// Quotes a value per RFC 4180. Strings starting with a formula trigger are
// prefixed with ' so user-entered names can't execute in Excel/Sheets.
export function escapeCsvValue(value) {
  let text = String(value ?? "");
  if (typeof value === "string" && /^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function pairsToCsv(pairs) {
  const rows = pairs.map(({ a, b, score }, index) => [
    index + 1,
    score.toFixed(4),
    a.id,
    a.firstName,
    a.lastName,
    a.email,
    a.instagram,
    b.id,
    b.firstName,
    b.lastName,
    b.email,
    b.instagram,
  ]);
  return [PAIR_COLUMNS, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\r\n") + "\r\n";
}
