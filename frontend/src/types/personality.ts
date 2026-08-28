export interface PersonalityQuestion {
  id: number;
  text: string;
  category: "Friendship" | "Social" | "Values" | "Environment" | "OCEAN";
}

export interface PersonalityAnswer {
  questionId: number;
  likertValue: number; // 1–4
}
