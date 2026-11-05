import { Router } from "express";
import {
  publishService,
  getServiceTypesController,
  getCategoriesByTypeController,
  getMyServices,
  searchServicesController,
} from "../controllers/service.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/types", getServiceTypesController);
router.get("/categories", getCategoriesByTypeController);
router.get("/search", searchServicesController);

router.get("/my", authenticateToken, authorizeRole("provider"), getMyServices);
router.post("/", authenticateToken, authorizeRole("provider"), publishService);

export default router;
