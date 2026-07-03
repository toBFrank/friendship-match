import { useState, useEffect } from "react";
import { getPersonalityQuestions } from "../../api/personalityService";
import type {
  PersonalityAnswer,
  PersonalityQuestion,
} from "../../types/personality";
import LikertScale from "../../components/ui/LikertScale";

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
          <div key={category} className="mt-8 p-4 border-2">
            <h3 className="text-xl font-medium">{CATEGORY_LABELS[category]}</h3>
            <div className="mt-8">
              {byCategory(category).map((question) => {
                const currentValue = answers.find(
                  (a) => a.questionId === question.id,
                )?.likertValue;

                return (
                  <LikertScale
                    key={question.id}
                    id={`question-${question.id}`}
                    question={question.text}
                    value={currentValue}
                    onChange={(v) => {
                      if (v === null) {
                        onChange(
                          answers.filter(
                            (a) => a.questionId !== question.id,
                          ),
                        );
                      } else {
                        handleSelect(question.id, String(v));
                      }
                    }}
                  />
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
