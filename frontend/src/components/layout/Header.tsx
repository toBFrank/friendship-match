export default function Header() {
  // TODO: Finalize design and styling of the header
  // TODO: Finalize app name and branding to include in the header
  return (
    <header>
      <nav aria-label="Main navigation">
        <a href="/">Flocker</a>
        <ul>
          <li>
            <a href="/questionnaire">Questionnaire</a>
          </li>
          <li>
            <a href="/matches">Matches</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
