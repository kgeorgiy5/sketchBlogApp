import { NextFunction, Request, Response } from "express";
import { hash, compare, genSalt } from "bcryptjs";

import User from "../models/user";
import { AppError } from "../types/error";

export const postSignUp = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const err: AppError = new Error("validation error");
  //   err.statusCode = 422;
  //   return next(err);
  // }

  try {
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
      return next(err);
    }

    req.session.isAuthenticated = true;
    req.session.userId = savedUser._id.toString();

    res.status(200).end();

  } catch (err) {
    //FIXME: this code may cause issues with src/middleware/errorMiddleware.ts
    next(err);
  }
}

export const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const err: AppError = new Error("No such user");
      err.statusCode = 422;
      return next(err);
    }

    const hashedPassword = user.password;
    const doMatch = await compare(password, hashedPassword);

    if (!doMatch) {
      const err: AppError = new Error("wrong password or email");
      err.statusCode = 422;
      return next(err);
    }

    req.session.isAuthenticated = true;
    req.session.userId = user._id.toString();

    res.status(200).end();

  } catch (err) {
    //FIXME: this code may cause issues with src/middleware/errorMiddleware.ts
    next(err);
  }
}
