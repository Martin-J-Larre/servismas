import { useState } from "react";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import styles from "./ServiceRequestForm.module.css";

const ServiceRequestForm = ({ initialData = {}, onContinue }) => {
  const [formData, setFormData] = useState({
    description: initialData.description || "",
    address: initialData.address || "",
    date: initialData.date || "",
    additionalInfo: initialData.additionalInfo || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Describí el servicio que necesitás.";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Ingresá la dirección del servicio.";
    }

    if (!formData.date) {
      newErrors.date = "Seleccioná una fecha preferida.";
    } else {
      const selectedDate = new Date(`${formData.date}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "La fecha no puede ser anterior a hoy.";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onContinue(formData);
    }
  };

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="description">¿Qué necesitás?</label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describí brevemente qué necesitás realizar..."
          rows={4}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
        />

        {errors.description && (
          <span id="description-error" className={styles.error}>
            {errors.description}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="address">Dirección</label>

        <div className={styles.inputWrapper}>
          <MapPin size={17} aria-hidden="true" />

          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ej. Av. Colón 1234, Córdoba"
            aria-invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? "address-error" : undefined}
          />
        </div>

        {errors.address && (
          <span id="address-error" className={styles.error}>
            {errors.address}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="date">Fecha preferida</label>

        <div className={styles.inputWrapper}>
          <CalendarDays size={17} aria-hidden="true" />

          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            value={formData.date}
            onChange={handleChange}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
          />
        </div>

        {errors.date && (
          <span id="date-error" className={styles.error}>
            {errors.date}
          </span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="additionalInfo">
          Información adicional <span>(opcional)</span>
        </label>

        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Agregá cualquier detalle relevante para el prestador..."
          rows={3}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Continuar
        <ArrowRight size={16} aria-hidden="true" />
      </button>

      <p className={styles.notice}>
        Tu solicitud será enviada directamente al prestador.
      </p>
    </form>
  );
};

export default ServiceRequestForm;
