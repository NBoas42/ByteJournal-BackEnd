import { Request, Response, NextFunction } from "express";
import { Injector } from "boxed-injector";
import { AuthService } from "../../auth/service/AuthService";

export function authMiddleware(injector: Injector) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Not Authorized" });
      }

      const token = authHeader.slice("Bearer ".length).trim();
      const authService: AuthService = injector.create("AuthService");

      const payload = await authService.authenticateJWTToken(token);

      req.body.requestingAccount = payload;

      return next();
    } catch {
      return res.status(403).json({ error: "Not Authorized" });
    }
  };
}
