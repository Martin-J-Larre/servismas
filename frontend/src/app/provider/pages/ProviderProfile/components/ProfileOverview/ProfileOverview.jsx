import { MapPin, Star, BadgeCheck } from "lucide-react";
import styles from "./ProfileOverview.module.css";

const ProfileOverview = ({ user, provider }) => {
  const firstName = user?.firstName || "";
  const lastName = user?.lastName || "";

  // TODO: Este buscar una fucion que haga lo mismo y mandarla a una carpeta utils o helpers para que se pueda reutilizar en otros componentes
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  const city = user?.address?.locality || "Ciudad no especificada";

  const isVerified = provider?.verificationStatus === "verificado";

  const rating = 4.8;
  const reviewCount = 124;

  const description =
    "Prestador de servicios de plomería con experiencia en reparaciones e instalaciones.";

  return (
    <section className={styles.profileOverview}>
      <div className={styles.avatar}>
        <span>{initials}</span>
      </div>

      <div className={styles.profileInfo}>
        <div className={styles.nameContainer}>
          <h2 className={styles.name}>
            {firstName} {lastName}
          </h2>

          {isVerified && (
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
            {city}
          </span>

          <span className={styles.rating}>
            <Star size={16} fill="currentColor" />
            <strong>{rating}</strong>
            <span>({reviewCount} reseñas)</span>
          </span>
        </div>

        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};

export default ProfileOverview;
