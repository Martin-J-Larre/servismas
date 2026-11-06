import { Router } from "express";
import {
  getMyProviderProfile,
  updateMyProviderProfile,
  getPublicProviderProfileController,
} from "../controllers/provider.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/me",
  authenticateToken,
  authorizeRole("provider"),
  getMyProviderProfile,
);
router.put(
  "/me",
  authenticateToken,
  authorizeRole("provider"),
  updateMyProviderProfile,
);

// Perfil de un prestador.
router.get("/:id", getPublicProviderProfileController);

export default router;
