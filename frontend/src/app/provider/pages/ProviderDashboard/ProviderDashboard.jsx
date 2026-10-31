import HeaderClient from "../../../client/components/HeaderClient/HeaderClient";

import ProviderWelcome from "../components/ProviderWelcome/ProviderWelcome";
import ProviderStats from "../components/ProviderStats/ProviderStats";
import RecentRequests from "../components/RecentRequests/RecentRequests";
import ProviderServices from "../components/ProviderServices/ProviderServices";
import ProviderAvailability from "../components/ProviderAvailability/ProviderAvailability";

import styles from "./ProviderDashboard.module.css";

const ProviderDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <HeaderClient />

      <main className={styles.main}>
        <ProviderWelcome name="Juan" />

        <ProviderStats
          publishedServices={3}
          pendingRequests={2}
          completedServices={24}
          rating={4.8}
          reviewCount={124}
        />

        <div className={styles.content}>
          <RecentRequests />

          <ProviderServices />

          <ProviderAvailability />
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
