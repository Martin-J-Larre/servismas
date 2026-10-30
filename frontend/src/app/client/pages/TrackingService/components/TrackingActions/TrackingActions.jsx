import {
  ArrowLeft,
  CheckCircle2,
  CircleCheck,
  Play,
  ShieldCheck,
} from "lucide-react";

import styles from "./TrackingActions.module.css";

const TrackingActions = ({
  serviceStatus,
  onStartService,
  onFinishService,
  onBack,
}) => {
  const isCoordinated = serviceStatus === "coordinado";
  const isInProgress = serviceStatus === "en_progreso";
  const isFinished = serviceStatus === "finalizado";

  const statusContent = {
    coordinado: {
      title: "Servicio coordinado",
      description:
        "La coordinación está confirmada. Podés iniciar el servicio cuando comience el trabajo.",
    },
    en_progreso: {
      title: "Servicio en progreso",
      description:
        "El servicio fue marcado como iniciado. Cuando el trabajo esté terminado, podés registrar su finalización.",
    },
    finalizado: {
      title: "Servicio finalizado",
      description:
        "El servicio se registró como completado. Ya podés volver a tus solicitudes.",
    },
  };

  const currentContent =
    statusContent[serviceStatus] ?? statusContent.coordinado;

  return (
    <section className={styles.card}>
      <div className={styles.iconContainer}>
        {isFinished ? <CircleCheck size={22} /> : <ShieldCheck size={22} />}
      </div>

      <h2 className={styles.title}>{currentContent.title}</h2>

      <p className={styles.description}>{currentContent.description}</p>

      {isCoordinated && (
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onStartService}
        >
          <Play size={15} />
          Iniciar servicio
        </button>
      )}

      {isInProgress && (
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onFinishService}
        >
          <CheckCircle2 size={16} />
          Finalizar servicio
        </button>
      )}

      {isFinished && (
        <div className={styles.completedMessage}>
          <CircleCheck size={15} />
          Trabajo completado
        </div>
      )}

      <button type="button" className={styles.secondaryButton} onClick={onBack}>
        <ArrowLeft size={14} />
        Volver
      </button>

      <p className={styles.note}>
        <ShieldCheck size={12} />
        Seguimiento de estado del prototipo
      </p>
    </section>
  );
};

export default TrackingActions;
