import { genSalt, hash, compare } from "bcryptjs"

import User from "../models/user";
import { AppError } from "../types/error";

export const createUser = async (email: string, password: string) => {
  const salt = await genSalt(12);
  const hashedPassword = await hash(password, salt);


  const newUser = new User({
    email: email,
    password: hashedPassword,
    likedPosts: []
  });

  const savedUser = await newUser.save();

  if (!savedUser) {
    const err: AppError = new Error("error occuered during save operation");
    err.statusCode = 500;
    throw err;
  }

  return savedUser;
}

export const loginUser = async (email: string, password: string) => {

  const user = await User.findOne({ email: email });

  if (!user) {
    const err: AppError = new Error("No such user");
    err.statusCode = 422;
    throw err;
  }

  const hashedPassword = user.password;
  const doMatch = await compare(password, hashedPassword);

  if (!doMatch) {
    const err: AppError = new Error("wrong password or email");
    err.statusCode = 422;
    throw err;
  }

  return user;
}
