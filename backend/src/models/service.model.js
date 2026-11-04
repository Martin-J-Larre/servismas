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

    // 1. Crear el área geográfica
    const [areaResult] = await connection.execute(
      `INSERT INTO area_geografica (ubicacion)
       VALUES (?)`,
      [JSON.stringify(location)],
    );

    const areaId = areaResult.insertId;

    // 2. Crear el servicio
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

    // 3. Registrar disponibilidad
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
