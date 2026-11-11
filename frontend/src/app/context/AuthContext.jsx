import { createContext, useState } from "react";

import { loginUser, registerUser } from "../../services/auth.service";

export const AuthContext = createContext(null);

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

  // Guardar sesión
  const saveSession = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

    setToken(response.token);
    setUser(response.user);

    return response.user;
  };

  // Iniciar sesión
  const login = async (credentials) => {
    const response = await loginUser(credentials);

    return saveSession(response);
  };

  // Registrar usuario e iniciar sesión automáticamente
  const register = async (userData) => {
    const response = await registerUser(userData);

    return saveSession(response);
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
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
