// TODO: Arreglar el diseño para que sea parecido a http://localhost:5173/app/prestador/solicitudes/1
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";
import { getMyServiceById } from "../../../../services/service.service";

import styles from "./ProviderServiceDetail.module.css";

const ProviderServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyServiceById(id);

        setService(response.service);
      } catch (error) {
        console.error("Error al obtener el servicio:", error);
        setError(
          error.message || "No se pudo cargar la información del servicio.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleBack = () => {
    navigate("/app/prestador/panel");
  };

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleBack}
        >
          <span aria-hidden="true">‹</span>
          Volver a mis servicios
        </button>

        {isLoading ? (
          <p>Cargando información del servicio...</p>
        ) : error ? (
          <p role="alert" className={styles.errorMessage}>
            {error}
          </p>
        ) : service ? (
          <>
            <header className={styles.pageHeader}>
              <span className={styles.eyebrow}>MIS SERVICIOS</span>
              <h1>{service.name}</h1>
              <span className={styles.category}>{service.category}</span>
            </header>

            <section className={styles.card}>
              <h2>Descripción</h2>
              <p>{service.description}</p>
            </section>

            <section className={styles.card}>
              <h2>Ubicación del servicio</h2>

              <p>
                {[
                  service.location?.locality,
                  service.location?.province,
                  service.location?.country,
                ]
                  .filter(Boolean)
                  .join(", ") || "Ubicación no disponible"}
              </p>
            </section>

            <section className={styles.card}>
              <h2>Disponibilidad</h2>

              {service.availability?.length ? (
                <ul className={styles.availabilityList}>
                  {service.availability.map((item) => (
                    <li key={item.day}>
                      <strong>{item.day}</strong>
                      <span>
                        {item.start} a {item.end}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay horarios configurados.</p>
              )}
            </section>
          </>
        ) : (
          <p>No se encontró el servicio solicitado.</p>
        )}
      </main>
    </div>
  );
};

export default ProviderServiceDetail;
