import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import styles from "./RequestStatusMessage.module.css";

const statusContent = {
  pending: {
    title: "Solicitud pendiente de respuesta",
    message:
      "Revisá los detalles del servicio y decidí si querés aceptar o rechazar esta solicitud.",
    Icon: Clock,
    variant: "pending",
  },
  accepted: {
    title: "Esta solicitud fue aceptada",
    message:
      "Ya aceptaste realizar el servicio. Podés consultar su seguimiento para continuar con la gestión.",
    Icon: CheckCircle2,
    variant: "accepted",
  },
  rejected: {
    title: "Esta solicitud fue rechazada",
    message:
      "No realizarás el servicio solicitado por el cliente.",
    Icon: AlertCircle,
    variant: "rejected",
  },
};

const RequestStatusMessage = ({ status, rejectedAt }) => {
  const content = statusContent[status];

  if (!content) {
    return null;
  }

  const { title, message, Icon, variant } = content;

  return (
    <section
      className={`${styles.messageCard} ${styles[variant]}`}
      role="status"
    >
      <div className={styles.iconWrapper}>
        <Icon size={20} aria-hidden="true" />
      </div>

      <div className={styles.content}>
        <h2>{title}</h2>

        <p>{message}</p>

        {status === "rejected" && (
          <small>
            {rejectedAt
              ? `Esta solicitud fue rechazada el ${rejectedAt}.`
              : "Fecha de rechazo no registrada."}
          </small>
        )}
      </div>
    </section>
  );
};

export default RequestStatusMessage;