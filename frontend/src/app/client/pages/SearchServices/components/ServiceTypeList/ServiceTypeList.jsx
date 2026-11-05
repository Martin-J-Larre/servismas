import {
  House,
  PawPrint,
  Heart,
  ClipboardList,
  BriefcaseBusiness,
  Trees,
} from "lucide-react";

import styles from "./ServiceTypeList.module.css";

// Los iconos se asocian a los IDs de tipo_servicio en MySQL.
const serviceTypeIcons = {
  1: House,
  2: PawPrint,
  3: Heart,
  4: ClipboardList,
  5: BriefcaseBusiness,
  6: Trees,
};

const ServiceTypeList = ({
  serviceTypes = [],
  loading,
  error,
  onSelectServiceType,
  selectedServiceType,
}) => {
  return (
    <section className={styles.section} aria-labelledby="service-types-title">
      <div className={styles.heading}>
        <h2 id="service-types-title" className={styles.title}>
          Explorá por tipo de servicio
        </h2>

        <p className={styles.subtitle}>
          Encontrá profesionales según el servicio que necesitás.
        </p>
      </div>

      {loading && <p>Cargando tipos de servicios...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && (
        <div className={styles.grid}>
          {serviceTypes.map((serviceType) => {
            const Icon = serviceTypeIcons[serviceType.id];
            const isSelected =
              Number(selectedServiceType?.id) === Number(serviceType.id);

            return (
              <button
                key={serviceType.id}
                type="button"
                className={`${styles.serviceType} ${
                  isSelected ? styles.selected : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => onSelectServiceType?.(serviceType)}
              >
                <span className={styles.iconWrapper}>
                  {Icon && <Icon size={20} strokeWidth={1.8} />}
                </span>

                <span className={styles.name}>{serviceType.nombre}</span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ServiceTypeList;
