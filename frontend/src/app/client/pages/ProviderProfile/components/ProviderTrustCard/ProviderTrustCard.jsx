import { ShieldCheck, UserCheck, Star, MessageCircle } from "lucide-react";
import styles from "./ProviderTrustCard.module.css";

const trustFeatures = [
  {
    id: 1,
    icon: UserCheck,
    title: "Información del prestador",
    description:
      "Consultá su perfil, especialidad y área de servicio antes de elegir.",
  },
  {
    id: 2,
    icon: Star,
    title: "Opiniones de clientes",
    description:
      "Revisá las valoraciones disponibles para conocer otras experiencias.",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "Información clara",
    description:
      "Conocé los detalles del servicio antes de iniciar una contratación.",
  },
];

const ProviderTrustCard = () => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <ShieldCheck size={22} aria-hidden="true" />
        </div>

        <h2 className={styles.title}>¿Por qué confiar en ServisMás?</h2>
      </div>

      <div className={styles.features}>
        {trustFeatures.map(({ id, icon: Icon, title, description }) => (
          <article className={styles.feature} key={id}>
            <div className={styles.featureIcon}>
              <Icon size={19} aria-hidden="true" />
            </div>

            <div className={styles.featureContent}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.disclaimer}>
        Te recomendamos revisar la información disponible y acordar los detalles
        del servicio antes de contratar.
      </p>
    </section>
  );
};

export default ProviderTrustCard;
