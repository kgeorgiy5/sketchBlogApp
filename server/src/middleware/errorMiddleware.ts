import { Request, Response, NextFunction } from "express";

import { AppError } from "../types/error";

const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {

  const statusCode: number = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message,
    status: err.statusCode,
  })
};

export default errorMiddleware;
