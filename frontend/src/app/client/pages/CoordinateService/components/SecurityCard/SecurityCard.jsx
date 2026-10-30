import { ShieldCheck, Check, FileText } from "lucide-react";

import styles from "./SecurityCard.module.css";

const securityItems = [
  {
    id: "verified",
    icon: ShieldCheck,
    text: "Prestador verificado por ServisMás",
  },
  {
    id: "accepted",
    icon: Check,
    text: "Solicitud aceptada formalmente",
  },
  {
    id: "conditions",
    icon: FileText,
    text: "Condiciones acordadas por escrito",
  },
];

const SecurityCard = () => {
  return (
    <section className={styles.securityCard}>
      <h2 className={styles.securityTitle}>Tu seguridad en ServisMás</h2>

      <ul className={styles.securityList}>
        {securityItems.map(({ id, icon: Icon, text }) => (
          <li key={id} className={styles.securityItem}>
            <span className={styles.securityIcon}>
              <Icon size={15} aria-hidden="true" />
            </span>

            <span className={styles.securityText}>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SecurityCard;
