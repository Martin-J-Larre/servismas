import styles from "./RequestCard.module.css";
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Search,
} from "lucide-react";

const statusConfig = {
  Pendiente: {
    label: "Pendiente",
    className: "pending",
  },
  Aceptada: {
    label: "Aceptada",
    className: "accepted",
  },
  Rechazada: {
    label: "Rechazada",
    className: "rejected",
  },
  Completada: {
    label: "Completada",
    className: "completed",
  },
  Cancelada: {
    label: "Cancelada",
    className: "cancelled",
  },
};

const formatInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const RequestCard = ({
  request,
  onViewDetails,
  onCoordinate,
  onFindProvider,
}) => {
  const status = statusConfig[request.status] ?? statusConfig.Pendiente;

  const canCoordinate = request.status === "Aceptada";
  const canFindProvider = request.status === "Rechazada";

  return (
    <article className={`${styles.card} ${styles[status.className]}`}>
      <header className={styles.header}>
        <div className={styles.providerInfo}>
          <div className={styles.avatar} aria-hidden="true">
            {formatInitials(request.providerName)}
          </div>

          <div className={styles.providerDetails}>
            <h3 className={styles.providerName}>{request.providerName}</h3>
            <p className={styles.specialty}>
              {request.specialty ?? request.category}
            </p>
          </div>
        </div>

        <span className={`${styles.status} ${styles[status.className]}`}>
          <span className={styles.statusDot} />
          {status.label}
        </span>
      </header>

      <div className={styles.dates}>
        <div className={styles.dateItem}>
          <CalendarDays size={13} />
          <span>
            Solicitud: <strong>{request.requestDate}</strong>
          </span>
        </div>

        <div className={styles.dateItem}>
          {request.serviceDate ? (
            <>
              <Check size={13} />
              <span>
                Fecha del servicio: <strong>{request.serviceDate}</strong>
              </span>
            </>
          ) : (
            <>
              <Clock3 size={13} />
              <span>
                {request.status === "Pendiente"
                  ? "Fecha por confirmar"
                  : "Sin fecha confirmada"}
              </span>
            </>
          )}
        </div>
      </div>

      <div className={styles.location}>
        <MapPin size={13} />
        <span>{request.location}</span>
      </div>

      <p className={styles.description}>{request.description}</p>

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => onViewDetails?.(request)}
        >
          Ver solicitud
          <ChevronRight size={14} />
        </button>

        {canCoordinate && (
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => onCoordinate?.(request)}
          >
            Coordinar servicio
            <ChevronRight size={14} />
          </button>
        )}

        {canFindProvider && (
          <button
            type="button"
            className={styles.findProviderButton}
            onClick={() => onFindProvider?.(request)}
          >
            Buscar otro prestador
            <Search size={13} />
          </button>
        )}
      </footer>
    </article>
  );
};

export default RequestCard;
