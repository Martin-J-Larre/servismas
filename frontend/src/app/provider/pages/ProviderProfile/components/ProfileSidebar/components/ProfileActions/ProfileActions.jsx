import { useNavigate } from "react-router-dom";
import { Pencil, ArrowLeft } from "lucide-react";

import styles from "./ProfileActions.module.css";

const ProfileActions = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/app/prestador/mi-perfil/editar");
  };

  const handleBackToDashboard = () => {
    navigate("/app/prestador");
  };

  return (
    <section className={styles.profileActions}>
      <h2 className={styles.title}>Acciones</h2>

      <div className={styles.actionsList}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleEditProfile}
        >
          <Pencil size={17} />
          Editar perfil
        </button>

        <button
          type="button"
          className={styles.secondaryButton}
          onClick={handleBackToDashboard}
        >
          <ArrowLeft size={17} />
          Volver al panel
        </button>
      </div>
    </section>
  );
};

export default ProfileActions;
