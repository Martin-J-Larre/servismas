import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, FileText, Send } from "lucide-react";

import HeaderClient from "../../../../components/HeaderClient/HeaderClient";
import providers from "../../../../../provider/data/providers";

import RequestStepper from "../../components/RequestStepper/RequestStepper";

import styles from "./RequestConfirmation.module.css";

const RequestConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const requestData = location.state?.requestData;

  const provider = providers.find((item) => String(item.id) === String(id));

  if (!provider || !requestData) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <section className={styles.card}>
            <h1>No se puede confirmar la solicitud</h1>
            <p>
              No encontramos los datos de la solicitud. Volvé a completar el
              formulario para continuar.
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate(`/solicitar-servicio/${id}`)}
            >
              Volver al formulario
            </button>
          </section>
        </main>
      </>
    );
  }

  const handleBack = () => {
    navigate(`/solicitar-servicio/${id}`, {
      state: { requestData },
    });
  };

  // const handleSubmit = () => {
  //   // En esta etapa, el envío es simulado.
  //   // Más adelante conectaremos esta acción con el backend.

  //   navigate("/buscar-servicios", {
  //     state: {
  //       requestSent: true,
  //       providerName: provider.name,
  //     },
  //   });
  // };

  const handleSubmit = () => {
    navigate(`/solicitud-exitosa/${id}`, {
      state: {
        requestData,
      },
    });
  };

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <RequestStepper currentStep={2} />

          <section className={styles.card}>
            <header className={styles.cardHeader}>
              <h1>Confirmar solicitud</h1>
              <p>Revisá los datos antes de enviar tu solicitud al prestador.</p>
            </header>

            <div className={styles.content}>
              <section className={styles.providerSection}>
                <h2>Prestador seleccionado</h2>

                <div className={styles.providerInfo}>
                  <div className={styles.avatar} aria-hidden="true">
                    {provider.initials ||
                      provider.name?.charAt(0).toUpperCase() ||
                      "P"}
                  </div>

                  <div>
                    <h3>{provider.name}</h3>
                    <p>{provider.specialty || provider.category}</p>
                    <span>{provider.location}</span>
                  </div>
                </div>
              </section>

              <section className={styles.detailsSection}>
                <h2>Detalles del servicio</h2>

                <div className={styles.detail}>
                  <FileText size={20} aria-hidden="true" />

                  <div>
                    <h3>Descripción</h3>
                    <p>{requestData.description}</p>
                  </div>
                </div>

                <div className={styles.detail}>
                  <MapPin size={20} aria-hidden="true" />

                  <div>
                    <h3>Dirección del servicio</h3>
                    <p>{requestData.address}</p>
                  </div>
                </div>

                <div className={styles.detail}>
                  <CalendarDays size={20} aria-hidden="true" />

                  <div>
                    <h3>Fecha preferida</h3>
                    <p>{requestData.date}</p>
                  </div>
                </div>

                {requestData.additionalInfo?.trim() && (
                  <div className={styles.detail}>
                    <FileText size={20} aria-hidden="true" />

                    <div>
                      <h3>Información adicional</h3>
                      <p>{requestData.additionalInfo}</p>
                    </div>
                  </div>
                )}
              </section>

              <div className={styles.notice}>
                Al enviar la solicitud, el prestador podrá revisar los detalles
                y confirmar si puede realizar el servicio. El envío no implica
                una contratación confirmada.
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={handleBack}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  Volver
                </button>

                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleSubmit}
                >
                  <Send size={18} aria-hidden="true" />
                  Enviar solicitud
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default RequestConfirmation;
