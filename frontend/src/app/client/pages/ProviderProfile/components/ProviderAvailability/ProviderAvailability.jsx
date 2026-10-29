import { CalendarDays, Clock } from "lucide-react";
import styles from "./ProviderAvailability.module.css";

const ProviderAvailability = ({ availability, schedule }) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Disponibilidad</h2>

      <div className={styles.availabilityInfo}>
        <div className={styles.icon}>
          <CalendarDays size={20} aria-hidden="true" />
        </div>

        <div className={styles.content}>
          <h3>Disponibilidad general</h3>
          <p>{availability || "Disponibilidad no especificada."}</p>
        </div>
      </div>

      {schedule && (
        <div className={styles.availabilityInfo}>
          <div className={styles.icon}>
            <Clock size={20} aria-hidden="true" />
          </div>

          <div className={styles.content}>
            <h3>Horarios de atención</h3>
            <p>{schedule}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProviderAvailability;