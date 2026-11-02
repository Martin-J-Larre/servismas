import styles from "./ProfileSidebar.module.css";

import ProfileActions from "./components/ProfileActions/ProfileActions";
import ProfileSummary from "./components/ProfileSummary/ProfileSummary";
import VerificationSummary from "./components/VerificationSummary/VerificationSummary";

const ProfileSidebar = () => {
  return (
    <aside className={styles.profileSidebar}>
      <ProfileActions />
      <ProfileSummary />
      <VerificationSummary />
    </aside>
  );
};

export default ProfileSidebar;
