import { MapPin, Mail, ShieldCheck, UserRound } from "lucide-react";
import styles from "./ProfileSummary.module.css";

const ProfileSummary = ({ client }) => {
  const initials =
    `${client.firstName?.[0] ?? ""}${client.lastName?.[0] ?? ""}`.toUpperCase();

  const address = client.address;

  const streetAddress = address
    ? [address.street, address.houseNumber].filter(Boolean).join(" ")
    : "Dirección no especificada";

  const localityAddress = address
    ? [address.locality, address.province].filter(Boolean).join(", ")
    : "";

  return (
    <section className={styles.card}>
      <div className={styles.avatar} aria-label={`Iniciales: ${initials}`}>
        {initials || <UserRound size={28} />}
      </div>

      <div className={styles.info}>
        <h2 className={styles.name}>
          {client.firstName} {client.lastName}
        </h2>

        <div className={styles.details}>
          <span>
            <MapPin size={13} />
            {streetAddress}
          </span>

          {localityAddress && (
            <span>
              <MapPin size={13} />
              {localityAddress}
            </span>
          )}

          <span>
            <Mail size={13} />
            {client.email}
          </span>
        </div>

        <div className={styles.badges}>
          <span className={styles.activeBadge}>
            <ShieldCheck size={11} />
            Cuenta activa
          </span>

          <span className={styles.typeBadge}>Cliente</span>
        </div>
      </div>
    </section>
  );
};

export default ProfileSummary;
