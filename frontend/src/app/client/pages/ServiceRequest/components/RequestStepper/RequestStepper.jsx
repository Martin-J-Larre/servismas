import { Check, ChevronRight } from "lucide-react";
import styles from "./RequestStepper.module.css";

const steps = [
  { id: 1, label: "Datos del servicio" },
  { id: 2, label: "Confirmar solicitud" },
];

const RequestStepper = ({ currentStep = 1 }) => {
  return (
    <nav className={styles.stepper} aria-label="Progreso de la solicitud">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        return (
          <div className={styles.stepGroup} key={step.id}>
            <div
              className={[
                styles.step,
                isActive ? styles.active : "",
                isCompleted ? styles.completed : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-current={isActive ? "step" : undefined}
            >
              <span className={styles.stepNumber}>
                {isCompleted ? <Check size={12} aria-hidden="true" /> : step.id}
              </span>

              <span className={styles.stepLabel}>{step.label}</span>
            </div>

            {index < steps.length - 1 && (
              <ChevronRight
                className={styles.separator}
                size={14}
                aria-hidden="true"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default RequestStepper;
