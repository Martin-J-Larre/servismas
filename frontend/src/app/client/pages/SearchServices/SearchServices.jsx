import { useState } from "react";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import ServiceSearchBar from "./components/ServiceSearchBar/ServiceSearchBar";
import ServiceTypeList from "./components/ServiceTypeList/ServiceTypeList";
import styles from "./SearchServices.module.css";

const SearchServices = () => {
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    service: "",
    category: "",
    location: "",
    date: "",
  });

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);

    if (criteria.service.trim() || criteria.category) {
      setSelectedServiceType({
        id: criteria.category ? "home" : "search",
        name: criteria.service.trim() || criteria.category,
      });
    }
  };

  const handleSelectServiceType = (serviceType) => {
    setSelectedServiceType(serviceType);
    setSearchCriteria((previousCriteria) => ({
      ...previousCriteria,
      service: serviceType.name,
      category: "",
    }));
  };

  const handleBackToServices = () => {
    setSelectedServiceType(null);
  };

  return (
    <main className={styles.page}>
      <SearchHeader />

      <section className={styles.searchSection}>
        {selectedServiceType && (
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBackToServices}
          >
            ← Volver a los tipos de servicio
          </button>
        )}

        <p className={styles.eyebrow}>BÚSQUEDA DE SERVICIOS</p>

        <h1 className={styles.title}>
          Encontrá el servicio <span>que necesitás</span>
        </h1>

        <p className={styles.description}>
          Buscá entre diferentes servicios y encontrá prestadores disponibles en
          tu zona.
        </p>

        <ServiceSearchBar
          onSearch={handleSearch}
          selectedCategory={searchCriteria.category}
          initialValues={searchCriteria}
        />
      </section>

      {!selectedServiceType ? (
        <ServiceTypeList onSelectServiceType={handleSelectServiceType} />
      ) : (
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeading}>
            <p className={styles.eyebrow}>RESULTADOS DE BÚSQUEDA</p>

            <h2>Prestadores de {selectedServiceType.name.toLowerCase()}</h2>

            <p>
              Explorá los profesionales disponibles para el servicio que
              necesitás.
            </p>
          </div>

          <div className={styles.resultsPlaceholder}>
            Los filtros y las tarjetas de prestadores se incorporarán en el
            siguiente paso.
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchServices;
