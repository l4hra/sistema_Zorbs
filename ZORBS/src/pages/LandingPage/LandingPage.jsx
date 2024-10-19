import styles from "../LandingPage/Landing.module.css";

export default function LandingPage() {
  return (
    <>
      <header>
        <h1>Zorbs</h1>
      </header>

      <div className={styles.container}>
        <h3>Planos</h3>
        <div className={styles.card}>
          <p>Plano basic</p>
          <p>R$300,00</p>
        </div>
        <div className={styles.card}>
          <p>Plano basic</p>
          <p>R$300,00</p>
        </div>
        <div className={styles.card}>
          <p>Plano basic</p>
          <p>R$300,00</p>
        </div>
      </div>
    </>
  );
}
