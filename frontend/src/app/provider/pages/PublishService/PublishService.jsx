import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";
import ServiceInformation from "./components/ServiceInformation/ServiceInformation";
import ServiceArea from "./components/ServiceArea/ServiceArea";
import ServiceAvailability from "./components/ServiceAvailability/ServiceAvailability";
import ServicePricing from "./components/ServicePricing/ServicePricing";
import ServiceSummary from "./components/ServiceSummary/ServiceSummary";

import styles from "./PublishService.module.css";

import { publishService } from "../../../../services/service.service";

const initialFormData = {
  categoryId: "",
  name: "",
  description: "",
  images: [],
  location: null,
  radius: 20,
  availability: [
    { day: "Lunes", enabled: true, start: "", end: "" },
    { day: "Martes", enabled: true, start: "", end: "" },
    { day: "Miércoles", enabled: true, start: "", end: "" },
    { day: "Jueves", enabled: true, start: "", end: "" },
    { day: "Viernes", enabled: true, start: "", end: "" },
    { day: "Sábado", enabled: false, start: "", end: "" },
    { day: "Domingo", enabled: false, start: "", end: "" },
  ],
  pricingType: "range",
  priceMin: "15000",
  priceMax: "25000",
};

const PublishService = () => {
  const navigate = useNavigate();

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const [formData, setFormData] = useState(initialFormData);

  const updateFormData = (field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
    }));
  };

  const updateAvailability = (day, field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      availability: previousData.availability.map((item) =>
        item.day === day ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const handleCancel = () => {
    navigate("/app/prestador/panel");
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    setPublishError("");

    const { name, description, categoryId, location, availability } = formData;

    if (!name.trim() || !description.trim() || !categoryId) {
      setPublishError("Completá todos los campos obligatorios.");
      return;
    }

    if (
      !location ||
      !location.locality ||
      !location.province ||
      !Number.isFinite(location.latitude) ||
      !Number.isFinite(location.longitude)
    ) {
      setPublishError("Seleccioná una localidad válida de las sugerencias.");
      return;
    }

    const selectedAvailability = availability
      .filter((item) => item.enabled)
      .map(({ day, start, end }) => ({ day, start, end }));

    if (
      selectedAvailability.length === 0 ||
      selectedAvailability.some((item) => !item.start || !item.end)
    ) {
      setPublishError("Completá los horarios de los días seleccionados.");
      return;
    }

    const serviceData = {
      name: name.trim(),
      description: description.trim(),
      categoryId: Number(categoryId),
      location,
      availability: selectedAvailability,
    };

    try {
      setIsPublishing(true);

      const response = await publishService(serviceData);

      navigate("/app/prestador/servicios/publicado", {
        state: {
          serviceName: response.service.name,
        },
      });
    } catch (error) {
      console.error("Error al publicar el servicio:", error);
      setPublishError(error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className={styles.page}>
      <AppHeader />

      <main className={styles.main}>
        <button
          type="button"
          className={styles.backButton}
          onClick={handleCancel}
        >
          <span aria-hidden="true">‹</span>
          Volver al panel
        </button>

        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>MIS SERVICIOS</span>

          <h1>Publicar nuevo servicio</h1>

          <p>
            Completá la información para que los clientes puedan conocer y
            solicitar tu servicio.
          </p>
        </header>

        <form className={styles.layout} onSubmit={handlePublish}>
          <div className={styles.formSections}>
            <ServiceInformation formData={formData} onChange={updateFormData} />

            <ServiceArea formData={formData} onChange={updateFormData} />

            <ServiceAvailability
              availability={formData.availability}
              onChange={updateAvailability}
            />

            <ServicePricing formData={formData} onChange={updateFormData} />
          </div>

          {publishError && (
            <p role="alert" className={styles.errorMessage}>
              {publishError}
            </p>
          )}

          <aside className={styles.sidebar}>
            <ServiceSummary formData={formData} />

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.publishButton}
                disabled={isPublishing}
              >
                <span aria-hidden="true">↗</span>
                {isPublishing ? "Publicando..." : "Publicar servicio"}
              </button>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                Cancelar
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default PublishService;
