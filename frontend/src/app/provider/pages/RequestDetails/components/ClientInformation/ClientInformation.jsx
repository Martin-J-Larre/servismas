import { MapPin, Star } from "lucide-react";
import styles from "./ClientInformation.module.css";

const ClientInformation = ({ request }) => {
  const { clientName, initials, rating, reviewCount, location } = request;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Información del cliente</h2>

      <div className={styles.clientCard}>
        <div className={styles.avatar} aria-hidden="true">
          {initials || clientName?.charAt(0) || "C"}
        </div>

        <div className={styles.clientInfo}>
          <h3>{clientName || "Cliente sin nombre"}</h3>

          <div className={styles.metadata}>
            {rating != null && (
              <span className={styles.rating}>
                <Star size={12} fill="currentColor" aria-hidden="true" />
                <span>{rating.toLocaleString("es-AR")}</span>
              </span>
            )}

            {reviewCount != null && (
              <span className={styles.reviewCount}>
                {reviewCount} valoraciones
              </span>
            )}

            {location && (
              <span className={styles.location}>
                <MapPin size={12} aria-hidden="true" />
                <span>{location}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientInformation;
