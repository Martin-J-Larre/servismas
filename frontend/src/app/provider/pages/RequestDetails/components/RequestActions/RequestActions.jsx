import { Check, X } from "lucide-react";
import styles from "./RequestActions.module.css";

const RequestActions = ({
  status,
  onAccept,
  onReject,
  isProcessing = false,
}) => {
  if (status !== "pending") {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.rejectButton}
          onClick={onReject}
          disabled={isProcessing}
        >
          <X size={16} aria-hidden="true" />
          Rechazar solicitud
        </button>

        <button
          type="button"
          className={styles.acceptButton}
          onClick={onAccept}
          disabled={isProcessing}
        >
          <Check size={16} aria-hidden="true" />
          Aceptar solicitud
        </button>
      </div>

      <p className={styles.helperText}>
        Revisá los detalles antes de confirmar tu decisión.
      </p>
    </section>
  );
};

export default RequestActions;
