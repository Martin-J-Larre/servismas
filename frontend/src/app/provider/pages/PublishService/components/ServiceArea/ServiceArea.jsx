import { MapPin, LocateFixed } from "lucide-react";

import styles from "./ServiceArea.module.css";

const serviceRadii = [5, 10, 20, 30, 50];

const ServiceArea = ({ formData, onChange }) => {
  const handleRadiusChange = (radius) => {
    onChange("radius", radius);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>2</span>

        <div className={styles.sectionTitle}>
          <MapPin size={15} aria-hidden="true" />
          <h2>Área de servicio</h2>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.field}>
          <label htmlFor="service-location">
            Zona donde prestás el servicio
          </label>

          <div className={styles.inputWrapper}>
            <MapPin className={styles.inputIcon} size={16} aria-hidden="true" />

            <input
              id="service-location"
              type="text"
              value={formData.location}
              onChange={(event) => onChange("location", event.target.value)}
              placeholder="Ej.: Córdoba Capital"
              maxLength={120}
              required
            />
          </div>

          <small className={styles.hint}>
            Indicá la ciudad o zona desde donde ofrecés tus servicios.
          </small>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Radio de servicio</span>

          <div
            className={styles.radiusOptions}
            role="group"
            aria-label="Radio de cobertura del servicio"
          >
            {serviceRadii.map((radius) => (
              <button
                key={radius}
                type="button"
                className={`${styles.radiusButton} ${
                  formData.radius === radius ? styles.selected : ""
                }`}
                aria-pressed={formData.radius === radius}
                onClick={() => handleRadiusChange(radius)}
              >
                {radius} km
              </button>
            ))}

            <button
              type="button"
              className={`${styles.radiusButton} ${
                formData.radius === null ? styles.selected : ""
              }`}
              aria-pressed={formData.radius === null}
              onClick={() => handleRadiusChange(null)}
            >
              Sin límite
            </button>
          </div>

          <div className={styles.coverageInfo}>
            <LocateFixed size={14} aria-hidden="true" />

            <p>
              {formData.radius === null ? (
                <>
                  Ofrecés tus servicios sin un límite de distancia definido
                  desde <strong>{formData.location || "tu zona"}</strong>.
                </>
              ) : (
                <>
                  Atenderás solicitudes dentro de un radio de{" "}
                  <strong>{formData.radius} km</strong> desde{" "}
                  <strong>{formData.location || "tu zona"}</strong>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
