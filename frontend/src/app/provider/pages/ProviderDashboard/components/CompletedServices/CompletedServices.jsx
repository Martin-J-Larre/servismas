import { CalendarDays, MapPin, CheckCircle2 } from "lucide-react";

import styles from "./CompletedServices.module.css";

const completedServices = [
  {
    id: 1,
    clientName: "María González",
    service: "Instalación eléctrica",
    date: "5 de agosto de 2026",
    location: "Nueva Córdoba, Córdoba",
    price: 45000,
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    service: "Reparación de enchufe",
    date: "7 de agosto de 2026",
    location: "Centro, Córdoba",
    price: 18000,
  },
  {
    id: 3,
    clientName: "Lucía Fernández",
    service: "Revisión de instalación",
    date: "9 de agosto de 2026",
    location: "General Paz, Córdoba",
    price: 25000,
  },
  {
    id: 4,
    clientName: "Juan Pérez",
    service: "Instalación de luminarias",
    date: "11 de agosto de 2026",
    location: "Alta Córdoba, Córdoba",
    price: 32000,
  },
  {
    id: 5,
    clientName: "Sofía Martínez",
    service: "Reparación de tablero eléctrico",
    date: "14 de agosto de 2026",
    location: "Nueva Córdoba, Córdoba",
    price: 58000,
  },
  {
    id: 6,
    clientName: "Diego López",
    service: "Cambio de tomacorrientes",
    date: "16 de agosto de 2026",
    location: "Cerro de las Rosas, Córdoba",
    price: 22000,
  },
  {
    id: 7,
    clientName: "Valentina Torres",
    service: "Mantenimiento eléctrico",
    date: "18 de agosto de 2026",
    location: "Centro, Córdoba",
    price: 35000,
  },
  {
    id: 8,
    clientName: "Andrés Gómez",
    service: "Instalación de ventilador",
    date: "20 de agosto de 2026",
    location: "General Paz, Córdoba",
    price: 28000,
  },
  {
    id: 9,
    clientName: "Camila Díaz",
    service: "Reparación de cortocircuito",
    date: "22 de agosto de 2026",
    location: "Alberdi, Córdoba",
    price: 42000,
  },
  {
    id: 10,
    clientName: "Federico Sánchez",
    service: "Instalación eléctrica domiciliaria",
    date: "25 de agosto de 2026",
    location: "Villa Belgrano, Córdoba",
    price: 85000,
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);

const CompletedServices = () => {
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

      <div className={styles.serviceList}>
        {completedServices.map((service) => (
          <article className={styles.serviceCard} key={service.id}>
            <div className={styles.serviceMain}>
              <div className={styles.avatar} aria-hidden="true">
                {service.clientName
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className={styles.serviceInfo}>
                <div className={styles.titleRow}>
                  <h3>{service.service}</h3>

                  <span className={styles.status}>
                    <CheckCircle2 size={13} aria-hidden="true" />
                    Finalizado
                  </span>
                </div>

                <p className={styles.clientName}>
                  Cliente: {service.clientName}
                </p>

                <div className={styles.details}>
                  <span>
                    <CalendarDays size={14} aria-hidden="true" />
                    {service.date}
                  </span>

                  <span>
                    <MapPin size={14} aria-hidden="true" />
                    {service.location}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.price}>
              <span>Precio final</span>
              <strong>{formatPrice(service.price)}</strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CompletedServices;
