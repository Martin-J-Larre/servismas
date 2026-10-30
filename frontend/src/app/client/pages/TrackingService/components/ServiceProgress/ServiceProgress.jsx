import { Check, Circle } from "lucide-react";

import styles from "./ServiceProgress.module.css";

const progressStages = [
  {
    id: "coordinado",
    title: "Solicitud aceptada",
    description: "La coordinación fue confirmada.",
  },
  {
    id: "en_progreso",
    title: "En progreso",
    description: "El servicio se está realizando.",
  },
  {
    id: "finalizado",
    title: "Finalizado",
    description: "El servicio fue completado.",
  },
];

const ServiceProgress = ({ serviceStatus }) => {
  const currentStageIndex = progressStages.findIndex(
    (stage) => stage.id === serviceStatus,
  );

  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Estado del servicio</h2>

      <div className={styles.timeline}>
        {progressStages.map((stage, index) => {
          const isComplete = index < currentStageIndex;
          const isCurrent = index === currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div key={stage.id} className={styles.stage}>
              <div className={styles.track}>
                <div
                  className={[
                    styles.marker,
                    isComplete ? styles.complete : "",
                    isCurrent ? styles.current : "",
                    isPending ? styles.pending : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={
                    isComplete
                      ? "Etapa completada"
                      : isCurrent
                        ? "Etapa actual"
                        : "Etapa pendiente"
                  }
                >
                  {isComplete ? <Check size={14} /> : <Circle size={8} />}
                </div>

                {index < progressStages.length - 1 && (
                  <div
                    className={[
                      styles.line,
                      isComplete ? styles.lineComplete : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                )}
              </div>

              <div className={styles.stageContent}>
                <div className={styles.stageHeading}>
                  <h3>{stage.title}</h3>

                  {isCurrent && (
                    <span className={styles.currentBadge}>Estado actual</span>
                  )}

                  {isComplete && (
                    <span className={styles.completeBadge}>Completado</span>
                  )}
                </div>

                <p>{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceProgress;
