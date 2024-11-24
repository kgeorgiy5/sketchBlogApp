import { Router } from "express";

import * as authController from "../controllers/auth";

const router = Router();

router.get("/logout", authController.getLogout);
router.get("/is-auth", authController.getIsAuth);

router.post("/sign-in", authController.postSignIn);
router.post("/sign-up", authController.postSignUp);

export default router;
