import { Router } from "express";

import * as userController from "../controllers/user";
import multer from "multer";

const upload = multer();

const router = Router();

router.get("/my-posts", userController.getUserPosts);
router.get("/user-data", userController.getUserData);
router.get("/my-likes", userController.getMyLikes);

router.post(
  "/create-post",
  upload.single("sketch"),
  userController.postCreatePost,
);
router.post("/is-liked", userController.postCheckLiked);

router.put("/edit-post", userController.putUpdatePost);
router.put("/like-post", userController.putLikePost);

export default router;
