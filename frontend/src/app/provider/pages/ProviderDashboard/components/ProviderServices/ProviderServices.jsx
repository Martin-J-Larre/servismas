import { useEffect, useState } from "react";
import { MapPin, Clock3, Pencil, Eye } from "lucide-react";

import { getMyServices } from "../../../../../../services/service.service";
import styles from "./ProviderServices.module.css";

const formatLocation = (location) => {
  if (!location || typeof location !== "object")
    return "Ubicación no disponible";

  return [location.locality, location.province].filter(Boolean).join(", ");
};

const formatAvailability = (availability) => {
  if (!availability?.length) return "Sin disponibilidad configurada";

  const days = availability.map(({ day }) => day);
  const uniqueDays = [...new Set(days)];

  const first = availability[0];
  const sameSchedule = availability.every(
    ({ start, end }) => start === first.start && end === first.end,
  );

  const dayText =
    uniqueDays.length === 1
      ? uniqueDays[0]
      : `${uniqueDays[0]} a ${uniqueDays[uniqueDays.length - 1]}`;

  const timeText = sameSchedule
    ? `${first.start} a ${first.end}`
    : "Consultar horarios";

  return `${dayText} · ${timeText}`;
};

const ProviderServices = ({ onEditService, onViewService }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyServices();

        setServices(response.services ?? []);
      } catch (error) {
        console.error("Error al obtener los servicios:", error);
        setError("No se pudieron cargar tus servicios.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.section}>
        <p>Cargando servicios...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <p>{error}</p>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section className={styles.section}>
        <p>Todavía no publicaste ningún servicio.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.serviceList}>
        {services.map((service) => (
          <article className={styles.serviceCard} key={service.id}>
            <div className={styles.serviceHeader}>
              <div className={styles.serviceHeading}>
                <span className={styles.category}>{service.category}</span>
                <h3>{service.name}</h3>
              </div>

              <span className={styles.status}>
                <span className={styles.statusIndicator} />
                Activo
              </span>
            </div>

            <p className={styles.description}>{service.description}</p>

            <div className={styles.details}>
              <span>
                <MapPin size={14} aria-hidden="true" />
                {formatLocation(service.location)}
              </span>

              <span>
                <Clock3 size={14} aria-hidden="true" />
                {formatAvailability(service.availability)}
              </span>
            </div>

            <div className={styles.serviceFooter}>
              <strong className={styles.price}>Precio a consultar</strong>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={`Ver ${service.name}`}
                  title="Ver servicio"
                  onClick={() => onViewService?.(service.id)}
                >
                  <Eye size={16} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={`Editar ${service.name}`}
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
    </section>
  );
};

export default ProviderServices;
