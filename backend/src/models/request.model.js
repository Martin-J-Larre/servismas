import pool from "../config/database.js";

// Crear una solicitud de servicio
export const createRequest = async ({
  description,
  address,
  date,
  clientId,
  providerId,
  serviceId,
}) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Verificar que el servicio exista y pertenezca al prestador
    const [services] = await connection.execute(
      `SELECT id_servicio
       FROM servicio
       WHERE id_servicio = ?
       AND id_usuario_prestador = ?`,
      [serviceId, providerId],
    );

    if (services.length === 0) {
      throw new Error(
        "El servicio seleccionado no pertenece al prestador indicado.",
      );
    }

    // Registrar la solicitud
    const [result] = await connection.execute(
      `INSERT INTO solicitud (
        informacion_servicio,
        direccion,
        fecha_realizacion,
        estado,
        costo_visita_presupuesto,
        precio_final_acordado,
        id_usuario_cliente,
        id_usuario_prestador,
        id_servicio
      )
      VALUES (?, ?, ?, 'pendiente', NULL, NULL, ?, ?, ?)`,
      [description, address, date, clientId, providerId, serviceId],
    );

    await connection.commit();

    return {
      id: result.insertId,
      status: "pendiente",
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

// Obtener las solicitudes de un cliente
export const getMyRequests = async (clientId) => {
  const [requests] = await pool.execute(
    `SELECT
      s.id_solicitud AS id,
      s.informacion_servicio AS description,
      s.direccion AS address,
      s.fecha_realizacion AS serviceDate,
      s.fecha_solicitud AS requestDate,
      s.estado AS status,
      s.costo_visita_presupuesto AS visitCost,
      s.precio_final_acordado AS agreedPrice,

      s.id_usuario_prestador AS providerId,
      s.id_servicio AS serviceId,

      CONCAT(u.nombre, ' ', u.apellido) AS providerName,

      sv.nombre AS serviceName,
      c.nombre AS category,
      ts.nombre AS specialty

    FROM solicitud s

    INNER JOIN usuario u
      ON s.id_usuario_prestador = u.id_usuario

    INNER JOIN servicio sv
      ON s.id_servicio = sv.id_servicio

    INNER JOIN categoria c
      ON sv.id_categoria = c.id_categoria

    INNER JOIN tipo_servicio ts
      ON c.id_tipo_servicio = ts.id_tipo_servicio

    WHERE s.id_usuario_cliente = ?

    ORDER BY s.fecha_solicitud DESC`,
    [clientId],
  );

  return requests;
};

// Obtener las solicitudes recibidas por el prestador
export const getMyProviderRequests = async (providerId) => {
  const [requests] = await pool.execute(
    `SELECT
      s.id_solicitud AS id,
      s.informacion_servicio AS description,
      s.direccion AS address,
      s.fecha_realizacion AS serviceDate,
      s.fecha_solicitud AS requestDate,
      s.estado AS status,
      s.costo_visita_presupuesto AS visitCost,
      s.precio_final_acordado AS agreedPrice,

      s.id_usuario_cliente AS clientId,
      s.id_servicio AS serviceId,

      CONCAT(u.nombre, ' ', u.apellido) AS clientName,

      sv.nombre AS serviceName,
      c.nombre AS category,
      ts.nombre AS specialty

    FROM solicitud s

    INNER JOIN usuario u
      ON s.id_usuario_cliente = u.id_usuario

    INNER JOIN servicio sv
      ON s.id_servicio = sv.id_servicio

    INNER JOIN categoria c
      ON sv.id_categoria = c.id_categoria

    INNER JOIN tipo_servicio ts
      ON c.id_tipo_servicio = ts.id_tipo_servicio

    WHERE s.id_usuario_prestador = ?

    ORDER BY s.fecha_solicitud DESC`,
    [providerId],
  );

  return requests;
};
