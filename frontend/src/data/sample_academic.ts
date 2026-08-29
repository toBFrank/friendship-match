export const FACULTY_GROUPS = [
  {
    group: "Health Sciences",
    options: [
      "Kinesiology/Sport/Recreation",
      "Medicine/Dentistry",
      "Nursing",
      "Pharmacy/Pharmaceutical",
      "Public Health",
      "Rehabilitation Medicine",
    ],
  },
  {
    group: "Natural/Applied Sciences",
    options: ["Agriculture/Life/Environment", "Engineering", "Science"],
  },
  {
    group: "Social Sciences/Humanities",
    options: ["Business", "Arts", "Education", "Law"],
  },
  {
    group: "Faculties",
    options: [
      "Augustana",
      "Saint-Jean",
      "Graduate/Postdoctoral",
      "Native Studies",
    ],
  },
  {
    group: "Affiliated Colleges",
    options: ["St. Joseph's College", "St. Stephen's College"],
  },
];

export const ACADEMIC_YEARS = [
  "1st Year Undergraduate",
  "2nd Year Undergraduate",
  "3rd Year Undergraduate",
  "4th Year Undergraduate",
  "5+ Year Undergraduate",
  "1st Year Graduate",
  "2nd Year Graduate",
  "3rd Year Graduate",
  "4th Year Graduate",
  "5+ Year Graduate",
  "Alumni"
];

// Updated MVP Type Definition
export interface CourseInput {
  subject: string;
  number: string;
}

export interface AcademicFormData {
  faculty: string;
  year: string;
  courses: CourseInput[];
}
