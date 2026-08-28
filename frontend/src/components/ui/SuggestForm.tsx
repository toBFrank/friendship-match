// ── Suggest Form ──────────────────────────────────────────────────────────────

import { useState } from "react";

interface SuggestFormProps {
  type: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export default function SuggestForm({
  type,
  onSubmit,
  onCancel,
  placeholder,
}: SuggestFormProps) {
  const [value, setValue] = useState("");

  return (
    <div className="mt-3 border border-[var(--color-bg-inverted)] p-3 flex flex-col gap-2">
      <p className="text-sm font-medium">Suggest a missing {type}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder ?? `e.g. ${type}`}
        className="w-full border border-[var(--color-bg-inverted)] px-3 py-1.5 text-sm focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--color-bg-inverted)]"
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm hover:bg-[var(--color-bg-inverted)] hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={value.trim().length === 0}
          onClick={() => onSubmit(value.trim())}
          className="px-3 py-1 text-sm disabled:invisible hover:bg-[var(--color-bg-inverted)] hover:text-white"
        >
          Submit suggestion
        </button>
      </div>
    </div>
  );
}