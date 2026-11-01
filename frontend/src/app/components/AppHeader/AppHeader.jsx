import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  LogOut,
  UserRound,
  ClipboardList,
  BriefcaseBusiness,
  LayoutDashboard,
} from "lucide-react";

import logo from "../../../assets/logo-transparente-negro.png";

import styles from "./AppHeader.module.css";

const clientMenuItems = [
  {
    label: "Mi perfil",
    to: "/app/cliente/mi-perfil",
    icon: UserRound,
  },
  {
    label: "Mis solicitudes",
    to: "/app/cliente/mis-solicitudes",
    icon: ClipboardList,
  },
  {
    label: "Mis servicios",
    to: "/app/cliente/mis-servicios",
    icon: BriefcaseBusiness,
  },
];

const providerMenuItems = [
  {
    label: "Panel principal",
    to: "/app/prestador/panel",
    icon: LayoutDashboard,
  },
  {
    label: "Mi perfil",
    to: "/app/prestador/mi-perfil",
    icon: UserRound,
  },
  {
    label: "Mis servicios",
    to: "/app/prestador/mis-servicios",
    icon: BriefcaseBusiness,
  },
  {
    label: "Solicitudes recibidas",
    to: "/app/prestador/solicitudes",
    icon: ClipboardList,
  },
];

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const isProvider = location.pathname.startsWith("/app/prestador");
  const isClient = location.pathname.startsWith("/app/cliente");

  const user = isProvider
    ? {
        name: "Juan Pérez",
        initials: "JP",
        role: "Prestador",
      }
    : {
        name: "María González",
        initials: "MG",
        role: "Cliente",
      };

  const menuItems = isProvider
    ? providerMenuItems
    : isClient
      ? clientMenuItems
      : [];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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

  const handleLogout = () => {
    setIsMenuOpen(false);

    // La autenticación real se implementará posteriormente.
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="ServisMás - Inicio">
          <img src={logo} alt="ServisMás" />
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
              aria-controls="app-header-profile-menu"
            >
              <span className={styles.avatar} aria-hidden="true">
                {user.initials}
              </span>

              <span className={styles.userName}>{user.name}</span>

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
                id="app-header-profile-menu"
                className={styles.dropdown}
                aria-label="Menú de usuario"
                role="menu"
              >
                <div className={styles.dropdownHeader}>
                  <span className={styles.dropdownAvatar} aria-hidden="true">
                    {user.initials}
                  </span>

                  <div className={styles.dropdownUserInfo}>
                    <span className={styles.dropdownUserName}>{user.name}</span>

                    <span className={styles.dropdownUserRole}>{user.role}</span>
                  </div>
                </div>

                <div className={styles.dropdownDivider} />

                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={styles.dropdownItem}
                      role="menuitem"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {Icon && <Icon size={18} aria-hidden="true" />}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <button
            type="button"
            className={styles.logout}
            onClick={handleLogout}
          >
            <LogOut size={14} aria-hidden="true" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
