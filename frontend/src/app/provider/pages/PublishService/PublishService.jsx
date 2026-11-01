import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeaderClient from "../../../client/components/HeaderClient/HeaderClient";

import ServiceInformation from "./components/ServiceInformation/ServiceInformation";
import ServiceArea from "./components/ServiceArea/ServiceArea";
import ServiceAvailability from "./components/ServiceAvailability/ServiceAvailability";
import ServicePricing from "./components/ServicePricing/ServicePricing";
import ServiceSummary from "./components/ServiceSummary/ServiceSummary";

import styles from "./PublishService.module.css";

const initialFormData = {
  category: "",
  name: "",
  description: "",
  images: [],
  location: "Córdoba Capital",
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
    navigate("/prestador/panel");
  };

  // const handlePublish = (event) => {
  //   event.preventDefault();

  //   // La validación y el envío al backend se implementarán después.
  //   console.log("Datos del servicio:", formData);
  // };
  const handlePublish = (event) => {
    event.preventDefault();

    console.log("Datos del servicio:", formData);

    navigate("/prestador/servicios/publicado", {
      state: {
        serviceName: formData.name.trim(),
      },
    });
  };

  return (
    <div className={styles.page}>
      <HeaderClient />

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

          <aside className={styles.sidebar}>
            <ServiceSummary formData={formData} />

            <div className={styles.actions}>
              <button type="submit" className={styles.publishButton}>
                <span aria-hidden="true">↗</span>
                Publicar servicio
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
