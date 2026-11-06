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
      throw new Error("El servicio seleccionado no pertenece al prestador indicado.");
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
      [
        description,
        address,
        date,
        clientId,
        providerId,
        serviceId,
      ],
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