import styles from "./ProfileSidebar.module.css";

import ProfileActions from "./components/ProfileActions/ProfileActions";
import ProfileSummary from "./components/ProfileSummary/ProfileSummary";
import VerificationSummary from "./components/VerificationSummary/VerificationSummary";

const ProfileSidebar = ({ user, provider }) => {
  return (
    <aside className={styles.profileSidebar}>
      <ProfileActions />
      <ProfileSummary user={user} />
      <VerificationSummary provider={provider} />
    </aside>
  );
};

export default ProfileSidebar;
