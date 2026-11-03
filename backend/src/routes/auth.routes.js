import { Router } from "express";

import { register, login } from "../controllers/auth.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Registro de usuarios
router.post("/register", register);

// Inicio de sesión
router.post("/login", login);

// Obtener información del usuario autenticado
router.get("/me", authenticateToken, (req, res) => {
  res.status(200).json({
    message: "Usuario autenticado correctamente.",
    user: req.user,
  });
});

// Ruta de prueba exclusiva para prestadores
router.get(
  "/provider-test",
  authenticateToken,
  authorizeRole("provider"),
  (req, res) => {
    res.status(200).json({
      message: "Acceso autorizado para prestadores.",
      user: req.user,
    });
  },
);

export default router;
