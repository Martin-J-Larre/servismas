import styles from "./ProviderProfile.module.css";

import AppHeader from "../../../components/AppHeader/AppHeader";

import ProfileOverview from "./components/ProfileOverview/ProfileOverview";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import ProfessionalInformation from "./components/ProfessionalInformation/ProfessionalInformation";
import ProviderReputation from "./components/ProviderReputation/ProviderReputation";
import IdentityVerification from "./components/IdentityVerification/IdentityVerification";
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar";

const ProviderProfile = () => {
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
            <ProfileOverview />
            <PersonalInformation />
            <ProfessionalInformation />
            <ProviderReputation />
            <IdentityVerification />
          </div>

          <ProfileSidebar />
        </div>
      </main>
    </>
  );
};

export default ProviderProfile;
