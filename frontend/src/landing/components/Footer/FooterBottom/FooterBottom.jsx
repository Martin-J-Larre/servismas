import styles from "./FooterBottom.module.css";

function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.bottom}>
      <p className={styles.copyright}>
        © {currentYear} ServisMás. Todos los derechos reservados.
      </p>
    </div>
  );
}

export default FooterBottom;
