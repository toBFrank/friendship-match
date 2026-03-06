import styles from "./Authentication.module.css";

function Authentication() {
  return (
    <main className={styles.container}>
      <section className={styles.section}>
        <h1>Authentication Page</h1>
        <ul>
            <li>Pick match type (quick (default), study buddy, detailed)</li>
            <li>Other things to find on this page...</li>
        </ul>
      </section>
    </main>
  );
}

export default Authentication;
