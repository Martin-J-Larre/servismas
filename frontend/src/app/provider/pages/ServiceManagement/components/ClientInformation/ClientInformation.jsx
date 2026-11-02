import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import styles from "./ClientInformation.module.css";

const ClientInformation = ({ request }) => {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconWrapper}>
          <UserRound size={16} aria-hidden="true" />
        </div>

        <div>
          <h3>Información del cliente</h3>
          <p>Datos de contacto del cliente</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.client}>
          <div className={styles.avatar} aria-hidden="true">
            {request.initials || request.clientName?.charAt(0) || "C"}
          </div>

          <div className={styles.clientDetails}>
            <span className={styles.label}>Nombre completo</span>
            <p className={styles.value}>
              {request.clientName || "No especificado"}
            </p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <Phone size={15} aria-hidden="true" />
          <div>
            <span className={styles.label}>Teléfono</span>
            <p className={styles.value}>
              {request.clientPhone || "No disponible"}
            </p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <Mail size={15} aria-hidden="true" />
          <div>
            <span className={styles.label}>Correo electrónico</span>
            <p className={styles.value}>
              {request.clientEmail || "No disponible"}
            </p>
          </div>
        </div>

        <div className={styles.contactItem}>
          <MapPin size={15} aria-hidden="true" />
          <div>
            <span className={styles.label}>Dirección del servicio</span>
            <p className={styles.value}>
              {request.location || "A coordinar con el cliente"}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.notice}>
        Los datos de contacto se utilizan exclusivamente para coordinar el
        servicio solicitado.
      </div>
    </section>
  );
};

export default ClientInformation;
