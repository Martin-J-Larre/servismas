import { ArrowRight } from "lucide-react";
import styles from "./BecomeProvider.module.css";
import ProviderImage from "./ProviderImage/ProviderImage";
import BenefitsCard from "./BenefitsCard/BenefitsCard";

const BecomeProvider = () => {
  return (
    <section className={styles.section} id="ofrece-servicios">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>CRECÉ CON SERVISMÁS</span>

          <h2 className={styles.title}>¿Ofrecés servicios?</h2>

          <p className={styles.description}>
            Encontrá nuevos clientes, publicá tus servicios y gestioná tu
            disponibilidad desde un mismo lugar.
          </p>

          <a href="/registro" className={styles.button}>
            Registrate
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <ProviderImage />

        <BenefitsCard />
      </div>
    </section>
  );
};

export default BecomeProvider;
