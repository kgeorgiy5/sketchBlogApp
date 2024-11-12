import { Router } from "express";

const router = Router();

//get all posts
router.get("/posts");
//get individual post
router.get("/post/{:id}");

export default router;
