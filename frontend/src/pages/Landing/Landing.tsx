import styles from "./Landing.module.css";

function Landing() {
  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1>Landing Page</h1>
        <ul>
          <li>App main logo</li>
          <li>How to use</li>
          <li>Features</li>
          <li>Call to action button (Get Started)</li>
        </ul>
      </section>
      <section className={styles.section}>
        <h2>How It Works</h2>
        <ol>
          <li>Pick a path</li>
          <li>Complete the quiz</li>
          <li>Get matched!</li>
        </ol>
      </section>
      <section className={styles.section}>
        <h2>Features</h2>
        <ul>
          <li>Multiple match types (quick, study buddy, detailed)</li>
          <li>Personalized matching based on quiz results</li>
          <li>Easy-to-use interface</li>
        </ul>
      </section>
      <section className={styles.section}>
        <button>Get Started</button>
      </section>
    </main>
  );
}

export default Landing;