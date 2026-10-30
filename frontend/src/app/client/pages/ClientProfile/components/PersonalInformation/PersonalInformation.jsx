import { AtSign, MapPin, Phone, UserRound } from "lucide-react";
import styles from "./PersonalInformation.module.css";

const PersonalInformation = ({ client }) => {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <UserRound size={15} />
        </div>

        <h2 className={styles.title}>Información personal</h2>
      </header>

      <div className={styles.divider} />

      <div className={styles.informationGrid}>
        <div className={styles.field}>
          <span className={styles.label}>Nombre</span>
          <p className={styles.value}>{client.firstName}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Apellido</span>
          <p className={styles.value}>{client.lastName}</p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Ciudad</span>
          <p className={styles.value}>
            <MapPin size={13} />
            {client.city}
          </p>
        </div>

        <div className={styles.field}>
          <span className={styles.label}>Teléfono</span>
          <p className={styles.value}>
            <Phone size={13} />
            {client.phone || "No especificado"}
          </p>
        </div>

        <div className={`${styles.field} ${styles.emailField}`}>
          <span className={styles.label}>Correo electrónico</span>
          <p className={styles.value}>
            <AtSign size={13} />
            {client.email}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalInformation;
