import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";

import {
  getProviderRequestById,
  updateProviderRequestStatus,
} from "../../../../services/service.service";

import RequestDetailHeader from "./components/RequestDetailHeader/RequestDetailHeader";
import ClientInformation from "./components/ClientInformation/ClientInformation";
import RequestSummary from "./components/RequestSummary/RequestSummary";
import RequestDescription from "./components/RequestDescription/RequestDescription";
import RequestActions from "./components/RequestActions/RequestActions";
import RequestConfirmationModal from "./components/RequestConfirmationModal/RequestConfirmationModal";
import RequestStatusMessage from "./components/RequestStatusMessage/RequestStatusMessage";

import styles from "./RequestDetails.module.css";

const mapRequestData = (data) => {
  const statusMap = {
    pendiente: "pending",
    aceptada: "accepted",
    rechazada: "rejected",
  };

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
    service: data.serviceName,
    category: data.category,
    date: data.serviceDate
      ? new Date(`${data.serviceDate}T00:00:00`).toLocaleDateString("es-AR")
      : "A coordinar",
    time: "A coordinar",
    status: statusMap[data.status] || data.status,
    additionalInfo: "",
  };
};

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedAction, setSelectedAction] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
          setLoadError(error.message || "No se pudo obtener la solicitud.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    setSelectedAction(null);
    setSaveError("");
    fetchRequest();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleOpenModal = (action) => {
    setSelectedAction(action);
  };

  const handleCloseModal = () => {
    if (isProcessing) return;

    setSelectedAction(null);
  };

  const handleConfirmAction = async () => {
    if (!request || !selectedAction || isProcessing) return;

    setIsProcessing(true);
    setSaveError("");

    const newStatus = selectedAction === "accept" ? "aceptada" : "rechazada";

    try {
      await updateProviderRequestStatus(request.id, newStatus);

      setRequest((previousRequest) => ({
        ...previousRequest,
        status: newStatus === "aceptada" ? "accepted" : "rejected",
      }));

      setSelectedAction(null);
    } catch (error) {
      setSaveError(
        error.message || "No se pudo guardar el cambio. Intentá nuevamente.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBack = () => {
    navigate("/app/prestador/solicitudes");
  };

  const handleCoordinateService = () => {
    navigate(`/app/prestador/servicios/${request.id}`);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <p>Cargando solicitud...</p>
        </main>
      </div>
    );
  }

  if (!request) {
    return (
      <div className={styles.page}>
        <AppHeader />

        <main className={styles.main}>
          <section className={styles.notFound}>
            <div className={styles.notFoundIcon}>
              <ClipboardList size={28} aria-hidden="true" />
            </div>

            <h1>Solicitud no encontrada</h1>

            <p>
              {loadError ||
                "No encontramos la solicitud que estás buscando. Puede que ya no exista o que el enlace no sea válido."}
            </p>

            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Volver a solicitudes
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <button type="button" className={styles.backLink} onClick={handleBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          Volver a solicitudes
        </button>

        <article className={styles.detailCard}>
          <RequestDetailHeader request={request} />

          <div className={styles.content}>
            <div className={styles.informationGrid}>
              <ClientInformation request={request} />
              <RequestSummary request={request} />
            </div>

            <RequestDescription
              description={request.description}
              additionalInfo={request.additionalInfo}
            />

            <RequestStatusMessage
              status={request.status}
              rejectedAt={request.rejectedAt}
            />

            {saveError && (
              <p className={styles.errorMessage} role="alert">
                {saveError}
              </p>
            )}

            {request.status === "pending" && (
              <RequestActions
                status={request.status}
                onAccept={() => handleOpenModal("accept")}
                onReject={() => handleOpenModal("reject")}
                isProcessing={isProcessing}
              />
            )}

            {request.status === "accepted" && (
              <div className={styles.footerActions}>
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleCoordinateService}
                >
                  Coordinar servicio
                </button>
              </div>
            )}

            {request.status === "rejected" && (
              <div className={styles.footerActions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleBack}
                >
                  Volver a solicitudes
                </button>
              </div>
            )}
          </div>
        </article>
      </main>

      <RequestConfirmationModal
        isOpen={Boolean(selectedAction)}
        action={selectedAction}
        onConfirm={handleConfirmAction}
        onCancel={handleCloseModal}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default RequestDetails;
