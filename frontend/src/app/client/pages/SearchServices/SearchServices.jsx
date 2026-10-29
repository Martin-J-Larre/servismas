import { useState } from "react";
import { SearchX } from "lucide-react";

import SearchHeader from "./components/SearchHeader/SearchHeader";
import ServiceSearchBar from "./components/ServiceSearchBar/ServiceSearchBar";
import ServiceTypeList from "./components/ServiceTypeList/ServiceTypeList";
import ProviderCard from "./components/ProviderCard/ProviderCard";
import SearchFilters from "./components/SearchFilters/SearchFilters";

import providers from "../../../provider/data/providers";
import styles from "./SearchServices.module.css";

// TODO: 1 Agregar una libreria de location para ver donde se encuentra el usuario y filtrar por distancia, o agregar un input de location para que el usuario pueda escribir su ubicación y filtrar por eso.
//TODO: 2 Agregar una funcion o algo que traslade la disponibilidad del prestador con la fecha para que coincidan con Disponibilidad en el filter aside o cambiarlo a uno con fechas !!!

const serviceCategories = {
  home: [
    "Plomería",
    "Electricidad",
    "Limpieza",
    "Pintura",
    "Carpintería",
    "Reparaciones",
  ],
  pets: [
    "Paseo de mascotas",
    "Cuidado de mascotas",
    "Peluquería para mascotas",
    "Adiestramiento",
  ],
  "personal-care": [
    "Cuidado de adultos mayores",
    "Cuidado infantil",
    "Acompañamiento",
  ],
  procedures: ["Trámites administrativos", "Gestiones personales"],
  professional: ["Informática", "Diseño", "Asesoramiento profesional"],
  gardening: [
    "Jardinería",
    "Mantenimiento de jardines",
    "Limpieza de exteriores",
  ],
};

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

  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);

  const handleSearchCriteriaChange = (updateCriteria) => {
    const newCriteria =
      typeof updateCriteria === "function"
        ? updateCriteria(searchCriteria)
        : updateCriteria;

    setSearchCriteria(newCriteria);

    const typeChanged = newCriteria.serviceType !== searchCriteria.serviceType;

    if (typeChanged) {
      setSelectedFilterCategory("");
      setSelectedAvailability("");
      setMinimumRating(0);
    }

    if (newCriteria.serviceType) {
      setSelectedServiceType({
        id: newCriteria.serviceType,
        name: newCriteria.serviceTypeName,
      });
    } else {
      setSelectedServiceType(null);
    }
  };

  const handleSearch = (criteria) => {
    setSearchCriteria(criteria);

    setSelectedServiceType({
      id: criteria.serviceType,
      name: criteria.serviceTypeName,
    });

    setSelectedFilterCategory("");
    setSelectedAvailability("");
    setMinimumRating(0);
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

    setSelectedFilterCategory("");
    setSelectedAvailability("");
    setMinimumRating(0);
    setShowResults(true);
  };

  const categories = selectedServiceType
    ? (serviceCategories[selectedServiceType.id] ?? [])
    : [];

  const filteredProviders = providers.filter((provider) => {
    if (provider.serviceType !== searchCriteria.serviceType) {
      return false;
    }

    if (
      searchCriteria.category &&
      provider.category !== searchCriteria.category
    ) {
      return false;
    }

    if (
      selectedFilterCategory &&
      provider.category !== selectedFilterCategory
    ) {
      return false;
    }

    if (
      selectedAvailability &&
      provider.availability !== selectedAvailability
    ) {
      return false;
    }

    if (provider.rating < minimumRating) {
      return false;
    }

    if (
      searchCriteria.location &&
      !provider.location
        .toLowerCase()
        .includes(searchCriteria.location.trim().toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const handleViewProfile = (provider) => {
    // La navegación al perfil se implementará más adelante.
    console.log("Prestador seleccionado:", provider);
  };

  return (
    <main className={styles.page}>
      <SearchHeader />

      <section className={styles.searchSection}>
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
          onChange={handleSearchCriteriaChange}
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
              {searchCriteria.category
                ? `Prestadores de ${searchCriteria.category.toLowerCase()}`
                : `Prestadores de ${selectedServiceType.name.toLowerCase()}`}
            </h2>

            <p>
              Explorá los profesionales disponibles para el servicio que
              necesitás.
            </p>
          </div>

          <div className={styles.resultsLayout}>
            <SearchFilters
              categories={categories}
              selectedCategory={selectedFilterCategory}
              onCategoryChange={setSelectedFilterCategory}
              selectedAvailability={selectedAvailability}
              onAvailabilityChange={setSelectedAvailability}
              minimumRating={minimumRating}
              onMinimumRatingChange={setMinimumRating}
            />

            <div className={styles.resultsContent}>
              <div className={styles.resultsToolbar}>
                <p className={styles.resultsCount}>
                  <strong>{filteredProviders.length}</strong>{" "}
                  {filteredProviders.length === 1
                    ? "prestador encontrado"
                    : "prestadores encontrados"}
                </p>
              </div>

              {filteredProviders.length > 0 ? (
                <div className={styles.providersGrid}>
                  {filteredProviders.map((provider) => (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <SearchX size={34} strokeWidth={1.6} aria-hidden="true" />

                  <h3>No encontramos prestadores</h3>

                  <p>
                    Probá cambiar la categoría, la disponibilidad o la
                    valoración mínima para ver otros resultados.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFilterCategory("");
                      setSelectedAvailability("");
                      setMinimumRating(0);
                    }}
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default SearchServices;
