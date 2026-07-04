import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        borderBottom: scrolled ? "1px solid #e5e5e5" : "1px solid transparent",
        backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "border-color 0.2s, background-color 0.2s",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
            color: "#000",
          }}
        >
          {/* TODO: Replace with image asset:
          <img src="/logo.svg" alt="Flocker" height={32} width={32} />
          */}
          <span
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              fontFamily: "inherit",
            }}
          >
            Flocker
          </span>
        </Link>

        {/* CTA */}
        <Link
          to="/questionnaire"
          id="header-cta"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 1.25rem",
            backgroundColor: "#000",
            color: "#fff",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: 600,
            textDecoration: "none",
            transition: "background-color 0.15s, transform 0.15s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#222";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#000";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          Find Flock
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  );
}
