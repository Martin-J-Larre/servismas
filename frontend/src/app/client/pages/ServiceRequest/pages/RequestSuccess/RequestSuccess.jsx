import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Check, MapPin, CalendarDays, ArrowRight } from "lucide-react";

import HeaderClient from "../../../../components/HeaderClient/HeaderClient";
import providers from "../../../../../provider/data/providers";

import styles from "./RequestSuccess.module.css";

const RequestSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const provider = providers.find(
    (item) => String(item.id) === String(id)
  );

  const requestData = location.state?.requestData;

  if (!provider || !requestData) {
    return (
      <>
        <HeaderClient />

        <main className={styles.page}>
          <section className={styles.card}>
            <h1>No encontramos la solicitud</h1>
            <p>
              No pudimos recuperar los datos de la solicitud. Podés volver a
              buscar un prestador para continuar.
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/buscar-servicios")}
            >
              Nueva búsqueda
            </button>
          </section>
        </main>
      </>
    );
  }

  const formattedDate = requestData.date
    ? new Date(`${requestData.date}T12:00:00`).toLocaleDateString("es-AR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "No especificada";

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <section className={styles.card}>
          <div className={styles.successIcon}>
            <Check size={27} strokeWidth={2.5} aria-hidden="true" />
          </div>

          <h1>¡Solicitud enviada!</h1>

          <p className={styles.description}>
            Tu solicitud fue enviada correctamente a{" "}
            <strong>{provider.name}</strong>. Recibirás una respuesta cuando
            el prestador acepte la solicitud o proponga cambios.
          </p>

          <div className={styles.providerCard}>
            <div className={styles.providerHeader}>
              <div className={styles.avatar} aria-hidden="true">
                {provider.initials ||
                  provider.name?.charAt(0).toUpperCase() ||
                  "P"}
              </div>

              <div className={styles.providerInfo}>
                <h2>{provider.name}</h2>
                <p>
                  {provider.specialty || provider.category}
                  {provider.location ? ` · ${provider.location}` : ""}
                </p>
              </div>
            </div>

            <div className={styles.requestDetail}>
              <MapPin size={15} aria-hidden="true" />
              <span>{requestData.address}</span>
            </div>

            <div className={styles.requestDetail}>
              <CalendarDays size={15} aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => navigate("/")}
            >
              Ir al inicio
            </button>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => navigate("/buscar-servicios")}
            >
              Nueva búsqueda
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default RequestSuccess;