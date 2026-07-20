import { Link } from "react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid var(--color-bg-inverted)",
        backgroundColor: "var(--color-bg-inverted)",
        padding: "3rem 1.5rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {/* Top row: brand + nav */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {/* TODO: Replace with image asset:
            <img src="/logo.svg" alt="Flocker" height={28} width={28} />
            */}
            <Link
              to="/"
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "var(--color-text-inverted)",
                textDecoration: "none",
              }}
            >
              Flocker
            </Link>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", margin: 0 }}>
              Find your people on campus.
            </p>
          </div>

          {/* Nav Links */}
          <nav aria-label="Footer navigation" style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            {/* Socials / Contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-inverted)", margin: 0, textTransform: "uppercase" }}>
                Connect
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li>
                  <a
                    href="https://www.instagram.com/tobfrankwu"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-instagram"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    <img src="/icons/insta_logo.png" alt="" width="24" height="24" style={{ objectFit: "contain", filter: "invert(1)" }} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bonilla.franco484@gmail.com"
                    id="footer-email"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    <img src="/icons/email.png" alt="" width="24" height="24" style={{ objectFit: "contain", filter: "invert(1)" }} />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://tobfrank.github.io/franco-bonilla-portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-portfolio"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    <img src="/icons/franco_icon_no_bg.png" alt="" width="24" height="24" style={{ objectFit: "contain"}} />
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-inverted)", margin: 0, textTransform: "uppercase" }}>
                Legal
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <li>
                  <Link
                    to="/terms"
                    id="footer-terms"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    id="footer-privacy"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/credits"
                    id="footer-credits"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      minHeight: "24px",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-inverted)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")}
                  >
                    Credits
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom: copyright */}
        <div style={{ borderTop: "1px solid #333", paddingTop: "2rem" }}>
          <p style={{ fontSize: "1rem", color: "var(--color-text-muted)", margin: 0 }}>
            © {year} Flocker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
