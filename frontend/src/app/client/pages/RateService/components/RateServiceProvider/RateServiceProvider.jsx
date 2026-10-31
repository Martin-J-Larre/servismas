import { useMemo } from "react";

import styles from "./RateServiceProvider.module.css";

const formatServiceDate = (dateValue) => {
  if (!dateValue) return "Fecha no especificada";

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const RateServiceProvider = ({ providerName, specialty, serviceDate }) => {
  const initials = useMemo(() => {
    return (providerName || "Prestador")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }, [providerName]);

  return (
    <section className={styles.providerCard}>
      <div className={styles.avatar} aria-hidden="true">
        {initials}
      </div>

      <div className={styles.information}>
        <h2 className={styles.name}>{providerName || "Prestador"}</h2>

        <p className={styles.specialty}>{specialty || "Servicio general"}</p>

        <p className={styles.date}>
          Servicio realizado el {formatServiceDate(serviceDate)}
        </p>
      </div>
    </section>
  );
};

export default RateServiceProvider;
