import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "../landing/pages/Home";
import Register from "../auth/pages/Register/Register";
import Login from "../auth/pages/Login/Login";

// Páginas del cliente
import SearchServices from "../app/client/pages/SearchServices/SearchServices";
import ProviderProfile from "../app/client/pages/ProviderProfile/ProviderProfile";
import ServiceRequest from "../app/client/pages/ServiceRequest/ServiceRequest";
import RequestConfirmation from "../app/client/pages/ServiceRequest/pages/RequestConfirmation/RequestConfirmation";
import RequestSuccess from "../app/client/pages/ServiceRequest/pages/RequestSuccess/RequestSuccess";
import MyServices from "../app/client/pages/MyServices/MyServices";
import MyRequests from "../app/client/pages/MyRequests/MyRequests";
import ClientProfile from "../app/client/pages/ClientProfile/ClientProfile";
import CoordinateService from "../app/client/pages/CoordinateService/CoordinateService";
import TrackingService from "../app/client/pages/TrackingService/TrackingService";
import FinalizeService from "../app/client/pages/FinalizeService/FinalizeService";
import RateService from "../app/client/pages/RateService/RateService";

// Páginas del prestador
import ProviderDashboard from "../app/provider/pages/ProviderDashboard/ProviderDashboard";
import PublishService from "../app/provider/pages/PublishService/PublishService";
import ServicePublished from "../app/provider/pages/ServicePublished/ServicePublished";
import ReceivedRequests from "../app/provider/pages/ReceivedRequests/ReceivedRequests";
// import ProviderServiceTracking from "../app/provider/pages/ProviderServiceTracking/ProviderServiceTracking";
import RequestDetails from "../app/provider/pages/RequestDetails/RequestDetails";
import ServiceManagement from "../app/provider/pages/ServiceManagement/ServiceManagement";
import ServiceCompleted from "../app/provider/pages/ServiceCompleted/ServiceCompleted";
import ProviderProfilePage from "../app/provider/pages/ProviderProfile/ProviderProfile";
import ProviderProfileEdit from "../app/provider/pages/ProviderProfile/pages/ProviderProfileEdit/ProviderProfileEdit";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas --> Landing / Auth */}
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas del cliente */}
        <Route element={<ProtectedRoute allowedRole="client" />}>
          <Route path="/app/cliente">
            <Route index element={<Navigate to="buscar-servicios" replace />} />

            <Route path="buscar-servicios" element={<SearchServices />} />
            <Route path="prestadores/:id" element={<ProviderProfile />} />
            <Route path="solicitar-servicio/:id" element={<ServiceRequest />} />

            <Route
              path="confirmar-solicitud/:id"
              element={<RequestConfirmation />}
            />

            <Route path="solicitud-exitosa/:id" element={<RequestSuccess />} />

            <Route path="mis-servicios" element={<MyServices />} />
            <Route path="mis-solicitudes" element={<MyRequests />} />
            <Route path="mi-perfil" element={<ClientProfile />} />

            <Route
              path="coordinar-servicio/:id"
              element={<CoordinateService />}
            />

            <Route
              path="seguimiento-servicio/:id"
              element={<TrackingService />}
            />

            <Route
              path="finalizar-servicio/:id"
              element={<FinalizeService />}
            />
            <Route path="valorar-servicio/:id" element={<RateService />} />
          </Route>
        </Route>

        {/* Rutas protegidas del prestador */}
        <Route element={<ProtectedRoute allowedRole="provider" />}>
          <Route path="/app/prestador">
            <Route index element={<Navigate to="panel" replace />} />

            <Route path="panel" element={<ProviderDashboard />} />

            <Route path="servicios/nuevo" element={<PublishService />} />

            <Route path="servicios/publicado" element={<ServicePublished />} />

            <Route path="solicitudes" element={<ReceivedRequests />} />

            {/* <Route
      path="solicitudes/:id/seguimiento"
      element={<ProviderServiceTracking />}
    /> */}

            <Route path="solicitudes/:id" element={<RequestDetails />} />

            <Route path="servicios/:id" element={<ServiceManagement />} />

            <Route
              path="servicios/:id/finalizado"
              element={<ServiceCompleted />}
            />

            <Route path="mi-perfil">
              <Route index element={<ProviderProfilePage />} />
              <Route path="editar" element={<ProviderProfileEdit />} />
            </Route>
          </Route>
        </Route>

        {/* Ruta desconocida */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
