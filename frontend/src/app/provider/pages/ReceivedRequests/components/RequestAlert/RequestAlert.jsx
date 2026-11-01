import { AlertCircle } from "lucide-react";

import styles from "./RequestAlert.module.css";

// TODO: Refactor del header como el landing y separar por props el header app/cliente y app/prestador

const RequestAlert = ({ count }) => {
  if (count <= 0) {
    return null;
  }

  return (
    <div className={styles.alert} role="status" aria-live="polite">
      <AlertCircle size={13} aria-hidden="true" />

      <p>
        Tenés{" "}
        <strong>
          {count} solicitud{count !== 1 ? "es" : ""}
        </strong>{" "}
        pendiente{count !== 1 ? "s" : ""} que requiere
        {count !== 1 ? "n" : ""} tu atención.
      </p>
    </div>
  );
};

export default RequestAlert;
