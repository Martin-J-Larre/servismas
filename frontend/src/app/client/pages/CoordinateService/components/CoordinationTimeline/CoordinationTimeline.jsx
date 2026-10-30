import { Check } from "lucide-react";

import styles from "./CoordinationTimeline.module.css";

const CoordinationTimeline = ({ stages, currentStageIndex, isConfirmed }) => {
  return (
    <section className={styles.timeline}>
      <h2 className={styles.timelineTitle}>Estado de la coordinación</h2>

      <div className={styles.timelineItems}>
        {stages.map((stage, index) => {
          const isComplete = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          const description =
            isConfirmed && index === stages.length - 1
              ? "La coordinación está confirmada."
              : stage.description;

          return (
            <div key={stage.id} className={styles.timelineItem}>
              <div className={styles.timelineTrack}>
                <div
                  className={[
                    styles.timelineMarker,
                    isComplete ? styles.timelineComplete : "",
                    isCurrent ? styles.timelineCurrent : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-label={
                    isComplete ? "Etapa completada" : "Etapa pendiente"
                  }
                >
                  {isComplete && <Check size={13} />}
                </div>

                {index < stages.length - 1 && (
                  <div
                    className={[
                      styles.timelineLine,
                      index < currentStageIndex
                        ? styles.timelineLineComplete
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                )}
              </div>

              <div className={styles.timelineContent}>
                <h3>{stage.title}</h3>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CoordinationTimeline;
