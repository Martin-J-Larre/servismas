import pool from "../config/database.js";

export const getUserById = async (userId) => {
  const [rows] = await pool.execute(
    `SELECT
      id_usuario AS id,
      nombre AS firstName,
      apellido AS lastName,
      email,
      telefono AS phone,
      direccion AS address
     FROM usuario
     WHERE id_usuario = ?`,
    [userId],
  );

  if (rows.length === 0) {
    return null;
  }

  const user = rows[0];

  // Convertir la dirección JSON almacenada como texto a un objeto.
  if (user.address) {
    try {
      user.address = JSON.parse(user.address);
    } catch {
      // Compatibilidad con direcciones antiguas guardadas como texto plano.
      user.address = {
        street: user.address,
      };
    }
  }

  return user;
};

export const updateUserProfile = async ({
  userId,
  firstName,
  lastName,
  phone,
  address,
}) => {
  const addressJson = address ? JSON.stringify(address) : null;

  const [result] = await pool.execute(
    `UPDATE usuario
     SET
       nombre = ?,
       apellido = ?,
       telefono = ?,
       direccion = ?
     WHERE id_usuario = ?`,
    [firstName, lastName, phone || null, addressJson, userId],
  );

  return result.affectedRows > 0;
};
