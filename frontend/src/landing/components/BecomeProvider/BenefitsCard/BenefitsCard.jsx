import { Check } from "lucide-react";
import styles from "./BenefitsCard.module.css";

const benefits = [
  "Publicá tus servicios",
  "Definí tu área de trabajo",
  "Gestioná tu disponibilidad",
  "Recibí solicitudes",
];

function BenefitsCard() {
  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span className={styles.label}>Tu perfil profesional</span>

        <h3 className={styles.title}>Listo para recibir clientes</h3>
      </header>

      <ul className={styles.benefits}>
        {benefits.map((benefit) => (
          <li key={benefit} className={styles.benefit}>
            <span className={styles.check}>
              <Check size={13} aria-hidden="true" />
            </span>

            {benefit}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default BenefitsCard;
