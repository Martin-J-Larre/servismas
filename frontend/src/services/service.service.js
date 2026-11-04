import { apiRequest } from "./api";

export const publishService = async (serviceData) => {
  return apiRequest("/services", {
    method: "POST",
    body: JSON.stringify(serviceData),
  });
};
