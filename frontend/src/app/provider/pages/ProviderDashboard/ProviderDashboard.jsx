// import { useEffect } from "react";

// import { getCurrentUser } from "../../../../services/auth.service";


import { useNavigate } from "react-router-dom";
import {
  UserRound,
  BriefcaseBusiness,
  ClipboardList,
  LayoutDashboard,
} from "lucide-react";

import AppHeader from "../../../../app/components/AppHeader/AppHeader";

import ProviderWelcome from "./components/ProviderWelcome/ProviderWelcome";
import ProviderStats from "./components/ProviderStats/ProviderStats";
import RecentRequests from "./components/RecentRequests/RecentRequests";
import ProviderServices from "./components/ProviderServices/ProviderServices";
import ProviderAvailability from "./components/ProviderAvailability/ProviderAvailability";

import styles from "./ProviderDashboard.module.css";

const ProviderDashboard = () => {
  const navigate = useNavigate();

// TODO: Borrar despues del test de autenticación con apiRequest e importar getCurrentUser desde auth.service.js
//   useEffect(() => {
//   const testAuthentication = async () => {
//     try {
//       const response = await getCurrentUser();

//       console.log("Autenticación mediante apiRequest:", response);
//     } catch (error) {
//       console.error("Error de autenticación:", error.message);
//     }
//   };

//   testAuthentication();
// }, []);

  const user = {
    name: "Juan Pérez",
    initials: "JP",
    role: "Prestador",
  };

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

  const handleLogout = () => {
    // El cierre de sesión real se implementará con la autenticación.
    console.log("Cerrar sesión del prestador");
  };

  const handlePublishService = () => {
    navigate("/app/prestador/servicios/nuevo");
  };

  return (
    <div className={styles.dashboard}>
      <AppHeader user={user} menuItems={menuItems} onLogout={handleLogout} />

      <main className={styles.main}>
        <ProviderWelcome
          name={user.name.split(" ")[0]}
          onPublishService={handlePublishService}
        />

        <ProviderStats
          publishedServices={3}
          pendingRequests={2}
          completedServices={24}
          rating={4.8}
          reviewCount={124}
        />

        <div className={styles.content}>
          <RecentRequests />
          <ProviderServices onCreateService={handlePublishService} />
          <ProviderAvailability />
        </div>
      </main>
    </div>
  );
};

export default ProviderDashboard;
