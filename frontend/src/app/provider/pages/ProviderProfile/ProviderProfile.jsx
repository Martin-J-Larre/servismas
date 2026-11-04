import { useEffect, useState } from "react";

import {
  getMyProfile,
  getMyProviderProfile,
} from "../../../../services/auth.service";

import styles from "./ProviderProfile.module.css";

import AppHeader from "../../../components/AppHeader/AppHeader";
import ProfileOverview from "./components/ProfileOverview/ProfileOverview";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import ProfessionalInformation from "./components/ProfessionalInformation/ProfessionalInformation";
import ProviderReputation from "./components/ProviderReputation/ProviderReputation";
import IdentityVerification from "./components/IdentityVerification/IdentityVerification";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";

const ProviderProfile = () => {
  const [user, setUser] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

        setUser(userResponse.user);
        setProvider(providerResponse.provider);

        console.log("Datos personales:", userResponse.user);
        console.log("Datos profesionales:", providerResponse.provider);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("No se pudo cargar la información del perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (isLoading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <AppHeader />

      <main className={styles.profilePage}>
        <section className={styles.pageHeader}>
          <div className={styles.headerContent}>
            <p className={styles.breadcrumb}>Volver al panel</p>

            <h1 className={styles.title}>Mi perfil</h1>

            <p className={styles.description}>
              Gestioná tu información personal y profesional.
            </p>
          </div>
        </section>

        <div className={styles.profileLayout}>
          <div className={styles.profileContent}>
            <ProfileOverview user={user} provider={provider} />
            <PersonalInformation user={user} />
            <ProfessionalInformation provider={provider} />
            <ProviderReputation />
            <IdentityVerification provider={provider} />
          </div>

          <ProfileSidebar user={user} provider={provider} />
        </div>
      </main>
    </>
  );
};

export default ProviderProfile;
