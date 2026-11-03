import pool from "../config/database.js";

export const createUser = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
  accountType,
}) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Crear usuario
    const [userResult] = await connection.execute(
      `INSERT INTO usuario
        (nombre, apellido, email, contrasena)
       VALUES (?, ?, ?, ?)`,
      [firstName, lastName, email, hashedPassword],
    );

    const userId = userResult.insertId;

    // 2. Crear perfil según el tipo de cuenta
    if (accountType === "client") {
      await connection.execute(
        `INSERT INTO cliente (id_usuario)
         VALUES (?)`,
        [userId],
      );
    } else if (accountType === "provider") {
      await connection.execute(
        `INSERT INTO prestador (id_usuario, estado_verificacion)
         VALUES (?, ?)`,
        [userId, "pendiente"],
      );
    } else {
      throw new Error("Tipo de cuenta inválido.");
    }

    // 3. Confirmar transacción
    await connection.commit();

    return {
      id: userId,
      accountType,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
