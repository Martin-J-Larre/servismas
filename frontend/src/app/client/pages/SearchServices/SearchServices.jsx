import { useState } from "react";
import SearchHeader from "./components/SearchHeader/SearchHeader";
import ServiceSearchBar from "./components/ServiceSearchBar/ServiceSearchBar";
import ServiceTypeList from "./components/ServiceTypeList/ServiceTypeList";
import styles from "./SearchServices.module.css";

const SearchServices = () => {
  const [selectedServiceType, setSelectedServiceType] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState({
    serviceType: "",
    serviceTypeName: "",
    category: "",
    location: "",
    date: "",
  });

  const handleSearch = (criteria) => {
    const selectedType = {
      id: criteria.serviceType,
      name: criteria.serviceTypeName,
    };

    setSearchCriteria(criteria);
    setSelectedServiceType(selectedType);
    setShowResults(true);
  };

  const handleSelectServiceType = (serviceType) => {
    setSelectedServiceType(serviceType);

    setSearchCriteria((previousCriteria) => ({
      ...previousCriteria,
      serviceType: serviceType.id,
      serviceTypeName: serviceType.name,
      category: "",
    }));

    setShowResults(true);
  };

  const handleBackToServices = () => {
    setSelectedServiceType(null);
    setShowResults(false);

    setSearchCriteria((previousCriteria) => ({
      ...previousCriteria,
      serviceType: "",
      serviceTypeName: "",
      category: "",
    }));
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
          searchCriteria={searchCriteria}
          onChange={(updateCriteria) => {
            setSearchCriteria((previousCriteria) => {
              const newCriteria =
                typeof updateCriteria === "function"
                  ? updateCriteria(previousCriteria)
                  : updateCriteria;

              if (newCriteria.serviceType) {
                setSelectedServiceType({
                  id: newCriteria.serviceType,
                  name: newCriteria.serviceTypeName,
                });
              } else {
                setSelectedServiceType(null);
              }

              return newCriteria;
            });
          }}
          onSearch={handleSearch}
        />
      </section>

      <ServiceTypeList
        onSelectServiceType={handleSelectServiceType}
        selectedServiceType={selectedServiceType}
      />

      {showResults && selectedServiceType && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeading}>
            <p className={styles.eyebrow}>RESULTADOS DE BÚSQUEDA</p>

            <h2>
              Prestadores de{" "}
              {searchCriteria.category ||
                selectedServiceType.name.toLowerCase()}
            </h2>

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
