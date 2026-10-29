import { Wrench } from "lucide-react";
import styles from "./ProviderServices.module.css";

const ProviderServices = ({ services = [] }) => {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}>Servicios ofrecidos</h2>

      {services.length > 0 ? (
        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <article
              className={styles.serviceItem}
              key={service.id ?? service.name ?? index}
            >
              <div className={styles.icon}>
                <Wrench size={18} aria-hidden="true" />
              </div>

              <div className={styles.content}>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Este prestador todavía no ha publicado sus servicios.
        </p>
      )}
    </section>
  );
};

export default ProviderServices;