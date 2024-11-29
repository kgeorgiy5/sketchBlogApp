import { NextFunction, Request, Response } from "express";

import { createUser, loginUser } from "../services/auth";
import { AppError } from "../types/error";

export const getIsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if(!req.session){
    const err: AppError = new Error("Session data is missing")
    err.statusCode = 401;
    return next(err);
  }

  const isAuth = req.session.isAuthenticated;
  if(!isAuth){
    const err: AppError = new Error("Unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  res.status(200).json({ isAuth: isAuth });
};

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const savedUser = await createUser(email, password);

    req.session.isAuthenticated = true;
    req.session.userId = savedUser._id.toString();

    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

export const postSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  try {
    const user = await loginUser(email, password);

    req.session.isAuthenticated = true;
    req.session.userId = user._id.toString();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getLogout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.session.destroy(() => {
    res.status(200);
  });
  res.end();
};
