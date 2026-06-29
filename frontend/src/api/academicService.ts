import { apiRequest } from "./apiService";
import { sample_programs, sample_courses, sample_universities } from "../data/sample_academic";
import type { Program, Course, University } from "../types/academic";

const USE_SAMPLE_DATA = true;

export async function getUniversities(): Promise<University[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return sample_universities;
  }
  return apiRequest<University[]>("/universities");
}

export async function getPrograms(): Promise<Program[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return sample_programs;
  }
  return apiRequest<Program[]>("/programs");
}

export async function getCourses(programId: number): Promise<Course[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return sample_courses.filter((c) => c.programId === programId);
  }
  return apiRequest<Course[]>(`/programs/${programId}/courses`);
}

export async function getAllCourses(): Promise<Course[]> {
  if (USE_SAMPLE_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return sample_courses;
  }
  return apiRequest<Course[]>("/courses");
}
