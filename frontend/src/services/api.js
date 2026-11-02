const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Ocurrió un error al comunicarse con el servidor.",
    );
  }

  return data;
};
