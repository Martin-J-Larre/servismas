import { CheckCircle2 } from "lucide-react";

import styles from "./CompletedServices.module.css";

const CompletedServices = () => {
  const completedServices = [];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Servicios realizados</h2>
          <p>Consultá el historial de trabajos que completaste.</p>
        </div>

        <span className={styles.count}>
          {completedServices.length} servicios
        </span>
      </div>

      {completedServices.length === 0 ? (
        <div className={styles.emptyState}>
          <CheckCircle2 size={28} aria-hidden="true" />
          <p>Todavía no tenés servicios realizados.</p>
          <span>
            Cuando completes tus primeros trabajos, aparecerán en esta sección.
          </span>
        </div>
      ) : (
        <div className={styles.serviceList}>
          {/* Aquí se mostrarán los servicios completados. */}
        </div>
      )}
    </section>
  );
};

export default CompletedServices;
