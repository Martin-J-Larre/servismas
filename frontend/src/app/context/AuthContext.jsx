import { createContext, useContext, useState } from "react";

import { loginUser } from "../../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Recuperar sesión almacenada
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");

      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  // Verificar si existe una sesión
  const isAuthenticated = Boolean(token && user);

  // Iniciar sesión
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);

    return response.user;
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado // TODO: Hacer una carpeta hooks y poner los custom hooks ahí
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de un AuthProvider.");
  }

  return context;
};
