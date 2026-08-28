import { useState, useEffect } from "react";
import { Select } from "@base-ui/react/select";
import {
  getPrograms,
  getAllCourses,
  getUniversities,
} from "../../api/academicService";
import type {
  AcademicFormData,
  AcademicYear,
  DegreeLevel,
  Program,
  Course,
  University,
} from "../../types/academic";
import { UNDERGRADUATE_YEARS, GRADUATE_YEARS, DEGREE_LEVELS } from "../../types/academic";
import EntitySearch, { type SearchItem } from "../../components/ui/EntitySearch";
import SuggestForm from "../../components/ui/SuggestForm";

// ── Helpers ───────────────────────────────────────────────────────────────────

const selectClass = [
  "flex h-9 w-full items-center justify-between border border-[var(--color-bg-inverted)] bg-white px-3 text-sm",
  "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--color-bg-inverted)]",
].join(" ");

const popupClass =
  "border border-[var(--color-bg-inverted)] bg-white z-50 max-h-[min(16rem,52vh)] overflow-y-auto no-scrollbar";

const itemClass = [
  "flex items-center px-3 py-1.5 text-sm cursor-pointer select-none",
  "data-highlighted:bg-[var(--color-bg-inverted)] data-highlighted:text-white",
].join(" ");


interface AcademicSectionProps {
  data: AcademicFormData;
  onChange: (data: AcademicFormData) => void;
}

export default function AcademicSection({
  data,
  onChange,
}: AcademicSectionProps) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestingProgram, setSuggestingProgram] = useState(false);
  const [submittedProgram, setSubmittedProgram] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getUniversities(), getPrograms(), getAllCourses()])
      .then(([universities, programs, courses]) => {
        setUniversities(universities);
        setPrograms(programs);
        setAllCourses(courses);
      })
      .catch(() => setError("Failed to load data. Please refresh."))
      .finally(() => setLoading(false));
  }, []);

  function handleDegreeLevel(value: string | null) {
    onChange({
      ...data,
      degreeLevel: value as DegreeLevel | null,
      programId: null,
      year: null,
      courseIds: [],
    });
    setSuggestingProgram(false);
    setSubmittedProgram(null);
  }

  function handleProgram(value: string | null) {
    onChange({ ...data, programId: value ? Number(value) : null });
  }

  function handleYear(value: string | null) {
    onChange({ ...data, year: value as AcademicYear | null });
  }

  // University — single select
  const universityItems: SearchItem[] = universities.map((u) => ({
    id: u.id,
    primary: u.name,
    secondary: u.country,
  }));

  // Course — multi select
  const courseItems: SearchItem[] = allCourses.map((c) => ({
    id: c.id,
    primary: c.code,
    secondary: c.name,
  }));

  const availablePrograms = data.degreeLevel
    ? programs.filter((p) => p.degreeLevel === data.degreeLevel)
    : [];

  const selectedProgram = programs.find((p) => p.id === data.programId);
  const yearOptions =
    data.degreeLevel === "Graduate" ? GRADUATE_YEARS : UNDERGRADUATE_YEARS;

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
<<<<<<< HEAD
    <section aria-labelledby="academic-heading" className="animate-appear">
=======
    <section aria-labelledby="academic-heading">
>>>>>>> main
      <h2 id="academic-heading" className="text-2xl font-semibold">
        What is your academic background?
      </h2>
      <p>Tell us about your studies.</p>

      <div className="mt-6 flex flex-col gap-6">
        {/* University */}
<<<<<<< HEAD
        <fieldset className="border-none p-0 animate-appear">
=======
        <fieldset className="border-none p-0">
>>>>>>> main
          <legend className="text-sm mb-2">University</legend>
          <EntitySearch
            items={universityItems}
            selectedIds={data.universityId != null ? [data.universityId] : []}
            placeholder="Search for your university..."
            suggestType="university"
            suggestPlaceholder="e.g. University of Alberta"
            single
            onAdd={(id) => onChange({ ...data, universityId: id })}
            onRemove={() => onChange({ ...data, universityId: null })}
            onSuggest={(value) => console.log("University suggestion:", value)}
          />
        </fieldset>

        {/* Degree Level */}
        {data.universityId && (
<<<<<<< HEAD
          <fieldset className="border-none p-0 animate-appear">
=======
          <fieldset className="border-none p-0">
>>>>>>> main
            <legend className="text-sm mb-2">Degree level</legend>
            <Select.Root
              value={data.degreeLevel ?? null}
              onValueChange={handleDegreeLevel}
            >
              <Select.Trigger className={selectClass}>
                <Select.Value placeholder="Select degree level">
                  {data.degreeLevel ?? "Select degree level"}
                </Select.Value>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner
                  className="w-(--anchor-width)"
                  alignItemWithTrigger={false}
                >
                  <Select.Popup className={popupClass}>
                    {DEGREE_LEVELS.map((level) => (
                      <Select.Item
                        key={level}
                        value={level}
                        className={itemClass}
                      >
                        <Select.ItemText>{level}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </fieldset>
        )}

        {/* Program */}
        {data.degreeLevel && (
<<<<<<< HEAD
          <fieldset className="border-none p-0 animate-appear">
=======
          <fieldset className="border-none p-0">
>>>>>>> main
            <legend className="text-sm mb-2">Program</legend>
            <Select.Root
              value={data.programId != null ? String(data.programId) : null}
              onValueChange={handleProgram}
            >
              <Select.Trigger className={selectClass}>
                <Select.Value placeholder="Select your program">
                  {selectedProgram?.name ?? "Select your program"}
                </Select.Value>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner
                  className="w-(--anchor-width)"
                  alignItemWithTrigger={false}
                >
                  <Select.Popup className={popupClass}>
                    {availablePrograms.map((program) => (
                      <Select.Item
                        key={program.id}
                        value={String(program.id)}
                        className={itemClass}
                      >
                        <Select.ItemText>
                          {program.name}
                          <span className="ml-2">— {program.faculty}</span>
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>

<<<<<<< HEAD
            {/* {!suggestingProgram && !submittedProgram && (
=======
            {!suggestingProgram && !submittedProgram && (
>>>>>>> main
              <button
                type="button"
                onClick={() => setSuggestingProgram(true)}
                className="mt-2 text-sm underline hover:font-medium"
              >
                Can't find your program? Suggest it.
              </button>
            )}
            {suggestingProgram && (
              <SuggestForm
                type="program"
                placeholder="e.g. Cognitive Science"
                onSubmit={(value) => {
                  console.log("Program suggestion:", value);
                  setSubmittedProgram(value);
                  setSuggestingProgram(false);
                }}
                onCancel={() => setSuggestingProgram(false)}
              />
            )}
            {submittedProgram && (
              <p className="mt-2 text-sm">
                Thanks! "{submittedProgram}" has been submitted for review.
              </p>
<<<<<<< HEAD
            )} */}
=======
            )}
>>>>>>> main
          </fieldset>
        )}

        {/* Year */}
        {data.programId && (
<<<<<<< HEAD
          <fieldset className="border-none p-0 animate-appear">
=======
          <fieldset className="border-none p-0">
>>>>>>> main
            <legend className="text-sm mb-2">Year of study</legend>
            <Select.Root value={data.year ?? null} onValueChange={handleYear}>
              <Select.Trigger className={selectClass}>
                <Select.Value placeholder="Select your year">
                  {data.year ?? "Select your year"}
                </Select.Value>
              </Select.Trigger>
              <Select.Portal>
                <Select.Positioner
                  className="w-(--anchor-width)"
                  alignItemWithTrigger={false}
                >
                  <Select.Popup className={popupClass}>
                    {yearOptions.map((year) => (
                      <Select.Item
                        key={year}
                        value={year}
                        className={itemClass}
                      >
                        <Select.ItemText>{year}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Popup>
                </Select.Positioner>
              </Select.Portal>
            </Select.Root>
          </fieldset>
        )}

        {/* Current Courses */}
        {data.programId && (
<<<<<<< HEAD
          <fieldset className="border-none p-0 mb-4 animate-appear">
=======
          <fieldset className="border-none p-0 mb-4">
>>>>>>> main
            <legend className="text-sm mb-2">Current courses</legend>
            <EntitySearch
              items={courseItems}
              selectedIds={data.courseIds}
              placeholder="Search by course code or name..."
              suggestType="course"
              suggestPlaceholder="e.g. LING 101 — Introduction to Linguistics"
              onAdd={(id) => {
                if (!data.courseIds.includes(id)) {
                  onChange({ ...data, courseIds: [...data.courseIds, id] });
                }
              }}
              onRemove={(id) =>
                onChange({
                  ...data,
                  courseIds: data.courseIds.filter((c) => c !== id),
                })
              }
              onSuggest={(value) => console.log("Course suggestion:", value)}
            />
          </fieldset>
        )}
      </div>
    </section>
  );
}
