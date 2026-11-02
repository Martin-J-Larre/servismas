const initialRequests = [
  {
    id: 1,
    clientName: "María González",
    initials: "MG",
    rating: 4.9,
    reviewCount: 18,
    service: "Plomería",
    category: "Reparaciones del hogar",
    description:
      "Reparación de una pérdida de agua debajo de la pileta de la cocina. Se necesita revisar la conexión y reemplazar las piezas dañadas.",
    additionalInfo:
      "El edificio tiene estacionamiento para visitas. La administración permite trabajos de 9:00 a 17:00.",
    date: "30 de octubre de 2026",
    time: "10:00 hs",
    location: "San Miguel, Buenos Aires",
    address: "Av. Colón 3030, San Miguel, Buenos Aires",
    price: "$15.000 - $25.000",
    status: "pending",
    requiresAction: true,
    receivedAt: "26 de octubre de 2026",
    receivedTime: "09:42 hs",
    rejectedAt: null,
  },
  {
    id: 2,
    clientName: "Carlos Rodríguez",
    initials: "CR",
    rating: 4.7,
    reviewCount: 12,
    service: "Reparación eléctrica",
    category: "Electricidad",
    description: "Revisión y cambio de tablero eléctrico en departamento.",
    additionalInfo: "Coordinar el acceso al departamento con el cliente.",
    date: "5 de noviembre de 2026",
    time: "15:00 hs",
    location: "Córdoba Capital",
    address: "Dirección a confirmar",
    price: "",
    status: "accepted",
    requiresAction: false,
    receivedAt: "27 de octubre de 2026",
    receivedTime: "11:30 hs",
    rejectedAt: null,
  },
  {
    id: 3,
    clientName: "Laura Martínez",
    initials: "LM",
    rating: 4.8,
    reviewCount: 9,
    service: "Instalación de artefactos",
    category: "Instalaciones del hogar",
    description: "Instalación de lámparas y ventilador de techo en living.",
    additionalInfo: "Coordinar el horario de visita con el cliente.",
    date: "28 de septiembre de 2026",
    time: "",
    location: "",
    address: "",
    price: "",
    status: "rejected",
    requiresAction: false,
    receivedAt: "25 de septiembre de 2026",
    receivedTime: "14:00 hs",
    rejectedAt: "26 de septiembre de 2026",
  },
];

const STORAGE_KEY = "servismas_provider_requests";

const readRequests = () => {
  try {
    const storedRequests = localStorage.getItem(STORAGE_KEY);

    if (storedRequests) {
      const parsedRequests = JSON.parse(storedRequests);

      if (Array.isArray(parsedRequests)) {
        return parsedRequests;
      }
    }
  } catch (error) {
    console.error("Error al leer las solicitudes:", error);
  }

  return initialRequests;
};

export const getRequests = () => {
  return readRequests();
};

export const getRequestById = (id) => {
  const requests = readRequests();

  return requests.find((request) => request.id === Number(id)) ?? null;
};

export const updateRequestStatus = (id, status) => {
  const validStatuses = ["pending", "accepted", "rejected"];

  if (!validStatuses.includes(status)) {
    return null;
  }

  const requests = readRequests();

  const requestExists = requests.some((request) => request.id === Number(id));

  if (!requestExists) {
    return null;
  }

  const updatedRequests = requests.map((request) => {
    if (request.id !== Number(id)) {
      return request;
    }

    return {
      ...request,
      status,
      requiresAction: status === "pending",
      serviceStage:
        status === "accepted" ? request.serviceStage || "accepted" : null,
      rejectedAt:
        status === "rejected" ? new Date().toLocaleDateString("es-AR") : null,
    };
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

    return updatedRequests.find((request) => request.id === Number(id)) ?? null;
  } catch (error) {
    console.error("Error al guardar las solicitudes:", error);
    return null;
  }
};

export const updateServiceStage = (id, serviceStage) => {
  const stageOrder = {
    accepted: 0,
    coordinated: 1,
    in_progress: 2,
    completed: 3,
  };

  if (!Object.hasOwn(stageOrder, serviceStage)) {
    return null;
  }

  const requests = readRequests();

  const requestIndex = requests.findIndex(
    (request) => request.id === Number(id),
  );

  if (requestIndex === -1) {
    return null;
  }

  const request = requests[requestIndex];

  if (request.status !== "accepted") {
    return null;
  }

  const currentStage = request.serviceStage || "accepted";

  if (stageOrder[serviceStage] !== stageOrder[currentStage] + 1) {
    return null;
  }

  const updatedRequests = [...requests];

  updatedRequests[requestIndex] = {
    ...request,
    serviceStage,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRequests));

    return updatedRequests[requestIndex];
  } catch (error) {
    console.error("Error al actualizar la etapa del servicio:", error);
    return null;
  }
};
