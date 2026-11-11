import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";

import {
  getMyProfile,
  updateMyProfile,
} from "../../../../services/auth.service";

import AppHeader from "../../../components/AppHeader/AppHeader";
import AddressAutocomplete from "../../../components/AddressAutocomplete/AddressAutocomplete";
import ProfileSummary from "./components/ProfileSummary/ProfileSummary";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import ProfilePreferences from "./components/ProfilePreferences/ProfilePreferences";
import AccountSecurity from "./components/AccountSecurity/AccountSecurity";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";

import styles from "./ClientProfile.module.css";

const emptyClient = {
  firstName: "",
  lastName: "",
  address: null,
  email: "",
  phone: "",
};

const ClientProfile = () => {
  const navigate = useNavigate();

  const [client, setClient] = useState(emptyClient);
  const [formData, setFormData] = useState(emptyClient);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response = await getMyProfile();
        const user = response.user;

        const profileData = {
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          address: user.address ?? null,
          email: user.email ?? "",
          phone: user.phone ?? "",
        };

        setClient(profileData);
        setFormData(profileData);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("No se pudo cargar tu perfil. Intentá nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

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

  const handleAddressChange = (address) => {
    setFormData((previous) => ({
      ...previous,
      address,
    }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast.error("El nombre y el apellido son obligatorios.");
      return;
    }

    const address = formData.address;

    // Si existe una dirección, debe estar seleccionada correctamente.
    if (
      address &&
      (!address.street?.trim() ||
        !address.locality?.trim() ||
        !address.province?.trim() ||
        address.latitude == null ||
        address.longitude == null)
    ) {
      toast.error("Seleccioná una dirección válida.");
      return;
    }

    try {
      const response = await updateMyProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      });

      setClient(response.user);
      setFormData(response.user);
      setIsEditing(false);

      toast.success("Los cambios se actualizaron correctamente.");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);

      toast.error(error.message || "No se pudieron guardar los cambios.");
    }
  };

  const handleCancelEdit = () => {
    setFormData({ ...client });
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.container}>
          <p>Cargando perfil...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.container}>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <AppHeader />

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

                  <div className={`${styles.formField} ${styles.fullWidth}`}>
                    <AddressAutocomplete
                      mode="full"
                      placeholder="Ingresá calle y número..."
                      value={formData.address}
                      onChange={handleAddressChange}
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
