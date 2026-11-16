import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ClipboardList } from "lucide-react";

// TODO: Arreglar la UI y bajarla a más componentes...
import AppHeader from "../../../components/AppHeader/AppHeader";
import { getMyRequestById } from "../../../../services/service.service";

import styles from "./ClientRequestDetails.module.css";

const statusLabels = {
  pendiente: "Pendiente",
  aceptada: "Aceptada",
  rechazada: "Rechazada",
  completada: "Completada",
  finalizada: "Finalizada",
  cancelada: "Cancelada",
};

const formatDate = (date) => {
  if (!date) return "No especificada";

  return new Date(`${String(date).slice(0, 10)}T00:00:00`).toLocaleDateString(
    "es-AR",
  );
};

const ClientRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    const fetchRequest = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await getMyRequestById(id);

        if (isActive) {
          setRequest(response.request);
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

    fetchRequest();

    return () => {
      isActive = false;
    };
  }, [id]);

  const handleBack = () => {
    navigate("/app/cliente/mis-solicitudes");
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <p className={styles.loading}>Cargando solicitud...</p>
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
              Volver a mis solicitudes
            </button>
          </section>
        </main>
      </div>
    );
  }

  const status = request.status?.toLowerCase();
  const statusLabel = statusLabels[status] || request.status;

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <button type="button" className={styles.backLink} onClick={handleBack}>
          <ArrowLeft size={15} aria-hidden="true" />
          Volver a mis solicitudes
        </button>

        <article className={styles.detailCard}>
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>Detalle de solicitud</span>
              <h1>{request.serviceName || "Solicitud de servicio"}</h1>
              <p>
                Solicitud #{request.id} · Creada el{" "}
                {formatDate(request.requestDate)}
              </p>
            </div>

            <span className={`${styles.status} ${styles[status] || ""}`}>
              {statusLabel}
            </span>
          </header>

          <div className={styles.content}>
            <section className={styles.section}>
              <h2>Información del prestador</h2>

              <div className={styles.infoBox}>
                <span className={styles.infoLabel}>Prestador</span>
                <strong>{request.providerName || "No disponible"}</strong>
                <span className={styles.muted}>
                  {request.specialty ||
                    request.category ||
                    "Especialidad no disponible"}
                </span>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Información del servicio</h2>

              <div className={styles.informationGrid}>
                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>Servicio</span>
                  <strong>{request.serviceName || "No especificado"}</strong>
                </div>

                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>Categoría</span>
                  <strong>{request.category || "No especificada"}</strong>
                </div>

                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>Fecha solicitada</span>
                  <strong>{formatDate(request.serviceDate)}</strong>
                </div>

                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>Dirección</span>
                  <strong>{request.address || "No especificada"}</strong>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Descripción del trabajo</h2>
              <p className={styles.description}>
                {request.description || "Sin descripción adicional."}
              </p>
            </section>

            <section className={styles.section}>
              <h2>Información económica</h2>

              <div className={styles.informationGrid}>
                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>
                    Costo de visita / presupuesto
                  </span>
                  <strong>
                    {request.visitCost != null
                      ? `$${request.visitCost}`
                      : "Pendiente"}
                  </strong>
                </div>

                <div className={styles.infoBox}>
                  <span className={styles.infoLabel}>
                    Precio final acordado
                  </span>
                  <strong>
                    {request.agreedPrice != null
                      ? `$${request.agreedPrice}`
                      : "Pendiente"}
                  </strong>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ClientRequestDetail;
