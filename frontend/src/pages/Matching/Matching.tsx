import styles from "./Matching.module.css";
import TestPathButton from "./TestPathButton";

function Matching() {
  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1>Matching Page</h1>
        <ul>
          <li>Pick match type (quick (default), classes, detailed)</li>
          <li>Test section</li>
        </ul>
      </section>
      <section className={styles.section}>
        <section className={styles.testpath}>
          <TestPathButton label={"Quick Match"} />
          <TestPathButton label={"Classes Match"} />
          <TestPathButton label={"Detailed Match"} />
        </section>
      </section>
      <section className={styles.section}>
        <h2>Test Section</h2>
      </section>
    </main>
  );
}

export default Matching;
