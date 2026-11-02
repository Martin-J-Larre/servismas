import { UserRound, Mail, Phone, MapPin } from "lucide-react";
import styles from "./PersonalInformation.module.css";

const PersonalInformation = () => {
  const personalInfo = [
    {
      label: "Nombre",
      value: "Juan",
      icon: UserRound,
    },
    {
      label: "Apellido",
      value: "Pérez",
      icon: UserRound,
    },
    {
      label: "Ciudad",
      value: "Córdoba Capital",
      icon: MapPin,
    },
    {
      label: "Teléfono",
      value: "+54 351 555-1234",
      icon: Phone,
    },
    {
      label: "Correo electrónico",
      value: "juan.perez@example.com",
      icon: Mail,
    },
  ];

  return (
    <section className={styles.personalInformation}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.title}>Información personal</h2>
          <p className={styles.subtitle}>Tus datos personales y de contacto.</p>
        </div>
      </div>

      <div className={styles.informationGrid}>
        {personalInfo.map((item) => {
          const Icon = item.icon;

          return (
            <div className={styles.informationItem} key={item.label}>
              <div className={styles.iconContainer}>
                <Icon size={18} aria-hidden="true" />
              </div>

              <div className={styles.informationContent}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PersonalInformation;
