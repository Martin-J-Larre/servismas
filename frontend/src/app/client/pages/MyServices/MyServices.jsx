import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Search,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

import HeaderClient from "../../components/HeaderClient/HeaderClient";
import ServiceCard from "./components/ServiceCard/ServiceCard";
import ServicePagination from "./components/ServicePagination/ServicePagination";

import styles from "./MyServices.module.css";

const ITEMS_PER_PAGE = 4;

// Datos de demostración. Más adelante se obtendrán del backend.
const mockActiveServices = [
  {
    id: 1,
    provider: "Juan Pérez",
    specialty: "Plomería",
    description: "Reparación de pérdida de agua en la cocina",
    status: "En curso",
    date: "29 oct 2026",
    location: "Córdoba Capital",
    price: "$45.000",
    canRate: false,
  },
  {
    id: 2,
    provider: "Laura Fernández",
    specialty: "Electricidad",
    description: "Instalación de luminarias",
    status: "Programado",
    date: "2 nov 2026",
    location: "Córdoba Capital",
    price: "$32.000",
    canRate: false,
  },
];

const mockPastServices = [
  {
    id: 3,
    provider: "Carlos Méndez",
    specialty: "Pintura",
    description: "Pintura de living y comedor",
    status: "Completado",
    date: "10 sep 2026",
    location: "Córdoba Capital",
    price: "$85.000",
    canRate: true,
  },
  {
    id: 4,
    provider: "Sofía Ramírez",
    specialty: "Limpieza del hogar",
    description: "Limpieza profunda de tres ambientes",
    status: "Completado",
    date: "20 ago 2026",
    location: "Córdoba Capital",
    price: "$28.000",
    canRate: true,
  },
  {
    id: 5,
    provider: "Juan Pérez",
    specialty: "Plomería",
    description: "Reparación de grifería",
    status: "Completado",
    date: "5 ago 2026",
    location: "Córdoba Capital",
    price: "$22.000",
    canRate: false,
  },
  {
    id: 6,
    provider: "Marcos López",
    specialty: "Jardinería",
    description: "Mantenimiento y poda del jardín",
    status: "Completado",
    date: "28 jul 2026",
    location: "Córdoba Capital",
    price: "$35.000",
    canRate: true,
  },
  {
    id: 7,
    provider: "Ana Torres",
    specialty: "Limpieza del hogar",
    description: "Limpieza general del departamento",
    status: "Completado",
    date: "15 jul 2026",
    location: "Córdoba Capital",
    price: "$25.000",
    canRate: false,
  },
  {
    id: 8,
    provider: "Pedro Gómez",
    specialty: "Electricidad",
    description: "Revisión de instalación eléctrica",
    status: "Completado",
    date: "30 jun 2026",
    location: "Córdoba Capital",
    price: "$40.000",
    canRate: true,
  },
];

const MyServices = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockPastServices.length / ITEMS_PER_PAGE);

  const visiblePastServices = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return mockPastServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    document
      .getElementById("service-history")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleViewDetails = (service) => {
    // La pantalla de detalles se implementará más adelante.
    console.log("Ver detalles del servicio:", service.id);
  };

  const handleRateService = (service) => {
    // El flujo de valoraciones se implementará más adelante.
    console.log("Valorar servicio:", service.id);
  };

  return (
    <div className={styles.page}>
      <HeaderClient />

      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.pageHeader}>
            <div>
              <div className={styles.eyebrow}>
                <BriefcaseBusiness size={15} aria-hidden="true" />
                Mi actividad
              </div>

              <h1 className={styles.title}>Mis servicios</h1>

              <p className={styles.subtitle}>
                Consultá el estado de tus servicios y revisá tu historial de
                contrataciones.
              </p>
            </div>

            <Link to="/buscar-servicios" className={styles.searchButton}>
              <Search size={17} aria-hidden="true" />
              Buscar servicios
            </Link>
          </section>

          <section className={styles.section} aria-labelledby="active-title">
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 id="active-title" className={styles.sectionTitle}>
                  Servicios activos
                </h2>

                <span className={styles.count}>
                  {mockActiveServices.length}
                </span>
              </div>

              <p className={styles.sectionDescription}>
                Servicios programados o en curso.
              </p>
            </div>

            {mockActiveServices.length > 0 ? (
              <div className={styles.serviceList}>
                {mockActiveServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onViewDetails={handleViewDetails}
                    onRate={handleRateService}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>
                  <BriefcaseBusiness size={23} aria-hidden="true" />
                </span>

                <h3>No tenés servicios activos</h3>

                <p>
                  Cuando contrates un servicio, vas a poder consultar su estado
                  desde esta sección.
                </p>

                <Link
                  to="/buscar-servicios"
                  className={styles.emptyStateButton}
                >
                  Explorar servicios
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            )}
          </section>

          <section
            id="service-history"
            className={styles.section}
            aria-labelledby="history-title"
          >
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitleGroup}>
                <h2 id="history-title" className={styles.sectionTitle}>
                  Historial de servicios
                </h2>

                <span className={styles.count}>{mockPastServices.length}</span>
              </div>

              <p className={styles.sectionDescription}>
                Consultá tus servicios completados y valorá a los prestadores.
              </p>
            </div>

            {mockPastServices.length > 0 ? (
              <>
                <div className={styles.serviceList}>
                  {visiblePastServices.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      onViewDetails={handleViewDetails}
                      onRate={handleRateService}
                    />
                  ))}
                </div>

                <div className={styles.paginationInfo}>
                  <span>
                    Mostrando{" "}
                    {Math.min(
                      (currentPage - 1) * ITEMS_PER_PAGE + 1,
                      mockPastServices.length,
                    )}
                    –
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      mockPastServices.length,
                    )}{" "}
                    de {mockPastServices.length} servicios
                  </span>

                  <ServicePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>
                  <ClipboardList size={23} aria-hidden="true" />
                </span>

                <h3>Tu historial está vacío</h3>

                <p>
                  Los servicios que completes aparecerán acá para que puedas
                  consultarlos cuando quieras.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyServices;
