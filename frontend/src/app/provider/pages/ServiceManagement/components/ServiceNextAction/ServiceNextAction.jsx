import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Flag,
  Play,
} from "lucide-react";

import styles from "./ServiceNextAction.module.css";

const stageContent = {
  accepted: {
    title: "Coordinar servicio",
    description:
      "Confirmá la fecha, el horario y las condiciones acordadas con el cliente antes de iniciar el trabajo.",
    buttonLabel: "Coordinar servicio",
    progress: 2,
    icon: CalendarDays,
  },
  coordinated: {
    title: "Marcar como iniciado",
    description:
      "Confirmá que llegaste al domicilio y que el servicio está en curso.",
    buttonLabel: "Marcar como iniciado",
    progress: 3,
    icon: Play,
  },
  in_progress: {
    title: "Finalizar servicio",
    description:
      "Marcá el servicio como completado para que el cliente pueda confirmar su finalización.",
    buttonLabel: "Finalizar servicio",
    progress: 4,
    icon: Flag,
  },
  completed: {
    title: "Servicio finalizado",
    description:
      "El servicio fue marcado como finalizado. Ya no quedan acciones pendientes.",
    buttonLabel: null,
    progress: 4,
    icon: CheckCircle2,
  },
};

const ServiceNextAction = ({ serviceStage = "accepted", onAdvance }) => {
  const current = stageContent[serviceStage] || stageContent.accepted;
  const ActionIcon = current.icon;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <ActionIcon size={16} aria-hidden="true" />
        </div>

        <div>
          <h3>Próxima acción</h3>
          <p>Continuá con la gestión del servicio</p>
        </div>
      </div>

      <div className={styles.content}>
        <span className={styles.status}>
          <CheckCircle2 size={13} aria-hidden="true" />
          {serviceStage === "completed"
            ? "Servicio finalizado"
            : serviceStage === "accepted"
              ? "Solicitud aceptada"
              : serviceStage === "coordinated"
                ? "Servicio coordinado"
                : "Servicio en progreso"}
        </span>

        <h4>{current.title}</h4>

        <p>{current.description}</p>

        <div className={styles.progressHeader}>
          <span>Progreso del servicio</span>
          <strong>Paso {current.progress} de 4</strong>
        </div>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={current.progress}
          aria-label="Progreso del servicio"
        >
          <span
            style={{
              width: `${(current.progress / 4) * 100}%`,
            }}
          />
        </div>

        <div className={styles.progressLabels}>
          <span>Aceptado</span>
          <span>Coordinado</span>
          <span>En progreso</span>
          <span>Fin</span>
        </div>

        {current.buttonLabel && (
          <button
            type="button"
            className={styles.actionButton}
            onClick={onAdvance}
          >
            {current.buttonLabel}
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        )}

        {serviceStage === "completed" && (
          <div className={styles.completedMessage}>
            <CheckCircle2 size={16} aria-hidden="true" />
            Todas las etapas están completas.
          </div>
        )}

        <button
          type="button"
          className={styles.backButton}
          onClick={() => window.history.back()}
        >
          <ArrowRight size={13} aria-hidden="true" />
          Volver a solicitudes
        </button>
      </div>
    </section>
  );
};

export default ServiceNextAction;
