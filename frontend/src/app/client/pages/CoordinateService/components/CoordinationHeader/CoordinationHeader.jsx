import styles from "./CoordinationHeader.module.css";

const CoordinationHeader = ({ eyebrow, title, description }) => {
  return (
    <header className={styles.pageHeader}>
      <span className={styles.eyebrow}>{eyebrow}</span>

      <h1 className={styles.title}>{title}</h1>

      <p className={styles.subtitle}>{description}</p>
    </header>
  );
};

export default CoordinationHeader;
