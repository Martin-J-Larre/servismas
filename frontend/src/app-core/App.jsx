import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../landing/pages/Home";
import Register from "../auth/pages/Register/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Navigate to="/registro" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
