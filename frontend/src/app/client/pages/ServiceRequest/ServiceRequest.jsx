import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import HeaderClient from "../../components/HeaderClient/HeaderClient";
import providers from "../../../../app/provider/data/providers";

import RequestStepper from "./components/RequestStepper/RequestStepper";
import ProviderSummary from "./components/ProviderSummary/ProviderSummary";
import ServiceRequestForm from "./components/ServiceRequestForm/ServiceRequestForm";

import styles from "./ServiceRequest.module.css";

const ServiceRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const provider = providers.find((item) => String(item.id) === String(id));

  const [requestData, setRequestData] = useState({
    description: "",
    address: "",
    date: "",
    additionalInfo: "",
  });

  const handleContinue = (formData) => {
    setRequestData(formData);

    navigate(`/confirmar-solicitud/${id}`, {
      state: {
        providerId: provider.id,
        requestData: formData,
      },
    });
  };

  if (!provider) {
    return (
      <>
        <HeaderClient />
        <main className={styles.page}>
          <section className={styles.card}>
            <h1>Prestador no encontrado</h1>
            <p>No pudimos encontrar el prestador que seleccionaste.</p>

            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/buscar-servicios")}
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
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <RequestStepper currentStep={1} />

          <section className={styles.card}>
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
