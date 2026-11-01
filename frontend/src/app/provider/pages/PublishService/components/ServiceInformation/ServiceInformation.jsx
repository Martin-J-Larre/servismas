import { useRef } from "react";
import { Camera, FileText, Plus, X } from "lucide-react";

import styles from "./ServiceInformation.module.css";

const MAX_IMAGES = 6;

const categories = [
  "Electricidad",
  "Plomería",
  "Gasista",
  "Pintura",
  "Carpintería",
  "Albañilería",
  "Limpieza",
  "Jardinería",
  "Refrigeración",
  "Otros",
];

const ServiceInformation = ({ formData, onChange }) => {
  const fileInputRef = useRef(null);

  const handleImageSelection = (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const remainingSlots = MAX_IMAGES - formData.images.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const validFiles = selectedFiles
      .filter((file) => file.type.startsWith("image/"))
      .slice(0, remainingSlots);

    const newImages = validFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));

    onChange("images", [...formData.images, ...newImages]);

    event.target.value = "";
  };

  const handleRemoveImage = (imageId) => {
    const imageToRemove = formData.images.find((image) => image.id === imageId);

    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    onChange(
      "images",
      formData.images.filter((image) => image.id !== imageId),
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionNumber}>1</span>

        <div className={styles.sectionTitle}>
          <FileText size={15} aria-hidden="true" />
          <h2>Información del servicio</h2>
        </div>
      </div>

      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="service-category">Categoría</label>

          <select
            id="service-category"
            value={formData.category}
            onChange={(event) => onChange("category", event.target.value)}
            required
          >
            <option value="">Seleccioná una categoría</option>

            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="service-name">Nombre del servicio</label>

          <input
            id="service-name"
            type="text"
            value={formData.name}
            onChange={(event) => onChange("name", event.target.value)}
            placeholder="Ej.: Servicio de plomería general"
            maxLength={100}
            required
          />

          <small className={styles.hint}>
            Utilizá un nombre claro que describa el servicio que ofrecés.
          </small>
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="service-description">Descripción</label>

            <span className={styles.counter}>
              {formData.description.length}/600
            </span>
          </div>

          <textarea
            id="service-description"
            value={formData.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="Describí qué incluye el servicio, qué trabajos realizás y cualquier información importante."
            maxLength={600}
            rows={5}
            required
          />
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label>Fotos o referencias</label>

            <span className={styles.optional}>Opcional</span>
          </div>

          <p className={styles.uploadDescription}>
            Agregá imágenes de trabajos anteriores para generar más confianza en
            los clientes. Máximo 6 fotos.
          </p>

          <div className={styles.imageList}>
            {formData.images.map((image, index) => (
              <div className={styles.imageCard} key={image.id}>
                <img
                  src={image.preview}
                  alt={`Trabajo realizado ${index + 1}`}
                />

                <span className={styles.imageLabel}>Foto {index + 1}</span>

                <button
                  type="button"
                  className={styles.removeImage}
                  onClick={() => handleRemoveImage(image.id)}
                  aria-label={`Eliminar foto ${index + 1}`}
                  title="Eliminar foto"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </div>
            ))}

            {formData.images.length < MAX_IMAGES && (
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className={styles.uploadIcon}>
                  <Camera size={19} aria-hidden="true" />
                </span>

                <Plus size={13} aria-hidden="true" />

                <span>Agregar</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            className={styles.fileInput}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelection}
            aria-label="Seleccionar imágenes del servicio"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceInformation;
