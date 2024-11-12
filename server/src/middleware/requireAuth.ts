import { Request, Response, NextFunction } from "express";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.session.isAuthenticated;
  if (!isAuthenticated) {
    return res.status(401).end();
  }

  next();
};

export default requireAuth;
