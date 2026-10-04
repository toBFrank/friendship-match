import { Link } from "react-router";

// ── Component ─────────────────────────────────────────────────────────────────

interface SubmittedSectionProps {
  email: string;
}

export default function SubmittedSection({ email }: SubmittedSectionProps) {
  return (
    <section
      aria-labelledby="submitted-heading"
      role="status"
      className="animate-appear"
    >
      <h2 id="submitted-heading" className="text-2xl font-semibold">
        You're on the list!
      </h2>
      <p className="mt-2">
        Thanks for completing the questionnaire. We'll email you at{" "}
        <strong className="break-all">{email}</strong> when your matches are
        ready.
      </p>

      <Link to="/" className="mt-8 inline-block underline hover:font-medium">
        ← Back to home
      </Link>
    </section>
  );
}
