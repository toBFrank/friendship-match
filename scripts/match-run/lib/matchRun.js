import { scoreParticipants } from "./score.js";

// Normalizes raw questionnaire submissions (same field names as the frontend's
// QuestionnairePage state + AccountFormData). Invalid records and duplicate emails
// are skipped with a warning rather than aborting the whole run.
export function normalizeParticipants(records) {
  if (!Array.isArray(records)) {
    throw new Error("Input must be a JSON array of participants.");
  }

  const participants = [];
  const warnings = [];
  const seenEmails = new Set();

  records.forEach((record, index) => {
    const label = `record #${index + 1}`;
    const email = typeof record?.email === "string" ? record.email.trim().toLowerCase() : "";
    if (!email) {
      warnings.push(`${label}: missing email, skipped.`);
      return;
    }
    if (seenEmails.has(email)) {
      warnings.push(`${label}: duplicate email ${email}, skipped.`);
      return;
    }
    seenEmails.add(email);

    const interests = Array.isArray(record.interests)
      ? record.interests.filter((id) => Number.isInteger(id))
      : [];
    const personalityAnswers = Array.isArray(record.personalityAnswers)
      ? record.personalityAnswers.filter(
          (ans) => Number.isInteger(ans?.questionId) && Number.isFinite(ans?.likertValue),
        )
      : [];
    if (interests.length === 0 && personalityAnswers.length === 0) {
      warnings.push(`${label} (${email}): no interests or personality answers; can only score 0.`);
    }

    participants.push({
      id: String(record.id ?? email),
      firstName: String(record.firstName ?? "").trim(),
      lastName: String(record.lastName ?? "").trim(),
      email,
      // Bare handle: a leading "@" would trip the CSV formula guard.
      instagram: String(record.instagram ?? "").trim().replace(/^@+/, ""),
      interests,
      personalityAnswers,
    });
  });

  return { participants, warnings };
}

// One-to-one pairing: score every pair, then greedily take the highest-scoring
// pair whose members are both still free. Ties break on participant id so a
// re-run over the same input produces the same CSV.
export function runMatch(participants, score = scoreParticipants) {
  const candidates = [];
  for (let i = 0; i < participants.length; i++) {
    for (let j = i + 1; j < participants.length; j++) {
      const [a, b] = [participants[i], participants[j]].sort((x, y) => x.id.localeCompare(y.id));
      candidates.push({ a, b, score: score(a, b) });
    }
  }
  candidates.sort(
    (x, y) => y.score - x.score || x.a.id.localeCompare(y.a.id) || x.b.id.localeCompare(y.b.id),
  );

  const paired = new Set();
  const pairs = [];
  for (const candidate of candidates) {
    if (paired.has(candidate.a.id) || paired.has(candidate.b.id)) continue;
    paired.add(candidate.a.id);
    paired.add(candidate.b.id);
    pairs.push(candidate);
  }

  const unmatched = participants.filter((p) => !paired.has(p.id));
  return { pairs, unmatched };
}
