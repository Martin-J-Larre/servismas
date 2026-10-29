import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ProviderSummary.module.css";

const ProviderSummary = ({ provider }) => {
  if (!provider) {
    return null;
  }

  const {
    id,
    name,
    initials,
    specialty,
    category,
    rating,
    reviewCount,
    location,
  } = provider;

  return (
    <article className={styles.card}>
      <div className={styles.avatar} aria-hidden="true">
        {initials}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.specialty}>
          {specialty || category}
          {location && <span> · {location}</span>}
        </p>

        <div className={styles.rating}>
          <div
            className={styles.stars}
            aria-label={`Calificación de ${rating} sobre 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={12}
                fill={index < Math.round(rating) ? "currentColor" : "none"}
                aria-hidden="true"
              />
            ))}
          </div>

          <span className={styles.ratingValue}>{rating}</span>

          <span className={styles.reviewCount}>
            · {reviewCount} valoraciones
          </span>
        </div>
      </div>

      <Link to={`/prestadores/${id}`} className={styles.profileLink}>
        Ver perfil
      </Link>
    </article>
  );
};

export default ProviderSummary;
