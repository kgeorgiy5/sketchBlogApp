import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcryptjs";
import { validationResult } from "express-validator";

import User from "../models/user";

const postSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const errors = validationResult(req);

  try {
    const hashedPassword = hash(password, "salt");
  } catch (err) {
    next(err);
  }
}
