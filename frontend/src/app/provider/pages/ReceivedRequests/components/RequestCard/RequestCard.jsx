import {
  CalendarDays,
  Clock3,
  MapPin,
  ArrowUpRight,
  ClipboardList,
  DollarSign,
} from "lucide-react";

import styles from "./RequestCard.module.css";

const statusLabels = {
  pending: "Pendiente",
  accepted: "Aceptada",
  rejected: "Rechazada",
};

const RequestCard = ({ request, onViewRequest }) => {
  const statusLabel = statusLabels[request.status] || "Sin estado";

  return (
    <article className={styles.card}>
      <div className={styles.mainContent}>
        <div className={styles.clientAvatar} aria-hidden="true">
          {request.initials}
        </div>

        <div className={styles.requestContent}>
          <div className={styles.requestHeader}>
            <div className={styles.clientInfo}>
              <h2>{request.clientName}</h2>
              <span className={styles.serviceName}>{request.service}</span>
            </div>

            <span
              className={`${styles.status} ${
                styles[request.status] || styles.unknown
              }`}
            >
              <span className={styles.statusDot} />
              {statusLabel}
            </span>
          </div>

          <p className={styles.description}>{request.description}</p>

          <div className={styles.details}>
            {request.date && (
              <span className={styles.detail}>
                <CalendarDays size={13} aria-hidden="true" />
                {request.date}
              </span>
            )}

            {request.time && (
              <span className={styles.detail}>
                <Clock3 size={13} aria-hidden="true" />
                {request.time}
              </span>
            )}

            {request.location && (
              <span className={styles.detail}>
                <MapPin size={13} aria-hidden="true" />
                {request.location}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.price}>
          <DollarSign size={14} aria-hidden="true" />

          <div>
            <span>Precio orientativo</span>
            <strong>{request.price || "A convenir"}</strong>
          </div>
        </div>

        <button
          type="button"
          className={styles.viewButton}
          onClick={() => onViewRequest?.(request.id)}
        >
          Ver solicitud
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
};

export default RequestCard;
