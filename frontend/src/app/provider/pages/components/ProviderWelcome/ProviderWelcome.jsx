import styles from "./ProviderWelcome.module.css";

const ProviderWelcome = ({ name = "Juan", onPublishService }) => {
  return (
    <section className={styles.welcome}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>PANEL DEL PRESTADOR</span>

        <h1>Hola, {name}</h1>

        <p>
          Gestioná tus servicios, solicitudes y disponibilidad desde un solo
          lugar.
        </p>
      </div>

      <button
        type="button"
        className={styles.primaryButton}
        onClick={onPublishService}
      >
        <span className={styles.plus} aria-hidden="true">
          +
        </span>
        Publicar nuevo servicio
      </button>
    </section>
  );
};

export default ProviderWelcome;
