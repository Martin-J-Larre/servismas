import styles from "./Navbar.module.css";
import logo from "../../../assets/logo-transparente-negro.png";

function Navbar() {
  return (
    <header className={styles.header} id="inicio">
      <div className={styles.container}>
        <a
          href="#inicio"
          className={styles.logo}
          aria-label="ServisMás - Inicio"
        >
          <img src={logo} alt="ServisMás" />
        </a>

        <nav className={styles.navigation} aria-label="Navegación principal">
          <a className={styles.activeLink} href="#inicio">
            Inicio
          </a>

          <a href="#como-funciona">Cómo funciona</a>
          <a href="#servicios">Servicios</a>
          <a href="#ofrece-servicios">Ofrecé tus servicios</a>
        </nav>

        <div className={styles.actions}>
          <a className={styles.loginButton} href="/login">
            Iniciar sesión
          </a>

          <a className={styles.registerButton} href="/registro">
            Registrate
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
