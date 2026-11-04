import { apiRequest } from "./api";

export const registerUser = async (userData) => {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const loginUser = async (credentials) => {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

// Identidad del usuario autenticado
export const getCurrentUser = async () => {
  return apiRequest("/auth/me");
};

// Datos completos del perfil desde MySQL
export const getMyProfile = async () => {
  return apiRequest("/users/me");
};

// Actualizar datos del perfil
export const updateMyProfile = async (profileData) => {
  return apiRequest("/users/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};

// Datos profesionales del prestador desde MySQL
export const getMyProviderProfile = async () => {
  return apiRequest("/providers/me");
};

// Actualizar información profesional del prestador
export const updateMyProviderProfile = async (profileData) => {
  return apiRequest("/providers/me", {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
};
