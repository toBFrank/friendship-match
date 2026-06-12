import sample_personality from "../data/sample_personality";
import type { PersonalityQuestion } from "../types/personality";
import { apiRequest } from "./apiService";

const USE_SAMPLE_DATA = true;

export async function getPersonalityQuestions(): Promise<
  PersonalityQuestion[]
> {
  if (USE_SAMPLE_DATA) {
    // await new Promise((resolve) => setTimeout(resolve, 300));
    // throw new Error("Simulated API error");
    return sample_personality;
  }

  return apiRequest<PersonalityQuestion[]>("/personality_questions");
}
