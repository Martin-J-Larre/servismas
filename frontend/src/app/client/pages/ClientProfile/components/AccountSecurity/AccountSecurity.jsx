import { useState } from "react";
import { KeyRound, ShieldCheck, LockKeyhole, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import styles from "./AccountSecurity.module.css";

const AccountSecurity = ({ client }) => {
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  const handleChangePassword = () => {
    setShowPasswordInfo(true);
    toast.info("El cambio de contraseña estará disponible próximamente.");
  };

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <ShieldCheck size={15} />
        </div>

        <h2 className={styles.title}>Seguridad de la cuenta</h2>
      </header>

      <div className={styles.divider} />

      <div className={styles.accountStatus}>
        <div className={styles.statusIcon}>
          <LockKeyhole size={16} />
        </div>

        <div className={styles.statusInfo}>
          <span className={styles.label}>Estado de la cuenta</span>
          <span className={styles.statusValue}>
            <span className={styles.statusDot} />
            Activa
          </span>
        </div>
      </div>

      <div className={styles.accessInfo}>
        <span className={styles.label}>Correo de acceso</span>
        <span className={styles.email}>{client.email}</span>
      </div>

      <button
        type="button"
        className={styles.passwordButton}
        onClick={handleChangePassword}
      >
        <span className={styles.passwordButtonContent}>
          <KeyRound size={14} />
          Cambiar contraseña
        </span>

        <ChevronRight size={15} />
      </button>

      {showPasswordInfo && (
        <p className={styles.helperText} role="status">
          Esta opción estará disponible cuando conectemos la gestión de
          contraseñas.
        </p>
      )}
    </section>
  );
};

export default AccountSecurity;
