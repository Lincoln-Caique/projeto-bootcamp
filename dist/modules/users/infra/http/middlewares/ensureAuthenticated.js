import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
export default function ensureAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = verify(token, authConfig.jwt.secret);
        const { sub } = decoded;
        req.user = {
            id: sub,
        };
        console.log(decoded);
        return next();
    }
    catch (_a) {
        throw new AppError('Invalid JWT token', 401);
    }
}
