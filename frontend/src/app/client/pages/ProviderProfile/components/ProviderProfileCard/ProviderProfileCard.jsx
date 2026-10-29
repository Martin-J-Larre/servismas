import { MapPin, BriefcaseBusiness, ShieldCheck, Star } from "lucide-react";

import styles from "./ProviderProfileCard.module.css";

const ProviderProfileCard = ({ provider }) => {
  const {
    name,
    initials,
    specialty,
    rating,
    reviewCount,
    location,
    availability,
  } = provider;

  const isAvailable = availability === "Disponible";

  return (
    <section className={styles.card}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>

        <span
          className={`${styles.availability} ${
            isAvailable ? styles.available : styles.unavailable
          }`}
        >
          <span className={styles.statusDot} />
          {availability || "Consultar"}
        </span>
      </div>

      <div className={styles.information}>
        <div className={styles.identity}>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.specialty}>{specialty}</p>
        </div>

        <div className={styles.metadata}>
          <span className={styles.metadataItem}>
            <MapPin size={15} aria-hidden="true" />
            {location}
          </span>

          <span className={styles.metadataItem}>
            <BriefcaseBusiness size={15} aria-hidden="true" />
            Servicios para el hogar
          </span>

          <span className={`${styles.metadataItem} ${styles.verifiedBadge}`}>
            <ShieldCheck size={15} aria-hidden="true" />
            Perfil verificado
          </span>
        </div>
      </div>

      <div
        className={styles.rating}
        aria-label={`Calificación ${rating} de 5, ${reviewCount} valoraciones`}
      >
        <span className={styles.stars} aria-hidden="true">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={15} fill="currentColor" strokeWidth={0} />
          ))}
        </span>

        <strong className={styles.ratingValue}>
          {Number(rating).toFixed(1).replace(".", ",")}
        </strong>

        <span className={styles.reviewCount}>· {reviewCount} valoraciones</span>
      </div>
    </section>
  );
};

export default ProviderProfileCard;
