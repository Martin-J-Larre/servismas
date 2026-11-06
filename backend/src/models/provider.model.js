import pool from "../config/database.js";

export const getProviderById = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
      id_usuario AS userId,
      experiencia AS experience,
      estado_verificacion AS verificationStatus
     FROM prestador
     WHERE id_usuario = ?`,
    [userId],
  );

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
};

export const updateProviderProfile = async ({ userId, experience }) => {
  const [result] = await pool.execute(
    `UPDATE prestador
     SET experiencia = ?
     WHERE id_usuario = ?`,
    [experience || null, userId],
  );

  return result.affectedRows > 0;
};

// Obtiene el perfil público de un prestador y sus servicios publicados.
export const getPublicProviderProfile = async (userId) => {
  // 1. Datos generales del prestador.
  const [providerRows] = await pool.execute(
    `SELECT
      u.id_usuario AS userId,
      u.nombre AS firstName,
      u.apellido AS lastName,
      p.experiencia AS experience,
      p.estado_verificacion AS verificationStatus
     FROM prestador p
     INNER JOIN usuario u
       ON u.id_usuario = p.id_usuario
     WHERE p.id_usuario = ?`,
    [userId],
  );

  if (providerRows.length === 0) {
    return null;
  }

  const provider = providerRows[0];

  // 2. Servicios publicados, categorías, tipos y ubicaciones.
  const [serviceRows] = await pool.execute(
    `SELECT
      s.id_servicio AS id,
      s.nombre AS name,
      s.descripcion AS description,
      c.id_categoria AS categoryId,
      c.nombre AS category,
      ts.id_tipo_servicio AS typeId,
      ts.nombre AS serviceType,
      ag.ubicacion AS location
     FROM servicio s
     INNER JOIN categoria c
       ON c.id_categoria = s.id_categoria
     INNER JOIN tipo_servicio ts
       ON ts.id_tipo_servicio = c.id_tipo_servicio
     INNER JOIN area_geografica ag
       ON ag.id_area_geografica = s.id_area_geografica
     WHERE s.id_usuario_prestador = ?
     ORDER BY s.id_servicio`,
    [userId],
  );

  if (serviceRows.length === 0) {
    return {
      ...provider,
      serviceTypes: [],
      services: [],
    };
  }

  // 3. Obtener las disponibilidades de todos los servicios.
  const serviceIds = serviceRows.map((service) => service.id);
  const placeholders = serviceIds.map(() => "?").join(", ");

  const [availabilityRows] = await pool.execute(
    `SELECT
      id_servicio AS serviceId,
      dia AS day,
      TIME_FORMAT(hora_inicio, '%H:%i') AS start,
      TIME_FORMAT(hora_fin, '%H:%i') AS end
     FROM disponibilidad
     WHERE id_servicio IN (${placeholders})
     ORDER BY FIELD(
       dia,
       'Lunes',
       'Martes',
       'Miércoles',
       'Jueves',
       'Viernes',
       'Sábado',
       'Domingo'
     ), hora_inicio`,
    serviceIds,
  );

  // 4. Agrupar disponibilidades por servicio.
  const availabilityByService = {};

  for (const availability of availabilityRows) {
    if (!availabilityByService[availability.serviceId]) {
      availabilityByService[availability.serviceId] = [];
    }

    availabilityByService[availability.serviceId].push({
      day: availability.day,
      start: availability.start,
      end: availability.end,
    });
  }

  // 5. Procesar servicios y convertir la ubicación JSON.
  const services = serviceRows.map((service) => {
    let location = service.location;

    if (typeof location === "string") {
      try {
        location = JSON.parse(location);
      } catch {
        location = null;
      }
    }

    return {
      ...service,
      location,
      availability: availabilityByService[service.id] || [],
    };
  });

  // 6. Obtener los tipos de servicio sin duplicados.
  const serviceTypes = [
    ...new Map(
      services.map((service) => [
        service.typeId,
        {
          id: service.typeId,
          name: service.serviceType,
        },
      ]),
    ).values(),
  ];

  return {
    ...provider,
    serviceTypes,
    services,
  };
};

export const getPublicProviderProfileController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        message: "ID de prestador inválido.",
      });
    }

    const provider = await getPublicProviderProfile(Number(id));

    if (!provider) {
      return res.status(404).json({
        message: "Prestador no encontrado.",
      });
    }

    return res.status(200).json({ provider });
  } catch (error) {
    console.error("Error al obtener el perfil público:", error);

    return res.status(500).json({
      message: "Error al obtener el perfil del prestador.",
    });
  }
};
