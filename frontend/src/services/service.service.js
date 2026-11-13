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

// Obtener un servicio publicado por ID
export const getMyServiceById = async (serviceId) => {
  return apiRequest(`/services/my/${serviceId}`);
};

// Actualizar un servicio publicado
export const updateMyService = async (serviceId, serviceData) => {
  return apiRequest(`/services/my/${serviceId}`, {
    method: "PUT",
    body: JSON.stringify(serviceData),
  });
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

// Obtener el perfil público de un prestador
export const getPublicProviderProfile = async (providerId) => {
  return apiRequest(`/providers/${providerId}`);
};

// Crear una solicitud de servicio
export const createRequest = async (requestData) => {
  return apiRequest("/requests", {
    method: "POST",
    body: JSON.stringify(requestData),
  });
};
// Obtener las solicitudes del cliente autenticado
export const getMyRequests = async () => apiRequest("/requests/my");

// Obtener las solicitudes recibidas por el prestador autenticado
export const getMyProviderRequests = async () =>
  apiRequest("/requests/provider/my");
