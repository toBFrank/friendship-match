// ── Field ─────────────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

export default function Field({
  id,
  label,
  type = "text",
  value,
  error,
  placeholder,
  autoComplete,
  required,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-600">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={!!error}
        className={[
          "w-full border px-3 py-2 text-sm",
          "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-[var(--color-bg-inverted)]",
          error ? "border-[var(--color-bg-inverted)]" : "border-[var(--color-bg-inverted)]",
        ].join(" ")}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
