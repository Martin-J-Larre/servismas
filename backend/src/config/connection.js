import "dotenv/config";

import pool from "./database.js";

const connection = async () => {
  try {
    const [rows] = await pool.query(
      "SELECT DATABASE() AS databaseName, VERSION() AS mysqlVersion",
    );

    console.log("Conexión a MySQL exitosa.");
    console.log("Base de datos:", rows[0].databaseName);
    console.log("Versión de MySQL:", rows[0].mysqlVersion);
  } catch (error) {
    console.error("Error al conectar con MySQL:", error.message);
  } finally {
    await pool.end();
  }
};

connection();
