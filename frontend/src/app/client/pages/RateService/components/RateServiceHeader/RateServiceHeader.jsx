import styles from "./RateServiceHeader.module.css";

const RateServiceHeader = () => {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>Servicio completado</span>

      <h1 className={styles.title}>¿Cómo fue tu experiencia?</h1>

      <p className={styles.description}>
        Calificá el servicio realizado por el prestador.
      </p>
    </header>
  );
};

export default RateServiceHeader;
