import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "../../../../app/context/AuthContext";

import styles from "./ProviderDashboard.module.css";

import AppHeader from "../../../../app/components/AppHeader/AppHeader";
import ProviderWelcome from "./components/ProviderWelcome/ProviderWelcome";
import ProviderStats from "./components/ProviderStats/ProviderStats";
import ProviderServices from "./components/ProviderServices/ProviderServices";
import RecentRequests from "./components/RecentRequests/RecentRequests";
import CompletedServices from "./components/CompletedServices/CompletedServices";
import ProviderReviews from "./components/ProviderReviews/ProviderReviews";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [activeSection, setActiveSection] = useState("published");

  const menuItems = [
    {
      label: "Mi perfil",
      to: "/prestador/perfil",
      icon: UserRound,
    },
    {
      label: "Panel principal",
      to: "/prestador/panel",
      icon: LayoutDashboard,
    },
    {
      label: "Mis servicios",
      to: "/prestador/servicios",
      icon: BriefcaseBusiness,
    },
    {
      label: "Solicitudes recibidas",
      to: "/prestador/solicitudes",
      icon: ClipboardList,
    },
  ];

  const handlePublishService = () => {
    navigate("/app/prestador/servicios/nuevo");
  };

  return (
    <div className={styles.dashboard}>
      <AppHeader />

      <main className={styles.main}>
        <ProviderWelcome
          name={user.firstName}
          onPublishService={handlePublishService}
        />

        <ProviderStats
          publishedServices={3}
          pendingRequests={2}
          completedServices={24}
          rating={4.8}
          reviewCount={124}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className={styles.content}>
          {activeSection === "published" && <ProviderServices />}

          {activeSection === "pending" && <RecentRequests />}

          {activeSection === "completed" && <CompletedServices />}

          {activeSection === "rating" && <ProviderReviews />}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
