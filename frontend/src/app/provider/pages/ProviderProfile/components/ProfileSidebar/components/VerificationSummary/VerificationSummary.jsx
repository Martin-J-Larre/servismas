import { ShieldCheck, CheckCircle2, Clock3 } from "lucide-react";

import styles from "./VerificationSummary.module.css";

const VerificationSummary = ({ provider }) => {
  const verifications = [
    {
      id: "identity",
      label: "Identidad",
      status:
        provider?.verificationStatus === "verificado" ? "verified" : "pending",
    },
    {
      id: "phone",
      label: "Teléfono",
      status: "verified",
    },
    {
      id: "email",
      label: "Correo electrónico",
      status: "pending",
    },
  ];

  return (
    <section className={styles.verificationSummary}>
      <div className={styles.cardHeader}>
        <ShieldCheck size={20} aria-hidden="true" />

        <h2 className={styles.title}>Verificaciones</h2>
      </div>

      <div className={styles.verificationList}>
        {verifications.map((verification) => {
          const isVerified = verification.status === "verified";

          return (
            <div className={styles.verificationItem} key={verification.id}>
              <span className={styles.label}>{verification.label}</span>

              <span
                className={`${styles.status} ${
                  isVerified ? styles.verified : styles.pending
                }`}
              >
                {isVerified ? (
                  <CheckCircle2 size={14} aria-hidden="true" />
                ) : (
                  <Clock3 size={14} aria-hidden="true" />
                )}

                {isVerified ? "Verificado" : "Pendiente"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VerificationSummary;
