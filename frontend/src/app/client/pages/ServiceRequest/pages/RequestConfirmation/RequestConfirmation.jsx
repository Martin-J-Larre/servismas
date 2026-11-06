import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin, FileText, Send } from "lucide-react";

import { createRequest } from "../../../../../../services/service.service";

import AppHeader from "../../../../../components/AppHeader/AppHeader";
import RequestStepper from "../../components/RequestStepper/RequestStepper";

import styles from "./RequestConfirmation.module.css";

const RequestConfirmation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { requestData, provider, providerId, selectedServiceId } =
    location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!provider || !requestData || !providerId || !selectedServiceId) {
    return (
      <>
        <AppHeader />

        <main className={styles.page}>
          <section className={styles.card}>
            <h1>No se puede confirmar la solicitud</h1>
            <p>
              No encontramos todos los datos necesarios. Volvé a completar el
              formulario para continuar.
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() =>
                navigate(`/app/cliente/solicitar-servicio/${id}`, {
                  state: { selectedServiceId },
                })
              }
            >
              Volver al formulario
            </button>
          </section>
        </main>
      </>
    );
  }

  const handleBack = () => {
    navigate(`/app/cliente/solicitar-servicio/${id}`, {
      state: { selectedServiceId, requestData },
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await createRequest({
        description: requestData.description,
        address: requestData.address,
        date: requestData.date,
        providerId,
        serviceId: selectedServiceId,
      });

      navigate(`/app/cliente/solicitud-exitosa/${id}`, {
        state: {
          requestData,
          provider,
          request: response.request,
        },
      });
    } catch (error) {
      setError(
        error.message ||
          "No pudimos registrar la solicitud. Intentá nuevamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader />

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
                    {provider.initials || "P"}
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
              </section>

              {error && (
                <p role="alert" className={styles.error}>
                  {error}
                </p>
              )}

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
                  disabled={loading}
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  Volver
                </button>

                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <Send size={18} aria-hidden="true" />
                  {loading ? "Enviando..." : "Enviar solicitud"}
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
