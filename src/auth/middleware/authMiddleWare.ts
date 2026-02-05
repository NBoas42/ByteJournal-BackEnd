import { Request, Response, NextFunction } from "express";
import { Injector } from "boxed-injector";
import { AuthService } from "../service/AuthService";

// TODO Does this belong in shared?
export function authMiddleware(injector: Injector) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const authService: AuthService = injector.create("AuthService");

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Not Authorized" });
      }

      const token = authHeader.slice("Bearer ".length).trim();

      const authorziedAccount = await authService.authenticateJWTToken(token);

      req.requestingAccount = authorziedAccount;

      return next();
    } catch {
      return res.status(403).json({ error: "Not Authorized" });
    }
  };
}
