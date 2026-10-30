import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "../landing/pages/Home";
import Register from "../auth/pages/Register/Register";
import Login from "../auth/pages/Login/Login";
import SearchServices from "../app/client/pages/SearchServices/SearchServices";
import ProviderProfile from "../app/client/pages/ProviderProfile/ProviderProfile";
import ServiceRequest from "../app/client/pages/ServiceRequest/ServiceRequest";
import RequestConfirmation from "../app/client/pages/ServiceRequest/pages/RequestConfirmation/RequestConfirmation";
import RequestSuccess from "../app/client/pages/ServiceRequest/pages/RequestSuccess/RequestSuccess";
import MyServices from "../app/client/pages/MyServices/MyServices";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/buscar-servicios" element={<SearchServices />} />
        <Route path="/prestadores/:id" element={<ProviderProfile />} />
        <Route path="/solicitar-servicio/:id" element={<ServiceRequest />} />
        <Route
          path="/confirmar-solicitud/:id"
          element={<RequestConfirmation />}
        />
        <Route path="/solicitud-exitosa/:id" element={<RequestSuccess />} />
        <Route path="/mis-servicios" element={<MyServices />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
};

export default App;
