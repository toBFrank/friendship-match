import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/"; // Kept this in case you need to conditionally render elements based on route

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="header" data-scrolled={scrolled}>
      <nav aria-label="Main navigation" className="header-nav">
        {/* Logo */}
        <Link to="/" className="header-logo">
          {/* TODO: Replace with image asset:
          <img src="/logo.svg" alt="Flocker" height={32} width={32} />
          */}
          <span className="header-logo-text">Flocker</span>
        </Link>

        {/* CTA */}
        <Link to="/questionnaire" id="header-cta" className="header-cta">
          Find Your Flock
          <span aria-hidden="true">→</span>
        </Link>
      </nav>
    </header>
  );
}
