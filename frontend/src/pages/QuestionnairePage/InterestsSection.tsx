import { useState, useEffect } from "react";
import type { Interest } from "../../types/interest";
import { getInterests } from "../../api/interestsService";
import { Button } from "@base-ui/react/button";

type Category = Interest["category"];
const CATEGORIES: Category[] = ["Physical", "Mental", "Creative", "Social"];

interface InterestsSectionProps {
  selected: number[];
  onChange: (selected: number[]) => void;
}

export default function InterestsSection({
  selected,
  onChange,
}: InterestsSectionProps) {
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
    onChange(
      selected.includes(id)
        ? selected.filter((i) => i !== id)
        : [...selected, id],
    );
  }

  if (loading) return <p>Loading interests...</p>;
  if (error) return <p>{error}</p>;

  const byCategory = (category: Category) =>
    interests.filter((i) => i.category === category);

  return (
    <section aria-labelledby="interests-heading">
      <h2 id="interests-heading" className="text-2xl font-semibold">
        Interests
      </h2>
      <p>Select everything that applies to you.</p>

      <div className="mt-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="mt-2">
            <h3 className="text-xl font-medium">{category}</h3>
            <div role="group" aria-label={`${category} interests`}>
              {byCategory(category).map((interest) => {
                const isSelected = selected.includes(interest.id);
                return (
                  <Button
                    key={interest.id}
                    aria-pressed={isSelected}
                    onClick={() => toggle(interest.id)}
                    className={[
                      "border border-black m-2 px-4 py-2 text-sm cursor-pointer select-none",
                      "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-black",
                      isSelected
                        ? "bg-black text-white"
                        : "bg-white text-black hover:not-data-disabled:bg-gray-100",
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
