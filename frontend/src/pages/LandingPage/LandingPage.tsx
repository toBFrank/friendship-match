import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "./LandingPage.css";

/* ─── Types ────────────────────────────────────────── */
interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface MatchProfile {
  emoji: string;
  name: string;
  tag: string;
  score: number;
}

/* ─── Data ─────────────────────────────────────────── */
const WAITLIST_COUNT = 0; // ENABLE: Replace with real count from Supabase

const MATCH_PROFILES: MatchProfile[] = [
  { emoji: "🎸", name: "Alex M.",    tag: "Music · CS · '27",  score: 97 },
  { emoji: "📚", name: "Jordan K.",  tag: "Bio · Reading · '26", score: 93 },
  { emoji: "🎮", name: "Sam T.",     tag: "Gaming · Econ · '27", score: 91 },
  { emoji: "🌿", name: "Riley O.",   tag: "Art · Env Sci · '25", score: 88 },
  { emoji: "🏃", name: "Morgan L.",  tag: "Track · Psych · '28", score: 85 },
];

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
    answer:
      "Tap their profile and select Unmatch. No explanation needed.",
  },
  {
    id: "other-schools",
    question: "Can I match with people in other schools?",
    answer:
      "Not yet — Flocker is campus-first. We think proximity matters for real friendships.",
  },
];

/* ─── Sub-components ───────────────────────────────── */
function Leaderboard() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hero-visual">
      <div className="leaderboard">
        <div className="leaderboard-header">
          <span className="leaderboard-title">Your Matches</span>
          <span className="leaderboard-badge">Updated today</span>
        </div>
        <ul className="leaderboard-list" aria-label="Top compatible matches">
          {MATCH_PROFILES.map((profile, i) => (
            <li
              key={profile.name}
              className="leaderboard-item"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <span className="leaderboard-rank">#{i + 1}</span>
              <div className="leaderboard-avatar" aria-hidden="true">
                {profile.emoji}
              </div>
              <div className="leaderboard-info">
                <div className="leaderboard-name">{profile.name}</div>
                <div className="leaderboard-tag">{profile.tag}</div>
              </div>
              <div className="leaderboard-score">
                <div className="score-bar-track">
                  <div
                    className="score-bar-fill"
                    style={{ width: animated ? `${profile.score}%` : "0%" }}
                    role="meter"
                    aria-valuenow={profile.score}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${profile.score}% compatibility`}
                  />
                </div>
                <span className="score-value">{profile.score}%</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function QuestionnaireMockup() {
  const tabs = ["Interests", "Personality", "Academic", "Account"];
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOption, setSelectedOption] = useState(1);

  const questions = [
    {
      text: "What best describes your social style?",
      options: ["Homebody", "Small groups", "Big social events", "Depends on mood"],
    },
    {
      text: "Pick your go-to hobby:",
      options: ["Making music", "Reading / writing", "Gaming", "Outdoors"],
    },
    {
      text: "Your study vibe:",
      options: ["Solo deep work", "Study groups", "Library + headphones", "Cafes"],
    },
  ];

  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    const cycle = setInterval(() => {
      setSelectedOption((s) => (s + 1) % 4);
    }, 1400);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const tabCycle = setInterval(() => {
      setActiveTab((t) => (t + 1) % tabs.length);
      setQIndex((q) => (q + 1) % questions.length);
    }, 3000);
    return () => clearInterval(tabCycle);
  }, []);

  const q = questions[qIndex];

  return (
    <div className="questionnaire-mockup">
      <div className="q-section-tabs">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`q-tab${i === activeTab ? " active" : ""}`}
            tabIndex={-1}
            aria-hidden="true"
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="q-card">
        <div className="q-question">{q.text}</div>
        <div className="q-options">
          {q.options.map((opt, i) => (
            <div
              key={opt}
              className={`q-option${i === selectedOption ? " selected" : ""}`}
              aria-hidden="true"
            >
              <div className="q-option-dot" />
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchCardMockup() {
  const [showNew, setShowNew] = useState(false);
  const cards = [
    { emoji: "🎵", name: "Casey R.", compat: 96 },
    { emoji: "📸", name: "Drew M.", compat: 94 },
    { emoji: "🧩", name: "Taylor W.", compat: 91 },
  ];
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setShowNew(true);
      setTimeout(() => {
        setCardIndex((i) => (i + 1) % cards.length);
        setShowNew(false);
      }, 800);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const card = cards[cardIndex];

  return (
    <div className="match-stack">
      {/* Back card */}
      <div className="match-card card-back" aria-hidden="true" />
      {/* Front card */}
      <div
        className="match-card card-front"
        key={cardIndex}
        style={{
          animation: showNew
            ? "cardRise 0.5s ease both"
            : undefined,
        }}
      >
        <div className="match-avatar">{card.emoji}</div>
        <div className="match-name">{card.name}</div>
        <div className="match-compat">
          ✦ {card.compat}% match
        </div>
        {showNew && (
          <div className="new-match-badge" aria-live="polite">
            New Match!
          </div>
        )}
      </div>
    </div>
  );
}

function FriendshipScoreMockup() {
  const [score, setScore] = useState(42);
  const activities = [
    { icon: "☕", text: "Grab coffee together", points: "+15", done: true },
    { icon: "📚", text: "Study session", points: "+10", done: true },
    { icon: "🎬", text: "Movie night", points: "+12", done: false },
    { icon: "🏃", text: "Morning run", points: "+8",  done: false },
  ];

  useEffect(() => {
    let val = 42;
    const ticker = setInterval(() => {
      val = val < 89 ? val + 1 : 42;
      setScore(val);
    }, 80);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div className="friendship-mockup">
      <div
        className="friendship-score-ring"
        aria-label={`Friendship score: ${score}`}
      >
        <span className="friendship-score-number">{score}</span>
      </div>
      <p style={{ fontSize: "0.75rem", color: "#6b6b6b", margin: 0, fontWeight: 600 }}>
        Friendship Score
      </p>
      <ul className="friendship-activity-list" aria-label="Weekly activities">
        {activities.map((a) => (
          <li key={a.text} className={`friendship-activity${a.done ? " done" : ""}`}>
            <span className="friendship-activity-icon">{a.icon}</span>
            <span className="friendship-activity-text">{a.text}</span>
            <span className="friendship-activity-points">{a.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Opens default mail client as fallback; replace with API call when ready
    const subject = encodeURIComponent(`Flocker Inquiry from ${fields.name}`);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\n\n${fields.message}`
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
          <label htmlFor="contact-name" className="form-label">Name</label>
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
          <label htmlFor="contact-email" className="form-label">Email</label>
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
        <label htmlFor="contact-message" className="form-label">Message</label>
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
      <button type="submit" className="btn-primary contact-submit" id="contact-send">
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
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            Campus-first friend matching
          </div>

          <h1 id="hero-headline">
            Find your people<br />on campus.
          </h1>

          <p className="hero-sub">
            Flocker matches you based on who you actually are —
            your interests, personality, and classes.
          </p>

          <div className="hero-actions">
            <Link to="/questionnaire" className="btn-primary" id="hero-cta">
              Start Matching →
            </Link>
            <a href="#features" className="btn-secondary" id="hero-learn-more">
              See how it works
            </a>
          </div>

          <Leaderboard />
        </div>
      </section>

      {/* ── 2. Value Proposition ─────────────────────── */}
      <section id="value-prop" aria-labelledby="value-prop-heading">
        <div className="value-prop">
          <span className="section-label" aria-hidden="true">Why Flocker</span>
          <p className="value-prop-text" id="value-prop-heading">
            "Flocker matches you on<br />who you actually are."
          </p>
        </div>
      </section>

      {/* ── 3. Social Proof (hidden until signups >= 100) */}
      {/* ENABLE: Remove the `display: none` from .social-proof in LandingPage.css */}
      {/* Also wire WAITLIST_COUNT to your real Supabase count */}
      <section
        id="social-proof"
        className="social-proof"
        aria-labelledby="social-proof-heading"
        aria-hidden="true"
      >
        <div className="section-container">
          <div className="waitlist-counter">
            <span
              className="waitlist-count"
              id="social-proof-heading"
              aria-label={`${WAITLIST_COUNT}+ students already waiting`}
            >
              {WAITLIST_COUNT.toLocaleString()}+
            </span>
            <span>students already waiting</span>
          </div>
        </div>
      </section>

      {/* ── 4. Feature Highlights ────────────────────── */}
      <section id="features" aria-labelledby="features-heading">
        <div className="features">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">Features</span>
            <h2 className="features-headline" id="features-heading">
              Meet people you'd<br />actually get along with.
            </h2>

            {/* Feature 1: Questionnaire */}
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
                {/* TODO: Replace with gif/video: <video src="/assets/questionnaire.mp4" autoPlay muted loop playsInline /> */}
                <QuestionnaireMockup />
              </div>
            </div>

            {/* Feature 2: Fresh Matches */}
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
                {/* TODO: Replace with gif/video: <video src="/assets/new-match.mp4" autoPlay muted loop playsInline /> */}
                <MatchCardMockup />
              </div>
            </div>

            {/* Feature 3: Friendship Score */}
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
                {/* TODO: Replace with gif/video: <video src="/assets/friendship-score.mp4" autoPlay muted loop playsInline /> */}
                <FriendshipScoreMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Final CTA ─────────────────────────────── */}
      <section id="cta" aria-labelledby="cta-heading">
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
              Find Flock →
            </Link>
          </div>
        </div>
      </section>

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
      <section id="faq" aria-labelledby="faq-heading">
        <div className="faq-section">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">FAQ</span>
            <h2 id="faq-heading">Common questions</h2>
            <FaqAccordion />
          </div>
        </div>
      </section>

      {/* ── 7. Contact ───────────────────────────────── */}
      <section id="contact" aria-labelledby="contact-heading">
        <div className="contact-section">
          <div className="section-container">
            <span className="section-label" aria-hidden="true">Contact</span>
            <h2 id="contact-heading">Say hello.</h2>
            <p>Have a question or want to work together? We'd love to hear from you.</p>
            <ContactForm />
          </div>
        </div>
      </section>

    </main>
  );
}
