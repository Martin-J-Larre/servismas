import {
  FileText,
  UsersRound,
  Check,
  Star,
} from "lucide-react";

import styles from "./ProviderStats.module.css";

const ProviderStats = ({
  publishedServices = 3,
  pendingRequests = 2,
  completedServices = 24,
  rating = 4.8,
  reviewCount = 124,
}) => {
  const stats = [
    {
      id: "published",
      label: "Servicios publicados",
      value: publishedServices,
      description: "Servicios activos",
      icon: FileText,
    },
    {
      id: "pending",
      label: "Solicitudes pendientes",
      value: pendingRequests,
      description: "Requieren tu atención",
      icon: UsersRound,
      highlighted: true,
    },
    {
      id: "completed",
      label: "Servicios realizados",
      value: completedServices,
      description: "Trabajos completados",
      icon: Check,
    },
    {
      id: "rating",
      label: "Calificación",
      value: (
        <>
          {Number(rating).toLocaleString("es-AR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          })}
          <Star
            className={styles.ratingStar}
            size={17}
            fill="currentColor"
            aria-hidden="true"
          />
        </>
      ),
      description: `${reviewCount} valoraciones`,
      icon: Star,
    },
  ];

  return (
    <section className={styles.stats} aria-label="Resumen de actividad">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.id}
            className={`${styles.statCard} ${
              stat.highlighted ? styles.highlighted : ""
            }`}
          >
            <span className={styles.iconWrapper}>
              <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>

            <span className={styles.label}>{stat.label}</span>

            <strong className={styles.value}>{stat.value}</strong>

            <small className={styles.description}>
              {stat.description}
            </small>
          </article>
        );
      })}
    </section>
  );
};

export default ProviderStats;