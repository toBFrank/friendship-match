import type { Program, Course } from "../types/academic";

export const sample_programs: Program[] = [
  // Undergraduate — Science
  {
    id: 1,
    name: "Computer Science",
    faculty: "Science",
    degreeLevel: "Undergraduate",
  },
  { id: 2, name: "Biology", faculty: "Science", degreeLevel: "Undergraduate" },
  {
    id: 3,
    name: "Chemistry",
    faculty: "Science",
    degreeLevel: "Undergraduate",
  },
  {
    id: 4,
    name: "Mathematics",
    faculty: "Science",
    degreeLevel: "Undergraduate",
  },
  { id: 5, name: "Physics", faculty: "Science", degreeLevel: "Undergraduate" },
  {
    id: 6,
    name: "Statistics",
    faculty: "Science",
    degreeLevel: "Undergraduate",
  },

  // Undergraduate — Engineering
  {
    id: 7,
    name: "Civil Engineering",
    faculty: "Engineering",
    degreeLevel: "Undergraduate",
  },
  {
    id: 8,
    name: "Electrical Engineering",
    faculty: "Engineering",
    degreeLevel: "Undergraduate",
  },
  {
    id: 9,
    name: "Mechanical Engineering",
    faculty: "Engineering",
    degreeLevel: "Undergraduate",
  },
  {
    id: 10,
    name: "Software Engineering",
    faculty: "Engineering",
    degreeLevel: "Undergraduate",
  },

  // Undergraduate — Business
  {
    id: 11,
    name: "Accounting",
    faculty: "Business",
    degreeLevel: "Undergraduate",
  },
  {
    id: 12,
    name: "Finance",
    faculty: "Business",
    degreeLevel: "Undergraduate",
  },
  {
    id: 13,
    name: "Marketing",
    faculty: "Business",
    degreeLevel: "Undergraduate",
  },
  {
    id: 14,
    name: "Management",
    faculty: "Business",
    degreeLevel: "Undergraduate",
  },

  // Undergraduate — Arts
  {
    id: 15,
    name: "English Literature",
    faculty: "Arts",
    degreeLevel: "Undergraduate",
  },
  { id: 16, name: "History", faculty: "Arts", degreeLevel: "Undergraduate" },
  { id: 17, name: "Philosophy", faculty: "Arts", degreeLevel: "Undergraduate" },
  { id: 18, name: "Psychology", faculty: "Arts", degreeLevel: "Undergraduate" },
  { id: 19, name: "Sociology", faculty: "Arts", degreeLevel: "Undergraduate" },

  // Graduate
  {
    id: 20,
    name: "MSc Computer Science",
    faculty: "Science",
    degreeLevel: "Graduate",
  },
  {
    id: 21,
    name: "MSc Data Science",
    faculty: "Science",
    degreeLevel: "Graduate",
  },
  { id: 22, name: "MBA", faculty: "Business", degreeLevel: "Graduate" },
  {
    id: 23,
    name: "MEng Software Engineering",
    faculty: "Engineering",
    degreeLevel: "Graduate",
  },
  {
    id: 24,
    name: "PhD Computer Science",
    faculty: "Science",
    degreeLevel: "Graduate",
  },
  { id: 25, name: "MA Psychology", faculty: "Arts", degreeLevel: "Graduate" },
];

export const sample_courses: Course[] = [
  // Computer Science (programId: 1)
  { id: 1, code: "CMPUT 101", name: "Introduction to Computing", programId: 1 },
  {
    id: 2,
    code: "CMPUT 201",
    name: "Practical Programming Methodology",
    programId: 1,
  },
  { id: 3, code: "CMPUT 204", name: "Algorithms I", programId: 1 },
  {
    id: 4,
    code: "CMPUT 301",
    name: "Introduction to Software Engineering",
    programId: 1,
  },
  {
    id: 5,
    code: "CMPUT 379",
    name: "Operating Systems Concepts",
    programId: 1,
  },
  {
    id: 6,
    code: "CMPUT 455",
    name: "Search, Knowledge, and Simulation",
    programId: 1,
  },

  // Software Engineering (programId: 10)
  {
    id: 7,
    code: "ENCMP 100",
    name: "Computer Programming for Engineers",
    programId: 10,
  },
  {
    id: 8,
    code: "ECE 212",
    name: "Introduction to Microprocessors",
    programId: 10,
  },
  { id: 9, code: "ECE 322", name: "Software Engineering", programId: 10 },
  {
    id: 10,
    code: "ECE 421",
    name: "Introduction to Machine Learning",
    programId: 10,
  },

  // Mathematics (programId: 4)
  { id: 11, code: "MATH 117", name: "Honors Calculus I", programId: 4 },
  { id: 12, code: "MATH 118", name: "Honors Calculus II", programId: 4 },
  { id: 13, code: "MATH 225", name: "Linear Algebra II", programId: 4 },
  { id: 14, code: "MATH 317", name: "Honors Analysis I", programId: 4 },

  // Biology (programId: 2)
  { id: 15, code: "BIOL 107", name: "Introduction to Biology I", programId: 2 },
  {
    id: 16,
    code: "BIOL 108",
    name: "Introduction to Biology II",
    programId: 2,
  },
  { id: 17, code: "BIOL 207", name: "Genetics", programId: 2 },

  // Psychology (programId: 18)
  {
    id: 18,
    code: "PSYCO 105",
    name: "Introduction to Psychology I",
    programId: 18,
  },
  {
    id: 19,
    code: "PSYCO 106",
    name: "Introduction to Psychology II",
    programId: 18,
  },
  { id: 20, code: "PSYCO 258", name: "Research Methods", programId: 18 },

  // MSc Computer Science (programId: 20)
  {
    id: 21,
    code: "CMPUT 501",
    name: "Algorithms for Data Science",
    programId: 20,
  },
  {
    id: 22,
    code: "CMPUT 551",
    name: "Introduction to Machine Learning",
    programId: 20,
  },
  { id: 23, code: "CMPUT 566", name: "Reinforcement Learning", programId: 20 },

  // MBA (programId: 22)
  { id: 24, code: "MBA 501", name: "Foundations of Management", programId: 22 },
  { id: 25, code: "MBA 521", name: "Financial Accounting", programId: 22 },
  { id: 26, code: "MBA 541", name: "Marketing Management", programId: 22 },
];
