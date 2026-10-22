import styles from "./StepCard.module.css";

function StepCard({ number, icon, title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>

        <span className={styles.number}>{number}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </article>
  );
}

export default StepCard;
