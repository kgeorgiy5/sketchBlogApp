import { Request, Response, NextFunction } from "express";

import Post from "../models/post";
import User from "../models/user";
import { AppError } from "../types/error";

export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.session.userId;

  try {
    const userPosts = await Post.find({ userId: userId }) || [];

    res.status(200).json(userPosts);

  } catch (err) {
    next(err);
  }
}

export const postCreatePost = async (req: Request, res: Response, next: NextFunction) => {
  const postTitle = req.body.title;
  const postContent = req.body.content;
  const postUpdateDate = Date.now();
  const userId = req.session.userId;

  try {
    const newPost = new Post({ title: postTitle, content: postContent, updateDate: postUpdateDate, userId: userId, numberOfLikes: 0 });

    await newPost.save();

    res.status(200).end();

  } catch (err) {
    next(err);
  }
}

//FIXME:user can add only one like to the post
export const putUpdatePost = async (req: Request, res: Response, next: NextFunction) => {
  const newPostTitle: string = req.body.title;
  const newPostContent: string = req.body.content;
  const newPostUpdateDate: Date = new Date();
  const userId = req.session.userId;
  const postId = req.body.id;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const err: AppError = new Error("post not found")
      err.statusCode = 404;
      return next(err);
    }

    const originalUserId = post.userId.toString();

    if (originalUserId !== userId) {
      const err: AppError = new Error(`user ${userId} is not authorized to do this action`)
      err.statusCode = 403;
      return next(err);
    }

    //TODO: add interface for updatedPost
    const updatedPost = post;
    updatedPost.title = newPostTitle;
    updatedPost.content = newPostContent;
    updatedPost.updateDate = newPostUpdateDate;

    await updatedPost.save();

    res.status(204).end();

  } catch (err) {
    next(err);
  }
}

export const putLikePost = async (req: Request, res: Response, next: NextFunction) => {
  const postId = req.body.postId;
  const userId = req.session.userId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      const err: AppError = new Error("post not found");
      err.statusCode = 404;
      return next(err);
    }

    const user = await User.findById(userId);

    if (!user) {
      const err: AppError = new Error("user not found");
      err.statusCode = 401;
      return next(err);
    }

    const updatedPost = post;
    updatedPost.numberOfLikes = post.numberOfLikes + 1;

    await updatedPost.save();

    const updatedUser = user;
    updatedUser.likedPosts.push(postId);

    await updatedUser.save();

    res.status(204).end();

  } catch (err) {
    next(err);
  }
}
