export type DegreeLevel = "Undergraduate" | "Graduate";

export type AcademicYear =
  | "1st Year"
  | "2nd Year"
  | "3rd Year"
  | "4th Year"
  | "5th Year+"
  | "1st Year (Masters)"
  | "2nd Year (Masters)"
  | "1st Year (PhD)"
  | "2nd Year (PhD)"
  | "3rd Year+ (PhD)";

export const UNDERGRADUATE_YEARS: AcademicYear[] = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year+",
];

export const GRADUATE_YEARS: AcademicYear[] = [
  "1st Year (Masters)",
  "2nd Year (Masters)",
  "1st Year (PhD)",
  "2nd Year (PhD)",
  "3rd Year+ (PhD)",
];

export interface University {
  id: number;
  name: string;
  country: string;
}

export interface Program {
  id: number;
  name: string;
  faculty: string;
  degreeLevel: DegreeLevel;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  programId: number;
}

export interface AcademicFormData {
  universityId: number | null;
  degreeLevel: DegreeLevel | null;
  programId: number | null;
  year: AcademicYear | null;
  courseIds: number[];
}