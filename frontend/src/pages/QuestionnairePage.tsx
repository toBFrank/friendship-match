import { Header, Footer } from "../components/layout";

export default function QuestionnairePage() {
  /**
   * Sections:
   * - Heading:
   */
  return (
    <>
      <Header />

      <main id="main-content">
        <section aria-labelledby="section-heading">
          <h1 id="section-heading">Page Title</h1>
          <p>Content here.</p>
        </section>

        <section aria-labelledby="section-questionnaire">
          <form></form>
        </section>
      </main>

      <Footer />
    </>
  );
}
