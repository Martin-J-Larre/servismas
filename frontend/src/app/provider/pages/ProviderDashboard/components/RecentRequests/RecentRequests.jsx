
import { useEffect, useState } from "react";
import { CalendarDays, MapPin, ArrowRight, Eye } from "lucide-react";

import { getMyProviderRequests } from "../../../../../../services/service.service";

import styles from "./RecentRequests.module.css";

const formatDate = (value) => {
  if (!value) return "Fecha no disponible";

  // Evita desplazamientos de fecha cuando el backend devuelve YYYY-MM-DD.
  const date =
    typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
      ? new Date(`${value}T00:00:00`)
      : new Date(value);

  if (Number.isNaN(date.getTime())) return "Fecha no disponible";

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const RecentRequests = ({ onViewAll, onViewRequest }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyProviderRequests();
        const allRequests = response.requests ?? [];

        const pendingRequests = allRequests.filter(
          (request) => request.status === "pendiente",
        );

        setRequests(pendingRequests);
      } catch (error) {
        console.error("Error al cargar las solicitudes:", error);
        setError("No se pudieron cargar las solicitudes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Solicitudes pendientes</h2>
          <p>Revisá y gestioná las solicitudes de tus clientes.</p>
        </div>

        <button
          type="button"
          className={styles.viewAllButton}
          onClick={onViewAll}
        >
          Ver todas
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      {isLoading ? (
        <p className={styles.message}>Cargando solicitudes...</p>
      ) : error ? (
        <p className={styles.errorMessage}>{error}</p>
      ) : requests.length === 0 ? (
        <p className={styles.message}>
          No tenés solicitudes pendientes por el momento.
        </p>
      ) : (
        <div className={styles.requestList}>
          {requests.map((request) => (
            <article className={styles.requestCard} key={request.id}>
              <div className={styles.requestHeader}>
                <span className={styles.category}>
                  {request.clientName}
                </span>

                <span className={`${styles.status} ${styles.pending}`}>
                  <span className={styles.statusDot} />
                  Pendiente
                </span>
              </div>

              <h3>{request.serviceName}</h3>

              <p className={styles.description}>
                {request.description}
              </p>

              <div className={styles.details}>
                <span>
                  <MapPin size={15} aria-hidden="true" />
                  {request.address || "Ubicación no especificada"}
                </span>

                <span>
                  <CalendarDays size={15} aria-hidden="true" />
                  {formatDate(request.serviceDate)}
                </span>
              </div>

              <div className={styles.requestFooter}>
                <strong>Presupuesto a coordinar</strong>

                <button
                  type="button"
                  className={styles.detailButton}
                  onClick={() => onViewRequest?.(request.id)}
                  aria-label={`Ver solicitud de ${request.clientName}`}
                >
                  <Eye size={17} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentRequests;
