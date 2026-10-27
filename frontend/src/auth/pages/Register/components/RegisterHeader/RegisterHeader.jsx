import { Check, ArrowRight } from "lucide-react";

import styles from "./RegisterHeader.module.css";

const RegisterHeader = ({ step }) => {
  const firstStepCompleted = step > 1;

  return (
    <nav className={styles.progress} aria-label="Progreso del registro">
      <div
        className={`${styles.step} ${
          step === 1 ? styles.active : ""
        } ${firstStepCompleted ? styles.completed : ""}`}
        aria-current={step === 1 ? "step" : undefined}
      >
        <span className={styles.stepNumber}>
          {firstStepCompleted ? <Check size={15} /> : "1"}
        </span>

        <span className={styles.stepLabel}>Datos personales</span>
      </div>

      <ArrowRight className={styles.separator} size={15} aria-hidden="true" />

      <div
        className={`${styles.step} ${step === 2 ? styles.active : ""}`}
        aria-current={step === 2 ? "step" : undefined}
      >
        <span className={styles.stepNumber}>2</span>
        <span className={styles.stepLabel}>Tipo de cuenta</span>
      </div>
    </nav>
  );
};

export default RegisterHeader;
