import {
  ClipboardList,
  MapPin,
  CalendarDays,
  DollarSign,
  Image as ImageIcon,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

import styles from "./ServiceSummary.module.css";

const formatPrice = (value) => {
  if (value === "" || value === null || value === undefined) {
    return null;
  }

  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return null;
  }

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);
};

const ServiceSummary = ({ formData }) => {
  const availableDays = formData.availability.filter((day) => day.enabled);

  const configuredDays = availableDays.filter((day) => day.start && day.end);

  const hasName = formData.name.trim().length > 0;
  const hasCategory = formData.category !== "";
  const hasDescription = formData.description.trim().length > 0;
  const hasImages = formData.images.length > 0;

  const minimumPrice = formatPrice(formData.priceMin);
  const maximumPrice = formatPrice(formData.priceMax);

  const hasValidPriceRange =
    minimumPrice !== null &&
    maximumPrice !== null &&
    Number(formData.priceMin) <= Number(formData.priceMax);

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <ClipboardList size={17} aria-hidden="true" />
        </span>

        <div>
          <h2>Resumen de publicación</h2>
          <p>Revisá los datos de tu servicio</p>
        </div>
      </div>

      <div className={styles.servicePreview}>
        <div className={styles.previewIcon}>
          <ClipboardList size={23} aria-hidden="true" />
        </div>

        <div className={styles.previewContent}>
          <span className={styles.category}>
            {formData.category || "Categoría del servicio"}
          </span>

          <h3>{hasName ? formData.name : "Nombre de tu servicio"}</h3>

          <p className={styles.description}>
            {hasDescription
              ? formData.description
              : "La descripción de tu servicio aparecerá acá."}
          </p>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>
            <MapPin size={15} aria-hidden="true" />
          </span>

          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Zona de cobertura</span>
            <strong>{formData.location || "Zona sin especificar"}</strong>
            <small>
              {formData.radius === null
                ? "Sin límite de distancia"
                : `${formData.radius} km de radio`}
            </small>
          </div>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>
            <CalendarDays size={15} aria-hidden="true" />
          </span>

          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Disponibilidad</span>

            {availableDays.length > 0 ? (
              <>
                <strong>
                  {availableDays.length}{" "}
                  {availableDays.length === 1
                    ? "día disponible"
                    : "días disponibles"}
                </strong>

                <small>{availableDays.map((day) => day.day).join(", ")}</small>

                {configuredDays.length < availableDays.length && (
                  <small className={styles.pendingText}>
                    Hay horarios pendientes de configurar.
                  </small>
                )}
              </>
            ) : (
              <strong className={styles.mutedText}>
                Sin días seleccionados
              </strong>
            )}
          </div>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>
            <DollarSign size={15} aria-hidden="true" />
          </span>

          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Precio orientativo</span>

            {formData.pricingType === "agreement" ? (
              <strong>A convenir</strong>
            ) : hasValidPriceRange ? (
              <strong>
                {minimumPrice} – {maximumPrice}
              </strong>
            ) : (
              <strong className={styles.mutedText}>
                Completá el rango de precios
              </strong>
            )}

            <small>
              {formData.pricingType === "agreement"
                ? "Acordado con el cliente"
                : "Importes en pesos argentinos"}
            </small>
          </div>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailIcon}>
            <ImageIcon size={15} aria-hidden="true" />
          </span>

          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Fotos del servicio</span>
            <strong>
              {formData.images.length} de 6{" "}
              {formData.images.length === 1 ? "foto" : "fotos"}
            </strong>
            <small>
              {hasImages
                ? "Las imágenes están listas para la publicación."
                : "Podés agregar imágenes de trabajos anteriores."}
            </small>
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.completion}>
        <div className={styles.completionHeader}>
          <CheckCircle2 size={15} aria-hidden="true" />
          <strong>Checklist de publicación</strong>
        </div>

        <ul>
          <li className={hasCategory ? styles.completed : ""}>
            <span />
            Seleccionar una categoría
          </li>

          <li className={hasName ? styles.completed : ""}>
            <span />
            Definir el nombre del servicio
          </li>

          <li className={hasDescription ? styles.completed : ""}>
            <span />
            Agregar una descripción
          </li>

          <li className={availableDays.length > 0 ? styles.completed : ""}>
            <span />
            Configurar disponibilidad
          </li>

          <li
            className={
              formData.pricingType === "agreement" || hasValidPriceRange
                ? styles.completed
                : ""
            }
          >
            <span />
            Definir el precio
          </li>
        </ul>
      </div>

      <div className={styles.tips}>
        <span className={styles.tipsIcon}>
          <Lightbulb size={16} aria-hidden="true" />
        </span>

        <div>
          <strong>Consejo</strong>
          <p>
            Una descripción clara, fotos de trabajos anteriores y horarios
            actualizados ayudan a los clientes a entender mejor tu servicio.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ServiceSummary;
