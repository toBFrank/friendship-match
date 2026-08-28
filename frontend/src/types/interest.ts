export type InterestCategory = "Physical" | "Mental" | "Creative" | "Social";

export const INTEREST_CATEGORIES: InterestCategory[] = [
  "Physical",
  "Mental",
  "Creative",
  "Social",
];

export interface Interest {
  id: number;
  name: string;
  category: InterestCategory;
}
