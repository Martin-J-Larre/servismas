import { Star, MessageSquareQuote } from "lucide-react";
import styles from "./ProviderReputation.module.css";

const ProviderReputation = () => {
  const reputation = {
    rating: 4.8,
    totalReviews: 124,
    distribution: [
      { stars: 5, count: 90 },
      { stars: 4, count: 22 },
      { stars: 3, count: 8 },
      { stars: 2, count: 3 },
      { stars: 1, count: 1 },
    ],
    reviews: [
      {
        id: 1,
        author: "María González",
        rating: 5,
        date: "15/10/2026",
        comment:
          "Excelente servicio. Fue puntual, trabajó de manera prolija y resolvió el problema rápidamente.",
      },
      {
        id: 2,
        author: "Carlos Rodríguez",
        rating: 4,
        date: "08/10/2026",
        comment: "Muy buena atención y trabajo de calidad. Lo recomiendo.",
      },
    ],
  };

  return (
    <section className={styles.providerReputation}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Reputación y reseñas</h2>

        <p className={styles.subtitle}>
          Conocé las valoraciones que recibiste de tus clientes.
        </p>
      </div>

      <div className={styles.reputationSummary}>
        <div className={styles.ratingOverview}>
          <strong className={styles.ratingValue}>
            {reputation.rating.toFixed(1)}
          </strong>

          <div
            className={styles.ratingStars}
            aria-label={`Calificación de ${reputation.rating} sobre 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={20}
                fill={
                  index < Math.round(reputation.rating)
                    ? "currentColor"
                    : "none"
                }
              />
            ))}
          </div>

          <span className={styles.reviewCount}>
            {reputation.totalReviews} reseñas
          </span>
        </div>

        <div className={styles.ratingDistribution}>
          {reputation.distribution.map((item) => {
            const percentage = (item.count / reputation.totalReviews) * 100;

            return (
              <div className={styles.distributionRow} key={item.stars}>
                <span className={styles.starLabel}>{item.stars}</span>

                <Star
                  className={styles.distributionStar}
                  size={14}
                  fill="currentColor"
                />

                <div
                  className={styles.progressTrack}
                  role="progressbar"
                  aria-label={`${item.stars} estrellas`}
                  aria-valuenow={item.count}
                  aria-valuemin={0}
                  aria-valuemax={reputation.totalReviews}
                >
                  <div
                    className={styles.progressBar}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className={styles.distributionCount}>{item.count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <div className={styles.reviewsHeader}>
          <h3 className={styles.reviewsTitle}>Opiniones de clientes</h3>

          <span className={styles.reviewsTotal}>
            {reputation.totalReviews} en total
          </span>
        </div>

        <div className={styles.reviewsList}>
          {reputation.reviews.map((review) => (
            <article className={styles.reviewItem} key={review.id}>
              <div className={styles.reviewAvatar} aria-hidden="true">
                {review.author
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div className={styles.reviewContent}>
                <div className={styles.reviewTop}>
                  <div className={styles.reviewAuthorInfo}>
                    <h4 className={styles.reviewAuthor}>{review.author}</h4>

                    <span className={styles.reviewDate}>{review.date}</span>
                  </div>

                  <div
                    className={styles.reviewRating}
                    aria-label={`${review.rating} de 5 estrellas`}
                  >
                    {Array.from({ length: review.rating }, (_, index) => (
                      <Star key={index} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>

                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.reviewsFooter}>
          <MessageSquareQuote size={16} />

          <span>Las opiniones ayudan a construir tu reputación.</span>
        </div>
      </div>
    </section>
  );
};

export default ProviderReputation;
