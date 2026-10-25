import styles from "./HeroContent.module.css";
import avatarOne from "../../../../assets/avatar-one.png";
import avatarTwo from "../../../../assets/avatar-two.png";
import avatarThree from "../../../../assets/avatar-three.png";
import avatarFour from "../../../../assets/avatar-four.png";
import avatarFive from "../../../../assets/avatar-five.png";

function HeroContent() {
  return (
    <div className={styles.content}>
      <span className={styles.eyebrow}>
        <span className={styles.eyebrowDot} aria-hidden="true" />
        SERVICIOS CERCA TUYO
      </span>

      <h1 className={styles.title}>
        Encontrá <br />y contratá{" "}
        <span className={styles.highlight}>
          servicios
          <svg
            className={styles.underline}
            viewBox="0 0 300 18"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 5 10 Q 150 0 295 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <br />
        de confianza
      </h1>

      <p className={styles.description}>
        Conectamos personas que necesitan soluciones con profesionales
        confiables. Encontrá el servicio que buscás de forma fácil, rápida y
        segura.
      </p>

      <div className={styles.statsCard}>
        <div className={styles.avatars} aria-label="Personas de la comunidad">
          <img src={avatarOne} alt="" className={styles.avatar} />
          <img src={avatarTwo} alt="" className={styles.avatar} />
          <img src={avatarThree} alt="" className={styles.avatar} />
          <img src={avatarFour} alt="" className={styles.avatar} />
          <img src={avatarFive} alt="" className={styles.avatar} />
        </div>

        <div className={styles.stat}>
          <strong>+300</strong>
          <span>usuarios</span>
        </div>

        <div className={styles.statDivider} aria-hidden="true" />

        <div className={styles.stat}>
          <strong>+500</strong>
          <span>prestadores</span>
        </div>
      </div>

      <div className={styles.actions}>
        <a href="/registro" className={styles.registerButton}>
          Registrate ya
          <span aria-hidden="true"> →</span>
        </a>

        <span className={styles.verified}>
          <span className={styles.verifiedIcon} aria-hidden="true">
            ✓
          </span>
          Perfiles verificados
        </span>
      </div>
    </div>
  );
}

export default HeroContent;
