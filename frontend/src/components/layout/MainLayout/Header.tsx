export default function Header() {
  // const APP_NAME = "Flocker";
  const NAV_LINKS = [{ name: "Questionnaire", href: "/questionnaire" }];
  return (
    <header className="w-full border-b border-black px-6 py-4">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between"
      >
        <a className="text-4xl font-bold tracking-tight" href="/">
          {document.title}
        </a>
        <ul className="flex gap-6 text-sm">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a className="hover:underline" href={link.href}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
