import styles from "./ServiceCard.module.css";

function ServiceCard({ icon: Icon, title, services, color }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.iconWrapper}
        style={{
          "--icon-color": color.color,
          "--icon-background": color.background,
        }}
      >
        <Icon size={28} strokeWidth={1.8} aria-hidden="true" />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <span className={styles.label}>CATEGORÍAS</span>

      <ul className={styles.serviceList}>
        {services.map((service) => (
          <li className={styles.serviceTag} key={service}>
            {service}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default ServiceCard;
