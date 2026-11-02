import { CalendarDays, Clock3, MapPin, Wallet } from "lucide-react";

import styles from "./ServiceOverview.module.css";

const ServiceOverview = ({ request }) => {
  return (
    <section className={styles.overview}>
      <div className={styles.avatar} aria-hidden="true">
        {request.initials || request.clientName?.charAt(0) || "C"}
      </div>

      <div className={styles.clientMain}>
        <h2>{request.clientName}</h2>

        <p className={styles.serviceName}>{request.service}</p>

        <div className={styles.metadata}>
          <span>
            <CalendarDays size={12} aria-hidden="true" />
            {request.date || "Fecha a coordinar"}
          </span>

          <span>
            <MapPin size={12} aria-hidden="true" />
            {request.location || "Ubicación no especificada"}
          </span>
        </div>
      </div>

      <div className={styles.aside}>
        <span className={styles.acceptedBadge}>
          <span />
          Aceptada
        </span>

        <span className={styles.metadataItem}>
          <Clock3 size={12} aria-hidden="true" />
          {request.time || "Horario a coordinar"}
        </span>

        <span className={styles.price}>
          <Wallet size={12} aria-hidden="true" />
          {request.price || "Presupuesto a confirmar"}
        </span>
      </div>
    </section>
  );
};

export default ServiceOverview;
