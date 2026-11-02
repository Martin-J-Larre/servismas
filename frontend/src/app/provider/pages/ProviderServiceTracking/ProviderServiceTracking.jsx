import { ArrowLeft, ClipboardList } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";

import styles from "./ProviderServiceTracking.module.css";

const ProviderServiceTracking = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(`/app/prestador/solicitudes/${id}`);
  };

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Volver a la solicitud
        </button>

        <section className={styles.card}>
          <div className={styles.iconWrapper}>
            <ClipboardList size={30} strokeWidth={1.6} aria-hidden="true" />
          </div>

          <span className={styles.eyebrow}>SEGUIMIENTO DEL SERVICIO</span>

          <h1>Seguimiento del servicio</h1>

          <p>
            Estamos preparando esta sección para que puedas consultar y
            gestionar el seguimiento de tus servicios aceptados.
          </p>

          <span className={styles.requestId}>
            Solicitud #{String(id).padStart(5, "0")}
          </span>
        </section>
      </main>
    </div>
  );
};

export default ProviderServiceTracking;
