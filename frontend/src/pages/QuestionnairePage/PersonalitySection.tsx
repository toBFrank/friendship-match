import { useState, useEffect } from "react";
import { getPersonalityQuestions } from "../../api/personalityService";
import type {
  PersonalityAnswer,
  PersonalityQuestion,
} from "../../types/personality";
import LikertScale from "../../components/ui/LikertScale";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PersonalitySectionProps {
  answers: PersonalityAnswer[];
  onChange: (answers: PersonalityAnswer[]) => void;
  onQuestionsLoaded: (length: number) => void;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PersonalitySection({
  answers,
  onChange,
  onQuestionsLoaded
}: PersonalitySectionProps) {
  const [questions, setQuestions] = useState<PersonalityQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalityQuestions = async () => {
      try {
        const data = await getPersonalityQuestions();
        setQuestions(data);
        onQuestionsLoaded(data.length);
      } catch {
        setError("Failed to load questions. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchPersonalityQuestions();
  }, []);

  function handleSelect(questionId: number, value: number | null) {
    if (value === null) {
      onChange(answers.filter((a) => a.questionId !== questionId));
      return;
    }
    const existing = answers.find((a) => a.questionId === questionId);
    if (existing) {
      onChange(
        answers.map((a) =>
          a.questionId === questionId ? { questionId, likertValue: value } : a,
        ),
      );
    } else {
      onChange([...answers, { questionId, likertValue: value }]);
    }
  }

  const lastAnsweredIndex = questions.reduce((last, q, i) =>
    answers.some((a) => a.questionId === q.id) ? i : last, -1
  );

  const visibleCount = lastAnsweredIndex + 2;
  const visibleQuestions = questions.slice(0, visibleCount);

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section aria-labelledby="personality-heading" className="animate-appear">
      <h2 id="personality-heading" className="text-2xl font-semibold">
        What are you like?
      </h2>
      <p>Select how much you agree with the following statements.</p>

      <div className="mt-4">
        {visibleQuestions.map((question) => {
          const currentValue = answers.find(
            (a) => a.questionId === question.id,
          )?.likertValue;

          return (
            <div className="animate-appear">
              <LikertScale
                key={question.id}
                id={`question-${question.id}`}
                question={question.text}
                value={currentValue}
                onChange={(v) => handleSelect(question.id, v)}
              />
            </div>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4">
        {answers.length} of {questions.length} answered
      </p>
    </section>
  );
}

