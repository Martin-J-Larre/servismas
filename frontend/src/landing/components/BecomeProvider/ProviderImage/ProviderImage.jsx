import styles from "./ProviderImage.module.css";
import providerImage from "../../../../assets/prestador.png";


const ProviderImage = () => {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <img
        className={styles.image}
        src={providerImage}
        alt=""
      />
    </div>
  );
};

export default ProviderImage;