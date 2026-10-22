import styles from "./Hero.module.css";
import HeroContent from "./HeroContent/HeroContent";
import HeroImage from "./HeroImage/HeroImage";
import SearchBar from "./SearchBar/SearchBar";

function Hero() {
  return (
    <section className={styles.hero} id="inicio">
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <HeroContent />
          <HeroImage />
        </div>

        <SearchBar />
      </div>
    </section>
  );
}

export default Hero;
