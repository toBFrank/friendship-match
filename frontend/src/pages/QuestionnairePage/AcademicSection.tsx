import { useState } from "react";
import {
  FACULTY_GROUPS,
  ACADEMIC_YEARS,
  type AcademicFormData,
  type CourseInput,
} from "../../data/sample_academic";

interface AcademicSectionProps {
  data: AcademicFormData;
  onChange: (data: AcademicFormData) => void;
}

export default function AcademicSection({
  data,
  onChange,
}: AcademicSectionProps) {
  // Local state for the course currently being typed in
  const [subjectInput, setSubjectInput] = useState("");
  const [numberInput, setNumberInput] = useState("");

  const handleAddCourse = () => {
    if (!subjectInput.trim() || !numberInput.trim()) return;

    const newCourse: CourseInput = {
      subject: subjectInput.toUpperCase().trim(),
      number: numberInput.trim(),
    };

    // Make sure courses array is initialized, then add the new course
    const currentCourses = data.courses || [];
    onChange({ ...data, courses: [...currentCourses, newCourse] });

    // Reset inputs
    setSubjectInput("");
    setNumberInput("");
  };

  const handleRemoveCourse = (indexToRemove: number) => {
    const updatedCourses = (data.courses || []).filter(
      (_, i) => i !== indexToRemove,
    );
    onChange({ ...data, courses: updatedCourses });
  };

  return (
    <section aria-labelledby="academic-heading" className="academic-section">
      <div>
        <h2 id="academic-heading" className="text-2xl font-semibold">
          What is your academic background?
        </h2>
        <p>Tell us about your studies to help find your matches.</p>
      </div>

      {/* Year */}
      <fieldset className="form-group">
        <legend className="form-label">Year of Study</legend>
        <select
          className="form-select"
          value={data.year || ""}
          onChange={(e) => onChange({ ...data, year: e.target.value })}
        >
          {ACADEMIC_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </fieldset>

      {/* Faculty / College */}
      <fieldset className="form-group">
        <legend className="form-label text-sm">Faculty or College</legend>
        <select
          className="form-select"
          value={data.faculty || ""}
          onChange={(e) => onChange({ ...data, faculty: e.target.value })}
        >
          {FACULTY_GROUPS.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </fieldset>

      {/* Current Courses */}
      <fieldset className="form-group">
        <legend className="form-label">Current Courses</legend>
        <div className="course-input-row">
          <input
            type="text"
            name="subject"
            className="form-input"
            placeholder="PSYCH"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddCourse())
            }
          />
          <input
            type="text"
            className="form-input"
            placeholder="104"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddCourse())
            }
          />
          <button type="button" className="btn-add" onClick={handleAddCourse}>
            Add
          </button>
        </div>

        {/* List of Added Courses */}
        {data.courses && data.courses.length > 0 && (
          <ul className="course-list" aria-label="Added courses">
            {data.courses.map((course, index) => (
              <li
                className="course-item"
                key={`${course.subject}-${course.number}-${index}`}
              >
                <span>
                  {course.subject} {course.number}
                </span>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => handleRemoveCourse(index)}
                  aria-label={`Remove ${course.subject} ${course.number}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </fieldset>
    </section>
  );
}
