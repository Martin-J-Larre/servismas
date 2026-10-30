import { useState } from "react";
import { Bell, Mail, MessageSquare, Smartphone, Tags } from "lucide-react";
import styles from "./ProfilePreferences.module.css";

const ProfilePreferences = ({ preferences, onPreferencesChange }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
  });

  const handleNotificationChange = (type) => {
    setNotifications((previous) => ({
      ...previous,
      [type]: !previous[type],
    }));
  };

  const categories = preferences?.categories ?? [
    "Plomería",
    "Electricidad",
    "Limpieza",
  ];

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <Tags size={15} />
        </div>

        <h2 className={styles.title}>Mis preferencias</h2>
      </header>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Categorías favoritas</h3>

        <div className={styles.categories}>
          {categories.map((category) => (
            <span key={category} className={styles.category}>
              {category}
            </span>
          ))}
        </div>

        <p className={styles.helperText}>
          Tus categorías de interés para encontrar servicios.
        </p>
      </div>

      <div className={styles.section}>
        <div className={styles.notificationHeading}>
          <Bell size={14} />
          <h3 className={styles.sectionTitle}>Notificaciones</h3>
        </div>

        <div className={styles.notificationList}>
          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <Mail size={15} />
              <div>
                <p className={styles.notificationTitle}>Correo electrónico</p>
                <p className={styles.notificationDescription}>
                  Actualizaciones de tus solicitudes.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifications.email}
              aria-label="Notificaciones por correo electrónico"
              className={`${styles.toggle} ${
                notifications.email ? styles.toggleActive : ""
              }`}
              onClick={() => handleNotificationChange("email")}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <Smartphone size={15} />
              <div>
                <p className={styles.notificationTitle}>Notificaciones push</p>
                <p className={styles.notificationDescription}>
                  Avisos sobre cambios en tus solicitudes.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifications.push}
              aria-label="Notificaciones push"
              className={`${styles.toggle} ${
                notifications.push ? styles.toggleActive : ""
              }`}
              onClick={() => handleNotificationChange("push")}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.notificationItem}>
            <div className={styles.notificationInfo}>
              <MessageSquare size={15} />
              <div>
                <p className={styles.notificationTitle}>Mensajes SMS</p>
                <p className={styles.notificationDescription}>
                  Recibí avisos mediante mensajes de texto.
                </p>
              </div>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={notifications.sms}
              aria-label="Notificaciones por SMS"
              className={`${styles.toggle} ${
                notifications.sms ? styles.toggleActive : ""
              }`}
              onClick={() => handleNotificationChange("sms")}
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePreferences;
