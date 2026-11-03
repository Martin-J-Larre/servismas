import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../app/context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { user, isAuthenticated } = useAuth();

  // Verificar autenticación
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar tipo de cuenta
  if (allowedRole && user.accountType !== allowedRole) {
    const redirectPath =
      user.accountType === "provider"
        ? "/app/prestador"
        : "/app/cliente";

    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;