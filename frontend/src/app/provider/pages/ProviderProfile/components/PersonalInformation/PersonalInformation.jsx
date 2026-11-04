import { UserRound, Mail, Phone, MapPin } from "lucide-react";
import styles from "./PersonalInformation.module.css";

const PersonalInformation = ({ user }) => {
  const personalInfo = [
    {
      label: "Nombre",
      value: user?.firstName || "No especificado",
      icon: UserRound,
    },
    {
      label: "Apellido",
      value: user?.lastName || "No especificado",
      icon: UserRound,
    },
    {
      label: "Ciudad",
      value: user?.address?.locality || "No especificada",
      icon: MapPin,
    },
    {
      label: "Teléfono",
      value: user?.phone || "No especificado",
      icon: Phone,
    },
    {
      label: "Correo electrónico",
      value: user?.email || "No especificado",
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
