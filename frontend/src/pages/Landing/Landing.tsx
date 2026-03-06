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
    </main>
  );
}

export default Landing;