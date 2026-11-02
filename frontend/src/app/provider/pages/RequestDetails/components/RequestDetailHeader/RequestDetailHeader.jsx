import styles from "./RequestDetailHeader.module.css";

const statusLabels = {
  pending: "Pendiente de respuesta",
  accepted: "Solicitud aceptada",
  rejected: "Solicitud rechazada",
};

const RequestDetailHeader = ({ request }) => {
  const status = request.status || "pending";

  const requestNumber = String(request.id).padStart(5, "0");

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <span className={styles.eyebrow}>SOLICITUD #{requestNumber}</span>

        <h1>Detalle de la solicitud</h1>

        <p>Revisá la información del servicio antes de tomar una decisión.</p>

        <small>Recibida el {request.receivedAt || "Fecha no registrada"}</small>
      </div>

      <span
        className={`${styles.statusBadge} ${styles[status] || styles.pending}`}
      >
        <span className={styles.statusDot} />
        {statusLabels[status] || "Estado desconocido"}
      </span>
    </header>
  );
};

export default RequestDetailHeader;
