import {
  getProviderById,
  updateProviderProfile,
} from "../models/provider.model.js";

export const getMyProviderProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const provider = await getProviderById(userId);

    if (!provider) {
      return res.status(404).json({
        message: "Perfil de prestador no encontrado.",
      });
    }

    return res.status(200).json({
      provider,
    });
  } catch (error) {
    console.error("Error al obtener el perfil del prestador:", error);

    return res.status(500).json({
      message: "Error al obtener el perfil profesional.",
    });
  }
};

export const updateMyProviderProfile = async (req, res) => {
  try {
    const { experience } = req.body;

    if (
      experience !== null &&
      experience !== undefined &&
      typeof experience !== "string"
    ) {
      return res.status(400).json({
        message: "La experiencia debe ser un texto válido.",
      });
    }

    if (experience && experience.trim().length > 255) {
      return res.status(400).json({
        message: "La experiencia no puede superar los 255 caracteres.",
      });
    }

    const updated = await updateProviderProfile({
      userId: req.user.id,
      experience: experience?.trim() || null,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Perfil de prestador no encontrado.",
      });
    }

    const provider = await getProviderById(req.user.id);

    return res.status(200).json({
      message: "Información profesional actualizada correctamente.",
      provider,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil profesional:", error);

    return res.status(500).json({
      message: "Error al actualizar la información profesional.",
    });
  }
};
