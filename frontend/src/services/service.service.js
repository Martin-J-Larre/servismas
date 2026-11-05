import { apiRequest } from "./api";

// Obtener tipos de servicio
export const getServiceTypes = async () => {
  return apiRequest("/services/types");
};

// Obtener categorías según el tipo
export const getCategoriesByType = async (typeId) => {
  return apiRequest(`/services/categories?typeId=${typeId}`);
};

// Obtener los servicios publicados por el prestador autenticado
export const getMyServices = async () => {
  return apiRequest("/services/my");
};

// Publicar un servicio
export const publishService = async (serviceData) => {
  return apiRequest("/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
};

// Buscar servicios según criterios
export const searchServices = async ({
  typeId,
  categoryId,
  locality,
  date,
}) => {
  const params = new URLSearchParams();

  params.append("typeId", typeId);

  if (categoryId) {
    params.append("categoryId", categoryId);
  }

  if (locality) {
    params.append("locality", locality);
  }

  if (date) {
    params.append("date", date);
  }

  return apiRequest(`/services/search?${params.toString()}`);
};
