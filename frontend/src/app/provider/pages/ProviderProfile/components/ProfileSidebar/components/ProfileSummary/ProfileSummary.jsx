import { MapPin, Star, BriefcaseBusiness } from "lucide-react";

import styles from "./ProfileSummary.module.css";

const ProfileSummary = () => {
  const provider = {
    firstName: "Juan",
    lastName: "Pérez",
    city: "Córdoba Capital",
    category: "Plomería",
    rating: 4.8,
    reviewCount: 124,
  };

  return (
    <section className={styles.profileSummary}>
      <h2 className={styles.title}>Resumen del perfil</h2>

      <div className={styles.providerInfo}>
        <h3 className={styles.providerName}>
          {provider.firstName} {provider.lastName}
        </h3>

        <div className={styles.infoItem}>
          <MapPin size={16} aria-hidden="true" />
          <span>{provider.city}</span>
        </div>

        <div className={styles.infoItem}>
          <BriefcaseBusiness size={16} aria-hidden="true" />
          <span>{provider.category}</span>
        </div>

        <div className={styles.ratingInfo}>
          <Star size={16} fill="currentColor" aria-hidden="true" />

          <strong>{provider.rating.toFixed(1)}</strong>

          <span>({provider.reviewCount} reseñas)</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
