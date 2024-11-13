import { Router } from "express";

import authRoutes from "./auth";
import postsRoutes from "./posts";
import userRoutes from "./user";

const router = Router();

router.use(authRoutes);
router.use(postsRoutes);
router.use(userRoutes);

export default router;
