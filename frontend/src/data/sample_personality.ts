import type { PersonalityQuestion } from "../types/personality";

// 20 OCEAN-scored questions (4 per trait).
// ocean: O=Openness, C=Conscientiousness, E=Extraversion, A=Agreeableness, N=Neuroticism
// reversed: true means a high rating signals a LOW score for that trait.

const sample_personality: PersonalityQuestion[] = [
  // ── Openness (O) ─────────────────────────────────────────────────────────────
  // { id: 1,  ocean: "O",           text: "I enjoy exploring new ideas, even ones that challenge my existing beliefs." },
  { id: 2,  ocean: "O",           text: "I enjoy trying out new cuisines and regularly eat food from different cultures." },
  // { id: 3,  ocean: "O",           text: "I prefer routines over variety in my day-to-day life.", reversed: true },

  // ── Conscientiousness (C) ─────────────────────────────────────────────────────
  // { id: 4,  ocean: "C",           text: "I keep my space and schedule organized." },
  // { id: 5,  ocean: "C",           text: "I follow through on commitments, even when it is inconvenient." },
  { id: 6,  ocean: "C",           text: "I tend to act on impulse without fully thinking things through.", reversed: true },

  // ── Extraversion (E) ──────────────────────────────────────────────────────────
  // { id: 7,  ocean: "E",           text: "I feel energized after spending time in large groups." },
  // { id: 8,  ocean: "E",           text: "I need plenty of alone time to feel recharged.", reversed: true },
  { id: 9,  ocean: "E",           text: "I strike up conversations with strangers easily." },

  // ── Agreeableness (A) ─────────────────────────────────────────────────────────
  // { id: 10, ocean: "A",           text: "I tend to trust that most people have good intentions." },
  { id: 11, ocean: "A",           text: "I would rather use someone than be used.", reversed: true },
  // { id: 12, ocean: "A",           text: "I go out of my way to make sure others feel comfortable." },

  // ── Neuroticism (N) ───────────────────────────────────────────────────────────
  // { id: 13, ocean: "N",           text: "I often worry about things that might go wrong." },
  // { id: 14, ocean: "N",           text: "My mood can shift significantly depending on small events." },
  { id: 15, ocean: "N",           text: "I stay calm and composed under pressure.", reversed: true },
];

export default sample_personality;
