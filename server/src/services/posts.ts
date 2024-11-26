import Post from "../models/post";
import { AppError } from "../types/error";
import User from "../models/user";

export const getAllPosts = async () => {
  const posts = (await Post.find({})) || [];

  return posts;
};

export const getPostDetails = async (postId: string) => {
  const post = await Post.findById(postId);

  if (!post) {
    const err: AppError = new Error(`Post with id:${postId} not found`);
    err.statusCode = 404;
    throw err;
  }

  const postAuthor = await User.findById(post.userId);

  if (!postAuthor) {
    const err: AppError = new Error(`Post author not found`);
    err.statusCode = 404;
    throw err;
  }

  const postDetails = {
    _id: postId,
    email: postAuthor.email,
    title: post.title,
    text: post.text,
    content: post.content,
    updateDate: post.updateDate,
    numberOfLikes: post.numberOfLikes,
  };

  return postDetails;
};
