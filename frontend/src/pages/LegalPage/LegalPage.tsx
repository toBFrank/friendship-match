import { Link } from "react-router";

interface LegalPageProps {
  type: "terms" | "privacy";
}

const CONTENT = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "July 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing or using Flocker, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing Flocker.",
      },
      {
        heading: "2. Use of Service",
        body: "Flocker is a campus-based social matching platform. You must be a currently enrolled student at a participating institution to use the service. You agree to use Flocker only for lawful purposes and in a manner that does not infringe the rights of others.",
      },
      {
        heading: "3. User Accounts",
        body: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify Flocker immediately of any unauthorized use of your account.",
      },
      {
        heading: "4. Content",
        body: "You retain ownership of any content you submit to Flocker. By submitting content, you grant Flocker a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with providing the service.",
      },
      {
        heading: "5. Prohibited Conduct",
        body: "You agree not to harass, abuse, or harm other users; post false or misleading information; attempt to gain unauthorized access to any part of the service; or engage in any conduct that restricts or inhibits any other user from using or enjoying Flocker.",
      },
      {
        heading: "6. Termination",
        body: "Flocker reserves the right to suspend or terminate your access to the service at any time, with or without cause, and with or without notice.",
      },
      {
        heading: "7. Limitation of Liability",
        body: "Flocker shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.",
      },
      {
        heading: "8. Changes to Terms",
        body: "Flocker reserves the right to modify these terms at any time. We will notify users of significant changes via email or through the app. Continued use of the service after changes constitutes acceptance of the new terms.",
      },
      {
        heading: "9. Contact",
        body: "If you have questions about these Terms of Service, please contact us at bonilla.franco484@gmail.com.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "July 2026",
    sections: [
      {
        heading: "1. Information We Collect",
        body: "We collect information you provide directly, including your name, school email address, academic details, and questionnaire responses. We also collect usage data such as pages visited and features used.",
      },
      {
        heading: "2. How We Use Your Information",
        body: "We use your information to provide and improve the matching service, communicate with you about updates and new matches, personalize your experience, and ensure the safety and integrity of our platform.",
      },
      {
        heading: "3. Information Sharing",
        body: "We do not sell your personal information. We share your information only as necessary to provide the service (e.g., showing your profile to potential matches), comply with legal obligations, or protect our users' safety.",
      },
      {
        heading: "4. Data Retention",
        body: "We retain your personal information for as long as your account is active or as needed to provide the service. You may request deletion of your account and associated data at any time.",
      },
      {
        heading: "5. Security",
        body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      },
      {
        heading: "6. Cookies",
        body: "Flocker uses cookies and similar tracking technologies to enhance your experience and analyze usage patterns. You can control cookie settings through your browser.",
      },
      {
        heading: "7. Your Rights",
        body: "You have the right to access, correct, or delete your personal information. You may also opt out of non-essential communications at any time. To exercise these rights, contact us at bonilla.franco484@gmail.com.",
      },
      {
        heading: "8. Changes to This Policy",
        body: "We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice in the app.",
      },
      {
        heading: "9. Contact",
        body: "If you have questions about this Privacy Policy or how we handle your data, please contact us at bonilla.franco484@gmail.com.",
      },
    ],
  },
};

export default function LegalPage({ type }: LegalPageProps) {
  const content = CONTENT[type];

  return (
    <main
      id="main-content"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
        <Link
          to="/"
          style={{
            fontSize: "0.875rem",
            color: "#6b6b6b",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.25rem",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
        >
          ← Back to Flocker
        </Link>
      </nav>

      {/* Header */}
      <header style={{ marginBottom: "3rem", borderBottom: "1px solid #e5e5e5", paddingBottom: "2rem" }}>
        <p
          style={{
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b6b6b",
            margin: "0 0 0.75rem",
          }}
        >
          Legal
        </p>
        <h1
          id="legal-heading"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            margin: "0 0 0.75rem",
            lineHeight: 1.1,
          }}
        >
          {content.title}
        </h1>
        <p style={{ fontSize: "0.875rem", color: "#6b6b6b", margin: 0 }}>
          Last updated: {content.lastUpdated}
        </p>
      </header>

      {/* Sections */}
      <article aria-labelledby="legal-heading">
        {content.sections.map((section) => (
          <section key={section.heading} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                margin: "0 0 0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {section.heading}
            </h2>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "#444",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {section.body}
            </p>
          </section>
        ))}
      </article>

      {/* Footer note */}
      <div
        style={{
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: "1px solid #e5e5e5",
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          to={type === "terms" ? "/privacy" : "/terms"}
          style={{
            fontSize: "0.875rem",
            color: "#6b6b6b",
            textDecoration: "underline",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
        >
          {type === "terms" ? "Privacy Policy" : "Terms of Service"}
        </Link>
        <a
          href="mailto:bonilla.franco484@gmail.com"
          style={{
            fontSize: "0.875rem",
            color: "#6b6b6b",
            textDecoration: "underline",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
        >
          bonilla.franco484@gmail.com
        </a>
      </div>
    </main>
  );
}
