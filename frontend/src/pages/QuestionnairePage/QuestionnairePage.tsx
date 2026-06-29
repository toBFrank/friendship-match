import { Progress } from "@base-ui/react/progress";
import { useEffect, useState } from "react";
import InterestSection from "./InterestSection";
import PersonalitySection from "./PersonalitySection";
import type { PersonalityAnswer } from "../../types/personality";
import AcademicSection from "./AcademicSection";
import type { AcademicFormData } from "../../types/academic";
import AccountSection, { validateAccount } from "./AccountSection";
import type { AccountFormData } from "../../types/account";
import { INITIAL_ACCOUNT_DATA } from "../../types/account";

const SECTIONS = ["interests", "personality", "academic", "account"] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<Section, string> = {
  interests: "Interests",
  personality: "Personality",
  academic: "Academic",
  account: "Account",
};

export default function QuestionnairePage() {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const [interests, setInterests] = useState<number[]>([]);
  const [personalityAnswers, setPersonalityAnswers] = useState<
    PersonalityAnswer[]
  >([]);
  const [academicData, setAcademicData] = useState<AcademicFormData>({
    universityId: null,
    degreeLevel: null,
    programId: null,
    year: null,
    courseIds: [],
  });
  const [accountData, setAccountData] =
    useState<AccountFormData>(INITIAL_ACCOUNT_DATA);
  const [accountErrors, setAccountErrors] = useState({});

  const progressValue = Math.round((currentSection / SECTIONS.length) * 100);
  const isFirst = currentSection === 0;
  const isLast = currentSection === SECTIONS.length - 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection]);

  function handlePrev() {
    if (!isFirst) setCurrentSection((prev) => prev - 1);
  }

  function handleNext() {
    if (!isLast) setCurrentSection((prev) => prev + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateAccount(accountData);
    if (Object.keys(errors).length > 0) {
      setAccountErrors(errors);
      return;
    }
    // TODO: POST to Rails API
  }

  function renderSection() {
    switch (SECTIONS[currentSection]) {
      case "interests":
        return <InterestSection selected={interests} onChange={setInterests} />;
      case "personality":
        return (
          <PersonalitySection
            answers={personalityAnswers}
            onChange={setPersonalityAnswers}
          />
        );
      case "academic":
        return (
          <AcademicSection data={academicData} onChange={setAcademicData} />
        );
      case "account":
        return (
          <AccountSection
            data={accountData}
            errors={accountErrors}
            onChange={setAccountData}
          />
        );
    }
  }

  return (
    <main id="main-content" className="flex-1 px-6 py-4">
      <section aria-labelledby="section-heading">
        <h1 id="section-heading" className="text-3xl font-bold">
          Questionnaire
        </h1>
        <p>Answer the following questions to get matched.</p>
        <Progress.Root
          className="flex items-center gap-x-2 pt-4 max-w-full"
          value={progressValue}
        >
          <Progress.Track className="w-full h-5 overflow-hidden border">
            <Progress.Indicator className="bg-accent transition-[width] duration-500" />
          </Progress.Track>
          <Progress.Value className="text-center text-sm" />
        </Progress.Root>
      </section>

      <section aria-labelledby="section-questionnaire" className="mt-8">
        <form onSubmit={handleSubmit}>
          {renderSection()}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={isFirst}
              className="disabled:opacity-0"
            >
              ← Prev: {!isFirst && SECTION_LABELS[SECTIONS[currentSection - 1]]}
            </button>

            {!isLast ? (
              <button type="button" onClick={handleNext}>
                Next: {SECTION_LABELS[SECTIONS[currentSection + 1]]} →
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </section>
    </main>
  );
}
