import { MapPin, CheckCircle2 } from "lucide-react";
import styles from "./ProviderCard.module.css";

const ProviderCard = ({ request }) => {
  const providerName = request.providerName || "Prestador";

  const initials = providerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  const specialty =
    request.category || request.specialty || "Servicios generales";

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Prestador del servicio</h2>

      <div className={styles.providerRow}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>

        <div className={styles.providerInfo}>
          <h3>{providerName}</h3>

          <p className={styles.specialty}>{specialty}</p>

          <div className={styles.location}>
            <MapPin size={13} />
            <span>Zona norte</span>
          </div>

          <div className={styles.rating}>
            <span className={styles.ratingScore}>★ 4,8</span>
            <span>124 valoraciones</span>
          </div>
        </div>

        <span className={styles.acceptedPill}>
          <CheckCircle2 size={13} />
          Aceptada
        </span>
      </div>
    </section>
  );
};

export default ProviderCard;
