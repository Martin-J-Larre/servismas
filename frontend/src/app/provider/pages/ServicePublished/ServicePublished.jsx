import { useLocation, useNavigate } from "react-router-dom";
import { Check, ArrowRight} from "lucide-react";

import HeaderClient from "../../../client/components/HeaderClient/HeaderClient";

import styles from "./ServicePublished.module.css";

const ServicePublished = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const serviceName = location.state?.serviceName || "Tu servicio";

  const handleViewServices = () => {
    navigate("/prestador/servicios");
  };

  const handleGoToDashboard = () => {
    navigate("/prestador/panel");
  };

  return (
    <div className={styles.page}>
      <HeaderClient />

      <main className={styles.main}>
        <section className={styles.successCard} aria-labelledby="success-title">
          <div className={styles.successIcon}>
            <Check size={25} strokeWidth={2} aria-hidden="true" />
          </div>

          <span className={styles.eyebrow}>¡LISTO!</span>

          <h1 id="success-title">Servicio publicado</h1>

          <p className={styles.description}>
            <strong>{serviceName}</strong> fue publicado correctamente. Los
            clientes ya pueden encontrarlo y solicitar una consulta.
          </p>

          <span className={styles.status}>
            <span className={styles.statusDot} />
            Publicado
          </span>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleViewServices}
            >
              Mis servicios
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleGoToDashboard}
            >
              Ir al panel
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicePublished;
