import {
  createService,
  getServiceTypes,
  getCategoriesByType,
  getServicesByProvider,
} from "../models/service.model.js";

const validDays = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const isValidTime = (time) => {
  return typeof time === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(time);
};

export const publishService = async (req, res) => {
  try {
    const { name, description, categoryId, location, availability } = req.body;

    // Validar campos obligatorios
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      categoryId === undefined ||
      !location ||
      !availability
    ) {
      return res.status(400).json({
        message: "Todos los campos obligatorios deben estar completos.",
      });
    }

    // Validar nombre
    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "El nombre no puede superar los 100 caracteres.",
      });
    }

    // Validar categoría
    const parsedCategoryId = Number(categoryId);

    if (!Number.isInteger(parsedCategoryId) || parsedCategoryId <= 0) {
      return res.status(400).json({
        message: "La categoría seleccionada no es válida.",
      });
    }

    // Validar ubicación
    if (
      typeof location !== "object" ||
      Array.isArray(location) ||
      location === null ||
      typeof location.locality !== "string" ||
      !location.locality.trim() ||
      typeof location.province !== "string" ||
      !location.province.trim() ||
      location.country !== "Argentina" ||
      !Number.isFinite(location.latitude) ||
      !Number.isFinite(location.longitude) ||
      (location.street !== null &&
        location.street !== undefined &&
        typeof location.street !== "string") ||
      (location.houseNumber !== null &&
        location.houseNumber !== undefined &&
        typeof location.houseNumber !== "string")
    ) {
      return res.status(400).json({
        message: "La ubicación seleccionada no es válida.",
      });
    }

    // Validar disponibilidad
    if (!Array.isArray(availability) || availability.length === 0) {
      return res.status(400).json({
        message: "Debe seleccionar al menos un día disponible.",
      });
    }

    const receivedDays = availability.map(({ day }) => day);

    const hasInvalidDays = availability.some(
      ({ day, start, end }) =>
        !validDays.includes(day) ||
        !isValidTime(start) ||
        !isValidTime(end) ||
        start >= end,
    );

    const hasDuplicateDays = new Set(receivedDays).size !== receivedDays.length;

    if (hasInvalidDays || hasDuplicateDays) {
      return res.status(400).json({
        message: "Los días y horarios de disponibilidad no son válidos.",
      });
    }

    // Obtener el prestador autenticado
    const providerId = req.user.id;

    // Crear servicio
    const service = await createService({
      name: name.trim(),
      description: description.trim(),
      categoryId: parsedCategoryId,
      location,
      availability,
      providerId,
    });

    return res.status(201).json({
      message: "Servicio publicado correctamente.",
      service,
    });
  } catch (error) {
    console.error("Error al publicar el servicio:", error);

    return res.status(500).json({
      message: "Ocurrió un error al publicar el servicio.",
    });
  }
};

// Obtener todos los tipos de servicio
export const getServiceTypesController = async (req, res) => {
  try {
    const types = await getServiceTypes();

    return res.status(200).json({
      types,
    });
  } catch (error) {
    console.error("Error al obtener los tipos de servicio:", error);

    return res.status(500).json({
      message: "No se pudieron obtener los tipos de servicio.",
    });
  }
};

// Obtener categorías según el tipo de servicio
export const getCategoriesByTypeController = async (req, res) => {
  try {
    const typeId = Number(req.query.typeId);

    if (!Number.isInteger(typeId) || typeId <= 0) {
      return res.status(400).json({
        message: "El tipo de servicio seleccionado no es válido.",
      });
    }

    const categories = await getCategoriesByType(typeId);

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);

    return res.status(500).json({
      message: "No se pudieron obtener las categorías.",
    });
  }
};


// Obtener los servicios publicados por el prestador autenticado
export const getMyServices = async (req, res) => {
  try {
    const providerId = req.user.id;

    const services = await getServicesByProvider(providerId);

    return res.status(200).json({
      services,
    });
  } catch (error) {
    console.error("Error al obtener los servicios del prestador:", error);

    return res.status(500).json({
      message: "No se pudieron obtener los servicios publicados.",
    });
  }
};
