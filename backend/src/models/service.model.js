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

// // Buscar servicios por tipo de servicio
// export const searchServices = async (typeId) => {
//   const [rows] = await pool.execute(
//     `SELECT
//       s.id_servicio AS id,
//       s.nombre AS name,
//       s.descripcion AS description,

//       c.id_categoria AS categoryId,
//       c.nombre AS category,

//       ts.id_tipo_servicio AS typeId,
//       ts.nombre AS serviceType,

//       u.id_usuario AS providerId,
//       u.nombre AS firstName,
//       u.apellido AS lastName,

//       p.experiencia AS experience,
//       p.estado_verificacion AS verificationStatus,

//       ag.ubicacion AS location

//     FROM servicio s

//     INNER JOIN categoria c
//       ON s.id_categoria = c.id_categoria

//     INNER JOIN tipo_servicio ts
//       ON c.id_tipo_servicio = ts.id_tipo_servicio

//     INNER JOIN prestador p
//       ON s.id_usuario_prestador = p.id_usuario

//     INNER JOIN usuario u
//       ON p.id_usuario = u.id_usuario

//     INNER JOIN area_geografica ag
//       ON s.id_area_geografica = ag.id_area_geografica

//     WHERE ts.id_tipo_servicio = ?

//     ORDER BY
//       c.id_categoria,
//       s.id_servicio`,
//     [typeId],
//   );

//   return rows.map((service) => {
//     let location = service.location;

//     try {
//       location = JSON.parse(location);
//     } catch {
//       // Conservar el valor original si no es JSON válido
//     }

//     return {
//       ...service,
//       location,
//     };
//   });
// };

// Buscar servicios por tipo, categoría, localidad y fecha
export const searchServices = async ({
  typeId,
  categoryId,
  locality,
  date,
}) => {
  let query = `
    SELECT
      s.id_servicio AS id,
      s.nombre AS name,
      s.descripcion AS description,
      c.id_categoria AS categoryId,
      c.nombre AS category,
      ts.id_tipo_servicio AS typeId,
      ts.nombre AS serviceType,
      u.id_usuario AS providerId,
      u.nombre AS firstName,
      u.apellido AS lastName,
      p.experiencia AS experience,
      p.estado_verificacion AS verificationStatus,
      ag.ubicacion AS location
    FROM servicio s
    INNER JOIN categoria c ON s.id_categoria = c.id_categoria
    INNER JOIN tipo_servicio ts ON c.id_tipo_servicio = ts.id_tipo_servicio
    INNER JOIN prestador p ON s.id_usuario_prestador = p.id_usuario
    INNER JOIN usuario u ON p.id_usuario = u.id_usuario
    INNER JOIN area_geografica ag ON s.id_area_geografica = ag.id_area_geografica
    WHERE ts.id_tipo_servicio = ?
  `;

  const params = [typeId];

  // Filtrar por categoría
  if (categoryId) {
    query += " AND c.id_categoria = ?";
    params.push(categoryId);
  }

  // Filtrar por localidad
  if (locality) {
    query +=
      " AND JSON_UNQUOTE(JSON_EXTRACT(ag.ubicacion, '$.locality')) LIKE ?";
    params.push(`%${locality}%`);
  }

  // Filtrar por día de disponibilidad
  if (date) {
    const selectedDate = new Date(`${date}T12:00:00`);

    // Validar que la fecha sea válida
    if (Number.isNaN(selectedDate.getTime())) {
      throw new Error("La fecha recibida no es válida.");
    }

    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    const day = days[selectedDate.getDay()];

    query += `
      AND EXISTS (
        SELECT 1
        FROM disponibilidad d
        WHERE d.id_servicio = s.id_servicio
        AND LOWER(d.dia) = ?
      )
    `;

    params.push(day);
  }

  query += " ORDER BY c.id_categoria, s.id_servicio";

  const [rows] = await pool.execute(query, params);

  // Convertir la ubicación JSON en un objeto JavaScript
  return rows.map((service) => {
    let location = service.location;

    try {
      location = JSON.parse(location);
    } catch {}

    return {
      ...service,
      location,
    };
  });
};

// Obtener un servicio por ID perteneciente a un prestador
export const getServiceById = async (serviceId, providerId) => {
  const [services] = await pool.execute(
    `SELECT
      s.id_servicio AS id,
      s.nombre AS name,
      s.descripcion AS description,
      s.id_categoria AS categoryId,
      c.nombre AS category,
      c.id_tipo_servicio AS typeId,
      ag.ubicacion AS location
    FROM servicio s
    INNER JOIN categoria c
      ON s.id_categoria = c.id_categoria
    INNER JOIN area_geografica ag
      ON s.id_area_geografica = ag.id_area_geografica
    WHERE s.id_servicio = ?
      AND s.id_usuario_prestador = ?
    LIMIT 1`,
    [serviceId, providerId],
  );

  if (services.length === 0) {
    return null;
  }

  const service = services[0];

  let location = service.location;

  try {
    location = JSON.parse(location);
  } catch {
    // Conservar el valor original si no es JSON válido.
  }

  const [availability] = await pool.execute(
    `SELECT
      dia AS day,
      TIME_FORMAT(hora_inicio, '%H:%i') AS start,
      TIME_FORMAT(hora_fin, '%H:%i') AS end
    FROM disponibilidad
    WHERE id_servicio = ?
    ORDER BY FIELD(
      dia,
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo'
    )`,
    [serviceId],
  );

  return {
    ...service,
    location,
    availability,
  };
};

// Actualizar un servicio publicado por un prestador
export const updateService = async ({
  serviceId,
  providerId,
  name,
  description,
  categoryId,
  location,
  availability,
}) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Verificar que el servicio pertenezca al prestador
    const [services] = await connection.execute(
      `SELECT id_area_geografica
       FROM servicio
       WHERE id_servicio = ?
         AND id_usuario_prestador = ?
       LIMIT 1`,
      [serviceId, providerId],
    );

    if (services.length === 0) {
      await connection.rollback();
      return null;
    }

    const areaId = services[0].id_area_geografica;

    // Actualizar los datos principales del servicio
    await connection.execute(
      `UPDATE servicio
       SET nombre = ?,
           descripcion = ?,
           id_categoria = ?
       WHERE id_servicio = ?
         AND id_usuario_prestador = ?`,
      [name, description, categoryId, serviceId, providerId],
    );

    // Actualizar la ubicación
    await connection.execute(
      `UPDATE area_geografica
       SET ubicacion = ?
       WHERE id_area_geografica = ?`,
      [JSON.stringify(location), areaId],
    );

    // Reemplazar la disponibilidad existente
    await connection.execute(
      `DELETE FROM disponibilidad
       WHERE id_servicio = ?`,
      [serviceId],
    );

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
