import { Router } from "express";

import {
  createRequestController,
  getMyRequestsController,
  getMyProviderRequestsController,
  getProviderRequestByIdController,
  updateRequestStatusController,
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

// Obtener las solicitudes recibidas por el prestador autenticado
router.get(
  "/provider/my",
  authenticateToken,
  authorizeRole("provider"),
  getMyProviderRequestsController,
);

// Obtener el detalle de una solicitud recibida
router.get(
  "/provider/:id",
  authenticateToken,
  authorizeRole("provider"),
  getProviderRequestByIdController,
);

// Actualizar el estado de una solicitud
router.patch(
  "/provider/:id/status",
  authenticateToken,
  authorizeRole("provider"),
  updateRequestStatusController,
);

// Registrar una solicitud (solo clientes autenticados)
router.post(
  "/",
  authenticateToken,
  authorizeRole("client"),
  createRequestController,
);

export default router;
