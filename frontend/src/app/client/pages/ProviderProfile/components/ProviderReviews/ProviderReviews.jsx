import { Star } from "lucide-react";
import styles from "./ProviderReviews.module.css";

const ProviderReviews = ({ reviews = [] }) => {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : 0;

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Opiniones de clientes</h2>
          <p className={styles.subtitle}>
            Experiencias de personas que contrataron este servicio.
          </p>
        </div>

        {reviews.length > 0 && (
          <div className={styles.ratingSummary}>
            <Star size={20} fill="currentColor" aria-hidden="true" />

            <span className={styles.average}>{averageRating.toFixed(1)}</span>

            <span className={styles.reviewCount}>
              ({reviews.length} {reviews.length === 1 ? "opinión" : "opiniones"}
              )
            </span>
          </div>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review, index) => (
            <article className={styles.review} key={review.id ?? index}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar}>
                  {review.clientName?.charAt(0).toUpperCase() ?? "C"}
                </div>

                <div className={styles.clientInfo}>
                  <h3>{review.clientName || "Cliente"}</h3>

                  {review.date && (
                    <span className={styles.date}>{review.date}</span>
                  )}
                </div>

                <div
                  className={styles.rating}
                  aria-label={`${review.rating} de 5 estrellas`}
                >
                  <Star size={16} fill="currentColor" aria-hidden="true" />

                  <span>{review.rating}</span>
                </div>
              </div>

              <p className={styles.comment}>
                {review.comment || "Sin comentario."}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.emptyMessage}>
          Este prestador todavía no tiene opiniones de clientes.
        </p>
      )}
    </section>
  );
};

export default ProviderReviews;
