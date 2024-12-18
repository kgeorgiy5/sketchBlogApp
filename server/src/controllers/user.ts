import { Request, Response, NextFunction } from "express";

import * as userService from "../services/user";

export const getMyLikes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.userId;

  try {
    const likedPosts = await userService.getMyLikes(userId);

    res.status(200).json(likedPosts);
  } catch (err) {
    next(err);
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.userId;

  try {
    const userPosts = await userService.getUserPosts(userId);

    res.status(200).json(userPosts);
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.userId;

  try {
    const userData = await userService.getUserData(userId);

    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
};

export const postCheckLiked = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.session.userId;
  const postId = req.body.postId;

  try {
    const isLiked = await userService.isThisPostLiked(userId, postId);

    res.status(200).json(isLiked);
  } catch (err) {
    next(err);
  }
};

export const postCreatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const title = req.body.title;
  const sketchBuffer = req.file?.buffer;
  const userId = req.session.userId;
  const text:string = req.body.text;

  try {
    const savedPost = await userService.createNewPost(
      title,
      sketchBuffer,
        text,
      userId,
    );
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const putUpdatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newTitle: string = req.body.title;
  const newContent: string = req.body.content;
  const newText: string = req.body.text;
  const userId = req.session.userId;
  const postId = req.body.id;

  try {
    const savedPost = await userService.updatePost(
      postId,
      newTitle,
      newContent,
      newText,
      userId,
    );

    res.status(204).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const putLikePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.body.postId;
  const userId = req.session.userId;

  try {
    const updatedPost = await userService.likePost(postId, userId);

    res.status(200).json(updatedPost);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req: Request, res: Response, next:NextFunction) => {
  const userId = req.session.userId;
  const postId = req.params.postId;

  try{
    await userService.removePost(postId, userId);

    res.status(200).end();
  } catch(err){
    next(err);
  }
}