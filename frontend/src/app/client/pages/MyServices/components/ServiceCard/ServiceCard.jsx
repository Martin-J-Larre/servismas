import {
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Star,
  Clock3,
  CheckCircle2,
  CircleCheckBig,
} from "lucide-react";
import styles from "./ServiceCard.module.css";

const statusConfig = {
  "Programado": {
    className: "scheduled",
    icon: CalendarDays,
  },
  "En curso": {
    className: "inProgress",
    icon: Clock3,
  },
  "Completado": {
    className: "completed",
    icon: CheckCircle2,
  },
};

const ServiceCard = ({ service, onViewDetails, onRate }) => {
  const status = statusConfig[service.status] ?? statusConfig["Programado"];
  const StatusIcon = status.icon;

  const isCompleted = service.status === "Completado";

  return (
    <article className={styles.card}>
      <div className={styles.cardMain}>
        <div className={styles.providerAvatar} aria-hidden="true">
          {service.provider
            .split(" ")
            .map((name) => name[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()}
        </div>

        <div className={styles.serviceInfo}>
          <div className={styles.providerHeader}>
            <div className={styles.providerDetails}>
              <h3 className={styles.providerName}>{service.provider}</h3>
              <p className={styles.specialty}>{service.specialty}</p>
            </div>

            <span
              className={`${styles.status} ${styles[status.className]}`}
            >
              <StatusIcon size={14} aria-hidden="true" />
              {service.status}
            </span>
          </div>

          <p className={styles.description}>{service.description}</p>

          <div className={styles.metadata}>
            <span>
              <CalendarDays size={15} aria-hidden="true" />
              {service.date}
            </span>

            <span>
              <MapPin size={15} aria-hidden="true" />
              {service.location}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.priceContainer}>
          <span className={styles.priceLabel}>Precio acordado</span>
          <strong className={styles.price}>{service.price}</strong>
        </div>

        <div className={styles.actions}>
          {isCompleted && service.canRate && (
            <button
              type="button"
              className={styles.rateButton}
              onClick={() => onRate?.(service)}
            >
              <Star size={15} aria-hidden="true" />
              Valorar servicio
            </button>
          )}

          <button
            type="button"
            className={styles.detailsButton}
            onClick={() => onViewDetails?.(service)}
          >
            Ver detalles
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;