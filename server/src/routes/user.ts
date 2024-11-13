import { Router } from "express";

import * as userControllers from "../controllers/user";

const router = Router();

router.get("/my-posts", userControllers.getUserPosts);

router.post("/create-post", userControllers.postCreatePost);

router.put("/edit-post", userControllers.putUpdatePost);
router.put("/like-post", userControllers.putLikePost);


export default router;




