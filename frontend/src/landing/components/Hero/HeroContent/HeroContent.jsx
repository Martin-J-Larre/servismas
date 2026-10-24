import styles from "./HeroContent.module.css";

function HeroContent() {
  return (
    <div className={styles.content}>
      <span className={styles.eyebrow}>SERVICIOS CERCA TUYO</span>

      <h1 className={styles.title}>
        Encontrá <br />y contratá{" "}
        <span className={styles.highlight}>
          {" "}
          servicios
          <svg
            className={styles.underline}
            viewBox="0 0 300 18"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 5 10 Q 150 0 295 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <br />
        de confianza
      </h1>

      <p className={styles.description}>
        Conectamos personas que necesitan soluciones con profesionales
        confiables. Encontrá el servicio que buscás de forma fácil, rápida y
        segura.
      </p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>+1.000</strong>
          <span>Usuarios registrados</span>
        </div>

        <div className={styles.stat}>
          <strong>+500</strong>
          <span>Prestadores de servicios</span>
        </div>
      </div>

      <div className={styles.actions}>
        <a href="/registro" className={styles.registerButton}>
          Registrate ya
          <span aria-hidden="true"> →</span>
        </a>

        <span className={styles.verified}>
          <span className={styles.verifiedIcon} aria-hidden="true">
            ✓
          </span>
          Perfiles verificados
        </span>
      </div>
    </div>
  );
}

export default HeroContent;
