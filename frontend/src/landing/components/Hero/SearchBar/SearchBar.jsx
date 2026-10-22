
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.searchBar}>
      <div className={styles.field}>
        <label htmlFor="service">¿Qué servicio necesitás?</label>
        <span id="service" className={styles.value}>
          Ej. Plomería, electricidad...
        </span>
      </div>

      <div className={styles.field}>
        <label htmlFor="location">¿Dónde?</label>
        <span id="location" className={styles.value}>
          Tu ubicación
        </span>
      </div>

      <div className={styles.field}>
        <label htmlFor="date">¿Cuándo?</label>
        <span id="date" className={styles.value}>
          Elegí una fecha
        </span>
      </div>

      <button className={styles.searchButton} type="button">
        Buscar servicios
      </button>
    </div>
  );
}

export default SearchBar;
