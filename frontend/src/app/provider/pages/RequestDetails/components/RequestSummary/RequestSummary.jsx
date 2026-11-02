import { CalendarDays, House, MapPin, Tag } from "lucide-react";
import styles from "./RequestSummary.module.css";

const RequestSummary = ({ request }) => {
  const { service, category, address, date, time } = request;

  const rows = [
    {
      label: "Servicio solicitado",
      value: service || "Servicio sin especificar",
      Icon: Tag,
    },
    {
      label: "Categoría del servicio",
      value: category || "Categoría sin especificar",
      Icon: House,
    },
    {
      label: "Dirección",
      value: address || "Dirección no especificada",
      Icon: MapPin,
    },
    {
      label: "Fecha solicitada",
      value: [date, time].filter(Boolean).join(" · ") || "A coordinar",
      Icon: CalendarDays,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Resumen de la solicitud</h2>

      <div className={styles.summaryCard}>
        {rows.map(({ label, value, Icon }) => (
          <div className={styles.row} key={label}>
            <div className={styles.label}>
              <Icon size={13} aria-hidden="true" />
              <span>{label}</span>
            </div>

            <span className={styles.value}>{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RequestSummary;
