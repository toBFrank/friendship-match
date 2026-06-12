import { useState, useEffect } from "react";
import { getPersonalityQuestions } from "../../api/personalityService";
import type {
  PersonalityAnswer,
  PersonalityQuestion,
} from "../../types/personality";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = PersonalityQuestion["category"];

const CATEGORIES: Category[] = [
  "Friendship",
  "Social",
  "Values",
  "Environment",
  "OCEAN",
];

const CATEGORY_LABELS: Record<Category, string> = {
  Friendship: "Friendship",
  Social: "Social Style",
  Values: "Values & Beliefs",
  Environment: "Environment",
  OCEAN: "Personality",
};

const LIKERT_OPTIONS = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Agree" },
  { value: "4", label: "Strongly Agree" },
];

interface PersonalitySectionProps {
  answers: PersonalityAnswer[];
  onChange: (answers: PersonalityAnswer[]) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PersonalitySection({
  answers,
  onChange,
}: PersonalitySectionProps) {
  const [questions, setQuestions] = useState<PersonalityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalityQuestions = async () => {
      try {
        const data = await getPersonalityQuestions();
        setQuestions(data);
      } catch {
        setError("Failed to load questions. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchPersonalityQuestions();
  }, []);

  function handleSelect(questionId: number, value: string | null) {
    const existing = answers.find((a) => a.questionId === questionId);
    if (existing) {
      onChange(
        answers.map((a) =>
          a.questionId === questionId
            ? { questionId, likertValue: Number(value) }
            : a,
        ),
      );
    } else {
      onChange([...answers, { questionId, likertValue: Number(value) }]);
    }
  }

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p role="alert">{error}</p>;

  const byCategory = (category: Category) =>
    questions.filter((q) => q.category === category);

  return (
    <section aria-labelledby="personality-heading">
      <h2 id="personality-heading" className="text-2xl font-semibold">
        What are you like?
      </h2>
      <p>Rate your agreement with each statement.</p>

      <div className="mt-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="mt-6 p-4 border-2">
            <h3 className="text-xl font-medium">{CATEGORY_LABELS[category]}</h3>
            <div className="mt-2">
              {byCategory(category).map((question) => {
                const currentValue = answers.find(
                  (a) => a.questionId === question.id,
                )?.likertValue;

                return (
                  <fieldset key={question.id} className="mt-4 border-none p-0">
                    <legend className="text-lg italic mb-2">
                      {question.text}
                    </legend>

                    <RadioGroup
                      value={currentValue != null ? String(currentValue) : null}
                      onValueChange={(value) =>
                        handleSelect(question.id, value)
                      }
                      className="flex flex-row justify-evenly items-center"
                    >
                      {LIKERT_OPTIONS.map((option) => (
                        <label
                          key={option.value}
                          className="flex flex-col-reverse items-center gap-2 text-sm cursor-pointer select-none"
                        >
                          <Radio.Root
                            value={option.value}
                            className="flex size-10 shrink-0 items-center justify-center border rounded-full border-black bg-white text-white data-checked:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            onClick={() => {
                              // TODO: check if there is a cleaner way to deselect option
                              if (currentValue === Number(option.value)) {
                                onChange(
                                  answers.filter(
                                    (a) => a.questionId !== question.id,
                                  ),
                                );
                              }
                            }}
                          >
                            <Radio.Indicator className="flex items-center justify-center data-unchecked:hidden before:size-2 before:rounded-full before:bg-current" />
                          </Radio.Root>
                          {option.label}
                        </label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p aria-live="polite" className="mt-4">
        {answers.length} of {questions.length} answered
      </p>
    </section>
  );
}
