// TODO: Reemplazar cuando tengamos un backend que nos devuelva la coordinación guardada en la base de datos.

const STORAGE_PREFIX = "servismas-coordination-";

export const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

export const stages = [
  {
    id: "enviada",
    title: "Coordinación enviada",
    description: "La propuesta salió correctamente.",
  },
  {
    id: "esperando",
    title: "En espera",
    description: "Esperando la respuesta del prestador.",
  },
  {
    id: "aceptada",
    title: "Acordada",
    description: "El prestador aceptó la propuesta.",
  },
];

export const getSavedCoordination = (id) => {
  try {
    const savedCoordination = localStorage.getItem(`${STORAGE_PREFIX}${id}`);

    return savedCoordination ? JSON.parse(savedCoordination) : null;
  } catch {
    return null;
  }
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  // Formatear fechas ISO sin alterar el día por diferencias de zona horaria.
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    const date = new Date(`${dateString}T12:00:00`);

    if (Number.isNaN(date.getTime())) {
      return dateString;
    }

    return new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  // Si la fecha ya tiene otro formato, conservar el texto original.
  return dateString;
};
