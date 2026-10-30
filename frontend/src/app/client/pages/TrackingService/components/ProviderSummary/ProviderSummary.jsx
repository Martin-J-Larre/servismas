import { CalendarDays, CheckCircle2, Clock3, MapPin } from "lucide-react";

import styles from "./ProviderSummary.module.css";

const ProviderSummary = ({
  request,
  providerName,
  specialty,
  serviceDate,
  timeSlot,
}) => {
  const location = request.location || "Ubicación no especificada";

  const initials = providerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <section className={styles.card}>
      <div className={styles.provider}>
        <div className={styles.avatar} aria-hidden="true">
          {initials}
        </div>

        <div className={styles.providerInfo}>
          <h2>{providerName}</h2>
          <p className={styles.specialty}>{specialty}</p>
        </div>

        <span className={styles.status}>
          <CheckCircle2 size={12} />
          Servicio coordinado
        </span>
      </div>

      <div className={styles.metadata}>
        <div className={styles.metadataItem}>
          <MapPin size={12} />
          <span>{location}</span>
        </div>

        <div className={styles.metadataItem}>
          <CalendarDays size={12} />
          <span>{serviceDate || "Fecha pendiente"}</span>
        </div>

        <div className={styles.metadataItem}>
          <Clock3 size={12} />
          <span>{timeSlot || "Horario pendiente"}</span>
        </div>
      </div>
    </section>
  );
};

export default ProviderSummary;