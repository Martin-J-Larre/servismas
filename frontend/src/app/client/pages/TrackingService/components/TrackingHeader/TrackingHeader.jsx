import styles from "./TrackingHeader.module.css";

const TrackingHeader = () => {
  return (
    <header className={styles.header}>
      <span className={styles.eyebrow}>SEGUIMIENTO</span>

      <h1 className={styles.title}>Seguimiento del servicio</h1>

      <p className={styles.description}>
        Consultá el estado y los detalles de tu servicio.
      </p>
    </header>
  );
};

export default TrackingHeader;
