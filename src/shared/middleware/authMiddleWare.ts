import { Request, Response, NextFunction } from 'express';
import { Injector } from 'boxed-injector';
import { AuthService } from '../../auth/service/AuthService';

export function authMiddleware(injector: Injector) {
    return async function authMiddleware(req: Request & { userId?: string }, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers['authorization'];

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(403).json({ error: 'Not Authrorized' });
            }

            const token = authHeader.substring('Bearer '.length).trim();

            // get an AuthService instance from your DI container
            const authService: AuthService = injector.create('AuthService');

            const payload = await authService.authenticateJWTToken(token);

            // attach user info for downstream handlers/controllers
            req.userId = payload.id;

            return next();
        } catch (err) {
            return res.status(403).json({ error: 'Not Authorized' });
        }
    };
}
