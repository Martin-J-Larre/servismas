import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import logo from "../../../assets/logo-transparente-negro.png";

import styles from "./AuthHeader.module.css";

const AuthHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="ServisMás - Inicio">
          <img src={logo} alt="ServisMás" />
        </Link>

        <div className={styles.actions}>
          <Link to="/" className={styles.backButton}>
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
