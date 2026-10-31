import { CalendarDays, Clock3, MapPin, UserRound, Wrench } from "lucide-react";

import styles from "./FinalizeServiceSummary.module.css";

const formatServiceDate = (dateValue) => {
  if (!dateValue) return "No especificada";

  const date = new Date(`${dateValue}T00:00:00`);

  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const FinalizeServiceSummary = ({
  providerName,
  specialty,
  serviceDate,
  timeSlot,
  address,
}) => {
  const details = [
    {
      icon: Wrench,
      label: "Servicio",
      value: specialty || "Servicio general",
    },
    {
      icon: CalendarDays,
      label: "Fecha",
      value: formatServiceDate(serviceDate),
    },
    {
      icon: Clock3,
      label: "Horario",
      value: timeSlot || "No especificado",
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: address || "No especificada",
    },
  ];

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Resumen del servicio</h2>

      <div className={styles.details}>
        <div className={styles.detail}>
          <span className={styles.label}>Prestador</span>

          <div className={styles.providerValue}>
            <span className={styles.avatar}>
              <UserRound size={15} />
            </span>

            <span className={styles.value}>{providerName || "Prestador"}</span>
          </div>
        </div>

        {details.map(({ icon: Icon, label, value }) => (
          <div className={styles.detail} key={label}>
            <span className={styles.label}>{label}</span>

            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FinalizeServiceSummary;
