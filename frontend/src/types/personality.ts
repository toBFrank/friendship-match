export interface PersonalityQuestion {
  id: number;
  text: string;
  /** OCEAN trait this question maps to — for scoring purposes */
  ocean: "O" | "C" | "E" | "A" | "N";
  /** If true, a high likert value indicates a LOW score for this trait */
  reversed?: boolean;
}

export interface PersonalityAnswer {
  questionId: number;
  likertValue: number; // 1–4
}
