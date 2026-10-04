// Parses the matched-pairs CSV produced by the admin match run (US-3.011, #12).
//
// Expected header (column order doesn't matter, extra columns are ignored):
//   a_name,a_email,b_name,b_email[,a_instagram,b_instagram,score]

const REQUIRED_COLUMNS = ["a_name", "a_email", "b_name", "b_email"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Minimal RFC 4180 parser: handles quoted fields, escaped quotes ("") and CRLF.
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((value) => value.trim() !== ""));
}

function normalizeInstagram(handle) {
  const trimmed = (handle ?? "").trim().replace(/^@/, "");
  return trimmed || null;
}

function buildPerson(record, prefix) {
  return {
    name: record[`${prefix}_name`].trim(),
    email: record[`${prefix}_email`].trim().toLowerCase(),
    instagram: normalizeInstagram(record[`${prefix}_instagram`]),
  };
}

// Returns { pairs, errors }. Errors reference 1-based CSV line numbers.
export function parsePairs(csvText) {
  const [header, ...dataRows] = parseCsv(csvText.replace(/^﻿/, ""));
  if (!header) {
    return { pairs: [], errors: ["CSV is empty"] };
  }

  const columns = header.map((name) => name.trim().toLowerCase());
  const missing = REQUIRED_COLUMNS.filter((name) => !columns.includes(name));
  if (missing.length > 0) {
    return { pairs: [], errors: [`Missing required column(s): ${missing.join(", ")}`] };
  }

  const pairs = [];
  const errors = [];

  dataRows.forEach((values, index) => {
    const line = index + 2;
    const record = Object.fromEntries(columns.map((name, i) => [name, values[i] ?? ""]));

    const blank = REQUIRED_COLUMNS.filter((name) => !record[name].trim());
    if (blank.length > 0) {
      errors.push(`Line ${line}: missing ${blank.join(", ")}`);
      return;
    }

    const a = buildPerson(record, "a");
    const b = buildPerson(record, "b");

    const badEmails = [a.email, b.email].filter((email) => !EMAIL_PATTERN.test(email));
    if (badEmails.length > 0) {
      errors.push(`Line ${line}: invalid email ${badEmails.join(", ")}`);
      return;
    }
    if (a.email === b.email) {
      errors.push(`Line ${line}: ${a.email} is matched with themselves`);
      return;
    }

    const rawScore = (record.score ?? "").trim();
    const score = rawScore === "" ? null : Number(rawScore);
    if (score !== null && Number.isNaN(score)) {
      errors.push(`Line ${line}: score "${rawScore}" is not a number`);
      return;
    }

    pairs.push({ a, b, score });
  });

  return { pairs, errors };
}
