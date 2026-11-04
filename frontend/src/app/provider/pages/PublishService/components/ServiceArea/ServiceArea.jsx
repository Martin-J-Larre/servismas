import { MapPin, LocateFixed } from "lucide-react";

import AddressAutocomplete from "../../../../../components/AddressAutocomplete/AddressAutocomplete";
import styles from "./ServiceArea.module.css";

const serviceRadii = [5, 10, 20, 30, 50];

const ServiceArea = ({ formData, onChange }) => {
  const handleRadiusChange = (radius) => {
    onChange("radius", radius);
  };

  const locationLabel = formData.location
    ? [formData.location.locality, formData.location.province]
        .filter(Boolean)
        .join(", ")
    : "tu zona";

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
          <AddressAutocomplete
            value={formData.location}
            onChange={(address) => onChange("location", address)}
          />

          <small className={styles.hint}>
            Seleccioná una dirección de las sugerencias para establecer desde
            dónde ofrecés tus servicios.
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
                  desde <strong>{locationLabel}</strong>.
                </>
              ) : (
                <>
                  Atenderás solicitudes dentro de un radio de{" "}
                  <strong>{formData.radius} km</strong> desde{" "}
                  <strong>{locationLabel}</strong>.
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
