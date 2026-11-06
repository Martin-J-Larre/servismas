import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import AppHeader from "../../../components/AppHeader/AppHeader";
import { getPublicProviderProfile } from "../../../../services/service.service";

import RequestStepper from "./components/RequestStepper/RequestStepper";
import ProviderSummary from "./components/ProviderSummary/ProviderSummary";
import ServiceRequestForm from "./components/ServiceRequestForm/ServiceRequestForm";

import styles from "./ServiceRequest.module.css";

const ServiceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedServiceId = location.state?.selectedServiceId;

  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [requestData, setRequestData] = useState({
    description: "",
    address: "",
    date: "",
  });

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPublicProviderProfile(id);

        const selectedService = data.provider.services.find(
          (service) => String(service.id) === String(selectedServiceId),
        );

        if (!selectedService) {
          setError("No encontramos el servicio seleccionado.");
          return;
        }

        const fullName = `${data.provider.firstName} ${data.provider.lastName}`;

        const location = selectedService.location;

        setProvider({
          ...data.provider,
          id: data.provider.userId,
          name: fullName,
          initials: `${data.provider.firstName?.charAt(0) || ""}${data.provider.lastName?.charAt(0) || ""}`,
          specialty: selectedService.serviceType,
          category: selectedService.category,
          location: location
            ? `${location.locality}, ${location.province}`
            : "",
          selectedService,
        });
      } catch (error) {
        setError(error.message || "No pudimos cargar el prestador.");
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id, selectedServiceId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContinue = (formData) => {
    setRequestData(formData);

    navigate(`/app/cliente/confirmar-solicitud/${id}`, {
      state: {
        providerId: provider.id,
        selectedServiceId,
        requestData: formData,
        provider,
      },
    });
  };

  if (loading) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <p>Cargando información del prestador...</p>
        </main>
      </>
    );
  }

  if (error || !provider) {
    return (
      <>
        <AppHeader />
        <main className={styles.page}>
          <section className={styles.card}>
            <h1>No se puede solicitar el servicio</h1>
            <p>{error || "No pudimos encontrar el prestador."}</p>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/app/cliente/buscar-servicios")}
            >
              Volver a buscar servicios
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <AppHeader />

      <main className={styles.page}>
        <div className={styles.container}>
          <RequestStepper currentStep={1} />

          <section className={styles.card}>
            <button
              type="button"
              className={styles.backButton}
              onClick={handleBack}
            >
              <ArrowLeft size={18} aria-hidden="true" />
              Volver
            </button>
            <header className={styles.cardHeader}>
              <h1>Solicitar servicio</h1>

              <p>
                Completá la información para enviar tu solicitud a{" "}
                <strong>{provider.name}</strong>.
              </p>
            </header>

            <div className={styles.cardBody}>
              <ProviderSummary provider={provider} />

              <ServiceRequestForm
                initialData={requestData}
                onContinue={handleContinue}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default ServiceRequest;
