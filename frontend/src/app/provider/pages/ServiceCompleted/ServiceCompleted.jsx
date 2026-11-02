import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";
import { getRequestById } from "../../data/requests";

import styles from "./ServiceCompleted.module.css";

const ServiceCompleted = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);

  useEffect(() => {
    setRequest(getRequestById(id));
  }, [id]);

  const handleBack = () => {
    navigate("/app/prestador/solicitudes");
  };

  if (!request || request.serviceStage !== "completed") {
    return (
      <>
        <AppHeader />

        <main className={styles.page}>
          <section className={styles.confirmationCard}>
            <h1>Servicio no disponible</h1>
            <p>No encontramos un servicio finalizado para mostrar.</p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleBack}
            >
              Volver a solicitudes
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader />

      <main className={styles.page}>
        <section className={styles.confirmationCard}>
          <div className={styles.iconCircle}>
            <ShieldCheck size={30} strokeWidth={2} aria-hidden="true" />
          </div>

          <span className={styles.eyebrow}>¡COMPLETADO!</span>

          <h1>Servicio finalizado</h1>

          <p className={styles.description}>
            El servicio con <strong>{request.clientName}</strong> fue
            completado. Esperá la confirmación y valoración del cliente.
          </p>

          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Finalizado — pendiente de confirmación
          </div>

          <button
            type="button"
            className={styles.primaryButton}
            onClick={handleBack}
          >
            Volver a solicitudes
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </section>
      </main>
    </>
  );
};

export default ServiceCompleted;
