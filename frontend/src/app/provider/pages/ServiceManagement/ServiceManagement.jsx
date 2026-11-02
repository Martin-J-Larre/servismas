import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";
// Data Fake
import { getRequestById, updateServiceStage } from "../../data/requests";

import ServiceOverview from "./components/ServiceOverview/ServiceOverview";
import ServiceTimeline from "./components/ServiceTimeline/ServiceTimeline";
import ServiceNextAction from "./components/ServiceNextAction/ServiceNextAction";
import ServiceSummary from "./components/ServiceSummary/ServiceSummary";
import ServiceDetails from "./components/ServiceDetails/ServiceDetails";
import ClientInformation from "./components/ClientInformation/ClientInformation";

import styles from "./ServiceManagement.module.css";

const ServiceManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);

  useEffect(() => {
    setRequest(getRequestById(id));
  }, [id]);

  const handleAdvanceStage = () => {
    const nextStages = {
      accepted: "coordinated",
      coordinated: "in_progress",
      in_progress: "completed",
    };

    const currentStage = request?.serviceStage || "accepted";
    const nextStage = nextStages[currentStage];

    if (!nextStage) {
      return;
    }

    const updatedRequest = updateServiceStage(id, nextStage);

    if (!updatedRequest) {
      console.error("No se pudo actualizar la etapa del servicio.");
      return;
    }

    setRequest(updatedRequest);

    if (nextStage === "completed") {
      navigate(`/app/prestador/servicios/${id}/finalizado`);
    }
  };

  const handleBack = () => {
    navigate("/app/prestador/solicitudes");
  };

  if (!request) {
    return (
      <>
        <AppHeader />

        <main className={styles.page}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a solicitudes
          </button>

          <section className={styles.emptyState}>
            <h1>Solicitud no encontrada</h1>
            <p>No encontramos la solicitud que estás buscando.</p>
          </section>
        </main>
      </>
    );
  }

  if (request.status !== "accepted") {
    return (
      <>
        <AppHeader />

        <main className={styles.page}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver a solicitudes
          </button>

          <section className={styles.emptyState}>
            <h1>Servicio no disponible</h1>
            <p>Esta pantalla está disponible para las solicitudes aceptadas.</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader />

      <main className={styles.page}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Volver a solicitudes
        </button>

        <section className={styles.pageHeading}>
          <div>
            <span className={styles.eyebrow}>GESTIÓN DEL SERVICIO</span>
            <h1>Servicio aceptado</h1>
            <p>
              Consultá los detalles de la solicitud y revisá los próximos pasos.
            </p>
          </div>

          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            Aceptado
          </span>
        </section>

        <ServiceOverview request={request} />

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <ServiceTimeline
              serviceStage={request.serviceStage || "accepted"}
            />
            <ServiceSummary request={request} />
            <ServiceDetails request={request} />
          </div>

          <aside className={styles.sideColumn}>
            <ServiceNextAction
              serviceStage={request.serviceStage || "accepted"}
              onAdvance={handleAdvanceStage}
            />
            <ClientInformation request={request} />

            <section className={styles.securityNotice}>
              <ShieldCheck size={19} aria-hidden="true" />

              <div>
                <h3>Tu seguridad es importante</h3>
                <p>
                  Antes de realizar el trabajo, verificá los detalles acordados
                  con el cliente. Mantené una comunicación clara durante todo el
                  proceso.
                </p>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </>
  );
};

export default ServiceManagement;
