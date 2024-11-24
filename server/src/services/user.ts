import Post from "../models/post";
import User from "../models/user";
import { AppError } from "../types/error";
import { SessionField } from "../types/auth";
import mongoose from "mongoose";

export const getUserPosts = async (userId: SessionField<string>) => {
  const userPosts = (await Post.find({ userId: userId })) || [];

  return userPosts;
};

export const getUserData = async (userId: SessionField<string>) => {
  const user = await User.findById(userId);

  if (!user) {
    const err: AppError = new Error(`User with id:${userId} not found`);
    err.statusCode = 404;
    throw err;
  }

  return user;
};

export const isThisPostLiked = async (
  userId: string | undefined,
  postId: string,
) => {
  if (!userId) {
    const err: AppError = new Error("Invalid user id");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findById(userId);
  const post = await Post.findById(postId);

  if (!user) {
    const err: AppError = new Error("No such user");
    err.statusCode = 404;
    throw err;
  }

  if (!post) {
    const err: AppError = new Error("No such post");
    err.statusCode = 404;
    throw err;
  }

  if (user.likedPosts.indexOf(post._id) !== -1) {
    return true;
  }

  return false;
};

export const createNewPost = async (
  title: string,
  sketchBuffer: Buffer | undefined,
  userId: SessionField<string>,
) => {
  const updateDate = new Date();

  if (!sketchBuffer) {
    const err: AppError = new Error("Sketch not found");
    err.statusCode = 500;
    throw err;
  }

  const sketchBase64 = Buffer.from(sketchBuffer).toString("base64");

  const newPost = new Post({
    title: title,
    content: sketchBase64,
    updateDate: updateDate,
    userId: userId,
    numberOfLikes: 0,
  });

  const savedPost = await newPost.save();

  return savedPost;
};

export const updatePost = async (
  postId: string,
  title: string,
  content: string,
  userId: SessionField<string>,
) => {
  const updateDate = new Date();

  const post = await Post.findById(postId);

  if (!post) {
    const err: AppError = new Error("post not found");
    err.statusCode = 404;
    throw err;
  }

  const originalUserId = post.userId.toString();

  if (originalUserId !== userId) {
    const err: AppError = new Error(
      `user ${userId} is not authorized to do this action`,
    );
    err.statusCode = 403;
    throw err;
  }

  const updatedPost = post;
  updatedPost.title = title;
  updatedPost.content = content;
  updatedPost.updateDate = updateDate;

  const savedPost = await updatedPost.save();

  return savedPost;
};

export const likePost = async (
  postId: mongoose.Types.ObjectId,
  userId: SessionField<string>,
) => {
  const post = await Post.findById(postId);

  if (!post) {
    const err: AppError = new Error("post not found");
    err.statusCode = 404;
    throw err;
  }

  const user = await User.findById(userId);

  if (!user) {
    const err: AppError = new Error("user not found");
    err.statusCode = 401;
    throw err;
  }
  const updatedPost = post;
  const updatedUser = user;

  const likedPosts = user.likedPosts;

  const likedPostIndex = user.likedPosts.indexOf(postId);

  if (likedPostIndex !== -1) {
    updatedPost.numberOfLikes = post.numberOfLikes - 1;
    likedPosts.splice(likedPostIndex, 1);
    updatedUser.likedPosts = likedPosts;
  } else {
    updatedPost.numberOfLikes = post.numberOfLikes + 1;
    updatedUser.likedPosts.push(postId);
  }

  await updatedUser.save();

  return await updatedPost.save();
};
