import { useState } from "react";
import { Link } from "react-router";

/* ─── Types ────────────────────────────────────────── */
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/* ─── Data ─────────────────────────────────────────── */
const WAITLIST_COUNT = 0; // ENABLE: Replace with real count from Supabase

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "how-it-works",
    question: "How does Flocker work?",
    answer:
      "You fill out a short questionnaire about your interests, personality, and classes. Flocker's algorithm uses your answers to find highly compatible people at your school.",
  },
  {
    id: "unmatch",
    question: "How do I unmatch someone?",
    answer: "Tap their profile and select Unmatch. No explanation needed.",
  },
  {
    id: "other-schools",
    question: "Can I match with people in other schools?",
    answer:
      "Not yet — Flocker is campus-first. We think proximity matters for real friendships.",
  },
];

/* ─── Sub-components ───────────────────────────────── */
function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <ul className="faq-list" role="list">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <li key={item.id} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              id={`faq-btn-${item.id}`}
              className="faq-question"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              {item.question}
              <svg
                className="faq-chevron"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div
              id={`faq-answer-${item.id}`}
              className="faq-answer"
              role="region"
              aria-labelledby={`faq-btn-${item.id}`}
            >
              <p>{item.answer}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Opens default mail client as fallback; replace with API call when ready
    const subject = encodeURIComponent(`Flocker Inquiry from ${fields.name}`);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`,
    );
    window.location.href = `mailto:bonilla.franco484@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span> Thanks! We'll be in touch soon.
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-row">
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className="form-input"
            placeholder="Your name"
            value={fields.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className="form-input"
            placeholder="you@school.edu"
            value={fields.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="contact-message" className="form-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-textarea"
          placeholder="What's on your mind?"
          value={fields.message}
          onChange={handleChange}
          required
        />
      </div>
      <button
        type="submit"
        className="btn-primary contact-submit"
        id="contact-send"
      >
        Send Message →
      </button>
    </form>
  );
}

/* ─── Main Page ────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main id="main-content">
      {/* ── 1. Hero ──────────────────────────────────── */}
      <section id="hero" aria-labelledby="hero-headline">
        <div className="hero">
          <h1 className="hero-headline">
            Find your flock
            <br />
            on campus.
          </h1>

          <p className="hero-sub">
            It's easy; just tell us a bit about yourself and we'll look for your
            best matches.
          </p>

          <div className="hero-actions">
            <Link to="/questionnaire" className="btn-primary" id="hero-cta">
              Start Matching →
            </Link>
          </div>

          {/* ── Social Proof (Moved into Hero) ── */}
          {/* ENABLE: Remove the `display: none` from .hero-social-proof in CSS when signups >= 100 */}
          <div className="hero-social-proof" aria-live="polite">
            <span className="hero-social-count">
              {WAITLIST_COUNT.toLocaleString()}
            </span>
            <span className="hero-social-text">
              students ready to meet their flock
            </span>
          </div>

          <div className="hero-visual"></div>
        </div>
      </section>

      {/* ── 2. Value Proposition ─────────────────────── */}
      {/* <section id="value-prop" aria-labelledby="value-prop-heading">
        <div className="value-prop">
          <span className="section-label" aria-hidden="true">Why Flocker</span>
          <p className="value-prop-text" id="value-prop-heading">
            Flocker matches you on<br />who you actually are.
          </p>
        </div>
      </section> */}

      {/* ── 4. Feature Highlights ────────────────────── */}
      {/* <section id="features" aria-labelledby="features-heading">
        <div className="features">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">Features</span>

            <div className="feature-item">
              <div className="feature-content">
                <div className="feature-number">01</div>
                <h3>Meet people you'd actually get along with</h3>
                <p>
                  Answer questions about your hobbies, personality, and classes.
                  Flocker uses your answers to find people who genuinely fit.
                </p>
              </div>
              <div className="feature-visual" aria-label="Questionnaire walkthrough preview">
                <img
                  src="/public/images/feature_1_visual.png"
                  alt="Feature 1 Visual"
                  width={300}
                  height={300}
                  />
                <div className="placeholder-box">
                  Questionnaire Walkthrough Placeholder
                </div>
              </div>
            </div>

            <div className="feature-item reverse">
              <div className="feature-content">
                <div className="feature-number">02</div>
                <h3>Fresh matches, regularly</h3>
                <p>
                  Flocker runs match events so you're always meeting someone new
                  — not just seeing the same profiles.
                </p>
              </div>
              <div className="feature-visual" aria-label="New match card preview">
                <img
                  src="/public/images/feature_2_visual.png"
                  alt="Feature 2 Visual"
                  width={300}
                  height={300}
                  />
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-content">
                <div className="feature-number">03</div>
                <h3>Build friendships, not just connections</h3>
                <p>
                  Flocker gives you and your matches weekly activities to do
                  together, and tracks how your friendship grows over time.
                </p>
              </div>
              <div className="feature-visual" aria-label="Friendship score animation preview">
                <img
                  src="/public/images/feature_3_visual.png"
                  alt="Feature 3 Visual"
                  width={300}
                  height={300}
                  />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ── 5. Final CTA ─────────────────────────────── */}
      {/* <section id="cta" aria-labelledby="cta-heading">
        <div className="cta-section">
          <div className="section-container">
            <span
              className="section-label"
              style={{ color: "rgba(255,255,255,0.4)", borderBottomColor: "rgba(255,255,255,0.4)" }}
              aria-hidden="true"
            >
              Get started
            </span>
            <h2 id="cta-heading">Your flock is here.</h2>
            <p>
              Fill out your profile and get matched when we launch.
            </p>
            <Link to="/questionnaire" className="btn-primary-inverted" id="final-cta">
              Find Your Flock →
            </Link>
          </div>
        </div>
      </section> */}

      {/* ── PRICING (hidden — uncomment when ready) ──────
      <section id="pricing" aria-labelledby="pricing-heading">
        <div className="pricing-section">
          <div className="section-container">
            <h2 id="pricing-heading">Pricing</h2>
            <p>Free for students. Schools and clubs: contact us for a subscription.</p>
          </div>
        </div>
      </section>
      */}

      {/* ── 6. FAQ ───────────────────────────────────── */}
      {/*<section id="faq" aria-labelledby="faq-heading">
        <div className="faq-section">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">FAQ</span>
            <h2 id="faq-heading">Common questions</h2>
            <FaqAccordion />
          </div>
        </div>
      </section>*/}

      {/* ── 7. Contact ───────────────────────────────── */}
      {/* <section id="contact" aria-labelledby="contact-heading">
        <div className="contact-section">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">Contact</span>
            <h2 id="contact-heading">Say hello.</h2>
            <p>Have a question or want to work together? We'd love to hear from you.</p>
            <ContactForm />
          </div>
        </div>
      </section> */}
    </main>
  );
}
