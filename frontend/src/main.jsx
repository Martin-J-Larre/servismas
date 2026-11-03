import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app-core/App.jsx";
import { AuthProvider } from "./app/context/AuthContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
