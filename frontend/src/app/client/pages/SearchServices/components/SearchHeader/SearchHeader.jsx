import { Link } from "react-router-dom";
import { House, LogOut } from "lucide-react";
import styles from "./SearchHeader.module.css";

const SearchHeader = () => {
  const handleLogout = () => {
    // El cierre de sesión real se implementará con la autenticación.
    console.log("Cerrar sesión");
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} aria-label="Ir al inicio">
        <span className={styles.logoIcon}>
          <House size={16} strokeWidth={2.5} />
        </span>

        <span className={styles.logoText}>
          Servi<span>Más</span>
        </span>
      </Link>

      <div className={styles.actions}>
        <div className={styles.profile}>
          <span className={styles.avatar}>MG</span>
          <span className={styles.userName}>María G.</span>
        </div>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          <LogOut size={14} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

export default SearchHeader;
