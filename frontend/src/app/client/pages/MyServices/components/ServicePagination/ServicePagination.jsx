import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./ServicePagination.module.css";

const ServicePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav className={styles.pagination} aria-label="Paginación del historial">
      <button
        type="button"
        className={styles.navigationButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} aria-hidden="true" />
        <span>Anterior</span>
      </button>

      <div className={styles.pageNumbers}>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${
              currentPage === page ? styles.activePage : ""
            }`}
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        <span>Siguiente</span>
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  );
};

export default ServicePagination;