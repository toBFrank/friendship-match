// Placeholder compatibility scorer for the manual match run (US-3.011).
//
// This is NOT the matching algorithm — that is US-6.011 (#10). It exists so the
// admin script can run end-to-end today. When #10 lands, replace `scoreParticipants`
// with the real implementation; it only needs to return a number in [0, 1].

const LIKERT_MIN = 1;
const LIKERT_MAX = 4;

// Jaccard similarity of selected interest ids, or null if either side has none.
export function interestSimilarity(a, b) {
  if (a.interests.length === 0 || b.interests.length === 0) return null;
  const setA = new Set(a.interests);
  const shared = b.interests.filter((id) => setA.has(id)).length;
  const union = setA.size + new Set(b.interests).size - shared;
  return shared / union;
}

// Mean per-question closeness of Likert answers, or null if no question overlaps.
// Reversed items don't need special handling: |(5-x) - (5-y)| === |x - y|.
export function personalitySimilarity(a, b) {
  const answersB = new Map(b.personalityAnswers.map((ans) => [ans.questionId, ans.likertValue]));
  const range = LIKERT_MAX - LIKERT_MIN;
  const closeness = [];
  for (const { questionId, likertValue } of a.personalityAnswers) {
    if (!answersB.has(questionId)) continue;
    closeness.push(1 - Math.abs(likertValue - answersB.get(questionId)) / range);
  }
  if (closeness.length === 0) return null;
  return closeness.reduce((sum, c) => sum + c, 0) / closeness.length;
}

// Equal-weight average of whichever dimensions both participants answered.
export function scoreParticipants(a, b) {
  const parts = [interestSimilarity(a, b), personalitySimilarity(a, b)].filter((s) => s !== null);
  if (parts.length === 0) return 0;
  return parts.reduce((sum, s) => sum + s, 0) / parts.length;
}
