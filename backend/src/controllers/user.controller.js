import { getUserById, updateUserProfile } from "../models/user.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error al obtener el perfil:", error);

    return res.status(500).json({
      message: "Error al obtener el perfil del usuario.",
    });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { firstName, lastName, phone, address } = req.body;

    // Validar nombre y apellido.
    if (
      typeof firstName !== "string" ||
      !firstName.trim() ||
      typeof lastName !== "string" ||
      !lastName.trim()
    ) {
      return res.status(400).json({
        message: "El nombre y el apellido son obligatorios.",
      });
    }

    // Validar teléfono.
    if (phone !== undefined && phone !== null && typeof phone !== "string") {
      return res.status(400).json({
        message: "El teléfono no tiene un formato válido.",
      });
    }

    // Validar dirección si fue enviada.
    if (address !== undefined && address !== null) {
      if (
        typeof address !== "object" ||
        Array.isArray(address) ||
        typeof address.street !== "string" ||
        !address.street.trim() ||
        typeof address.locality !== "string" ||
        !address.locality.trim() ||
        typeof address.province !== "string" ||
        !address.province.trim() ||
        typeof address.latitude !== "number" ||
        typeof address.longitude !== "number" ||
        !Number.isFinite(address.latitude) ||
        !Number.isFinite(address.longitude)
      ) {
        return res.status(400).json({
          message: "La dirección seleccionada no es válida.",
        });
      }
    }

    const updated = await updateUserProfile({
      userId: req.user.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone?.trim() || null,
      address: address || null,
    });

    if (!updated) {
      return res.status(404).json({
        message: "Usuario no encontrado.",
      });
    }

    const user = await getUserById(req.user.id);

    return res.status(200).json({
      message: "Perfil actualizado correctamente.",
      user,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);

    return res.status(500).json({
      message: "Error al actualizar el perfil.",
    });
  }
};
