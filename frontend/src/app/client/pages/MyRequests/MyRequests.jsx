import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, ClipboardList } from "lucide-react";

import HeaderClient from "../../components/HeaderClient/HeaderClient";
import RequestCard from "./components/RequestCard/RequestCard";
import styles from "./MyRequests.module.css";

const mockRequests = [
  {
    id: 1,
    providerName: "Juan Pérez",
    specialty: "Plomería",
    category: "Plomería",
    serviceName: "Reparación de pérdida de agua",
    requestDate: "25 de septiembre de 2026",
    serviceDate: "2 de octubre de 2026",
    location: "Av. Colón 1234, Córdoba",
    description: "Reparación de pérdida de agua en el baño principal.",
    status: "Aceptada",
  },
  {
    id: 2,
    providerName: "Sofía Ramírez",
    specialty: "Limpieza del hogar",
    category: "Limpieza",
    serviceName: "Limpieza profunda del hogar",
    requestDate: "30 de septiembre de 2026",
    serviceDate: "",
    location: "Av. San Juan 456, Córdoba",
    description: "Limpieza profunda de 3 ambientes y cocina.",
    status: "Pendiente",
  },
  {
    id: 3,
    providerName: "Carlos Méndez",
    specialty: "Pintura interior",
    category: "Pintura",
    serviceName: "Pintura de living y comedor",
    requestDate: "10 de septiembre de 2026",
    serviceDate: "",
    location: "Calle Belgrano 789, Córdoba",
    description: "Pintura de living y comedor, dos manos de látex.",
    status: "Rechazada",
  },
];

const filters = [
  { label: "Todas", value: "Todas" },
  { label: "Pendiente", value: "Pendiente" },
  { label: "Aceptada", value: "Aceptada" },
  { label: "Rechazada", value: "Rechazada" },
];

const MyRequests = () => {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRequests = useMemo(() => {
    return mockRequests.filter((request) => {
      const matchesStatus =
        activeFilter === "Todas" || request.status === activeFilter;

      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch = [
        request.providerName,
        request.specialty,
        request.serviceName,
        request.location,
      ].some((value) => value.toLowerCase().includes(normalizedSearch));

      return matchesStatus && matchesSearch;
    });
  }, [activeFilter, searchTerm]);

  const counts = useMemo(
    () => ({
      total: mockRequests.length,
      pending: mockRequests.filter((request) => request.status === "Pendiente")
        .length,
      accepted: mockRequests.filter((request) => request.status === "Aceptada")
        .length,
      rejected: mockRequests.filter((request) => request.status === "Rechazada")
        .length,
    }),
    [],
  );

  const handleViewDetails = (request) => {
    console.log("Ver solicitud:", request);
  };

  const handleCoordinate = (request) => {
    console.log("Coordinar servicio:", request);
  };

  const handleFindProvider = (request) => {
    console.log("Buscar otro prestador:", request);
  };

  return (
    <>
      <HeaderClient />

      <main className={styles.page}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <div>
              <h1 className={styles.title}>Mis solicitudes</h1>
              <p className={styles.subtitle}>
                Consultá el estado de tus solicitudes de servicio.
              </p>
            </div>

            <Link to="/buscar-servicios" className={styles.newSearchButton}>
              <Search size={14} />
              Nueva búsqueda
            </Link>
          </header>

          <section
            className={styles.summary}
            aria-label="Resumen de solicitudes"
          >
            <article className={`${styles.summaryCard} ${styles.totalCard}`}>
              <strong>{counts.total}</strong>
              <span>Total</span>
            </article>

            <article className={`${styles.summaryCard} ${styles.pendingCard}`}>
              <strong>{counts.pending}</strong>
              <span>Pendientes</span>
            </article>

            <article className={`${styles.summaryCard} ${styles.acceptedCard}`}>
              <strong>{counts.accepted}</strong>
              <span>Aceptadas</span>
            </article>

            <article className={`${styles.summaryCard} ${styles.rejectedCard}`}>
              <strong>{counts.rejected}</strong>
              <span>Rechazadas</span>
            </article>
          </section>

          <section className={styles.requestsSection}>
            <div className={styles.toolbar}>
              <div className={styles.filters} aria-label="Filtrar solicitudes">
                {filters.map((filter) => {
                  const count =
                    filter.value === "Todas"
                      ? counts.total
                      : mockRequests.filter(
                          (request) => request.status === filter.value,
                        ).length;

                  return (
                    <button
                      key={filter.value}
                      type="button"
                      className={`${styles.filterButton} ${
                        activeFilter === filter.value ? styles.filterActive : ""
                      }`}
                      onClick={() => setActiveFilter(filter.value)}
                      aria-pressed={activeFilter === filter.value}
                    >
                      {filter.label}
                      <span className={styles.filterCount}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <label className={styles.searchBox}>
              <Search size={15} />
              <input
                type="search"
                placeholder="Buscar solicitud..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                aria-label="Buscar solicitudes"
              />
            </label>

            {filteredRequests.length > 0 ? (
              <div className={styles.requestGrid}>
                {filteredRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onViewDetails={handleViewDetails}
                    onCoordinate={handleCoordinate}
                    onFindProvider={handleFindProvider}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <ClipboardList size={28} />
                <h2>No encontramos solicitudes</h2>
                <p>
                  Probá cambiar el filtro o utilizar otro término de búsqueda.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("Todas");
                    setSearchTerm("");
                  }}
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default MyRequests;
