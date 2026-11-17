import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";

import { getProviderRequestById } from "../../../../services/service.service";

import styles from "./ServiceCompleted.module.css";

const ServiceCompleted = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await getProviderRequestById(id);

        if (isActive) {
          setRequest(response.request);
        }
      } catch (error) {
        if (isActive) {
          setRequest(null);
          setLoadError(error.message || "No se pudo cargar la solicitud.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchRequest();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleBack = () => {
    navigate("/app/prestador/solicitudes");
  };

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <p role="status">Cargando información del servicio...</p>
        </main>
      </>
    );
  }

  if (!request || request.status !== "finalizada") {
    return (
      <>
        <AppHeader />

        <main className={styles.page}>
          <section className={styles.confirmationCard}>
            <h1>Servicio no disponible</h1>
            <p>
              {loadError ||
                "No encontramos un servicio finalizado para mostrar."}
            </p>

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
