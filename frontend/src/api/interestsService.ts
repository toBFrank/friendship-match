import sample_interests from "../data/sample_interests";
import type { Interest } from "../types/interest";
import { apiRequest } from "./apiService";

const USE_SAMPLE_DATA = true;

export async function getInterests(): Promise<Interest[]> {
  if (USE_SAMPLE_DATA) {
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
    // throw new Error("Simulated API error"); // Simulate an error for testing
    return sample_interests;
  }

  return apiRequest<Interest[]>("/interests");
}
