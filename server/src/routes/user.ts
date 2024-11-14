import { Router } from "express";

import * as userController from "../controllers/user";
import requireAuth from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);

router.get("/my-posts", userController.getUserPosts);

router.post("/create-post", userController.postCreatePost);

router.put("/edit-post", userController.putUpdatePost);
router.put("/like-post", userController.putLikePost);


export default router;




