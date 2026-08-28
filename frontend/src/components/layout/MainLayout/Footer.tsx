export default function Footer() {
  // TODO: Add links to privacy policy, terms of service, and contact information
  const NAV_LINKS = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <footer className="w-full border-t border-black px-6 py-4">
      <div className="flex items-center justify-between text-sm">
        <p className="text-black/50">© 2026 {document.title}</p>
        <nav aria-label="Footer navigation">
          <ul className="flex gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a className="hover:underline" href={link.href}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
