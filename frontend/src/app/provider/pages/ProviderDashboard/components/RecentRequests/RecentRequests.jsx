import { CalendarDays, Clock3, MapPin, ArrowRight } from "lucide-react";

import styles from "./RecentRequests.module.css";

const requests = [
  {
    id: 1,
    clientName: "María González",
    service: "Instalación eléctrica",
    date: "12 de agosto de 2026",
    time: "09:00 - 11:00",
    location: "Nueva Córdoba, Córdoba",
    status: "Pendiente",
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    service: "Reparación de enchufe",
    date: "13 de agosto de 2026",
    time: "14:00 - 15:00",
    location: "Centro, Córdoba",
    status: "Pendiente",
  },
  {
    id: 3,
    clientName: "Lucía Fernández",
    service: "Revisión de instalación",
    date: "14 de agosto de 2026",
    time: "10:00 - 12:00",
    location: "General Paz, Córdoba",
    status: "Aceptada",
  },
];

const RecentRequests = ({ onViewAll, onViewRequest }) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Solicitudes recientes</h2>
          <p>Revisá las solicitudes de tus clientes.</p>
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

      <div className={styles.requestList}>
        {requests.map((request) => (
          <article className={styles.requestCard} key={request.id}>
            <div className={styles.requestMain}>
              <div className={styles.avatar} aria-hidden="true">
                {request.clientName
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className={styles.requestInfo}>
                <div className={styles.titleRow}>
                  <h3>{request.service}</h3>

                  <span
                    className={`${styles.status} ${
                      request.status === "Aceptada"
                        ? styles.accepted
                        : styles.pending
                    }`}
                  >
                    {request.status}
                  </span>
                </div>

                <p className={styles.clientName}>
                  Cliente: {request.clientName}
                </p>

                <div className={styles.details}>
                  <span>
                    <CalendarDays size={13} aria-hidden="true" />
                    {request.date}
                  </span>

                  <span>
                    <Clock3 size={13} aria-hidden="true" />
                    {request.time}
                  </span>

                  <span>
                    <MapPin size={13} aria-hidden="true" />
                    {request.location}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={styles.detailButton}
              onClick={() => onViewRequest?.(request.id)}
            >
              Ver solicitud
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentRequests;