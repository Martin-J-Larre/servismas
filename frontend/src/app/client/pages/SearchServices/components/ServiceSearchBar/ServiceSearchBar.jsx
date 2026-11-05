import { Search, BriefcaseBusiness, MapPin, CalendarDays } from "lucide-react";

import styles from "./ServiceSearchBar.module.css";

const ServiceSearchBar = ({
  serviceTypes,
  categories,
  loadingCategories,
  searchCriteria,
  onChange,
  onSearch,
}) => {
  const selectedType = serviceTypes.find(
    (type) => String(type.id) === String(searchCriteria.serviceType),
  );

  const getTypeName = (type) => type?.name ?? type?.nombre ?? "";

  const getCategoryName = (category) =>
    category?.name ?? category?.nombre ?? "";

  const handleChange = (event) => {
    const { name, value } = event.target;

    onChange((previousData) => {
      if (name === "serviceType") {
        const newType = serviceTypes.find(
          (type) => String(type.id) === String(value),
        );

        return {
          ...previousData,
          serviceType: value,
          serviceTypeName: getTypeName(newType),
          category: "",
        };
      }

      return {
        ...previousData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!searchCriteria.serviceType) {
      return;
    }

    onSearch({
      ...searchCriteria,
      serviceTypeName: getTypeName(selectedType),
    });
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="serviceType">¿Qué tipo de servicio necesitás?</label>

        <div className={styles.inputWrapper}>
          <BriefcaseBusiness size={18} aria-hidden="true" />

          <select
            id="serviceType"
            name="serviceType"
            value={searchCriteria.serviceType}
            onChange={handleChange}
            required
          >
            <option value="">Seleccioná un tipo de servicio</option>

            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {getTypeName(type)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="category">Categoría</label>

        <div className={styles.inputWrapper}>
          <Search size={18} aria-hidden="true" />

          <select
            id="category"
            name="category"
            value={searchCriteria.category}
            onChange={handleChange}
            disabled={!selectedType || loadingCategories}
          >
            <option value="">
              {!selectedType
                ? "Primero elegí un tipo"
                : loadingCategories
                  ? "Cargando categorías..."
                  : "Todas las categorías"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {getCategoryName(category)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="location">¿Dónde?</label>

        <div className={styles.inputWrapper}>
          <MapPin size={18} aria-hidden="true" />

          <input
            id="location"
            name="location"
            type="text"
            placeholder="Ciudad o localidad"
            value={searchCriteria.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="date">¿Cuándo lo necesitás?</label>

        <div className={styles.inputWrapper}>
          <CalendarDays size={18} aria-hidden="true" />

          <input
            id="date"
            name="date"
            type="date"
            value={searchCriteria.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <button className={styles.searchButton} type="submit">
        <Search size={17} aria-hidden="true" />
        Buscar servicios
      </button>
    </form>
  );
};

export default ServiceSearchBar;
