import {
  House,
  PawPrint,
  Heart,
  ClipboardList,
  BriefcaseBusiness,
  Trees,
} from "lucide-react";
import styles from "./ServiceTypeList.module.css";

const serviceTypes = [
  {
    id: "home",
    name: "Servicios para el hogar",
    icon: House,
  },
  {
    id: "pets",
    name: "Servicios para mascotas",
    icon: PawPrint,
  },
  {
    id: "personal-care",
    name: "Cuidado de personas",
    icon: Heart,
  },
  {
    id: "procedures",
    name: "Trámites y gestiones",
    icon: ClipboardList,
  },
  {
    id: "professional",
    name: "Servicios profesionales",
    icon: BriefcaseBusiness,
  },
  {
    id: "gardening",
    name: "Jardinería y exteriores",
    icon: Trees,
  },
];

const ServiceTypeList = ({ onSelectServiceType, selectedServiceType }) => {
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

      <div className={styles.grid}>
        {serviceTypes.map((serviceType) => {
          const Icon = serviceType.icon;
          const isSelected = selectedServiceType?.id === serviceType.id;

          return (
            <button
              key={serviceType.id}
              type="button"
              className={`${styles.serviceType} ${isSelected ? styles.selected : ""}`}
              aria-pressed={isSelected}
              onClick={() => onSelectServiceType?.(serviceType)}
            >
              <span className={styles.iconWrapper}>
                <Icon size={20} strokeWidth={1.8} />
              </span>

              <span className={styles.name}>{serviceType.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceTypeList;
