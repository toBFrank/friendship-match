import type { AccountFormData, AccountFormErrors } from "../../types/account";

// ── Validation ────────────────────────────────────────────────────────────────

export function validateAccount(data: AccountFormData): AccountFormErrors {
  const errors: AccountFormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim())  errors.lastName  = "Last name is required.";

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!data.email.includes("@") || !data.email.includes(".")) {
    errors.email = "Enter a valid email address.";
  } else if (!isLikelySchoolEmail(data.email)) {
    errors.email = "Please use your school email address.";
  }

  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

// Rejects common personal email domains as a basic heuristic.
// TODO: replace with server-side validation against your university's domain.
const PERSONAL_DOMAINS = [
  "gmail.com", "yahoo.com", "hotmail.com",
  "outlook.com", "icloud.com", "live.com",
];

function isLikelySchoolEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return !!domain && !PERSONAL_DOMAINS.includes(domain);
}

// ── Field ─────────────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

function Field({
  id,
  label,
  type = "text",
  value,
  error,
  placeholder,
  autoComplete,
  onChange,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm">
        {label}
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
          "focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-black",
          error ? "border-black" : "border-black",
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

// ── Component ─────────────────────────────────────────────────────────────────

interface AccountSectionProps {
  data: AccountFormData;
  errors: AccountFormErrors;
  onChange: (data: AccountFormData) => void;
}

export default function AccountSection({
  data,
  errors,
  onChange,
}: AccountSectionProps) {
  function handleChange(field: keyof AccountFormData) {
    return (value: string) => onChange({ ...data, [field]: value });
  }

  return (
    <section aria-labelledby="account-heading">
      <h2 id="account-heading" className="text-2xl font-semibold">
        Create your account
      </h2>
      <p>Use your school email to verify your enrollment.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Field
              id="firstName"
              label="First name"
              value={data.firstName}
              error={errors.firstName}
              autoComplete="given-name"
              onChange={handleChange("firstName")}
            />
          </div>
          <div className="flex-1">
            <Field
              id="lastName"
              label="Last name"
              value={data.lastName}
              error={errors.lastName}
              autoComplete="family-name"
              onChange={handleChange("lastName")}
            />
          </div>
        </div>

        <Field
          id="email"
          label="School email"
          type="email"
          value={data.email}
          error={errors.email}
          placeholder="you@university.edu"
          autoComplete="email"
          onChange={handleChange("email")}
        />

        <Field
          id="password"
          label="Password"
          type="password"
          value={data.password}
          error={errors.password}
          autoComplete="new-password"
          onChange={handleChange("password")}
        />

        <Field
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={data.confirmPassword}
          error={errors.confirmPassword}
          autoComplete="new-password"
          onChange={handleChange("confirmPassword")}
        />
      </div>
    </section>
  );
}