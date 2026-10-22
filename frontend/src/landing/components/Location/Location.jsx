
import { MapPin } from "lucide-react";
import styles from "./Location.module.css";

function Location() {
  return (
    <section className={styles.section} id="ubicacion">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>
            SERVICIOS EN TU ZONA
          </span>

          <h2 className={styles.title}>
            Encontrá servicios cerca tuyo
          </h2>

          <p className={styles.description}>
            Buscá prestadores según la zona donde necesitás
            realizar el servicio.
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
          {/* Imagen del mapa de Argentina con iconos de lugares 📍y un circulo demostrando are de cobertura */}

          <div className={styles.coverageCard}>
            <span className={styles.coverageLabel}>
              ZONA DE COBERTURA
            </span>

            <p className={styles.coverageText}>
              Prestadores disponibles en tu área
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
