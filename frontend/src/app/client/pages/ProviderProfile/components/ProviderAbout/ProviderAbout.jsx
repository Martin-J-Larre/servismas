import { MapPin, Wrench } from "lucide-react";
import styles from "./ProviderAbout.module.css";

const ProviderAbout = ({ experience, serviceArea }) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Sobre el prestador</h2>

      <div className={styles.infoGrid}>
        <article className={styles.infoItem}>
          <div className={styles.icon}>
            <Wrench size={17} aria-hidden="true" />
          </div>

          <div className={styles.infoContent}>
            <h3>Experiencia</h3>
            <p>{experience || "Información no disponible."}</p>
          </div>
        </article>

        <article className={styles.infoItem}>
          <div className={styles.icon}>
            <MapPin size={17} aria-hidden="true" />
          </div>

          <div className={styles.infoContent}>
            <h3>Área de servicio</h3>
            <p>{serviceArea || "Zona de servicio no especificada."}</p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default ProviderAbout;