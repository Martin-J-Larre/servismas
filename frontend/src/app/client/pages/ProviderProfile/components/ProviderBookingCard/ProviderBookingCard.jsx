import { MapPin, Star, ShieldCheck } from "lucide-react";

import styles from "./ProviderBookingCard.module.css";

const ProviderBookingCard = ({
  name,
  initials,
  specialty,
  location,
  rating,
  reviewCount,
  onSelect,
}) => {
  const locationText =
    typeof location === "string"
      ? location
      : [location?.locality, location?.province].filter(Boolean).join(", ");

  return (
    <section className={styles.card}>
      <div className={styles.provider}>
        <div className={styles.avatar} aria-hidden="true">
          {initials || name?.charAt(0).toUpperCase() || "P"}
        </div>

        <div className={styles.providerInfo}>
          <h2 className={styles.name}>{name || "Prestador"}</h2>

          <p className={styles.specialty}>
            {specialty || "Especialidad no especificada"}
          </p>
        </div>
      </div>

      {locationText && (
        <div className={styles.location}>
          <MapPin size={17} aria-hidden="true" />
          <span>{locationText}</span>
        </div>
      )}

      {rating != null && (
        <div className={styles.rating}>
          <Star size={18} fill="currentColor" aria-hidden="true" />

          <span className={styles.ratingValue}>{rating}</span>

          {reviewCount != null && (
            <span className={styles.reviewCount}>
              ({reviewCount} {reviewCount === 1 ? "opinión" : "opiniones"})
            </span>
          )}
        </div>
      )}

      <div className={styles.trust}>
        <ShieldCheck size={18} aria-hidden="true" />

        <span>Consultá la información del prestador antes de contratar.</span>
      </div>

      <button type="button" className={styles.selectButton} onClick={onSelect}>
        Seleccionar prestador
      </button>

      <p className={styles.disclaimer}>
        La contratación estará sujeta a la disponibilidad y confirmación del
        prestador.
      </p>
    </section>
  );
};

export default ProviderBookingCard;
