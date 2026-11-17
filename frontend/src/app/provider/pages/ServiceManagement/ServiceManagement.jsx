import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";

import {
  getProviderRequestById,
  updateProviderServiceStage,
} from "../../../../services/service.service";

import ServiceOverview from "./components/ServiceOverview/ServiceOverview";
import ServiceTimeline from "./components/ServiceTimeline/ServiceTimeline";
import ServiceNextAction from "./components/ServiceNextAction/ServiceNextAction";
import ServiceSummary from "./components/ServiceSummary/ServiceSummary";
import ServiceDetails from "./components/ServiceDetails/ServiceDetails";
import ClientInformation from "./components/ClientInformation/ClientInformation";

import styles from "./ServiceManagement.module.css";

const statusToStage = {
  aceptada: "accepted",
  coordinada: "coordinated",
  en_ejecucion: "in_progress",
  finalizada: "completed",
};

const stageToStatus = {
  accepted: "aceptada",
  coordinated: "coordinada",
  in_progress: "en_ejecucion",
  completed: "finalizada",
};

const nextStages = {
  accepted: "coordinated",
  coordinated: "in_progress",
  in_progress: "completed",
};

const formatDate = (date) => {
  if (!date) return "Fecha a coordinar";

  return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString(
    "es-AR",
  );
};

const mapRequestData = (data) => {
  const clientName = data.clientName || "Cliente";

  return {
    ...data,
    id: data.id,
    clientName,
    initials: clientName
      .split(" ")
      .map((word) => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    service: data.serviceName || "Servicio",
    date: formatDate(data.serviceDate),
    time: "A coordinar",
    location: data.address || "",
    price:
      data.agreedPrice != null
        ? `$${data.agreedPrice}`
        : data.visitCost != null
          ? `$${data.visitCost}`
          : "Presupuesto a confirmar",
    serviceStage: statusToStage[data.status] || null,
  };
};

const ServiceManagement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await getProviderRequestById(id);

        if (isActive) {
          setRequest(mapRequestData(response.request));
        }
      } catch (error) {
        if (isActive) {
          setRequest(null);
          setLoadError(error.message || "No se pudo cargar el servicio.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchRequest();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleAdvanceStage = async () => {
    if (!request || isProcessing) return;

    const currentStage = request.serviceStage;
    const nextStage = nextStages[currentStage];

    if (!nextStage) return;

    const currentStatus = stageToStatus[currentStage];
    const newStatus = stageToStatus[nextStage];

    try {
      setIsProcessing(true);
      setSaveError("");

      await updateProviderServiceStage(request.id, currentStatus, newStatus);

      setRequest((previousRequest) => ({
        ...previousRequest,
        status: newStatus,
        serviceStage: nextStage,
      }));

      if (nextStage === "completed") {
        navigate(`/app/prestador/servicios/${id}/finalizado`);
      }
    } catch (error) {
      setSaveError(
        error.message ||
          "No se pudo actualizar la etapa del servicio. Intentá nuevamente.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    navigate("/app/prestador/solicitudes");
  };

  if (isLoading) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <p role="status">Cargando servicio...</p>
        </main>
      </>
    );
  }

  if (!request || !request.serviceStage) {
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
            <p>
              {loadError ||
                "No encontramos una solicitud válida para gestionar."}
            </p>
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
            <h1>Gestión de la solicitud</h1>
            <p>
              Consultá los detalles de la solicitud y revisá los próximos pasos.
            </p>
          </div>

          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {request.serviceStage === "accepted"
              ? "Aceptado"
              : request.serviceStage === "coordinated"
                ? "Coordinado"
                : request.serviceStage === "in_progress"
                  ? "En ejecución"
                  : "Finalizado"}
          </span>
        </section>

        <ServiceOverview request={request} />

        {saveError && <p role="alert">{saveError}</p>}

        <div className={styles.contentGrid}>
          <div className={styles.mainColumn}>
            <ServiceTimeline serviceStage={request.serviceStage} />

            <ServiceSummary request={request} />
            <ServiceDetails request={request} />
          </div>

          <aside className={styles.sideColumn}>
            <ServiceNextAction
              serviceStage={request.serviceStage}
              onAdvance={handleAdvanceStage}
              isProcessing={isProcessing}
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
