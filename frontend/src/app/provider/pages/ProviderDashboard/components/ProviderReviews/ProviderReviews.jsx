import { Star, UserRound } from "lucide-react";

import styles from "./ProviderReviews.module.css";

const reviews = [
  {
    id: 1,
    clientName: "María González",
    date: "5 de agosto de 2026",
    rating: 5,
    comment:
      "Excelente trabajo. Fue muy puntual, profesional y dejó todo funcionando perfectamente. Muy recomendable.",
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    date: "7 de agosto de 2026",
    rating: 5,
    comment:
      "Muy buena atención y predisposición. Solucionó el problema rápidamente y explicó todo con claridad.",
  },
  {
    id: 3,
    clientName: "Lucía Fernández",
    date: "9 de agosto de 2026",
    rating: 4,
    comment:
      "Buen servicio y muy responsable. El trabajo quedó bien realizado y cumplió con lo acordado.",
  },
  {
    id: 4,
    clientName: "Juan Pérez",
    date: "11 de agosto de 2026",
    rating: 5,
    comment:
      "Muy conforme con el resultado. Destaco la atención y la calidad del trabajo realizado.",
  },
];

const averageRating = 4.8;
const totalReviews = 124;

const ratingDistribution = [
  { stars: 5, count: 96 },
  { stars: 4, count: 20 },
  { stars: 3, count: 6 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

const formatRating = (rating) =>
  Number(rating).toLocaleString("es-AR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const StarRating = ({ rating }) => (
  <div className={styles.stars} aria-label={`${rating} de 5 estrellas`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={15}
        fill={index < rating ? "currentColor" : "none"}
        aria-hidden="true"
      />
    ))}
  </div>
);

const ProviderReviews = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Calificaciones y reseñas</h2>
          <p>Conocé las opiniones de los clientes sobre tu trabajo.</p>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.average}>
          <strong>{formatRating(averageRating)}</strong>

          <StarRating rating={5} />

          <span>{totalReviews} valoraciones</span>
        </div>

        <div className={styles.distribution}>
          {ratingDistribution.map((item) => (
            <div className={styles.ratingRow} key={item.stars}>
              <span>{item.stars}</span>

              <Star size={13} fill="currentColor" aria-hidden="true" />

              <div className={styles.progressTrack}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${(item.count / totalReviews) * 100}%`,
                  }}
                />
              </div>

              <span className={styles.ratingCount}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewHeader}>
        <h3>Opiniones de clientes</h3>
        <span>{reviews.length} reseñas recientes</span>
      </div>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <article className={styles.reviewCard} key={review.id}>
            <div className={styles.reviewMain}>
              <div className={styles.avatar} aria-hidden="true">
                <UserRound size={18} />
              </div>

              <div className={styles.reviewInfo}>
                <div className={styles.reviewTitle}>
                  <h4>{review.clientName}</h4>
                  <StarRating rating={review.rating} />
                </div>

                <span className={styles.date}>{review.date}</span>

                <p className={styles.comment}>{review.comment}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProviderReviews;
