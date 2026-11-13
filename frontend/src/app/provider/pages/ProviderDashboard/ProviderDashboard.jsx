import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../hooks/useAuth";
import {
  getMyServices,
  getMyProviderRequests,
} from "../../../../services/service.service";

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

  const [stats, setStats] = useState({
    publishedServices: 0,
    pendingRequests: 0,
    completedServices: 0,
    rating: 4.8,
    reviewCount: 124,
  });

  useEffect(() => {
    const loadDashboardStats = async () => {
      try {
        const [servicesResponse, requestsResponse] = await Promise.all([
          getMyServices(),
          getMyProviderRequests(),
        ]);

        const services = servicesResponse.services ?? [];
        const requests = requestsResponse.requests ?? [];

        const pendingRequests = requests.filter(
          (request) => request.status === "pendiente",
        ).length;

        setStats((previous) => ({
          ...previous,
          publishedServices: services.length,
          pendingRequests,
        }));
      } catch (error) {
        console.error("Error al cargar las estadísticas:", error);
      }
    };

    loadDashboardStats();
  }, []);

  const handlePublishService = () => {
    navigate("/app/prestador/servicios/nuevo");
  };

  const handleViewService = (serviceId) => {
    navigate(`/app/prestador/mis-servicios/${serviceId}`);
  };

  const handleEditService = (serviceId) => {
    navigate(`/app/prestador/mis-servicios/${serviceId}/editar`);
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
          {...stats}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className={styles.content}>
          {activeSection === "published" && (
            <ProviderServices
              onViewService={handleViewService}
              onEditService={handleEditService}
            />
          )}

          {activeSection === "pending" && <RecentRequests />}

          {activeSection === "completed" && <CompletedServices />}

          {activeSection === "rating" && <ProviderReviews />}
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
