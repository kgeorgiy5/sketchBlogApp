import { NextFunction, Request, Response } from "express";

import { createUser, loginUser } from "../services/auth";
import { AppError } from "../types/error";

export const getIsAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isAuth = req.session.isAuthenticated;
  if (isAuth) {
    res.status(200).json({ isAuth: !!isAuth });
  } else {
    const err: AppError = new Error("Not authorized");
    err.statusCode = 401;
    next(err);
  }
};

export const postSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   const err: AppError = new Error("validation error");
  //   err.statusCode = 422;
  //   return next(err);
  // }

  try {
    const savedUser = await createUser(email, password);

    req.session.isAuthenticated = true;
    req.session.userId = savedUser._id.toString();

    res.status(200).end();
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

    res.status(200).end();
  } catch (err) {
    next(err);
  }
};

export const postLogout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  req.session.destroy(() => {
    res.status(200);
  });
  res.end();
};
