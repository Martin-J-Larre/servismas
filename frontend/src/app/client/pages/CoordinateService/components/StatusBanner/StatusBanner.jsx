import { CheckCircle2 } from "lucide-react";
import styles from "./StatusBanner.module.css";

const StatusBanner = ({ title, description }) => {
  return (
    <section className={styles.statusBanner}>
      <div className={styles.bannerIcon}>
        <CheckCircle2 size={18} />
      </div>

      <div className={styles.bannerContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  );
};

export default StatusBanner;
