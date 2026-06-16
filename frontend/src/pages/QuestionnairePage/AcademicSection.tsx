import { useState, useEffect, useRef } from "react";
import { Select } from "@base-ui/react/select";
import { getPrograms, getAllCourses } from "../../api/academicService";
import type {
  AcademicFormData,
  AcademicYear,
  DegreeLevel,
  Program,
  Course,
} from "../../types/academic";
import { UNDERGRADUATE_YEARS, GRADUATE_YEARS } from "../../types/academic";

// ── Helpers ───────────────────────────────────────────────────────────────────

const DEGREE_LEVELS: DegreeLevel[] = ["Undergraduate", "Graduate"];

const selectClass = [
  "flex h-9 w-full items-center justify-between border border-black bg-white px-3 text-sm",
  "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-black",
].join(" ");

const popupClass =
  "border border-black bg-white z-50 max-h-[min(16rem,52vh)] overflow-y-auto no-scrollbar";

const itemClass = [
  "flex items-center px-3 py-1.5 text-sm cursor-pointer select-none",
  "data-highlighted:bg-black data-highlighted:text-white",
].join(" ");

// ── Suggest Form ──────────────────────────────────────────────────────────────

interface SuggestFormProps {
  type: "program" | "course";
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

function SuggestForm({ type, onSubmit, onCancel }: SuggestFormProps) {
  const [value, setValue] = useState("");

  return (
    <div className="mt-3 border border-black p-3 flex flex-col gap-2">
      <p className="text-sm font-medium">Suggest a missing {type}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={
          type === "program"
            ? "e.g. Cognitive Science"
            : "e.g. LING 101 — Introduction to Linguistics"
        }
        className="w-full border border-black px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-black"
      />
      <div className="flex gap-2">
        <button
          type="button"
          disabled={value.trim().length === 0}
          onClick={() => onSubmit(value.trim())}
          className="border border-black px-3 py-1 text-sm disabled:invisible hover:bg-black hover:text-white"
        >
          Submit suggestion
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm underline hover:bg-black hover:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Course Search ─────────────────────────────────────────────────────────────

interface CourseSearchProps {
  allCourses: Course[];
  selectedIds: number[];
  onAdd: (course: Course) => void;
  onRemove: (courseId: number) => void;
}

function CourseSearch({
  allCourses,
  selectedIds,
  onAdd,
  onRemove,
}: CourseSearchProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [submitted, setSubmitted] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedCourses = allCourses.filter((c) => selectedIds.includes(c.id));

  const suggestions =
    query.trim().length === 0
      ? []
      : allCourses
          .filter((c) => {
            if (selectedIds.includes(c.id)) return false;
            const q = query.toLowerCase();
            return (
              c.code.toLowerCase().includes(q) ||
              c.name.toLowerCase().includes(q)
            );
          })
          .slice(0, 8);

  const noMatch = open && query.trim().length > 0 && suggestions.length === 0;

  function handleSelect(course: Course) {
    onAdd(course);
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleSuggest(value: string) {
    // TODO: POST to /course_suggestions
    console.log("Course suggestion:", value);
    setSubmitted(value);
    setSuggesting(false);
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      {/* Search input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => query.trim().length > 0 && setOpen(true)}
          placeholder="Search by course code or name..."
          className="w-full border border-black px-3 py-2 text-sm focus-visible:outline-black focus-visible:outline-0"
        />

        {open && suggestions.length > 0 && (
          <ul
            ref={listRef}
            className="absolute left-0 right-0 top-full border border-t border-black bg-white z-50 max-h-52 overflow-y-auto no-scrollbar"
          >
            {suggestions.map((course) => (
              <li key={course.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(course)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-black hover:text-white cursor-pointer"
                >
                  <span className="font-medium">{course.code}</span>
                  {" — "}
                  {course.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        {noMatch && (
          <div className="absolute left-0 right-0 top-full border border-t-0 border-black bg-white z-50 px-3 py-2 text-sm">
            No matching courses found.
          </div>
        )}
      </div>

      {!suggesting && !submitted && (
        <button
          type="button"
          onClick={() => setSuggesting(true)}
          className="mt-3 text-sm underline hover:font-medium"
        >
          Can't find your course? Suggest it.
        </button>
      )}

      <p aria-live="polite" className="mt-2 text-sm">
        {selectedIds.length} selected
      </p>

      {/* Selected courses */}
      {selectedCourses.length > 0 && (
        <ul className="flex flex-col gap-0 mt-4">
          {selectedCourses.map((course) => (
            <li
              key={course.id}
              className="flex items-center justify-between px-3 py-2 text-sm"
            >
              <span>
                <span className="font-medium">{course.code}</span>
                {" — "}
                {course.name}
              </span>
              <button
                type="button"
                onClick={() => onRemove(course.id)}
                aria-label={`Remove ${course.code}`}
                className="ml-4 hover:font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Suggest missing course */}
      {suggesting && (
        <SuggestForm
          type="course"
          onSubmit={handleSuggest}
          onCancel={() => setSuggesting(false)}
        />
      )}
      {submitted && (
        <p className="mt-3 text-sm">
          Thanks! "{submitted}" has been submitted for review.
        </p>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface AcademicSectionProps {
  data: AcademicFormData;
  onChange: (data: AcademicFormData) => void;
}

export default function AcademicSection({
  data,
  onChange,
}: AcademicSectionProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestingProgram, setSuggestingProgram] = useState(false);
  const [submittedProgram, setSubmittedProgram] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getPrograms(), getAllCourses()])
      .then(([programs, courses]) => {
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

  function addCourse(course: Course) {
    if (!data.courseIds.includes(course.id)) {
      onChange({ ...data, courseIds: [...data.courseIds, course.id] });
    }
  }

  function removeCourse(courseId: number) {
    onChange({
      ...data,
      courseIds: data.courseIds.filter((id) => id !== courseId),
    });
  }

  function handleProgramSuggest(value: string) {
    // TODO: POST to /program_suggestions
    console.log("Program suggestion:", value);
    setSubmittedProgram(value);
    setSuggestingProgram(false);
  }

  const availablePrograms = data.degreeLevel
    ? programs.filter((p) => p.degreeLevel === data.degreeLevel)
    : [];

  const selectedProgram = programs.find((p) => p.id === data.programId);
  const yearOptions =
    data.degreeLevel === "Graduate" ? GRADUATE_YEARS : UNDERGRADUATE_YEARS;

  if (loading) return <p>Loading...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section aria-labelledby="academic-heading">
      <h2 id="academic-heading" className="text-2xl font-semibold">
        Your academic background
      </h2>
      <p>Tell us about your studies.</p>

      <div className="mt-6 flex flex-col gap-6">
        {/* Degree Level */}
        <fieldset className="border-none p-0">
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

        {/* Program */}
        {data.degreeLevel && (
          <fieldset className="border-none p-0">
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

            {!suggestingProgram && !submittedProgram && (
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
                onSubmit={handleProgramSuggest}
                onCancel={() => setSuggestingProgram(false)}
              />
            )}
            {submittedProgram && (
              <p className="mt-2 text-sm">
                Thanks! "{submittedProgram}" has been submitted for review.
              </p>
            )}
          </fieldset>
        )}

        {/* Year */}
        {data.programId && (
          <fieldset className="border-none p-0">
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
          <fieldset className="border-none p-0 mb-4">
            <legend className="text-sm mb-2">Current courses</legend>
            <CourseSearch
              allCourses={allCourses}
              selectedIds={data.courseIds}
              onAdd={addCourse}
              onRemove={removeCourse}
            />
          </fieldset>
        )}
      </div>
    </section>
  );
}
