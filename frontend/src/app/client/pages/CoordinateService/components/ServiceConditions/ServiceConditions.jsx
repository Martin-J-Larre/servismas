import { CheckCircle2 } from "lucide-react";

import styles from "./ServiceConditions.module.css";

const conditions = [
  "El prestador se compromete a asistir en la fecha y el horario acordados.",
  "El presupuesto puede variar según las características del trabajo.",
  "Cualquier modificación deberá coordinarse directamente entre ambas partes.",
  "La confirmación implica aceptar las condiciones acordadas y autorizar la visita del prestador al domicilio indicado.",
];

const ServiceConditions = () => {
  return (
    <section className={styles.card}>
      <h2 className={styles.cardTitle}>Condiciones del servicio</h2>

      <ul className={styles.conditionsList}>
        {conditions.map((condition) => (
          <li key={condition} className={styles.conditionItem}>
            <CheckCircle2
              size={16}
              className={styles.conditionIcon}
              aria-hidden="true"
            />

            <span>{condition}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceConditions;
