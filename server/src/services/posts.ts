import Post from "../models/post";
import { AppError } from "../types/error";
import User from "../models/user";
import sharp from "sharp";

export const getAllPosts = async () => {
  const compressedPosts = [];

  const posts = (await Post.find({})) || [];

  for(const post of posts) {
    const compressedPost = {_id:post._id, title: post.title, numberOfLikes: post.numberOfLikes, updatedAt: post.updateDate, userId:post.userId, content:""};

    try{
      const imgBuffer = Buffer.from(post.content, "base64");
      const compressedImgBuffer = await sharp(imgBuffer).resize({width:300, height:300}).toBuffer();
      compressedPost.content = compressedImgBuffer.toString("base64");
    } catch{
      const err:AppError = new Error("Internal Server Error");
      err.statusCode = 500;
      throw err;
    }

    compressedPosts.push(compressedPost);
  }

  return compressedPosts;
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
