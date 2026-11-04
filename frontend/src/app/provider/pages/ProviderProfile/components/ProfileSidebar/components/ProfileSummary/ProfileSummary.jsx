import { MapPin, Star, BriefcaseBusiness } from "lucide-react";

import styles from "./ProfileSummary.module.css";

const ProfileSummary = ({ user }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";
  const city = user?.address?.locality || "Ciudad no especificada";

  const category = "Plomería";
  const rating = 4.8;
  const reviewCount = 124;

  return (
    <section className={styles.profileSummary}>
      <h2 className={styles.title}>Resumen del perfil</h2>

      <div className={styles.providerInfo}>
        <h3 className={styles.providerName}>
          {firstName} {lastName}
        </h3>

        <div className={styles.infoItem}>
          <MapPin size={16} aria-hidden="true" />
          <span>{city}</span>
        </div>

        <div className={styles.infoItem}>
          <BriefcaseBusiness size={16} aria-hidden="true" />
          <span>{category}</span>
        </div>

        <div className={styles.ratingInfo}>
          <Star size={16} fill="currentColor" aria-hidden="true" />

          <strong>{rating.toFixed(1)}</strong>

          <span>({reviewCount} reseñas)</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;