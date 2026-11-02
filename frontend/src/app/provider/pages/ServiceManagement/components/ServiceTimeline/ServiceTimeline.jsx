import { Check, Circle, Clock3 } from "lucide-react";
import styles from "./ServiceTimeline.module.css";

const stages = [
  {
    id: "accepted",
    title: "Solicitud aceptada",
    description: "La solicitud fue aceptada.",
  },
  {
    id: "coordinated",
    title: "Servicio coordinado",
    description: "Se coordinaron los detalles del servicio.",
  },
  {
    id: "in_progress",
    title: "En progreso",
    description: "El trabajo está en curso.",
  },
  {
    id: "completed",
    title: "Finalizado",
    description: "El servicio fue marcado como finalizado.",
  },
];

const stageOrder = {
  accepted: 0,
  coordinated: 1,
  in_progress: 2,
  completed: 3,
};

const ServiceTimeline = ({ serviceStage = "accepted" }) => {
  const currentIndex = stageOrder[serviceStage] ?? 0;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <Clock3 size={16} aria-hidden="true" />
        </div>

        <div>
          <h3>Estado del servicio</h3>
          <p>Seguimiento de las etapas</p>
        </div>
      </div>

      <div className={styles.timeline}>
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={stage.id}
              className={`${styles.stage} ${
                index === stages.length - 1 ? styles.lastStage : ""
              }`}
            >
              <div className={styles.markerColumn}>
                <div
                  className={`${styles.marker} ${
                    isCompleted
                      ? styles.completed
                      : isCurrent
                        ? styles.current
                        : styles.pending
                  }`}
                >
                  {isCompleted ? (
                    <Check size={15} aria-hidden="true" />
                  ) : (
                    <Circle size={15} aria-hidden="true" />
                  )}
                </div>

                {index !== stages.length - 1 && (
                  <div
                    className={`${styles.connector} ${
                      isCompleted ? styles.connectorCompleted : ""
                    }`}
                  />
                )}
              </div>

              <div className={styles.stageContent}>
                <div className={styles.stageHeading}>
                  <h4>{stage.title}</h4>

                  {isCurrent && (
                    <span className={styles.currentBadge}>Actual</span>
                  )}
                </div>

                <p>
                  {isCompleted
                    ? "Completado"
                    : isCurrent
                      ? stage.description
                      : "Pendiente"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceTimeline;
