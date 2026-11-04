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
