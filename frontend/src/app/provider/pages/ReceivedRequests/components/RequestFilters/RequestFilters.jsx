import styles from "./RequestFilters.module.css";

const filters = [
  { id: "all", label: "Todas" },
  { id: "pending", label: "Pendientes" },
  { id: "accepted", label: "Aceptadas" },
  { id: "rejected", label: "Rechazadas" },
];

const RequestFilters = ({ activeFilter, onFilterChange, requests }) => {
  const getCount = (filterId) => {
    if (filterId === "all") {
      return requests.length;
    }

    return requests.filter((request) => request.status === filterId).length;
  };

  return (
    <nav className={styles.filters} aria-label="Filtrar solicitudes">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;
        const count = getCount(filter.id);

        return (
          <button
            key={filter.id}
            type="button"
            className={`${styles.filterButton} ${
              isActive ? styles.active : ""
            }`}
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={isActive}
          >
            <span>{filter.label}</span>
            <span
              className={`${styles.count} ${
                isActive ? styles.activeCount : ""
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default RequestFilters;
