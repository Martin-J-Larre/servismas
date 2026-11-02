import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";

import RequestFilters from "./components/RequestFilters/RequestFilters";
import RequestAlert from "./components/RequestAlert/RequestAlert";
import RequestCard from "./components/RequestCard/RequestCard";

import { getRequests } from "../../data/requests";

import styles from "./ReceivedRequests.module.css";

const ReceivedRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState(() => getRequests());
  const [activeFilter, setActiveFilter] = useState("all");

  const handleViewRequest = (id) => {
    navigate(`/app/prestador/solicitudes/${id}`);
  };

  useEffect(() => {
    const syncRequests = () => {
      setRequests(getRequests());
    };

    window.addEventListener("storage", syncRequests);

    return () => {
      window.removeEventListener("storage", syncRequests);
    };
  }, []);

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

        <RequestFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          requests={requests}
        />

        {pendingCount > 0 &&
          activeFilter !== "accepted" &&
          activeFilter !== "rejected" && <RequestAlert count={pendingCount} />}

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
              <p>Cuando recibas solicitudes con este estado, aparecerán acá.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ReceivedRequests;
