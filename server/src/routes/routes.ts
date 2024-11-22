import { Router } from "express";

import authRoutes from "./auth";
import postsRoutes from "./posts";
import userRoutes from "./user";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.use(authRoutes);
router.use(postsRoutes);
router.use(requireAuth, userRoutes);

export default router;
