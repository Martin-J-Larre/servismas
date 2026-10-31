import styles from "./FinalizeServiceHeader.module.css";

const FinalizeServiceHeader = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>¿Finalizar servicio?</h1>

      <p className={styles.description}>
        ¿Confirmás que el servicio fue realizado y finalizado?
      </p>
    </div>
  );
};

export default FinalizeServiceHeader;
