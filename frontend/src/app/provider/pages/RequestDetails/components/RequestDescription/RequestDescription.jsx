import { FileText, UserRound } from "lucide-react";
import styles from "./RequestDescription.module.css";

const RequestDescription = ({ description, additionalInfo }) => {
  const sections = [
    {
      title: "Descripción del servicio",
      content: description,
      Icon: FileText,
    },
    {
      title: "Información adicional",
      content: additionalInfo,
      Icon: UserRound,
    },
  ];

  return (
    <section className={styles.section}>
      {sections.map(({ title, content, Icon }) => (
        <article className={styles.card} key={title}>
          <h2 className={styles.cardTitle}>
            <Icon size={13} aria-hidden="true" />
            {title}
          </h2>

          <p className={styles.text}>
            {content || "No se proporcionó información."}
          </p>
        </article>
      ))}
    </section>
  );
};

export default RequestDescription;
