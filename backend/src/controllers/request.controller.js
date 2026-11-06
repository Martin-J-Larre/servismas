import { createRequest } from "../models/request.model.js";

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
