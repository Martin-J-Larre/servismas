import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  LogOut,
  ChevronDown,
  UserRound,
  ClipboardList,
  BriefcaseBusiness,
} from "lucide-react";

import styles from "./HeaderClient.module.css";

const HeaderClient = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const handleLogout = () => {
    // El cierre de sesión real se implementará con la autenticación.
    console.log("Cerrar sesión");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleNavigate = () => {
    setIsMenuOpen(false);
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
        <div className={styles.profileWrapper} ref={profileRef}>
          <button
            type="button"
            className={`${styles.profile} ${
              isMenuOpen ? styles.profileActive : ""
            }`}
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-controls="client-profile-menu"
          >
            <span className={styles.avatar}>MG</span>

            <span className={styles.userName}>María G.</span>

            <ChevronDown
              size={14}
              className={`${styles.chevron} ${
                isMenuOpen ? styles.chevronOpen : ""
              }`}
              aria-hidden="true"
            />
          </button>

          {isMenuOpen && (
            <nav
              id="client-profile-menu"
              className={styles.dropdown}
              aria-label="Menú de usuario"
              role="menu"
            >
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownAvatar}>MG</span>

                <div className={styles.dropdownUserInfo}>
                  <span className={styles.dropdownUserName}>
                    María González
                  </span>
                  <span className={styles.dropdownUserRole}>Cliente</span>
                </div>
              </div>

              <div className={styles.dropdownDivider} />

              <Link
                to="/mi-perfil"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={handleNavigate}
              >
                <UserRound size={17} aria-hidden="true" />
                <span>Mi perfil</span>
              </Link>

              <Link
                to="/mis-solicitudes"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={handleNavigate}
              >
                <ClipboardList size={17} aria-hidden="true" />
                <span>Mis solicitudes</span>
              </Link>

              <Link
                to="/mis-servicios"
                className={styles.dropdownItem}
                role="menuitem"
                onClick={handleNavigate}
              >
                <BriefcaseBusiness size={17} aria-hidden="true" />
                <span>Mis servicios</span>
              </Link>
            </nav>
          )}
        </div>

        <button type="button" className={styles.logout} onClick={handleLogout}>
          <LogOut size={14} aria-hidden="true" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

export default HeaderClient;
