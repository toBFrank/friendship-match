import type { AccountFormData, AccountFormErrors } from "../../types/account";
import Field from "../../components/ui/Field";

// ── Validation ────────────────────────────────────────────────────────────────

export function validateAccount(data: AccountFormData): AccountFormErrors {
  const errors: AccountFormErrors = {};

  if (!data.firstName.trim()) errors.firstName = "First name is required.";
  if (!data.lastName.trim())  errors.lastName  = "Last name is required.";

  const domain = data.email.split("@")[1]?.toLowerCase();
  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!data.email.includes("@") || !data.email.includes(".")) {
    errors.email = "Enter a valid email address.";
  } else if (!!domain && !VALID_DOMAINS.includes(domain)) {
    errors.email = "Please use your school email address.";
  }

  return errors;
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

  // TODO: Implement true account creation with passwords.

  return (
    <section aria-labelledby="account-heading">
      <h2 id="account-heading" className="text-2xl font-semibold">
        Who are you?
      </h2>
      <p>Some final details before we can match you.</p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Field
              id="firstName"
              label="First name"
              value={data.firstName}
              error={errors.firstName}
              autoComplete="given-name"
              required
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
              required
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
          required
          onChange={handleChange("email")}
        />

        {/* <Field
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
        /> */}
      </div>
    </section>
  );
}