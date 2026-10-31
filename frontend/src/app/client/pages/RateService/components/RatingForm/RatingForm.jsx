import { useState } from "react";
import { Check, Star } from "lucide-react";

import styles from "./RatingForm.module.css";

const RatingForm = ({ onPublish, onSkip }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rating < 1 || rating > 5) {
      setError("Seleccioná una calificación de 1 a 5 estrellas.");
      return;
    }

    setError("");
    onPublish(rating, review);
  };

  const displayedRating = hoveredRating || rating;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset className={styles.ratingField}>
        <legend className={styles.ratingLabel}>Calificá el servicio</legend>

        <div className={styles.stars} onMouseLeave={() => setHoveredRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`${styles.starButton} ${
                star <= displayedRating ? styles.activeStar : ""
              }`}
              onMouseEnter={() => setHoveredRating(star)}
              onFocus={() => setHoveredRating(star)}
              onBlur={() => setHoveredRating(0)}
              onClick={() => {
                setRating(star);
                setError("");
              }}
              aria-label={`${star} ${star === 1 ? "estrella" : "estrellas"}`}
              aria-pressed={rating === star}
            >
              <Star
                size={23}
                strokeWidth={1.6}
                fill={star <= displayedRating ? "currentColor" : "none"}
              />
            </button>
          ))}
        </div>

        <p className={styles.ratingHint} aria-live="polite">
          {rating === 0
            ? "Seleccioná de 1 a 5 estrellas"
            : `${rating} de 5 estrellas`}
        </p>
      </fieldset>

      <div className={styles.reviewField}>
        <label htmlFor="service-review" className={styles.reviewLabel}>
          Dejá una reseña <span>(opcional)</span>
        </label>

        <textarea
          id="service-review"
          className={styles.textarea}
          placeholder="Contanos cómo fue tu experiencia con el servicio."
          value={review}
          onChange={(event) => setReview(event.target.value)}
          maxLength={500}
          rows={4}
        />

        <div className={styles.reviewFooter}>
          <span>Tu opinión ayuda a otros clientes.</span>
          <span>{review.length}/500</span>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.publishButton}>
          <Star size={13} />
          Publicar valoración
        </button>

        <button type="button" className={styles.skipButton} onClick={onSkip}>
          Ahora no
        </button>
      </div>

      <p className={styles.footerNote}>
        <Check size={11} />
        Tu valoración ayudará a otros clientes a conocer la experiencia con este
        prestador.
      </p>
    </form>
  );
};

export default RatingForm;
