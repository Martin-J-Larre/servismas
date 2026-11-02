import { FileText, MapPin, CalendarDays, Clock3 } from "lucide-react";
import styles from "./ServiceDetails.module.css";

const ServiceDetails = ({ request }) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <FileText size={16} aria-hidden="true" />
        </div>

        <div>
          <h3>Detalles del servicio</h3>
          <p>Información de la solicitud aceptada</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          <span className={styles.label}>Descripción del trabajo</span>

          <p>
            {request.description ||
              "El cliente no proporcionó una descripción adicional."}
          </p>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <CalendarDays size={15} aria-hidden="true" />

            <div>
              <span className={styles.label}>Fecha solicitada</span>
              <p>{request.date || "A coordinar"}</p>
            </div>
          </div>

          <div className={styles.detailItem}>
            <Clock3 size={15} aria-hidden="true" />

            <div>
              <span className={styles.label}>Horario</span>
              <p>{request.time || "A coordinar"}</p>
            </div>
          </div>

          <div className={styles.detailItem}>
            <MapPin size={15} aria-hidden="true" />

            <div>
              <span className={styles.label}>Ubicación</span>
              <p>{request.location || "A coordinar con el cliente"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
