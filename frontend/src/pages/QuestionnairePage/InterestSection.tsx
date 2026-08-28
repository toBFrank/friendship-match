import { useState, useEffect } from "react";
import { type Interest, INTEREST_CATEGORIES } from "../../types/interest";
import { getInterests } from "../../api/interestsService";
import { Button } from "@base-ui/react/button";


const MAX_INTERESTS = 10;

interface InterestSectionProps {
  selected: number[];
  onChange: (selected: number[]) => void;
}

export default function InterestSection({
  selected,
  onChange,
}: InterestSectionProps) {
  const [interests, setInterests] = useState<Interest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const data = await getInterests();
        setInterests(data);
      } catch {
        setError("Failed to load interests. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);

  function toggle(id: number) {
    // if (selected.length >= 10 && !selected.includes(id)) return;
    onChange(
      selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id],
    );
  }

  if (loading) return <p>Loading interests...</p>;
  if (error) return <p>{error}</p>;

  const byCategory = (category: Interest["category"]) =>
    interests.filter((i) => i.category === category);

  return (
    <section aria-labelledby="interests-heading" className="animate-appear">
      <h2 id="interests-heading" className="text-2xl font-semibold">
        What are your interests?
      </h2>
      <p>Select 2 to 10 of your strongest interests.</p>

      <div className="mt-4">
        {INTEREST_CATEGORIES.map((category) => (
          <div key={category} className="mt-8">
            <h3 className="text-xl font-medium">{category}</h3>
            <div role="group" aria-label={`${category} interests`}>
              {byCategory(category).map((interest) => {
                const isSelected = selected.includes(interest.id);
                return (
                  <Button
                    key={interest.id}
                    aria-pressed={isSelected}
                    disabled={selected.length >= MAX_INTERESTS && !isSelected}
                    onClick={() => toggle(interest.id)}
                    className={[
                      "border border-[var(--color-text-main)] m-2 px-4 py-2 text-sm cursor-pointer select-none",
                      "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--color-text-main)] disabled:opacity-50",
                      isSelected
                        ? "bg-[var(--color-text-main)] text-[var(--color-bg-main)]"
                        : "bg-[var(--color-bg-main)] text-[var(--color-text-main)] hover:not-data-disabled:bg-gray-100",
                    ].join(" ")}
                  >
                    {interest.name}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p aria-live="polite" className="mt-4">
        {selected.length} selected
      </p>
    </section>
  );
}
