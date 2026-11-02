import { BriefcaseBusiness, CalendarDays, MapPin, Wallet } from "lucide-react";

import styles from "./ServiceSummary.module.css";

const ServiceSummary = ({ request }) => {
  const summaryItems = [
    {
      id: "category",
      label: "Categoría",
      value: request.service || "No especificada",
      icon: BriefcaseBusiness,
    },
    {
      id: "date",
      label: "Fecha solicitada",
      value: request.date || "A coordinar",
      icon: CalendarDays,
    },
    {
      id: "location",
      label: "Ubicación",
      value: request.location || "A coordinar",
      icon: MapPin,
    },
    {
      id: "price",
      label: "Presupuesto",
      value: request.price || "A confirmar",
      icon: Wallet,
    },
  ];

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>Resumen del servicio</h3>
          <p>Información principal de la solicitud</p>
        </div>
      </div>

      <div className={styles.grid}>
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.iconWrapper}>
                <Icon size={15} aria-hidden="true" />
              </div>

              <div className={styles.itemContent}>
                <span className={styles.label}>{item.label}</span>
                <p className={styles.value}>{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceSummary;
