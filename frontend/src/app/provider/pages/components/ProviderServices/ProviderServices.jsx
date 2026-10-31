import {
  MapPin,
  Clock3,
  Pencil,
  Eye,
  Plus,
} from "lucide-react";

import styles from "./ProviderServices.module.css";

const services = [
  {
    id: 1,
    title: "Instalaciones eléctricas",
    category: "Electricidad",
    description:
      "Instalación y mantenimiento eléctrico para hogares y pequeños comercios.",
    location: "Nueva Córdoba, Córdoba",
    availability: "Lun. a Vie. · 09:00 a 18:00",
    price: "Desde $15.000",
    status: "Activo",
  },
  {
    id: 2,
    title: "Reparaciones eléctricas",
    category: "Electricidad",
    description:
      "Diagnóstico y reparación de enchufes, interruptores y fallas eléctricas.",
    location: "Córdoba Capital",
    availability: "Lun. a Sáb. · 10:00 a 17:00",
    price: "Desde $10.000",
    status: "Activo",
  },
  {
    id: 3,
    title: "Mantenimiento eléctrico",
    category: "Mantenimiento",
    description:
      "Revisión preventiva de instalaciones y mantenimiento general.",
    location: "Nueva Córdoba, Córdoba",
    availability: "Con cita previa",
    price: "Desde $20.000",
    status: "Activo",
  },
];

const ProviderServices = ({
  onViewAll,
  onCreateService,
  onEditService,
  onViewService,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Mis servicios</h2>
          <p>Administrá los servicios que ofrecés.</p>
        </div>

        <button
          type="button"
          className={styles.viewAllButton}
          onClick={onViewAll}
        >
          Ver todos
        </button>
      </div>

      <div className={styles.serviceList}>
        {services.map((service) => (
          <article className={styles.serviceCard} key={service.id}>
            <div className={styles.serviceHeader}>
              <div className={styles.serviceHeading}>
                <span className={styles.category}>{service.category}</span>

                <h3>{service.title}</h3>
              </div>

              <span className={styles.status}>
                <span className={styles.statusIndicator} />
                {service.status}
              </span>
            </div>

            <p className={styles.description}>{service.description}</p>

            <div className={styles.details}>
              <span>
                <MapPin size={14} aria-hidden="true" />
                {service.location}
              </span>

              <span>
                <Clock3 size={14} aria-hidden="true" />
                {service.availability}
              </span>
            </div>

            <div className={styles.serviceFooter}>
              <strong className={styles.price}>{service.price}</strong>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={`Ver ${service.title}`}
                  title="Ver servicio"
                  onClick={() => onViewService?.(service.id)}
                >
                  <Eye size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={`Editar ${service.title}`}
                  title="Editar servicio"
                  onClick={() => onEditService?.(service.id)}
                >
                  <Pencil size={16} aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className={styles.createButton}
        onClick={onCreateService}
      >
        <Plus size={16} aria-hidden="true" />
        Publicar nuevo servicio
      </button>
    </section>
  );
};

export default ProviderServices;