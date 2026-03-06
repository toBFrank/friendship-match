import styles from "./Matching.module.css";

function Matching() {
  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1>Matching Page</h1>
        <ul>
            <li>Pick match type (quick (default), study buddy, detailed)</li>
            <li>Other things to find on this page...</li>
        </ul>
      </section>
    </main>
  );
}

export default Matching;
