import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { toast } from "react-toastify";

//TODO: MANDAR ESTE COMPONENTE AFUERA DE LA CARPETA PROFILE Y HACER SU PROPIA CARPETA EN PAGE. PERO ANTES VERIFICAR LAS IMPLICANCIAS DE HACER ESO, YA QUE ESTE COMPONENTE DEPENDE DE LA INFORMACION DEL PERFIL Y SI LO SACAMOS DE LA CARPETA PROFILE, PUEDE QUE NO TENGA ACCESO A ESA INFORMACION.

import {
  getMyProfile,
  getMyProviderProfile,
  updateMyProfile,
  updateMyProviderProfile,
} from "../../../../../../services/auth.service";

import AppHeader from "../../../../../components/AppHeader/AppHeader";
import AddressAutocomplete from "../../../../../components/AddressAutocomplete/AddressAutocomplete";

import styles from "./ProviderProfileEdit.module.css";

const emptyUser = {
  firstName: "",
  lastName: "",
  address: null,
  email: "",
  phone: "",
};

const emptyProvider = {
  experience: "",
};

const ProviderProfileEdit = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(emptyUser);
  const [provider, setProvider] = useState(emptyProvider);

  const [formData, setFormData] = useState({
    ...emptyUser,
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [userResponse, providerResponse] = await Promise.all([
          getMyProfile(),
          getMyProviderProfile(),
        ]);

        const userData = {
          firstName: userResponse.user.firstName ?? "",
          lastName: userResponse.user.lastName ?? "",
          address: userResponse.user.address ?? null,
          email: userResponse.user.email ?? "",
          phone: userResponse.user.phone ?? "",
        };

        const providerData = {
          experience: providerResponse.provider.experience ?? "",
        };

        setUser(userData);
        setProvider(providerData);

        setFormData({
          ...userData,
          ...providerData,
        });
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("No se pudo cargar la información del perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

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

    if (
      formData.address &&
      (!formData.address.street?.trim() ||
        !formData.address.locality?.trim() ||
        !formData.address.province?.trim() ||
        formData.address.latitude == null ||
        formData.address.longitude == null)
    ) {
      toast.error("Seleccioná una dirección válida.");
      return;
    }

    try {
      setIsSaving(true);

      await updateMyProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
      });

      await updateMyProviderProfile({
        experience: formData.experience,
      });

      toast.success("El perfil se actualizó correctamente.");

      navigate("/app/prestador/mi-perfil");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);

      toast.error(error.message || "No se pudieron guardar todos los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/app/prestador/mi-perfil");
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <AppHeader />
        <main className={styles.container}>
          <p>Cargando información del perfil...</p>
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
          <button
            type="button"
            onClick={() => navigate("/app/prestador/mi-perfil")}
          >
            Volver al perfil
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
              onClick={handleCancel}
              aria-label="Volver al perfil"
            >
              <ArrowLeft size={16} />
            </button>

            <div>
              <h1 className={styles.pageTitle}>Editar perfil</h1>
              <p className={styles.pageDescription}>
                Actualizá tu información personal y profesional.
              </p>
            </div>
          </div>
        </div>

        <form className={styles.editCard} onSubmit={handleSaveProfile}>
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Información personal</h2>

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

              <div className={styles.formField}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  readOnly
                />
                <small>El correo electrónico no se puede modificar.</small>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Información profesional</h2>

            <div className={styles.formField}>
              <label htmlFor="experience">Experiencia profesional</label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                maxLength={255}
                rows={4}
                placeholder="Contanos sobre tu experiencia profesional..."
              />
              <small>
                Máximo 255 caracteres. {formData.experience.length}/255
              </small>
            </div>
          </section>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X size={15} />
              Cancelar
            </button>

            <button
              type="submit"
              className={styles.saveButton}
              disabled={isSaving}
            >
              <Save size={15} />
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProviderProfileEdit;
