import { Progress } from "@base-ui/react/progress";
import { useEffect, useState } from "react";

export default function QuestionnairePage() {
  const [progressValue, setProgressValue] = useState(0);

  // change progress value every 2 seconds for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => (prev >= 100 ? 0 : prev + 20));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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

      <section aria-labelledby="section-questionnaire">
        <form></form>
      </section>
    </main>
  );
}
