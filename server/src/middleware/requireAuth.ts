import { Request, Response, NextFunction } from "express";
import { AppError } from "../types/error";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.session.isAuthenticated;
  const userId = req.session.userId;

  if (!isAuthenticated || !userId) {
    const err: AppError = new Error("unauthorized");
    err.statusCode = 401;
    return next(err);
  }

  next();

};

export default requireAuth;
