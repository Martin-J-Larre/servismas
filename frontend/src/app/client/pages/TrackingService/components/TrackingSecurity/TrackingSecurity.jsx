import { Info, ShieldCheck } from "lucide-react";

import styles from "./TrackingSecurity.module.css";

const TrackingSecurity = () => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <ShieldCheck size={17} />
        </div>

        <h2 className={styles.title}>Consejos de seguridad</h2>
      </div>

      <ul className={styles.list}>
        <li>Verificá los datos del prestador antes de comenzar.</li>
        <li>Confirmá el alcance del trabajo y el presupuesto acordado.</li>
        <li>Conservá los datos de la contratación para futuras consultas.</li>
      </ul>

      <div className={styles.notice}>
        <Info size={14} />
        <p>
          Si surge un inconveniente, utilizá los canales de contacto disponibles
          para comunicarte con la otra parte.
        </p>
      </div>
    </section>
  );
};

export default TrackingSecurity;
