import { Header, Footer } from "../components/layout";

export default function BasePage() {
  return (
    <>
      <Header />

      <main id="main-content">
        <section aria-labelledby="section-heading">
          <h1 id="section-heading">Page Title</h1>
          <p>Content here.</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
