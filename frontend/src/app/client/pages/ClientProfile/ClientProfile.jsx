import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";

import HeaderClient from "../../components/HeaderClient/HeaderClient";
import ProfileSummary from "./components/ProfileSummary/ProfileSummary";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import ProfilePreferences from "./components/ProfilePreferences/ProfilePreferences";
import AccountSecurity from "./components/AccountSecurity/AccountSecurity";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";

import styles from "./ClientProfile.module.css";

const initialClient = {
  firstName: "María",
  lastName: "Gómez",
  city: "Córdoba, Argentina",
  email: "maria.gomez@email.com",
  phone: "+54 351 555-1234",
};

const ClientProfile = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState(initialClient);
  const [formData, setFormData] = useState(initialClient);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setFormData({ ...client });
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveProfile = (event) => {
    event.preventDefault();

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.city.trim() ||
      !formData.email.trim()
    ) {
      toast.error("Completá todos los campos obligatorios.");
      return;
    }

    setClient({ ...formData });
    setIsEditing(false);
    toast.success("Los cambios se actualizaron correctamente.");
  };

  const handleCancelEdit = () => {
    setFormData({ ...client });
    setIsEditing(false);
  };

  return (
    <div className={styles.page}>
      <HeaderClient />

      <main className={styles.container}>
        <div className={styles.pageHeader}>
          <div className={styles.heading}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => navigate(-1)}
              aria-label="Volver a la página anterior"
            >
              <ArrowLeft size={15} />
            </button>

            <div>
              <h1 className={styles.pageTitle}>Mi perfil</h1>
              <p className={styles.pageDescription}>
                Administrá tu información personal y las preferencias de tu
                cuenta.
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              type="button"
              className={styles.editButton}
              onClick={handleEditProfile}
            >
              <Pencil size={14} />
              Editar perfil
            </button>
          )}
        </div>

        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <ProfileSummary client={client} />

            {isEditing ? (
              <form className={styles.editCard} onSubmit={handleSaveProfile}>
                <header className={styles.cardHeader}>
                  <div>
                    <h2 className={styles.cardTitle}>
                      Editar información personal
                    </h2>
                    <p className={styles.cardDescription}>
                      Modificá tus datos y guardá los cambios.
                    </p>
                  </div>
                </header>

                <div className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label htmlFor="firstName">Nombre *</label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="lastName">Apellido *</label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="city">Ciudad *</label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formField}>
                    <label htmlFor="phone">Teléfono</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <label htmlFor="email">Correo electrónico *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={handleCancelEdit}
                  >
                    <X size={14} />
                    Cancelar
                  </button>

                  <button type="submit" className={styles.saveButton}>
                    <Save size={14} />
                    Guardar cambios
                  </button>
                </div>
              </form>
            ) : (
              <PersonalInformation client={client} />
            )}

            <ProfilePreferences />

            <AccountSecurity client={client} />
          </div>

          <ProfileSidebar client={client} onEditProfile={handleEditProfile} />
        </div>

        <div className={styles.footerNote}>
          <Check size={13} />
          Tus datos personales se utilizan para gestionar tu experiencia en
          ServisMás.
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;
