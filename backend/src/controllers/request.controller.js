import {
  createRequest,
  getMyRequests,
  getMyRequestById,
  getMyProviderRequests,
  getProviderRequestById,
  updateRequestStatus,
  updateServiceStage,
} from "../models/request.model.js";

// Registrar una solicitud de servicio
export const createRequestController = async (req, res) => {
  try {
    const { description, address, date, providerId, serviceId } = req.body;

    // Validar los campos obligatorios
    if (
      !description?.trim() ||
      !address?.trim() ||
      !date ||
      !providerId ||
      !serviceId
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    // Validar que los identificadores sean números enteros positivos
    const parsedProviderId = Number(providerId);
    const parsedServiceId = Number(serviceId);

    if (
      !Number.isInteger(parsedProviderId) ||
      parsedProviderId <= 0 ||
      !Number.isInteger(parsedServiceId) ||
      parsedServiceId <= 0
    ) {
      return res.status(400).json({
        message: "El prestador o el servicio seleccionado no son válidos.",
      });
    }

    // Validar el formato de la fecha
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        message: "La fecha debe tener un formato válido.",
      });
    }

    const request = await createRequest({
      description: description.trim(),
      address: address.trim(),
      date,
      clientId: req.user.id,
      providerId: parsedProviderId,
      serviceId: parsedServiceId,
    });

    return res.status(201).json({
      message: "La solicitud se registró correctamente.",
      request,
    });
  } catch (error) {
    console.error("Error al registrar la solicitud:", error);

    if (error.message.includes("no pertenece al prestador")) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Error interno al registrar la solicitud.",
    });
  }
};

// Obtener las solicitudes del cliente autenticado
export const getMyRequestsController = async (req, res) => {
  try {
    const clientId = req.user.id;

    const requests = await getMyRequests(clientId);

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Error al obtener las solicitudes:", error);

    return res.status(500).json({
      message: "Error interno al obtener las solicitudes.",
    });
  }
};

// Obtener el detalle de una solicitud del cliente autenticado
export const getMyRequestByIdController = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const clientId = req.user.id;

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        message: "El identificador de la solicitud no es válido.",
      });
    }

    const request = await getMyRequestById(requestId, clientId);

    if (!request) {
      return res.status(404).json({
        message: "No se encontró la solicitud solicitada.",
      });
    }

    return res.status(200).json({
      request,
    });
  } catch (error) {
    console.error("Error al obtener el detalle de la solicitud:", error);

    return res.status(500).json({
      message: "Error interno al obtener la solicitud.",
    });
  }
};

// Obtener las solicitudes del prestador autenticado
export const getMyProviderRequestsController = async (req, res) => {
  try {
    const providerId = req.user.id;

    const requests = await getMyProviderRequests(providerId);

    return res.status(200).json({
      requests,
    });
  } catch (error) {
    console.error("Error al obtener las solicitudes del prestador:", error);

    return res.status(500).json({
      message: "Error interno al obtener las solicitudes.",
    });
  }
};

// Obtener el detalle de una solicitud recibida por el prestador
export const getProviderRequestByIdController = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const providerId = req.user.id;

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        message: "El identificador de la solicitud no es válido.",
      });
    }

    const request = await getProviderRequestById(requestId, providerId);

    if (!request) {
      return res.status(404).json({
        message: "No se encontró la solicitud solicitada.",
      });
    }

    return res.status(200).json({
      request,
    });
  } catch (error) {
    console.error("Error al obtener el detalle de la solicitud:", error);

    return res.status(500).json({
      message: "Error interno al obtener la solicitud.",
    });
  }
};

// #####################################################################
// Status codes --> 200 (Solicitud encontrada y pertenece al prestador)
//                  400 (Estado inválido)
//                  404 "al consultar" (Solicitud inexistente o ajena)
//                  409 (Solicitud ya procesada)
//                  500 (Error interno)
// #####################################################################

// Aceptar o rechazar una solicitud recibida
export const updateRequestStatusController = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const providerId = req.user.id;
    const { status } = req.body;

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        message: "El identificador de la solicitud no es válido.",
      });
    }

    if (!["aceptada", "rechazada"].includes(status)) {
      return res.status(400).json({
        message: "El estado indicado no es válido.",
      });
    }

    const updated = await updateRequestStatus(requestId, providerId, status);

    if (!updated) {
      return res.status(409).json({
        message:
          "No se pudo actualizar la solicitud. Puede que no exista, no te pertenezca o ya haya sido procesada.",
      });
    }

    return res.status(200).json({
      message: "El estado de la solicitud se actualizó correctamente.",
      request: {
        id: requestId,
        status,
      },
    });
  } catch (error) {
    console.error("Error al actualizar el estado de la solicitud:", error);

    return res.status(500).json({
      message: "Error interno al actualizar la solicitud.",
    });
  }
};

// Actualizar la etapa de una solicitud de servicio
export const updateServiceStageController = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const providerId = req.user.id;
    const { currentStatus, newStatus } = req.body;

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        message: "El identificador de la solicitud no es válido.",
      });
    }

    const allowedTransitions = {
      aceptada: "coordinada",
      coordinada: "en_ejecucion",
      en_ejecucion: "finalizada",
    };

    if (allowedTransitions[currentStatus] !== newStatus) {
      return res.status(400).json({
        message: "La transición de estado indicada no es válida.",
      });
    }

    const updated = await updateServiceStage(
      requestId,
      providerId,
      currentStatus,
      newStatus,
    );

    if (!updated) {
      return res.status(409).json({
        message:
          "No se pudo actualizar la etapa. Verificá que la solicitud exista, te pertenezca y conserve su estado actual.",
      });
    }

    return res.status(200).json({
      message: "La etapa del servicio se actualizó correctamente.",
      request: {
        id: requestId,
        status: newStatus,
      },
    });
  } catch (error) {
    console.error("Error al actualizar la etapa del servicio:", error);

    return res.status(500).json({
      message: "Error interno al actualizar la etapa del servicio.",
    });
  }
};
