import { genSalt, hash } from "bcryptjs"

import User from "../models/user";

export const createUser = async (email: string, password: string) => {
  const salt = await genSalt(12);
  const hashedPassword = await hash(password, salt);


  const newUser = new User({
    email: email,
    password: hashedPassword,
    likedPosts: []
  });

  return await newUser.save();
}
