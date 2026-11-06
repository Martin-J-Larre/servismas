import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";
import RequestCard from "./components/RequestCard/RequestCard";

import { getMyRequests } from "../../../../services/service.service";
import styles from "./MyRequests.module.css";

const statusLabels = {
  pendiente: "Pendiente",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  completada: "Completada",
  finalizada: "Completada",
  cancelada: "Cancelada",
};

const formatDate = (date) => {
  if (!date) return "";

  // Evita desplazamientos de fecha al interpretar valores YYYY-MM-DD.
  if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const MyRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getMyRequests();

        const formattedRequests = (data.requests ?? []).map((request) => ({
          ...request,
          providerName: request.providerName ?? "Prestador",
          specialty: request.specialty ?? request.category ?? "",
          category: request.category ?? "",
          requestDate: formatDate(request.requestDate),
          serviceDate: formatDate(request.serviceDate),
          location: request.address ?? "",
          description: request.description ?? "",
          status: statusLabels[request.status?.toLowerCase()] ?? request.status,
        }));

        setRequests(formattedRequests);
      } catch (error) {
        console.error("Error al obtener las solicitudes:", error);
        setError(error.message || "No se pudieron cargar las solicitudes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const counts = useMemo(
    () => ({
      total: requests.length,
      pending: requests.filter((request) => request.status === "Pendiente")
        .length,
      accepted: requests.filter((request) => request.status === "Aceptada")
        .length,
      rejected: requests.filter((request) => request.status === "Rechazada")
        .length,
    }),
    [requests],
  );

  const filteredRequests = useMemo(() => {
    if (activeFilter === "Todas") {
      return requests;
    }

    return requests.filter((request) => request.status === activeFilter);
  }, [requests, activeFilter]);

  const handleViewDetails = (request) => {
    console.log("Ver solicitud:", request);
  };

  const handleCoordinate = (request) => {
    navigate(`/app/cliente/coordinar-servicio/${request.id}`, {
      state: { request },
    });
  };

  const handleFindProvider = (request) => {
    console.log("Buscar otro prestador:", request);
  };

  return (
    <>
      <AppHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div>
              <h1 className={styles.title}>Mis solicitudes</h1>
              <p className={styles.subtitle}>
                Consultá el estado de tus solicitudes de servicio.
              </p>
            </div>
          </header>

          <section
            className={styles.summary}
            aria-label="Resumen de solicitudes"
          >
            <button
              type="button"
              className={`${styles.summaryCard} ${styles.totalCard} ${
                activeFilter === "Todas" ? styles.summaryActive : ""
              }`}
              onClick={() => setActiveFilter("Todas")}
              aria-pressed={activeFilter === "Todas"}
              disabled={isLoading}
            >
              <strong>{counts.total}</strong>
              <span>Total</span>
            </button>

            <button
              type="button"
              className={`${styles.summaryCard} ${styles.pendingCard} ${
                activeFilter === "Pendiente" ? styles.summaryActive : ""
              }`}
              onClick={() => setActiveFilter("Pendiente")}
              aria-pressed={activeFilter === "Pendiente"}
              disabled={isLoading}
            >
              <strong>{counts.pending}</strong>
              <span>Pendientes</span>
            </button>

            <button
              type="button"
              className={`${styles.summaryCard} ${styles.acceptedCard} ${
                activeFilter === "Aceptada" ? styles.summaryActive : ""
              }`}
              onClick={() => setActiveFilter("Aceptada")}
              aria-pressed={activeFilter === "Aceptada"}
              disabled={isLoading}
            >
              <strong>{counts.accepted}</strong>
              <span>Aceptadas</span>
            </button>

            <button
              type="button"
              className={`${styles.summaryCard} ${styles.rejectedCard} ${
                activeFilter === "Rechazada" ? styles.summaryActive : ""
              }`}
              onClick={() => setActiveFilter("Rechazada")}
              aria-pressed={activeFilter === "Rechazada"}
              disabled={isLoading}
            >
              <strong>{counts.rejected}</strong>
              <span>Rechazadas</span>
            </button>
          </section>

          <section className={styles.requestsSection}>
            {isLoading ? (
              <div className={styles.emptyState}>
                <p>Cargando tus solicitudes...</p>
              </div>
            ) : error ? (
              <div className={styles.emptyState}>
                <h2>No pudimos cargar tus solicitudes</h2>
                <p>{error}</p>
              </div>
            ) : filteredRequests.length > 0 ? (
              <div className={styles.requestGrid}>
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={handleViewDetails}
                    onCoordinate={handleCoordinate}
                    onFindProvider={handleFindProvider}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <ClipboardList size={28} />
                <h2>
                  {requests.length === 0
                    ? "Todavía no tenés solicitudes"
                    : "No hay solicitudes en esta categoría"}
                </h2>
                <p>
                  {requests.length === 0
                    ? "Cuando solicites un servicio, aparecerá acá."
                    : "Probá seleccionando otra categoría."}
                </p>
                {activeFilter !== "Todas" && (
                  <button
                    type="button"
                    onClick={() => setActiveFilter("Todas")}
                  >
                    Ver todas las solicitudes
                  </button>
                )}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default MyRequests;
