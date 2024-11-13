import { Router } from "express";

import * as postsControllers from "../controllers/posts";

const router = Router();

//get all posts
router.get("/posts", postsControllers.getAllPosts);
//get individual post
router.get("/post/{:id}", postsControllers.getPostDetails);

export default router;
