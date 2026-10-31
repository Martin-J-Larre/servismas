import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// TODO: Trabajar el flujo de finalizacion entre cliente y prestador en la tarjeta de servicio finalizado y redirigir a página de confirmación.

import HeaderClient from "../../components/HeaderClient/HeaderClient";

import TrackingHeader from "./components/TrackingHeader/TrackingHeader";
import ProviderSummary from "./components/ProviderSummary/ProviderSummary";
import ServiceProgress from "./components/ServiceProgress/ServiceProgress";
import TrackingServiceDetails from "./components/TrackingServiceDetails/TrackingServiceDetails";
import TrackingActions from "./components/TrackingActions/TrackingActions";
import TrackingSummary from "./components/TrackingSummary/TrackingSummary";
import TrackingSecurity from "./components/TrackingSecurity/TrackingSecurity";

import { getSavedCoordination } from "../CoordinateService/utils/coordination.utils";

import styles from "./TrackingService.module.css";

const TrackingService = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperar la coordinación guardada o los datos recibidos por navegación.
  const [coordination, setCoordination] = useState(
    () => getSavedCoordination(id) ?? location.state?.coordination ?? null,
  );

  // Sincronizar los datos si cambia el identificador de la solicitud.
  useEffect(() => {
    const savedCoordination = getSavedCoordination(id);
    const navigationCoordination = location.state?.coordination;

    setCoordination(savedCoordination ?? navigationCoordination ?? null);
  }, [id, location.state?.coordination]);

  // La coordinación de React es la fuente de verdad después de inicializarse.
  const currentCoordination = coordination;

  // Recuperar los datos de la solicitud.
  const request = location.state?.request ?? currentCoordination?.request;

  // Inicializar el estado según la coordinación recuperada.
  const [serviceStatus, setServiceStatus] = useState(
    () =>
      getSavedCoordination(id)?.serviceStatus ??
      location.state?.coordination?.serviceStatus ??
      "coordinado",
  );

  // Sincronizar el estado si se cambia de solicitud.
  useEffect(() => {
    setServiceStatus(currentCoordination?.serviceStatus ?? "coordinado");
  }, [id, currentCoordination?.serviceStatus]);

  // Guardar los cambios de la coordinación en localStorage.
  const saveCoordination = (updatedCoordination) => {
    try {
      localStorage.setItem(
        `servismas-coordination-${id}`,
        JSON.stringify(updatedCoordination),
      );

      setCoordination(updatedCoordination);

      return true;
    } catch {
      toast.error("No se pudo guardar el estado del servicio.");
      return false;
    }
  };

  // Iniciar el servicio.
  const handleStartService = () => {
    if (serviceStatus !== "coordinado" || !currentCoordination) {
      return;
    }

    const now = new Date().toISOString();

    const updatedCoordination = {
      ...currentCoordination,
      serviceStatus: "en_progreso",
      serviceStartedAt: now,
      updatedAt: now,
    };

    if (saveCoordination(updatedCoordination)) {
      setServiceStatus("en_progreso");
      toast.success("El servicio se marcó como iniciado.");
    }
  };

  // Finalizar el servicio.
  const handleFinishService = () => {
    if (serviceStatus !== "en_progreso" || !currentCoordination) {
      return;
    }

    navigate(`/finalizar-servicio/${id}`, {
      state: {
        request,
        coordination: currentCoordination,
      },
    });
  };

  // Volver a la pantalla anterior o a las solicitudes.
  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/mis-solicitudes");
  };

  // Mostrar un mensaje si no se pudieron recuperar los datos.
  if (!request || !currentCoordination) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <div className={styles.container}>
            <section className={styles.notFound}>
              <h1>No encontramos este servicio</h1>

              <p>
                No pudimos recuperar los datos del servicio. Volvé a tus
                solicitudes e intentá ingresar nuevamente.
              </p>

              <Link to="/mis-solicitudes">Volver a mis solicitudes</Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  // Datos que se muestran en la pantalla.
  const providerName = request.providerName || "Prestador";

  const specialty = request.category || request.specialty || "Servicio general";

  const serviceDate =
    currentCoordination.serviceDate || request.serviceDate || "";

  const timeSlot = currentCoordination.timeSlot || request.timeSlot || "";

  const address = currentCoordination.address || request.location || "";

  const serviceDescription =
    request.description ||
    "Trabajo solicitado por el cliente. Los detalles se revisarán con el prestador.";

  const budget = request.budget ?? request.estimatedBudget ?? null;

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
            ← Volver
          </button>

          <div className={styles.layout}>
            <div className={styles.mainColumn}>
              <TrackingHeader />

              <ProviderSummary
                request={request}
                providerName={providerName}
                specialty={specialty}
                serviceDate={serviceDate}
                timeSlot={timeSlot}
              />

              <ServiceProgress serviceStatus={serviceStatus} />

              <TrackingServiceDetails
                description={serviceDescription}
                address={address}
                serviceDate={serviceDate}
                timeSlot={timeSlot}
              />
            </div>

            <aside className={styles.sidebar}>
              <TrackingActions
                serviceStatus={serviceStatus}
                onStartService={handleStartService}
                onFinishService={handleFinishService}
                onBack={handleBack}
              />

              <TrackingSummary
                providerName={providerName}
                specialty={specialty}
                serviceDate={serviceDate}
                timeSlot={timeSlot}
                address={address}
                budget={budget}
              />

              <TrackingSecurity />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrackingService;
