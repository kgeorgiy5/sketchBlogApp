import "express-session";

declare module "express-session" {
   export interface SessionData {
    isAuthenticated?: boolean;
    userId?: string;
  }
}
