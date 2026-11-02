import { AlertCircle, Check, X } from "lucide-react";
import styles from "./RequestConfirmationModal.module.css";

const modalContent = {
  accept: {
    title: "¿Aceptar esta solicitud?",
    description:
      "Al aceptar, confirmarás que estás dispuesto a realizar el servicio solicitado por el cliente.",
    confirmText: "Sí, aceptar solicitud",
    icon: Check,
    variant: "accept",
  },
  reject: {
    title: "¿Rechazar esta solicitud?",
    description:
      "Si rechazás esta solicitud, el cliente será informado de que no vas a realizar el servicio.",
    confirmText: "Sí, rechazar solicitud",
    icon: AlertCircle,
    variant: "reject",
  },
};

const RequestConfirmationModal = ({
  isOpen,
  action,
  onConfirm,
  onCancel,
  isProcessing = false,
}) => {
  if (!isOpen || !modalContent[action]) {
    return null;
  }

  const content = modalContent[action];
  const Icon = content.icon;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && !isProcessing) {
      onCancel();
    }
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={handleBackdropClick}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-modal-title"
        aria-describedby="request-modal-description"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onCancel}
          disabled={isProcessing}
          aria-label="Cerrar modal"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className={`${styles.iconWrapper} ${styles[content.variant]}`}>
          <Icon size={24} aria-hidden="true" />
        </div>

        <h2 id="request-modal-title">{content.title}</h2>

        <p id="request-modal-description">{content.description}</p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
            disabled={isProcessing}
          >
            Cancelar
          </button>

          <button
            type="button"
            className={`${styles.confirmButton} ${styles[content.variant]}`}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando..." : content.confirmText}
          </button>
        </div>
      </section>
    </div>
  );
};

export default RequestConfirmationModal;