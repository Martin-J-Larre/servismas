import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

import {
  getServiceTypes,
  getCategoriesByType,
  searchServices,
} from "../../../../services/service.service";

import AppHeader from "../../../components/AppHeader/AppHeader";
import ServiceSearchBar from "./components/ServiceSearchBar/ServiceSearchBar";
import ServiceTypeList from "./components/ServiceTypeList/ServiceTypeList";
import ProviderCard from "./components/ProviderCard/ProviderCard";
import SearchFilters from "./components/SearchFilters/SearchFilters";

import styles from "./SearchServices.module.css";

const STORAGE_KEY = "servismas-search-state";

const getSavedState = () => {
  try {
    const savedState = sessionStorage.getItem(STORAGE_KEY);
    return savedState ? JSON.parse(savedState) : {};
  } catch {
    return {};
  }
};

const SearchServices = () => {
  const [initialState] = useState(getSavedState);

  const [serviceTypes, setServiceTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [typesError, setTypesError] = useState("");

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesError, setCategoriesError] = useState("");

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [servicesError, setServicesError] = useState("");

  const [selectedServiceType, setSelectedServiceType] = useState(
    initialState.selectedServiceType ?? null,
  );

  const [showResults, setShowResults] = useState(
    initialState.showResults ?? false,
  );

  const [searchCriteria, setSearchCriteria] = useState(
    initialState.searchCriteria ?? {
      serviceType: "",
      serviceTypeName: "",
      category: "",
      location: "",
      date: "",
    },
  );

  const [selectedFilterCategory, setSelectedFilterCategory] = useState(
    initialState.selectedFilterCategory ?? "",
  );

  const [selectedAvailability, setSelectedAvailability] = useState(
    initialState.selectedAvailability ?? "",
  );

  const [minimumRating, setMinimumRating] = useState(
    initialState.minimumRating ?? 0,
  );

  const [activeSearch, setActiveSearch] = useState(() => {
    if (
      initialState.showResults &&
      initialState.selectedServiceType &&
      initialState.searchCriteria?.serviceType
    ) {
      return initialState.searchCriteria;
    }

    return null;
  });

  const navigate = useNavigate();

  // ==========================================
  // FUNCIONES DE MANEJO DE EVENTOS
  // ==========================================

  // Cambiar criterios desde el buscador.
  const handleSearchCriteriaChange = (updateCriteria) => {
    const newCriteria =
      typeof updateCriteria === "function"
        ? updateCriteria(searchCriteria)
        : { ...searchCriteria, ...updateCriteria };

    const typeChanged =
      String(newCriteria.serviceType) !== String(searchCriteria.serviceType);

    setSearchCriteria(newCriteria);

    if (typeChanged) {
      setSelectedFilterCategory("");
      setSelectedAvailability("");
      setMinimumRating(0);

      if (newCriteria.serviceType) {
        const selectedType = serviceTypes.find(
          (type) => String(type.id) === String(newCriteria.serviceType),
        );

        setSelectedServiceType({
          id: newCriteria.serviceType,
          name:
            selectedType?.name ??
            selectedType?.nombre ??
            newCriteria.serviceTypeName ??
            "",
        });

        setShowResults(true);
        setActiveSearch(newCriteria);
      } else {
        setSelectedServiceType(null);
        setShowResults(false);
        setActiveSearch(null);
        setServices([]);
      }
    } else if (!newCriteria.serviceType) {
      setSelectedServiceType(null);
    }
  };

  // Seleccionar un tipo desde "Explorá por tipo de servicio".
  const handleSelectServiceType = (serviceType) => {
    const serviceTypeName = serviceType.name ?? serviceType.nombre;

    const newCriteria = {
      ...searchCriteria,
      serviceType: serviceType.id,
      serviceTypeName,
      category: "",
    };

    setSelectedServiceType({
      id: serviceType.id,
      name: serviceTypeName,
    });

    setSearchCriteria(newCriteria);

    setSelectedFilterCategory("");
    setSelectedAvailability("");
    setMinimumRating(0);

    setShowResults(true);
    setActiveSearch(newCriteria);
  };

  // Ejecutar búsqueda desde el botón del buscador.
  const handleSearch = (criteria) => {
    const selectedType = serviceTypes.find(
      (type) => String(type.id) === String(criteria.serviceType),
    );

    const newCriteria = {
      ...criteria,
      serviceTypeName:
        selectedType?.name ??
        selectedType?.nombre ??
        criteria.serviceTypeName ??
        "",
    };

    setSearchCriteria(newCriteria);

    setSelectedServiceType({
      id: newCriteria.serviceType,
      name: newCriteria.serviceTypeName,
    });

    setSelectedFilterCategory("");
    setSelectedAvailability("");
    setMinimumRating(0);

    setShowResults(true);
    setActiveSearch(newCriteria);
  };

  // Navegar al perfil del prestador.
  // Navegar al perfil del prestador.
  const handleViewProfile = (service) => {
    navigate(`/app/cliente/prestadores/${service.providerId}`, {
      state: {
        selectedServiceId: service.id,
      },
    });
  };

  // Limpiar los filtros laterales.
  const handleClearFilters = () => {
    setSelectedFilterCategory("");
    setSelectedAvailability("");
    setMinimumRating(0);
  };

  // ==========================================
  // EFECTOS
  // ==========================================

  // Obtener los tipos de servicio.
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        setLoadingTypes(true);
        setTypesError("");

        const response = await getServiceTypes();

        setServiceTypes(response.types ?? []);
      } catch (error) {
        console.error("Error al obtener los tipos de servicio:", error);
        setTypesError("No se pudieron cargar los tipos de servicio.");
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchServiceTypes();
  }, []);

  // Obtener las categorías del tipo de servicio seleccionado.
  useEffect(() => {
    if (!searchCriteria.serviceType) {
      setCategories([]);
      return;
    }

    let isActive = true;

    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoriesError("");

        const response = await getCategoriesByType(searchCriteria.serviceType);

        if (isActive) {
          setCategories(response.categories ?? []);
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);

        if (isActive) {
          setCategories([]);
          setCategoriesError("No se pudieron cargar las categorías.");
        }
      } finally {
        if (isActive) {
          setLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isActive = false;
    };
  }, [searchCriteria.serviceType]);

  // Ejecutar la búsqueda cuando cambia activeSearch.
  useEffect(() => {
    if (!activeSearch?.serviceType) return;

    let isActive = true;

    const fetchServices = async () => {
      try {
        setLoadingServices(true);
        setServicesError("");

        const response = await searchServices({
          typeId: activeSearch.serviceType,
          categoryId: activeSearch.category,
          locality: activeSearch.location,
          date: activeSearch.date,
        });

        if (isActive) {
          setServices(response.services ?? []);
        }
      } catch (error) {
        console.error("Error al buscar servicios:", error);

        if (isActive) {
          setServices([]);
          setServicesError("No se pudieron obtener los servicios.");
        }
      } finally {
        if (isActive) {
          setLoadingServices(false);
        }
      }
    };

    fetchServices();

    return () => {
      isActive = false;
    };
  }, [activeSearch]);

  // Guardar el estado de búsqueda.
  useEffect(() => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedServiceType,
        showResults,
        searchCriteria,
        selectedFilterCategory,
        selectedAvailability,
        minimumRating,
      }),
    );
  }, [
    selectedServiceType,
    showResults,
    searchCriteria,
    selectedFilterCategory,
    selectedAvailability,
    minimumRating,
  ]);

  // ==========================================
  // FILTRADO DE RESULTADOS
  // ==========================================

  const filteredServices = services.filter((service) => {
    if (
      selectedFilterCategory &&
      String(service.categoryId) !== String(selectedFilterCategory)
    ) {
      return false;
    }

    // Datos de demostración hasta implementar estos campos en el backend.
    const demoRating = 4.8;
    const demoAvailability = "Disponible";

    if (selectedAvailability && demoAvailability !== selectedAvailability) {
      return false;
    }

    if (demoRating < minimumRating) {
      return false;
    }

    return true;
  });

  // ==========================================
  // RENDERIZADO
  // ==========================================

  return (
    <main className={styles.page}>
      <AppHeader />

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
          serviceTypes={serviceTypes}
          categories={categories}
          loadingCategories={loadingCategories}
          searchCriteria={searchCriteria}
          onChange={handleSearchCriteriaChange}
          onSearch={handleSearch}
        />

        {categoriesError && <p role="alert">{categoriesError}</p>}
      </section>

      <ServiceTypeList
        serviceTypes={serviceTypes}
        loading={loadingTypes}
        error={typesError}
        onSelectServiceType={handleSelectServiceType}
        selectedServiceType={selectedServiceType}
      />

      {showResults && selectedServiceType && (
        <section className={styles.resultsSection}>
          <div className={styles.resultsHeading}>
            <p className={styles.eyebrow}>RESULTADOS DE BÚSQUEDA</p>

            <h2>
              {searchCriteria.category
                ? `Servicios de ${
                    categories.find(
                      (category) =>
                        String(category.id) === String(searchCriteria.category),
                    )?.name ?? selectedServiceType.name
                  }`
                : `Servicios de ${selectedServiceType.name.toLowerCase()}`}
            </h2>

            <p>Explorá los servicios publicados por nuestros prestadores.</p>
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
                  <strong>{filteredServices.length}</strong>{" "}
                  {filteredServices.length === 1
                    ? "servicio encontrado"
                    : "servicios encontrados"}
                </p>
              </div>

              {loadingServices ? (
                <p>Cargando servicios...</p>
              ) : servicesError ? (
                <p role="alert">{servicesError}</p>
              ) : filteredServices.length > 0 ? (
                <div className={styles.providersGrid}>
                  {filteredServices.map((service) => (
                    <ProviderCard
                      key={service.id}
                      service={service}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <SearchX size={34} strokeWidth={1.6} aria-hidden="true" />

                  <h3>No encontramos servicios</h3>

                  <p>
                    Probá cambiar los criterios de búsqueda o limpiar los
                    filtros para ver otros resultados.
                  </p>

                  <button type="button" onClick={handleClearFilters}>
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
