import { Progress } from "@base-ui/react/progress";
import { useEffect, useState } from "react";
import InterestsSection from "./InterestsSection";

const SECTIONS = [
  "interests",
  "personality",
  "academic",
  "availability",
] as const;
type Section = (typeof SECTIONS)[number];

const SECTION_LABELS: Record<Section, string> = {
  interests: "Interests",
  personality: "Personality",
  academic: "Academic",
  availability: "Availability",
};

function NextSection() {
  return <div>NextSection</div>;
}

export default function QuestionnairePage() {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const [interests, setInterests] = useState<number[]>([]);

  const progressValue = Math.round((currentSection / SECTIONS.length) * 100);
  const isLast = currentSection === SECTIONS.length - 1;

  function handleNext() {
    if (!isLast) setCurrentSection((prev) => prev + 1);
  }

  function renderSection() {
    switch (SECTIONS[currentSection]) {
      case "interests":
        return (
          <InterestsSection selected={interests} onChange={setInterests} />
        );
      default:
        return <NextSection />;
    }
  }
  // progress value will change based on number of sections completed in the questionnaire form

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
        <form>
          {renderSection()}

          <div className="mt-8 flex justify-end">
            {!isLast && (
              <button type="button" onClick={handleNext}>
                Next: {SECTION_LABELS[SECTIONS[currentSection + 1]]} →
              </button>
            )}
            {isLast && <button type="submit">Submit</button>}
          </div>
        </form>
      </section>
    </main>
  );
}
