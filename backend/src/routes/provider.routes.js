import { Router } from "express";

import {
  getMyProviderProfile,
  updateMyProviderProfile,
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

export default router;
