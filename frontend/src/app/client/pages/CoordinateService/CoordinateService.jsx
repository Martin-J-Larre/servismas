import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import HeaderClient from "../../components/HeaderClient/HeaderClient";

import CoordinationHeader from "./components/CoordinationHeader/CoordinationHeader";
import StatusBanner from "./components/StatusBanner/StatusBanner";
import ProviderCard from "./components/ProviderCard/ProviderCard";
import ServiceDetails from "./components/ServiceDetails/ServiceDetails";
import ServiceConditions from "./components/ServiceConditions/ServiceConditions";
import CoordinationSummary from "./components/CoordinationSummary/CoordinationSummary";
import CoordinationTimeline from "./components/CoordinationTimeline/CoordinationTimeline";
import SecurityCard from "./components/SecurityCard/SecurityCard";

import {
  getSavedCoordination,
  formatDate,
  stages,
} from "./utils/coordination.utils";

import styles from "./CoordinateService.module.css";

const CoordinateService = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // Recuperar la coordinación guardada.
  const [coordination, setCoordination] = useState(() =>
    getSavedCoordination(id),
  );

  // Obtener la solicitud desde la navegación o desde la coordinación guardada.
  const request = location.state?.request ?? coordination?.request;

  // Datos del formulario.
  const [serviceDate, setServiceDate] = useState(() => {
    if (coordination?.serviceDate) {
      return coordination.serviceDate;
    }

    if (
      request?.serviceDate &&
      /^\d{4}-\d{2}-\d{2}$/.test(request.serviceDate)
    ) {
      return request.serviceDate;
    }

    return "";
  });

  const [timeSlot, setTimeSlot] = useState(
    () =>
      coordination?.timeSlot ?? (request?.serviceDate ? "10:00 - 12:00" : ""),
  );

  const [address, setAddress] = useState(
    () => coordination?.address ?? request?.location ?? "",
  );

  const [comments, setComments] = useState(() => coordination?.comments ?? "");

  // Estado actual de la coordinación.
  const status = coordination?.status ?? "inicial";

  const isSent = status !== "inicial";
  const isWaiting = status === "esperando";
  const isAccepted = status === "aceptada";
  const isConfirmed = status === "confirmada";

  // Guardar la coordinación en localStorage y actualizar el estado.
  const saveCoordination = (updatedCoordination) => {
    try {
      localStorage.setItem(
        `servismas-coordination-${id}`,
        JSON.stringify(updatedCoordination),
      );

      setCoordination(updatedCoordination);
    } catch {
      toast.error("No se pudo guardar la coordinación.");
    }
  };

  // Enviar la propuesta de coordinación.
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!serviceDate || !timeSlot || !address.trim()) {
      toast.error("Completá la fecha, el horario y la dirección.");
      return;
    }

    const proposal = {
      requestId: id,
      request,
      serviceDate,
      timeSlot,
      address: address.trim(),
      comments: comments.trim(),
      status: "enviada",
      updatedAt: new Date().toISOString(),
    };

    saveCoordination(proposal);

    toast.success("La propuesta de coordinación fue enviada.");
  };

  // Pasar al estado de espera.
  const handleContinueWaiting = () => {
    if (!coordination) return;

    saveCoordination({
      ...coordination,
      status: "esperando",
      updatedAt: new Date().toISOString(),
    });

    toast.info("La coordinación quedó a la espera de respuesta.");
  };

  // Simular la aceptación del prestador.
  const handleSimulateAcceptance = () => {
    if (!coordination) return;

    saveCoordination({
      ...coordination,
      status: "aceptada",
      acceptedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    toast.success("El prestador aceptó la propuesta.");
  };

  // Confirmar la coordinación.
  const handleConfirmCoordination = () => {
    if (!coordination || !isAccepted) {
      toast.error("No se puede confirmar esta coordinación.");
      return;
    }

    const confirmedCoordination = {
      ...coordination,
      status: "confirmada",
      confirmedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveCoordination(confirmedCoordination);

    toast.success("La coordinación quedó confirmada.");

    navigate(`/seguimiento-servicio/${id}`, {
      state: {
        request,
        coordination: confirmedCoordination,
      },
    });
  };

  // Ir al seguimiento del servicio.
  const handleViewTracking = () => {
    navigate(`/seguimiento-servicio/${id}`, {
      state: {
        request,
        coordination,
      },
    });
  };

  // Volver a las solicitudes.
  const handleBack = () => {
    navigate("/mis-solicitudes");
  };

  // Si no existe información de la solicitud, mostrar un mensaje.
  if (!request) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <div className={styles.container}>
            <section className={styles.notFound}>
              <h1>No encontramos esta solicitud</h1>

              <p>
                No pudimos recuperar la información necesaria para coordinar el
                servicio.
              </p>

              <Link to="/mis-solicitudes">Volver a mis solicitudes</Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  // Textos que cambian según el estado de la coordinación.
  const statusContent = {
    inicial: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Revisá los detalles del servicio y enviá tu propuesta al prestador.",
      bannerTitle: "Solicitud aceptada",
      bannerDescription:
        "El prestador aceptó tu solicitud. Revisá los detalles y enviá una propuesta de coordinación.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La fecha y el horario son una propuesta. La coordinación quedará pendiente hasta que el prestador responda.",
    },

    enviada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Propuesta enviada correctamente",
      bannerDescription:
        "La coordinación fue enviada al prestador. Podés continuar la simulación para ver el estado de espera.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La propuesta fue enviada. Continuá para registrar que queda a la espera de la respuesta del prestador.",
    },

    esperando: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Esperando respuesta del prestador",
      bannerDescription:
        "Propuesta enviada. Estamos esperando la respuesta del prestador.",
      summaryTitle: "Propuesta de coordinación",
      notice:
        "La propuesta está pendiente. En esta demostración podés simular la aceptación del prestador.",
    },

    aceptada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinar servicio",
      description:
        "Seguí el estado de la propuesta y completá la coordinación cuando esté acordada.",
      bannerTitle: "Coordinación acordada",
      bannerDescription:
        "El prestador aceptó la propuesta. Revisá el resumen y confirmá la coordinación.",
      summaryTitle: "Confirmar coordinación",
      notice:
        "El prestador aceptó la propuesta. Confirmá la coordinación para continuar.",
    },

    confirmada: {
      eyebrow: "SOLICITUD ACEPTADA",
      title: "Coordinación confirmada",
      description:
        "La coordinación quedó confirmada. Conservá esta información para el día del servicio.",
      bannerTitle: "Coordinación confirmada",
      bannerDescription: `Confirmaste la coordinación. El servicio quedó programado para el ${formatDate(
        serviceDate,
      )}${timeSlot ? ` de ${timeSlot}` : ""}.`,
      summaryTitle: "Coordinación confirmada",
      notice:
        "La coordinación quedó confirmada y no requiere más acciones en esta pantalla.",
    },
  };

  const currentContent = statusContent[status] ?? statusContent.inicial;

  const currentStageIndex = {
    inicial: -1,
    enviada: 0,
    esperando: 1,
    aceptada: 2,
    confirmada: 2,
  }[status];

  const displayedDate = serviceDate
    ? formatDate(serviceDate)
    : request.serviceDate || "Sin seleccionar";

  const serviceDescription =
    request.description ||
    "Trabajo solicitado por el cliente. Los detalles se revisarán con el prestador.";

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
          >
            Volver a mis solicitudes
          </button>

          <div className={styles.layout}>
            <div className={styles.mainColumn}>
              <CoordinationHeader
                eyebrow={currentContent.eyebrow}
                title={currentContent.title}
                description={currentContent.description}
              />

              <StatusBanner
                title={currentContent.bannerTitle}
                description={currentContent.bannerDescription}
              />

              <ProviderCard request={request} />

              <ServiceDetails
                request={request}
                serviceDescription={serviceDescription}
              />

              <ServiceConditions />
            </div>

            <aside className={styles.sidebar}>
              <CoordinationSummary
                title={currentContent.summaryTitle}
                request={request}
                serviceDate={displayedDate}
                timeSlot={timeSlot}
                address={address}
                isSent={isSent}
                isWaiting={isWaiting}
                isAccepted={isAccepted}
                isConfirmed={isConfirmed}
                onSubmit={handleSubmit}
                onContinueWaiting={handleContinueWaiting}
                onSimulateAcceptance={handleSimulateAcceptance}
                onConfirmCoordination={handleConfirmCoordination}
                onViewTracking={handleViewTracking}
                serviceDateValue={serviceDate}
                onServiceDateChange={setServiceDate}
                onTimeSlotChange={setTimeSlot}
                onAddressChange={setAddress}
                comments={comments}
                onCommentsChange={setComments}
                notice={currentContent.notice}
              />

              {isSent && (
                <CoordinationTimeline
                  stages={stages}
                  currentStageIndex={currentStageIndex}
                  isConfirmed={isConfirmed}
                />
              )}

              <SecurityCard />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default CoordinateService;
