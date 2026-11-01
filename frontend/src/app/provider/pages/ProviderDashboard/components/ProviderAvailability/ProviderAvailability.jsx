import { CalendarDays, Clock3, Settings2, ArrowRight } from "lucide-react";

import styles from "./ProviderAvailability.module.css";

const ProviderAvailability = ({
  configured = false,
  schedule = [],
  onConfigure,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.iconWrapper}>
            <CalendarDays size={19} aria-hidden="true" />
          </span>

          <div>
            <h2>Mi disponibilidad</h2>
            <p>Administrá los días y horarios en los que podés trabajar.</p>
          </div>
        </div>

        <button
          type="button"
          className={styles.configureButton}
          onClick={onConfigure}
        >
          <Settings2 size={15} aria-hidden="true" />
          Configurar
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      {configured && schedule.length > 0 ? (
        <div className={styles.scheduleList}>
          {schedule.map((day) => (
            <div className={styles.scheduleItem} key={day.day}>
              <span className={styles.day}>{day.day}</span>

              <span className={styles.hours}>
                <Clock3 size={14} aria-hidden="true" />
                {day.available ? day.hours : "No disponible"}
              </span>

              <span
                className={`${styles.dayStatus} ${
                  day.available ? styles.available : styles.unavailable
                }`}
              >
                {day.available ? "Disponible" : "No disponible"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>
            <Clock3 size={22} aria-hidden="true" />
          </span>

          <div className={styles.emptyContent}>
            <strong>Configurá tus horarios de trabajo</strong>

            <p>
              Indicá qué días y en qué horarios estás disponible para que los
              clientes puedan coordinar sus servicios con vos.
            </p>
          </div>

          <button
            type="button"
            className={styles.emptyButton}
            onClick={onConfigure}
          >
            Configurar horarios
          </button>
        </div>
      )}
    </section>
  );
};

export default ProviderAvailability;