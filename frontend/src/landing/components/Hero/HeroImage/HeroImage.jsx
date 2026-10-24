import styles from "./HeroImage.module.css";
import heroImage from "../../../../assets/hero-img-framed.png";

function HeroImage() {
  return (
    <div className={styles.imageContainer}>
      <img
        src={heroImage}
        alt="Equipo de prestadores de servicios de ServisMás"
        className={styles.image}
      />
    </div>
  );
}

export default HeroImage;
