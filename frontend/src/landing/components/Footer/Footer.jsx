import styles from "./Footer.module.css";
import FooterBottom from "./FooterBottom/FooterBottom";
import logo from "../../../assets/logo-transparente-negro.png";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src={logo} alt="ServisMás" className={styles.logo} />

            <p className={styles.tagline}>Servicios confiables, cerca tuyo.</p>
          </div>

          <nav
            className={styles.navigation}
            aria-label="Navegación del pie de página"
          >
            <a href="#inicio">Inicio</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#servicios">Servicios</a>
            <a href="#ofrece-servicios">Ofrecé tus servicios</a>
            <a href="/login">Iniciar sesión</a>
            <a href="/registro">Registrate</a>
          </nav>
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}

export default Footer;
