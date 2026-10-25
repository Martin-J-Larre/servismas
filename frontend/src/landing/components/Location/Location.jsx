import { MapPin } from "lucide-react";
import styles from "./Location.module.css";
import coverageMap from "../../../assets/argentina-map.png";

const Location = () => {
  return (
    <section className={styles.section} id="ubicacion">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>SERVICIOS EN TU ZONA</span>

          <h2 className={styles.title}>Encontrá servicios cerca tuyo</h2>

          <p className={styles.description}>
            Buscá prestadores según la zona donde necesitás realizar el
            servicio y en todo el país.
          </p>

          <div className={styles.locationCard}>
            <span className={styles.locationIcon}>
              <MapPin size={22} strokeWidth={1.8} aria-hidden="true" />
            </span>

            <div className={styles.locationInfo}>
              <span className={styles.locationLabel}>
                Ubicación seleccionada
              </span>

              <strong className={styles.locationName}>
                Córdoba, Argentina
              </strong>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <img
            src={coverageMap}
            alt="Mapa de Argentina con marcadores de cobertura y Córdoba destacada"
            className={styles.mapImage}
          />

          <div className={styles.coverageCard}>
            <span className={styles.coverageLabel}>ZONA DE COBERTURA</span>

            <p className={styles.coverageText}>
              Prestadores disponibles en tu área
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
