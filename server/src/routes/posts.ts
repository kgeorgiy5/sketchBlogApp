import { Router } from "express";

import * as postsController from "../controllers/posts";

const router = Router();

router.get("/posts", postsController.getAllPosts);
router.get("/post/{:id}", postsController.getPostDetails);

export default router;
