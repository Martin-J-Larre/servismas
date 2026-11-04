import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import pool from "../config/database.js";
import { createUser } from "../models/auth.model.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, accountType } = req.body;

    // 1. Validar campos obligatorios
    if (!firstName || !lastName || !email || !password || !accountType) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios.",
      });
    }

    // 2. Validar tipo de cuenta
    if (!["client", "provider"].includes(accountType)) {
      return res.status(400).json({
        message: "El tipo de cuenta no es válido.",
      });
    }

    // 3. Comprobar si el email ya está registrado
    const [existingUsers] = await pool.execute(
      "SELECT id_usuario FROM usuario WHERE email = ?",
      [email],
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "Este correo electrónico ya está registrado.",
      });
    }

    // 4. Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Crear usuario y perfil (cliente o prestador) en la base de datos metdodo createUser
    const newUser = await createUser({
      firstName,
      lastName,
      email,
      hashedPassword,
      accountType,
    });

    // 6. Responder al frontend
    return res.status(201).json({
      message: "Usuario registrado correctamente.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error);

    // Evitar duplicados incluso ante registros simultáneos
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Este correo electrónico ya está registrado.",
      });
    }

    return res.status(500).json({
      message: "Ocurrió un error al registrar el usuario.",
    });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        message: "El email y la contraseña son obligatorios.",
      });
    }

    // 2. Buscar usuario y determinar su tipo de cuenta
    const [users] = await pool.execute(
      `SELECT
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.email,
        u.contrasena,
        CASE
          WHEN c.id_usuario IS NOT NULL THEN 'client'
          WHEN p.id_usuario IS NOT NULL THEN 'provider'
          ELSE NULL
        END AS accountType
      FROM usuario u
      LEFT JOIN cliente c ON u.id_usuario = c.id_usuario
      LEFT JOIN prestador p ON u.id_usuario = p.id_usuario
      WHERE u.email = ?`,
      [email],
    );

    // 3. Comprobar si existe el usuario
    if (users.length === 0) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos.",
      });
    }

    const user = users[0];

    // 4. Comparar contraseña con el hash almacenado
    const passwordMatch = await bcrypt.compare(password, user.contrasena);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Email o contraseña incorrectos.",
      });
    }

    // 5. Comprobar tipo de cuenta
    if (!user.accountType) {
      return res.status(403).json({
        message: "El usuario no tiene un tipo de cuenta válido.",
      });
    }

    // 6. Comprobar configuración JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está configurado.");
    }

    // 7. Generar token JWT
    const token = jwt.sign(
      {
        sub: String(user.id_usuario),
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    // 8. Responder al frontend
    return res.status(200).json({
      message: "Inicio de sesión exitoso.",
      token,
      user: {
        id: user.id_usuario,
        firstName: user.nombre,
        lastName: user.apellido,
        email: user.email,
        accountType: user.accountType,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);

    return res.status(500).json({
      message: "Ocurrió un error al iniciar sesión.",
    });
  }
};
