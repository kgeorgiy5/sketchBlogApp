import Post from "../models/post";
import { AppError } from "../types/error";

export const getAllPosts = async () => {
  const posts = await Post.find({}) || [];

  return posts;
};

export const getPostDetails = async (postId: string) => {
  const post = await Post.findById(postId);

  if (!post) {
    const err: AppError = new Error(`post with id:${postId} not found`);
    err.statusCode = 500;
    throw (err);
  }
}
