import type { PersonalityQuestion } from "../types/personality";

const sample_personality: PersonalityQuestion[] = [
  // Friendship
  {
    id: 1,
    category: "Friendship",
    text: "A good friend always tells you the truth, even when it's uncomfortable.",
  },
  {
    id: 2,
    category: "Friendship",
    text: "Being there during hard times matters more than celebrating good ones.",
  },
  {
    id: 3,
    category: "Friendship",
    text: "I prefer a few deep friendships over many casual ones.",
  },
  {
    id: 4,
    category: "Friendship",
    text: "I expect friends to check in regularly without being asked.",
  },

  // Social
  {
    id: 5,
    category: "Social",
    text: "I feel energized after spending time in large groups.",
  },
  {
    id: 6,
    category: "Social",
    text: "I enjoy meeting new people in unfamiliar settings.",
  },
  {
    id: 7,
    category: "Social",
    text: "I often take the lead in social situations.",
  },
  {
    id: 8,
    category: "Social",
    text: "I need alone time to recharge after socializing.",
  },

  // Values
  {
    id: 9,
    category: "Values",
    text: "Rules and structure are important for a functioning community.",
  },
  {
    id: 10,
    category: "Values",
    text: "Individual freedom should come before collective expectations.",
  },
  {
    id: 11,
    category: "Values",
    text: "Equality of outcome matters as much as equality of opportunity.",
  },
  {
    id: 12,
    category: "Values",
    text: "Tradition and cultural heritage deserve respect and preservation.",
  },

  // Environment
  {
    id: 13,
    category: "Environment",
    text: "I actively make lifestyle choices to reduce my environmental impact.",
  },
  {
    id: 14,
    category: "Environment",
    text: "Climate change should be a top priority for society.",
  },
  {
    id: 15,
    category: "Environment",
    text: "I would pay more for environmentally friendly products.",
  },

  // OCEAN
  {
    id: 16,
    category: "OCEAN",
    text: "I enjoy trying new experiences and exploring new ideas.",
  },
  {
    id: 17,
    category: "OCEAN",
    text: "I like to keep my space and schedule organized.",
  },
  {
    id: 18,
    category: "OCEAN",
    text: "I find it easy to empathize with people around me.",
  },
  {
    id: 19,
    category: "OCEAN",
    text: "I stay calm and composed under pressure.",
  },
  { id: 20, category: "OCEAN", text: "I enjoy being the center of attention." },
];

export default sample_personality;
