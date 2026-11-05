import { MapPin, House, Star, ArrowRight } from "lucide-react";
import styles from "./ProviderCard.module.css";

const ProviderCard = ({ service, onViewProfile }) => {
  const { firstName, lastName, location, category, description } = service;

  // Datos estáticos de demostración.
  const rating = 4.8;
  const reviewCount = 12;
  const availability = "Disponible";

  const name = `${firstName} ${lastName}`;
  const initials = `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`;
  const isAvailable = availability === "Disponible";

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>

        <div className={styles.details}>
          <div className={styles.header}>
            <div className={styles.identity}>
              <h3 className={styles.name}>{name}</h3>
              <p className={styles.specialty}>{category}</p>
            </div>

            <span
              className={`${styles.availability} ${
                isAvailable ? styles.available : styles.thisWeek
              }`}
            >
              <span className={styles.statusDot} />
              {availability}
            </span>
          </div>

          <div
            className={styles.rating}
            aria-label={`Calificación ${rating} de 5, ${reviewCount} valoraciones`}
          >
            <span className={styles.stars} aria-hidden="true">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={13}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </span>

            <span className={styles.ratingValue}>{rating.toFixed(1)}</span>

            <span className={styles.reviewCount}>
              ({reviewCount} valoraciones)
            </span>
          </div>

          <div className={styles.metadata}>
            <span>
              <MapPin size={13} aria-hidden="true" />
              {location?.locality}
            </span>
          </div>

          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.profileButton}
          onClick={() => onViewProfile?.(service)}
        >
          Ver perfil
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default ProviderCard;
