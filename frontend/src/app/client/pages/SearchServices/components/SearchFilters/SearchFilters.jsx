import { Check, Star } from "lucide-react";
import styles from "./SearchFilters.module.css";

const availabilityOptions = ["Disponible", "Esta semana", "Próxima semana"];

const ratingOptions = [
  { label: "4.5 o más", value: 4.5 },
  { label: "4.0 o más", value: 4.0 },
  { label: "3.5 o más", value: 3.5 },
];

const SearchFilters = ({
  categories = [],
  selectedCategory = "",
  onCategoryChange,
  selectedAvailability = "",
  onAvailabilityChange,
  minimumRating = 0,
  onMinimumRatingChange,
}) => {
  return (
    <aside className={styles.filters} aria-label="Filtros de búsqueda">
      <h3 className={styles.title}>Filtrar resultados</h3>

      <section className={styles.group}>
        <h4 className={styles.groupTitle}>Categoría</h4>

        <div className={styles.categoryOptions}>
          <button
            type="button"
            className={`${styles.categoryButton} ${
              selectedCategory === "" ? styles.selected : ""
            }`}
            aria-pressed={selectedCategory === ""}
            onClick={() => onCategoryChange?.("")}
          >
            {selectedCategory === "" && <Check size={14} aria-hidden="true" />}
            Todas
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.selected : ""
              }`}
              aria-pressed={selectedCategory === category}
              onClick={() => onCategoryChange?.(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h4 className={styles.groupTitle}>Disponibilidad</h4>

        <div className={styles.verticalOptions}>
          {availabilityOptions.map((availability) => (
            <button
              key={availability}
              type="button"
              className={`${styles.optionButton} ${
                selectedAvailability === availability ? styles.selected : ""
              }`}
              aria-pressed={selectedAvailability === availability}
              onClick={() =>
                onAvailabilityChange?.(
                  selectedAvailability === availability ? "" : availability,
                )
              }
            >
              {availability}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.group}>
        <h4 className={styles.groupTitle}>Valoración mínima</h4>

        <div className={styles.verticalOptions}>
          {ratingOptions.map((rating) => (
            <button
              key={rating.value}
              type="button"
              className={`${styles.optionButton} ${
                minimumRating === rating.value ? styles.selected : ""
              }`}
              aria-pressed={minimumRating === rating.value}
              onClick={() =>
                onMinimumRatingChange?.(
                  minimumRating === rating.value ? 0 : rating.value,
                )
              }
            >
              <Star size={14} fill="currentColor" aria-hidden="true" />
              {rating.label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default SearchFilters;
