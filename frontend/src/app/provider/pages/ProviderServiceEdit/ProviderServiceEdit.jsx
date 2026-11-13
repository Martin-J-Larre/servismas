import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppHeader from "../../../components/AppHeader/AppHeader";

import ServiceInformation from "../PublishService/components/ServiceInformation/ServiceInformation";
import ServiceArea from "../PublishService/components/ServiceArea/ServiceArea";
import ServiceAvailability from "../PublishService/components/ServiceAvailability/ServiceAvailability";
import ServicePricing from "../PublishService/components/ServicePricing/ServicePricing";
import ServiceSummary from "../PublishService/components/ServiceSummary/ServiceSummary";

import {
  getMyServiceById,
  updateMyService,
  getServiceTypes,
  getCategoriesByType,
} from "../../../../services/service.service";

import styles from "./ProviderServiceEdit.module.css";

const initialAvailability = [
  { day: "Lunes", enabled: false, start: "", end: "" },
  { day: "Martes", enabled: false, start: "", end: "" },
  { day: "Miércoles", enabled: false, start: "", end: "" },
  { day: "Jueves", enabled: false, start: "", end: "" },
  { day: "Viernes", enabled: false, start: "", end: "" },
  { day: "Sábado", enabled: false, start: "", end: "" },
  { day: "Domingo", enabled: false, start: "", end: "" },
];

const initialFormData = {
  typeServiceId: "",
  categoryId: "",
  name: "",
  description: "",
  images: [],
  location: null,
  radius: 20,
  availability: initialAvailability,
  pricingType: "range",
  priceMin: "",
  priceMax: "",
};

const ProviderServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const [error, setError] = useState("");
  const [catalogError, setCatalogError] = useState("");

  useEffect(() => {
    const loadServiceTypes = async () => {
      try {
        const response = await getServiceTypes();
        setServiceTypes(response.types);
      } catch (error) {
        console.error("Error al cargar tipos de servicio:", error);
        setCatalogError("No se pudieron cargar los tipos de servicio.");
      } finally {
        setIsLoadingTypes(false);
      }
    };

    loadServiceTypes();
  }, []);

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyServiceById(id);
        const service = response.service;

        const categoryResponse = await getCategoriesByType(service.typeId);

        setCategories(categoryResponse.categories);

        const availability = initialAvailability.map((item) => {
          const savedItem = service.availability?.find(
            (saved) => saved.day === item.day,
          );

          return savedItem
            ? {
                ...item,
                enabled: true,
                start: savedItem.start,
                end: savedItem.end,
              }
            : item;
        });

        setFormData({
          ...initialFormData,
          typeServiceId: String(service.typeId),
          categoryId: String(service.categoryId),
          name: service.name,
          description: service.description,
          location: service.location,
          availability,
        });
      } catch (error) {
        console.error("Error al cargar el servicio:", error);
        setError(
          error.message || "No se pudo cargar la información del servicio.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadService();
  }, [id]);

  useEffect(() => {
    if (!formData.typeServiceId) return;

    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);

        const response = await getCategoriesByType(formData.typeServiceId);
        setCategories(response.categories);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setCatalogError("No se pudieron cargar las categorías.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [formData.typeServiceId]);

  const updateFormData = (field, value) => {
    setFormData((previousData) => ({
      ...previousData,
      [field]: value,
      ...(field === "typeServiceId" && { categoryId: "" }),
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
    navigate(`/app/prestador/mis-servicios/${id}`);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setError("");

    const { name, description, categoryId, location, availability } = formData;

    if (!name.trim() || !description.trim() || !categoryId) {
      setError("Completá todos los campos obligatorios.");
      return;
    }

    if (
      !location ||
      !location.locality ||
      !location.province ||
      !Number.isFinite(Number(location.latitude)) ||
      !Number.isFinite(Number(location.longitude))
    ) {
      setError("Seleccioná una ubicación válida.");
      return;
    }

    const selectedAvailability = availability
      .filter((item) => item.enabled)
      .map(({ day, start, end }) => ({ day, start, end }));

    if (
      selectedAvailability.length === 0 ||
      selectedAvailability.some(
        (item) => !item.start || !item.end || item.start >= item.end,
      )
    ) {
      setError("Completá los horarios de los días seleccionados.");
      return;
    }

    try {
      setIsSaving(true);

      await updateMyService(id, {
        name: name.trim(),
        description: description.trim(),
        categoryId: Number(categoryId),
        location,
        availability: selectedAvailability,
      });

      navigate(`/app/prestador/mis-servicios/${id}`);
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      setError(error.message || "No se pudo actualizar el servicio.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <p>Cargando información del servicio...</p>
        </main>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.main}>
          <p role="alert" className={styles.errorMessage}>
            {error}
          </p>
          <button type="button" onClick={handleCancel}>
            Volver al servicio
          </button>
        </main>
      </div>
    );
  }

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
          Volver al servicio
        </button>

        <header className={styles.pageHeader}>
          <span className={styles.eyebrow}>MIS SERVICIOS</span>
          <h1>Editar servicio</h1>
          <p>Modificá la información de tu servicio publicado.</p>
        </header>

        <form className={styles.layout} onSubmit={handleUpdate}>
          <div className={styles.formSections}>
            <ServiceInformation
              formData={formData}
              onChange={updateFormData}
              serviceTypes={serviceTypes}
              categories={categories}
              isLoadingTypes={isLoadingTypes}
              isLoadingCategories={isLoadingCategories}
              catalogError={catalogError}
            />

            <ServiceArea formData={formData} onChange={updateFormData} />

            <ServiceAvailability
              availability={formData.availability}
              onChange={updateAvailability}
            />

            <ServicePricing formData={formData} onChange={updateFormData} />
          </div>

          {error && (
            <p role="alert" className={styles.errorMessage}>
              {error}
            </p>
          )}

          <aside className={styles.sidebar}>
            <ServiceSummary formData={formData} />

            <div className={styles.actions}>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={isSaving}
              >
                {isSaving ? "Guardando cambios..." : "Guardar cambios"}
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

export default ProviderServiceEdit;
