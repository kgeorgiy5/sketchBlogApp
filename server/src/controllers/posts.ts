import { Request, Response, NextFunction } from "express";

import Post from "../models/post";
import { AppError } from "../types/error";
import { IPost } from "../types/posts";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({}) || [];

    res.status(200).json(posts);

  } catch (err) {
    next(err);
  }
}

export const getPostDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = req.params.id;

    const post: IPost | null = await Post.findById(postId);

    if (!post) {
      const err: AppError = new Error(`post with id:${postId} not found`);
      err.statusCode = 500;
      return next(err);
    }

    res.status(200).json(post);

  } catch (err) {
    next(err);
  }
}
