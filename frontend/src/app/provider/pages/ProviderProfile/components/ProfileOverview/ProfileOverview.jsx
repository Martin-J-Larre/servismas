import { MapPin, Star, BadgeCheck } from "lucide-react";
import styles from "./ProfileOverview.module.css";

const ProfileOverview = () => {
  // Datos de ejemplo para desarrollar la interfaz.
  const provider = {
    firstName: "Juan",
    lastName: "Pérez",
    initials: "JP",
    city: "Córdoba Capital",
    rating: 4.8,
    reviewCount: 124,
    description:
      "Prestador de servicios de plomería con experiencia en reparaciones e instalaciones.",
    isVerified: true,
  };

  return (
    <section className={styles.profileOverview}>
      <div className={styles.avatar}>
        <span>{provider.initials}</span>
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.nameContainer}>
          <h2 className={styles.name}>
            {provider.firstName} {provider.lastName}
          </h2>

          {provider.isVerified && (
            <span
              className={styles.verifiedBadge}
              title="Identidad verificada"
              aria-label="Identidad verificada"
            >
              <BadgeCheck size={18} />
            </span>
          )}
        </div>

        <div className={styles.metaInfo}>
          <span className={styles.location}>
            <MapPin size={16} />
            {provider.city}
          </span>

          <span className={styles.rating}>
            <Star size={16} fill="currentColor" />
            <strong>{provider.rating}</strong>
            <span>({provider.reviewCount} reseñas)</span>
          </span>
        </div>

        <p className={styles.description}>{provider.description}</p>
      </div>
    </section>
  );
};

export default ProfileOverview;
