import { CalendarDays, Clock } from "lucide-react";
import styles from "./ProviderAvailability.module.css";

const ProviderAvailability = ({ availability }) => {
  const weeklySchedule = Array.isArray(availability) ? availability : [];

  const formatTime = (time) => {
    if (!time) return "";

    return time.slice(0, 5);
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Disponibilidad</h2>

      <div className={styles.availabilityInfo}>
        <div className={styles.icon}>
          <CalendarDays size={20} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <h3>Disponibilidad general</h3>
          <p>
            {weeklySchedule.length > 0
              ? "El prestador tiene horarios de atención definidos."
              : "Disponibilidad no especificada."}
          </p>
        </div>
      </div>

      <div className={styles.scheduleSection}>
        <div className={styles.scheduleHeading}>
          <Clock size={18} aria-hidden="true" />
          <h3>Horarios de atención</h3>
        </div>

        {weeklySchedule.length > 0 ? (
          <div className={styles.scheduleList}>
            {weeklySchedule.map((item) => (
              <div className={styles.scheduleRow} key={item.day}>
                <span className={styles.day}>{item.day}</span>

                <span className={styles.availableHours}>
                  {formatTime(item.start)} - {formatTime(item.end)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.emptySchedule}>
            Los horarios todavía no están especificados.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProviderAvailability;
