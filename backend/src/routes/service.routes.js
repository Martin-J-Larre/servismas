import { Router } from "express";

import {
  publishService,
  getServiceTypesController,
  getCategoriesByTypeController,
  getMyServices,
} from "../controllers/service.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Consultar tipos de servicio
router.get("/types", getServiceTypesController);

// Consultar categorías según el tipo de servicio
router.get("/categories", getCategoriesByTypeController);

// Consultar los servicios del prestador autenticado
router.get("/my", authenticateToken, authorizeRole("provider"), getMyServices);

// Publicar un servicio
router.post("/", authenticateToken, authorizeRole("provider"), publishService);

export default router;
