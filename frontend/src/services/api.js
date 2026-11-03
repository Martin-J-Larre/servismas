const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiRequest = async (endpoint, options = {}) => {
  // Obtener el token almacenado
  const token = localStorage.getItem("token");

  // Configurar los encabezados
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Agregar el token si existe
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Realizar la solicitud
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Procesar la respuesta
  const data = await response.json().catch(() => null);

  // Manejar errores HTTP
  if (!response.ok) {
    throw new Error(
      data?.message || "Ocurrió un error al comunicarse con el servidor.",
    );
  }

  return data;
};
