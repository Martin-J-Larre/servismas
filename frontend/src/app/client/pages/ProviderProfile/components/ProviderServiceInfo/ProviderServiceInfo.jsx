import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import styles from "./ProviderServiceInfo.module.css";

const ProviderServiceInfo = ({
  serviceName,
  category,
  description,
  features = [],
}) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon}>
          <BriefcaseBusiness size={20} aria-hidden="true" />
        </div>

        <div className={styles.headerContent}>
          <h2 className={styles.title}>Información del servicio</h2>
          {category && <span className={styles.category}>{category}</span>}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.serviceName}>
          {serviceName || "Servicio no especificado"}
        </h3>

        <p className={styles.description}>
          {description || "No hay una descripción disponible para este servicio."}
        </p>
      </div>

      {features.length > 0 && (
        <div className={styles.features}>
          <h3 className={styles.featuresTitle}>Características</h3>

          <ul className={styles.featuresList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.feature}>
                <CheckCircle2 size={17} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ProviderServiceInfo;