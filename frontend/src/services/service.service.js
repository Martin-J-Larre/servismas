import { apiRequest } from "./api";

// Obtener tipos de servicio
export const getServiceTypes = async () => {
  return apiRequest("/services/types");
};

// Obtener categorías según el tipo
export const getCategoriesByType = async (typeId) => {
  return apiRequest(`/services/categories?typeId=${typeId}`);
};

// Publicar un servicio
export const publishService = async (serviceData) => {
  return apiRequest("/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
};