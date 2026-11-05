import pool from "../config/database.js";

export const createService = async ({
  name,
  description,
  categoryId,
  location,
  availability,
  providerId,
}) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Crear el área geográfica
    const [areaResult] = await connection.execute(
      `INSERT INTO area_geografica (ubicacion)
       VALUES (?)`,
      [JSON.stringify(location)],
    );

    const areaId = areaResult.insertId;

    // Crear el servicio
    const [serviceResult] = await connection.execute(
      `INSERT INTO servicio (
        nombre,
        descripcion,
        id_usuario_prestador,
        id_categoria,
        id_area_geografica
      )
      VALUES (?, ?, ?, ?, ?)`,
      [name, description, providerId, categoryId, areaId],
    );

    const serviceId = serviceResult.insertId;

    // Registrar disponibilidad
    if (availability.length > 0) {
      const values = availability.map(({ day, start, end }) => [
        day,
        start,
        end,
        serviceId,
      ]);

      await connection.query(
        `INSERT INTO disponibilidad (
          dia,
          hora_inicio,
          hora_fin,
          id_servicio
        )
        VALUES ?`,
        [values],
      );
    }

    await connection.commit();

    return {
      id: serviceId,
      name,
    };
  } catch (error) {
    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error("Error al revertir la transacción:", rollbackError);
    }

    throw error;
  } finally {
    connection.release();
  }
};

// Obtener todos los tipos de servicio
export const getServiceTypes = async () => {
  const [rows] = await pool.execute(
    `SELECT
      id_tipo_servicio AS id,
      nombre,
      descripcion
    FROM tipo_servicio
    ORDER BY id_tipo_servicio`,
  );

  return rows;
};

// Obtener categorías según el tipo de servicio
export const getCategoriesByType = async (typeId) => {
  const [rows] = await pool.execute(
    `SELECT
      id_categoria AS id,
      nombre,
      descripcion,
      id_tipo_servicio AS typeId
    FROM categoria
    WHERE id_tipo_servicio = ?
    ORDER BY id_categoria`,
    [typeId],
  );

  return rows;
};

// Obtener los servicios publicados por un prestador
export const getServicesByProvider = async (providerId) => {
  // 1. Obtener los servicios y sus datos relacionados
  const [services] = await pool.execute(
    `SELECT
      s.id_servicio AS id,
      s.nombre AS name,
      s.descripcion AS description,
      c.nombre AS category,
      ag.ubicacion AS location
    FROM servicio s
    INNER JOIN categoria c
      ON s.id_categoria = c.id_categoria
    INNER JOIN area_geografica ag
      ON s.id_area_geografica = ag.id_area_geografica
    WHERE s.id_usuario_prestador = ?
    ORDER BY s.id_servicio DESC`,
    [providerId],
  );

  // Si el prestador no tiene servicios, devolver un array vacío
  if (services.length === 0) {
    return [];
  }

  // Obtener las disponibilidades de esos servicios
  const serviceIds = services.map((service) => service.id);
  const placeholders = serviceIds.map(() => "?").join(", ");

  const [availability] = await pool.execute(
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

  // Asociar las disponibilidades a cada servicio
  return services.map((service) => {
    let location = service.location;

    try {
      location = JSON.parse(location);
    } catch {
      // Si no es JSON válido, conservar el valor original
    }

    return {
      ...service,
      location,
      availability: availability
        .filter((item) => item.serviceId === service.id)
        .map(({ day, start, end }) => ({ day, start, end })),
    };
  });
};
