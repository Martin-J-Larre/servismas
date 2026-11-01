import { CalendarDays, Clock3 } from "lucide-react";

import styles from "./ServiceAvailability.module.css";

const ServiceAvailability = ({ availability, onChange }) => {
  const availableDays = availability.filter((day) => day.enabled);

  const handleToggleDay = (day) => {
    const currentDay = availability.find((item) => item.day === day);

    if (!currentDay) return;

    onChange(day, "enabled", !currentDay.enabled);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>3</span>

        <div className={styles.sectionTitle}>
          <CalendarDays size={14} aria-hidden="true" />
          <h2>Disponibilidad</h2>
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.description}>
          Indicá los días y horarios en los que podés prestar el servicio. Los
          clientes solo podrán solicitar turnos dentro de tu disponibilidad.
        </p>

        <div className={styles.scheduleList}>
          {availability.map((day) => (
            <article
              key={day.day}
              className={`${styles.dayCard} ${
                day.enabled ? styles.dayEnabled : styles.dayDisabled
              }`}
            >
              <button
                type="button"
                role="switch"
                aria-checked={day.enabled}
                aria-label={`Disponibilidad ${day.day}`}
                className={`${styles.switch} ${
                  day.enabled ? styles.switchOn : ""
                }`}
                onClick={() => handleToggleDay(day.day)}
              >
                <span className={styles.switchThumb} />
              </button>

              <span className={styles.dayName}>{day.day}</span>

              {day.enabled ? (
                <div className={styles.timeFields}>
                  <label
                    className={styles.timeField}
                    htmlFor={`start-${day.day}`}
                  >
                    <span>De</span>

                    <input
                      id={`start-${day.day}`}
                      type="time"
                      value={day.start}
                      onChange={(event) =>
                        onChange(day.day, "start", event.target.value)
                      }
                      aria-label={`Hora de inicio ${day.day}`}
                      required
                    />
                  </label>

                  <span className={styles.timeSeparator}>a</span>

                  <label
                    className={styles.timeField}
                    htmlFor={`end-${day.day}`}
                  >
                    <span> </span>

                    <input
                      id={`end-${day.day}`}
                      type="time"
                      value={day.end}
                      onChange={(event) =>
                        onChange(day.day, "end", event.target.value)
                      }
                      aria-label={`Hora de finalización ${day.day}`}
                      required
                    />
                  </label>
                </div>
              ) : (
                <span className={styles.unavailableText}>No disponible</span>
              )}
            </article>
          ))}
        </div>

        <div className={styles.summary}>
          <Clock3 size={14} aria-hidden="true" />

          <span>Activás</span>

          <strong>{availableDays.length} días</strong>

          <span>de disponibilidad por semana.</span>
        </div>
      </div>
    </section>
  );
};

export default ServiceAvailability;
