import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LikertOption {
  value: string;
  label: string;
}

interface LikertScaleProps {
  /** Unique fieldset id (used for the legend association). */
  id: string;
  /** The question / statement text shown as the legend. */
  question: string;
  /** The options to display. Defaults to the standard 4-point agree scale. */
  options?: LikertOption[];
  /** Currently selected value, or undefined if unanswered. */
  value: number | undefined;
  onChange: (value: number | null) => void;
}

const DEFAULT_OPTIONS: LikertOption[] = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Agree" },
  { value: "4", label: "Strongly Agree" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LikertScale({
  id,
  question,
  options = DEFAULT_OPTIONS,
  value,
  onChange,
}: LikertScaleProps) {
  return (
    <fieldset id={id} className="mt-8 border-none p-0">
      <legend className="text-lg font-bold italic mb-2">{question}</legend>

      <RadioGroup
        value={value != null ? String(value) : null}
        onValueChange={(v) => onChange(Number(v))}
        className="flex flex-row justify-evenly"
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="flex flex-col-reverse items-center gap-2 text-sm cursor-pointer select-none flex-1 text-center"
          >
            <Radio.Root
              value={option.value}
              className="flex size-10 shrink-0 items-center justify-center border rounded-full border-[var(--color-bg-inverted) data-checked:bg-[var(--color-bg-inverted)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-bg-inverted)]"
            >
              <Radio.Indicator className="flex items-center justify-center data-unchecked:hidden before:size-2 before:rounded-full before:bg-current" />
            </Radio.Root>
            {option.label}
          </label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}
