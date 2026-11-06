import { Router } from "express";
import { createRequestController } from "../controllers/request.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Registrar una solicitud (solo clientes autenticados)
router.post(
  "/",
  authenticateToken,
  authorizeRole("client"),
  createRequestController,
);

export default router;
