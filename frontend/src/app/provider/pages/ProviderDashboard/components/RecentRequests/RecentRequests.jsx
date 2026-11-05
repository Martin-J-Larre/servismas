import { CalendarDays, Clock3, MapPin, ArrowRight, Eye } from "lucide-react";

import styles from "./RecentRequests.module.css";

const requests = [
  {
    id: 1,
    clientName: "María González",
    service: "Instalación eléctrica",
    description:
      "Solicitud para realizar una instalación eléctrica en una vivienda. Se requiere revisar el estado de las conexiones y realizar los trabajos necesarios.",
    date: "12 de agosto de 2026",
    time: "09:00 - 11:00",
    location: "Nueva Córdoba, Córdoba",
    status: "Pendiente",
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    service: "Reparación de enchufe",
    description:
      "Reparación de un tomacorriente que presenta fallas de funcionamiento.",
    date: "13 de agosto de 2026",
    time: "14:00 - 15:00",
    location: "Centro, Córdoba",
    status: "Pendiente",
  },
  {
    id: 3,
    clientName: "Lucía Fernández",
    service: "Revisión de instalación",
    description:
      "Revisión general de la instalación eléctrica de una vivienda.",
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

      <div className={styles.requestList}>
        {requests.map((request) => (
          <article className={styles.requestCard} key={request.id}>
            <div className={styles.requestHeader}>
              <span className={styles.category}>{request.clientName}</span>

              <span
                className={`${styles.status} ${
                  request.status === "Aceptada"
                    ? styles.accepted
                    : styles.pending
                }`}
              >
                <span className={styles.statusDot} />
                {request.status}
              </span>
            </div>

            <h3>{request.service}</h3>

            <p className={styles.description}>{request.description}</p>

            <div className={styles.details}>
              <span>
                <MapPin size={15} aria-hidden="true" />
                {request.location}
              </span>

              <span>
                <CalendarDays size={15} aria-hidden="true" />
                {request.date}
              </span>

              <span>
                <Clock3 size={15} aria-hidden="true" />
                {request.time}
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
    </section>
  );
};

export default RecentRequests;
