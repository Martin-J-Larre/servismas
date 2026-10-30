import { CalendarDays, Clock3, MapPin, Wallet, Wrench } from "lucide-react";

import styles from "./TrackingSummary.module.css";

const formatDate = (dateValue) => {
  if (!dateValue) return "Fecha pendiente";

  // Si la fecha ya está expresada en un formato legible, conservarla.
  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const formatBudget = (budget) => {
  if (budget === null || budget === undefined || budget === "") {
    return "A convenir";
  }

  const numericBudget = Number(budget);

  if (!Number.isFinite(numericBudget)) {
    return String(budget);
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(numericBudget);
};

const TrackingSummary = ({
  providerName,
  specialty,
  serviceDate,
  timeSlot,
  address,
  budget,
}) => {
  const summaryItems = [
    {
      icon: Wrench,
      label: "Categoría",
      value: specialty || "Servicio general",
    },
    {
      icon: CalendarDays,
      label: "Fecha acordada",
      value: formatDate(serviceDate),
    },
    {
      icon: Clock3,
      label: "Horario",
      value: timeSlot || "Horario pendiente",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: address || "Dirección no especificada",
    },
  ];

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Resumen de la contratación</h2>

      <div className={styles.provider}>
        <span className={styles.providerLabel}>Prestador asignado</span>
        <p className={styles.providerName}>{providerName || "Prestador"}</p>
      </div>

      <div className={styles.divider} />

      <div className={styles.details}>
        {summaryItems.map(({ icon: Icon, label, value }) => (
          <div className={styles.detail} key={label}>
            <div className={styles.detailIcon}>
              <Icon size={14} />
            </div>

            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>{label}</span>
              <p className={styles.detailValue}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.budget}>
        <div className={styles.budgetInfo}>
          <span className={styles.budgetLabel}>Presupuesto</span>
          <span className={styles.budgetValue}>{formatBudget(budget)}</span>
        </div>

        <Wallet size={18} className={styles.budgetIcon} />
      </div>

      <p className={styles.disclaimer}>
        El importe es informativo. ServisMás no procesa pagos dentro del
        prototipo.
      </p>
    </section>
  );
};

export default TrackingSummary;
