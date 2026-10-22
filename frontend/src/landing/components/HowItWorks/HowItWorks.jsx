
import { Search, UserRound, Check } from "lucide-react";
import styles from "./HowItWorks.module.css";
import StepCard from "./StepCard/StepCard";

const steps = [
  {
    number: "01",
    title: "Buscá",
    description: "Encontrá el servicio que necesitás.",
    icon: <Search />,
  },
  {
    number: "02",
    title: "Elegí",
    description: "Consultá los prestadores, sus perfiles y valoraciones.",
    icon: <UserRound />,
  },
  {
    number: "03",
    title: "Contratá",
    description: "Coordiná el servicio de forma simple y segura.",
    icon: <Check />,
  },
];

function HowItWorks() {
  return (
    <section className={styles.section} id="como-funciona">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>SIMPLE Y SEGURO</span>

          <h2 className={styles.title}>¿Cómo funciona?</h2>

          <p className={styles.description}>
            Encontrá la persona indicada para resolver lo que necesitás
            en solo tres simples pasos.
          </p>
        </header>

        <div className={styles.steps}>
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

