import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";

import RequestFilters from "./components/RequestFilters/RequestFilters";
import RequestAlert from "./components/RequestAlert/RequestAlert";
import RequestCard from "./components/RequestCard/RequestCard";

import { getMyProviderRequests } from "../../../../services/service.service";

import styles from "./ReceivedRequests.module.css";

const statusMap = {
  pendiente: "pending",
  aceptada: "accepted",
  rechazada: "rejected",
};

const formatDate = (date) => {
  if (!date) return null;

  return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString(
    "es-AR",
  );
};

const mapRequestData = (request) => {
  const clientName = request.clientName || "Cliente";

  return {
    ...request,
    id: request.id,
    clientName,
    initials: clientName
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    service: request.serviceName || "Servicio",
    date: formatDate(request.serviceDate),
    time: null,
    location: request.address || "",
    price: request.visitCost != null ? `$${request.visitCost}` : "A convenir",
    status: statusMap[request.status?.toLowerCase()] || request.status,
  };
};

const ReceivedRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await getMyProviderRequests();

        if (isActive) {
          const mappedRequests = (response.requests || []).map(mapRequestData);
          setRequests(mappedRequests);
        }
      } catch (error) {
        if (isActive) {
          setRequests([]);
          setLoadError(
            error.message || "No se pudieron cargar las solicitudes recibidas.",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      isActive = false;
    };
  }, []);

  const handleViewRequest = (id) => {
    navigate(`/app/prestador/solicitudes/${id}`);
  };

  const pendingCount = requests.filter(
    (request) => request.status === "pending",
  ).length;

  const acceptedCount = requests.filter(
    (request) => request.status === "accepted",
  ).length;

  const filteredRequests =
    activeFilter === "all"
      ? requests
      : requests.filter((request) => request.status === activeFilter);

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.heading}>
            <span className={styles.eyebrow}>SOLICITUDES</span>

            <h1>Solicitudes recibidas</h1>

            <p>
              Revisá las solicitudes de clientes y gestioná los servicios que te
              solicitaron.
            </p>
          </div>

          <div className={styles.stats}>
            <div className={`${styles.statBadge} ${styles.pendingBadge}`}>
              <span />
              {pendingCount} pendiente{pendingCount !== 1 ? "s" : ""}
            </div>

            <div className={`${styles.statBadge} ${styles.acceptedBadge}`}>
              <span />
              {acceptedCount} aceptada{acceptedCount !== 1 ? "s" : ""}
            </div>
          </div>
        </header>

        {isLoading ? (
          <p role="status">Cargando solicitudes...</p>
        ) : loadError ? (
          <p role="alert">{loadError}</p>
        ) : (
          <>
            <RequestFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              requests={requests}
            />

            {pendingCount > 0 &&
              activeFilter !== "accepted" &&
              activeFilter !== "rejected" && (
                <RequestAlert count={pendingCount} />
              )}

            <section
              className={styles.requestList}
              aria-label="Lista de solicitudes"
            >
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onViewRequest={handleViewRequest}
                  />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <h2>No hay solicitudes en esta categoría</h2>
                  <p>
                    Cuando recibas solicitudes con este estado, aparecerán acá.
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ReceivedRequests;
