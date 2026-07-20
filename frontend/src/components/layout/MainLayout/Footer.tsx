import { Link } from "react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: "100%",
        borderTop: "1px solid #e5e5e5",
        backgroundColor: "#fff",
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
                color: "#000",
                textDecoration: "none",
              }}
            >
              Flocker
            </Link>
            <p style={{ fontSize: "0.875rem", color: "#6b6b6b", margin: 0 }}>
              Find your people on campus.
            </p>
          </div>

          {/* Nav Links */}
          <nav aria-label="Footer navigation" style={{ display: "flex", gap: "4rem", flexWrap: "wrap" }}>
            {/* Socials / Contacts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#000", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Connect
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>
                  <a
                    href="https://www.instagram.com/tobfrankwu"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-instagram"
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    <img src="/icons/insta_logo.png" alt="" width="16" height="16" style={{ objectFit: "contain" }} />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bonilla.franco484@gmail.com"
                    id="footer-email"
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      transition: "color 0.15s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    <img src="/icons/email.png" alt="" width="16" height="16" style={{ objectFit: "contain" }} />
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
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    <img src="/icons/franco_icon_no_bg.png" alt="" width="16" height="16" style={{ objectFit: "contain" }} />
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#000", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Legal
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>
                  <Link
                    to="/terms"
                    id="footer-terms"
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    id="footer-privacy"
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/credits"
                    id="footer-credits"
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b6b6b",
                      textDecoration: "none",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#000")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6b6b")}
                  >
                    Credits
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom: copyright */}
        <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#9ca3af", margin: 0 }}>
            © {year} Flocker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
