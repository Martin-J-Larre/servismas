import { Router } from "express";

import { publishService } from "../controllers/service.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

// Publicar un servicio
router.post("/", authenticateToken, authorizeRole("provider"), publishService);

export default router;
