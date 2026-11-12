import { Router } from "express";

import {
  createRequestController,
  getMyRequestsController,
  getMyProviderRequestsController,
} from "../controllers/request.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Obtener las solicitudes del cliente autenticado
router.get(
  "/my",
  authenticateToken,
  authorizeRole("client"),
  getMyRequestsController,
);

// Obtener las solicitudes del prestador autenticado
router.get(
  "/provider/my",
  authenticateToken,
  authorizeRole("provider"),
  getMyProviderRequestsController,
);

// Registrar una solicitud (solo clientes autenticados)
router.post(
  "/",
  authenticateToken,
  authorizeRole("client"),
  createRequestController,
);

export default router;
