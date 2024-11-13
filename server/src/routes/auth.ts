import { Router } from "express";

import * as authRoutes from "../controllers/auth";

const router = Router();

router.post("/sign-in", authRoutes.postSignIn);
router.post("/sign-up", authRoutes.postSignUp);

export default router;
