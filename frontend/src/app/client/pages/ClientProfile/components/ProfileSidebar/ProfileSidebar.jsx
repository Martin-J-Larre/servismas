import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  Settings,
  ShieldCheck,
  UserRound,
  Wrench,
} from "lucide-react";
import styles from "./ProfileSidebar.module.css";

const ProfileSidebar = ({ client, onEditProfile }) => {
  const accountItems = [
    {
      label: "Nombre completo",
      value: `${client.firstName} ${client.lastName}`,
    },
    {
      label: "Tipo de cuenta",
      value: "Cliente",
    },
    {
      label: "Ciudad",
      value: client.city,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <UserRound size={15} />
          </div>

          <h2 className={styles.cardTitle}>Mi cuenta</h2>
        </div>

        <p className={styles.description}>
          Administrá tu información personal y tus preferencias.
        </p>

        <button
          type="button"
          className={styles.editButton}
          onClick={onEditProfile}
        >
          <Settings size={14} />
          Editar perfil
          <ArrowRight size={14} />
        </button>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <ShieldCheck size={15} />
          </div>

          <h2 className={styles.cardTitle}>Resumen de la cuenta</h2>
        </div>

        <div className={styles.accountList}>
          {accountItems.map((item) => (
            <div className={styles.accountItem} key={item.label}>
              <span className={styles.accountLabel}>{item.label}</span>
              <span className={styles.accountValue}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.statusMessage}>
          <span className={styles.statusDot} />
          Cuenta activa
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.headerIcon}>
            <Wrench size={15} />
          </div>

          <h2 className={styles.cardTitle}>Accesos rápidos</h2>
        </div>

        <nav className={styles.quickLinks} aria-label="Accesos rápidos">
          <Link to="/mis-solicitudes" className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>
              <ClipboardList size={14} />
            </span>

            <span>Mis solicitudes</span>
            <ArrowRight size={13} className={styles.arrow} />
          </Link>

          <Link to="/mis-servicios" className={styles.quickLink}>
            <span className={styles.quickLinkIcon}>
              <Wrench size={14} />
            </span>

            <span>Mis servicios</span>
            <ArrowRight size={13} className={styles.arrow} />
          </Link>
        </nav>
      </section>
    </aside>
  );
};

export default ProfileSidebar;
