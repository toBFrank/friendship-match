import { sample_domains } from "../data/sample_account";
import { apiRequest } from "./apiService";

const USE_SAMPLE_DATA = true;

export async function getDomains(): Promise<string[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return sample_domains;
  }
  return apiRequest<string[]>("/domains");
}
