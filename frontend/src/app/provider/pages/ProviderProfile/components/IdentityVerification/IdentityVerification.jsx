import {
  ShieldCheck,
  CheckCircle2,
  Clock3,
  IdCard,
  Phone,
  Mail,
} from "lucide-react";

import styles from "./IdentityVerification.module.css";

const IdentityVerification = () => {
  const verifications = [
    {
      id: "identity",
      label: "Identidad",
      description: "Documento de identidad",
      status: "verified",
      icon: IdCard,
    },
    {
      id: "phone",
      label: "Teléfono",
      description: "Número de teléfono",
      status: "verified",
      icon: Phone,
    },
    {
      id: "email",
      label: "Correo electrónico",
      description: "Dirección de correo electrónico",
      status: "pending",
      icon: Mail,
    },
  ];

  const getStatusInfo = (status) => {
    if (status === "verified") {
      return {
        label: "Verificado",
        icon: CheckCircle2,
        className: styles.verifiedStatus,
      };
    }

    return {
      label: "Pendiente",
      icon: Clock3,
      className: styles.pendingStatus,
    };
  };

  return (
    <section className={styles.identityVerification}>
      <div className={styles.cardHeader}>
        <div className={styles.headerIcon}>
          <ShieldCheck size={22} />
        </div>

        <div>
          <h2 className={styles.title}>Verificación de identidad</h2>

          <p className={styles.subtitle}>
            Consultá el estado de verificación de tus datos.
          </p>
        </div>
      </div>

      <div className={styles.verificationList}>
        {verifications.map((verification) => {
          const Icon = verification.icon;
          const statusInfo = getStatusInfo(verification.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div className={styles.verificationItem} key={verification.id}>
              <div className={styles.verificationIcon}>
                <Icon size={20} aria-hidden="true" />
              </div>

              <div className={styles.verificationInfo}>
                <span className={styles.verificationLabel}>
                  {verification.label}
                </span>

                <span className={styles.verificationDescription}>
                  {verification.description}
                </span>
              </div>

              <span className={`${styles.status} ${statusInfo.className}`}>
                <StatusIcon size={15} aria-hidden="true" />
                {statusInfo.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className={styles.securityNotice}>
        <ShieldCheck size={18} aria-hidden="true" />

        <p>
          Mantener tus datos verificados ayuda a generar confianza entre los
          clientes.
        </p>
      </div>
    </section>
  );
};

export default IdentityVerification;
