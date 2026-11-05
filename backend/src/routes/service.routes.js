import { Router } from "express";

import {
  publishService,
  getServiceTypesController,
  getCategoriesByTypeController,
} from "../controllers/service.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Consultar tipos de servicio
router.get("/types", getServiceTypesController);

// Consultar categorías según el tipo de servicio
router.get("/categories", getCategoriesByTypeController);

// Publicar un servicio
router.post("/", authenticateToken, authorizeRole("provider"), publishService);

export default router;
