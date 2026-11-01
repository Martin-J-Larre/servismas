import { useState } from "react";

import HeaderClient from "../../../client/components/HeaderClient/HeaderClient";

import RequestFilters from "./components/RequestFilters/RequestFilters";
import RequestAlert from "./components/RequestAlert/RequestAlert";
import RequestCard from "./components/RequestCard/RequestCard";

import styles from "./ReceivedRequests.module.css";

const initialRequests = [
  {
    id: 1,
    clientName: "María González",
    initials: "MG",
    service: "Plomería",
    description: "Reparación de pérdida de agua en el baño principal.",
    date: "2 de octubre de 2026",
    time: "10:00 hs",
    location: "Av. Colón 1234, Córdoba",
    price: "$15.000 - $25.000",
    status: "pending",
    requiresAction: true,
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    initials: "CR",
    service: "Reparación eléctrica",
    description: "Revisión y cambio de tablero eléctrico en departamento.",
    date: "5 de octubre de 2026",
    time: "15:00 hs",
    location: "Córdoba Capital",
    price: "",
    status: "accepted",
    requiresAction: false,
  },
  {
    id: 3,
    clientName: "Laura Martínez",
    initials: "LM",
    service: "Instalación de artefactos",
    description: "Instalación de lámparas y ventilador de techo en living.",
    date: "28 de septiembre de 2026",
    time: "",
    location: "",
    price: "",
    status: "rejected",
    requiresAction: false,
  },
];

const ReceivedRequests = () => {
  const [requests] = useState(initialRequests);
  const [activeFilter, setActiveFilter] = useState("all");

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
      <HeaderClient />

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
              <RequestCard key={request.id} request={request} />
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
