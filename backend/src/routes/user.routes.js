import { Router } from "express";

import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/user.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authenticateToken, getMyProfile);
router.put("/me", authenticateToken, updateMyProfile);

export default router;
