import { BriefcaseBusiness, Wrench, MapPin, CalendarDays } from "lucide-react";

import styles from "./ProfessionalInformation.module.css";

const ProfessionalInformation = () => {
  const professionalInfo = [
    {
      label: "Experiencia",
      value: "5 años de experiencia",
      icon: BriefcaseBusiness,
    },
    {
      label: "Categorías de servicios",
      value: ["Plomería", "Instalaciones"],
      icon: Wrench,
    },
    {
      label: "Zona de cobertura",
      value: "Córdoba Capital y alrededores",
      icon: MapPin,
    },
    {
      label: "Disponibilidad",
      value: "Lunes a viernes · 08:00 a 18:00",
      icon: CalendarDays,
    },
  ];

  return (
    <section className={styles.professionalInformation}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Información profesional</h2>

        <p className={styles.subtitle}>
          Conocé los servicios que ofrecés y tus condiciones de trabajo.
        </p>
      </div>

      <div className={styles.informationGrid}>
        {professionalInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div className={styles.informationItem} key={item.label}>
              <div className={styles.iconContainer}>
                <Icon size={18} aria-hidden="true" />
              </div>

              <div className={styles.informationContent}>
                <span className={styles.label}>{item.label}</span>

                {Array.isArray(item.value) ? (
                  <div className={styles.categoryList}>
                    {item.value.map((category) => (
                      <span className={styles.categoryTag} key={category}>
                        {category}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className={styles.value}>{item.value}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfessionalInformation;
