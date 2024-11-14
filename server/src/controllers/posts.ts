import { Request, Response, NextFunction } from "express";

import * as postsService from "../services/posts";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await postsService.getAllPosts();

    res.status(200).json(posts);

  } catch (err) {
    next(err);
  }
}

export const getPostDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;

    const post = await postsService.getPostDetails(postId);

    res.status(200).json(post);

  } catch (err) {
    next(err);
  }
}
