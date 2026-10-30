import { FileText, MapPin, CalendarDays, Clock3 } from "lucide-react";

import styles from "./TrackingServiceDetails.module.css";

const TrackingServiceDetails = ({
  description,
  address,
  serviceDate,
  timeSlot,
}) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Detalles del servicio</h2>

      <div className={styles.description}>
        <FileText size={17} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Descripción del trabajo</h3>
          <p>{description || "Sin descripción disponible."}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <MapPin size={17} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Dirección del servicio</h3>
          <p>{address || "Dirección no especificada"}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <CalendarDays size={17} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Fecha acordada</h3>
          <p>{serviceDate || "Fecha pendiente"}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <Clock3 size={17} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Horario acordado</h3>
          <p>{timeSlot || "Horario pendiente"}</p>
        </div>
      </div>
    </section>
  );
};

export default TrackingServiceDetails;
