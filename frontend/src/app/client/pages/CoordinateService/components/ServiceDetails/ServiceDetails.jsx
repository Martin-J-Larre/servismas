import { FileText, MapPin, CalendarDays, Clock3, Wallet } from "lucide-react";

import styles from "./ServiceDetails.module.css";

const ServiceDetails = ({ request, serviceDescription }) => {
  const location = request.location || "Ubicación no especificada";
  const serviceDate = request.serviceDate || "A coordinar";
  const timeSlot = request.timeSlot || "A coordinar";

  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Detalles del servicio</h2>

      <div className={styles.description}>
        <FileText size={16} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Descripción</h3>
          <p>{serviceDescription}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <MapPin size={16} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Ubicación</h3>
          <p>{location}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <CalendarDays size={16} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Fecha solicitada</h3>
          <p>{serviceDate}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <Clock3 size={16} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Horario</h3>
          <p>{timeSlot}</p>
        </div>
      </div>

      <div className={styles.detailRow}>
        <Wallet size={16} className={styles.detailIcon} />

        <div className={styles.detailContent}>
          <h3>Presupuesto estimado</h3>

          <p className={styles.priceRange}>$15.000 – $25.000</p>

          <span className={styles.priceNote}>
            El importe final se acordará con el prestador.
          </span>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
