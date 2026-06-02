export default function Header() {
  const APP_NAME = "Flocker";
  const NAV_LINKS = [{ name: "Questionnaire", href: "/questionnaire" }];
  return (
    <header className="w-full border-b border-black px-6 py-4">
      <nav aria-label="Main navigation">
        <a href="/">{APP_NAME}</a>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <a href={link.href}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
