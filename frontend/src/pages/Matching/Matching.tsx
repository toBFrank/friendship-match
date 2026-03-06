import styles from "./Matching.module.css";

function Matching() {
  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1>Matching Page</h1>
        <ul>
            <li>Pick match type (quick (default), study buddy, detailed)</li>
            <li>Test section</li>
        </ul>
      </section>
      <section className={styles.section}>
        <button>Quick Match</button>
        <button>Study Buddy</button>
        <button>Detailed Match</button>
      </section>
      <section className={styles.section}>
        <h2>Test Section</h2>
      </section>
    </main>
  );
}

export default Matching;
