import { Router } from "express";

import * as authController from "../controllers/auth";

const router = Router();

router.post("/sign-in", authController.postSignIn);
router.post("/sign-up", authController.postSignUp);
router.post("/logout", authController.postLogout);
router.get("/is-auth", authController.getIsAuth);

export default router;
