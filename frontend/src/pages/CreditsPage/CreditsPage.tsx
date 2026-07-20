import { Link } from "react-router";

export default function CreditsPage() {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "4rem 1.5rem 6rem",
      }}
    >
      <nav aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
        <Link
          to="/"
          style={{
            fontSize: "1rem",
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

      <header style={{ marginBottom: "3rem", borderBottom: "1px solid #e5e5e5", paddingBottom: "2rem" }}>
        <h1
          id="credits-heading"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 900,
            margin: "0 0 1rem",
            lineHeight: 1.1,
          }}
        >
          Credits
        </h1>
        <p style={{ fontSize: "1rem", color: "#6b6b6b", margin: 0, lineHeight: 1.5 }}>
          We are grateful to the creators who have shared their work. Below is a list of assets used in Flocker.
        </p>
      </header>

      <article aria-labelledby="credits-heading">
        <section style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              margin: "0 0 1rem",
            }}
          >
            The Noun Project
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#444",
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            Icons and images used in Flocker are sourced from <a href="https://thenounproject.com" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>The Noun Project</a>.
          </p>
          <ul style={{ marginTop: "1rem", color: "#444", fontSize: "1rem", lineHeight: 1.75, paddingLeft: "1.5rem" }}>
            <li><i>hobby-4691033 icon by Narakorn Chanchittakarn from <a href="https://thenounproject.com/icon/hobby-4691033/" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>The Noun Project</a> CC BY 3.0</i></li>
            <li><i>event-2080496 icon by Alice Design from <a href="https://thenounproject.com/icon/event-2080496/" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>The Noun Project</a> CC BY 3.0</i></li>
            <li><i>adventure-7873696 icon by Smashing Stocks from <a href="https://thenounproject.com/icon/adventure-7873696/" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>The Noun Project</a> CC BY 3.0</i></li>
            <li><i>instagram-7999670 icon by FAUZUL KABIR from <a href="https://thenounproject.com/icon/instagram-7999670/" target="_blank" rel="noopener noreferrer" style={{ color: "#000", textDecoration: "underline" }}>The Noun Project</a> CC BY 3.0</i></li>
          </ul>
        </section>
      </article>
    </main>
  );
}
