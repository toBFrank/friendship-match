import { Link } from "react-router";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top row: brand + nav */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            {/* TODO: Replace with image asset:
            <img src="/logo.svg" alt="Flocker" height={28} width={28} />
            */}
            <Link to="/" className="footer-brand-link">
              Flocker
            </Link>
            <p className="footer-brand-desc">Find your flock on campus.</p>
          </div>

          {/* Nav Links */}
          <nav aria-label="Footer navigation" className="footer-nav">
            {/* Socials / Contacts */}
            <div className="footer-nav-group">
              <p className="footer-nav-title">Connect</p>
              <ul className="footer-nav-list">
                <li>
                  <a
                    href="https://www.instagram.com/tobfrankwu"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-instagram"
                    className="footer-nav-link"
                  >
                    <img
                      src="/icons/insta_logo.png"
                      alt="Instagram"
                      className="footer-icon"
                    />
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bonilla.franco484@gmail.com"
                    id="footer-email"
                    className="footer-nav-link"
                  >
                    <img
                      src="/icons/email.png"
                      alt="Email"
                      className="footer-icon"
                    />
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://tobfrank.github.io/franco-bonilla-portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-portfolio"
                    className="footer-nav-link"
                  >
                    <img
                      src="/icons/franco_icon_no_bg.png"
                      alt="Portfolio"
                      className="footer-icon no-invert"
                    />
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-nav-group">
              <p className="footer-nav-title">Legal</p>
              <ul className="footer-nav-list">
                <li>
                  <Link
                    to="/terms"
                    id="footer-terms"
                    className="footer-nav-link"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    id="footer-privacy"
                    className="footer-nav-link"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/credits"
                    id="footer-credits"
                    className="footer-nav-link"
                  >
                    Credits
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom: copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Flocker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
