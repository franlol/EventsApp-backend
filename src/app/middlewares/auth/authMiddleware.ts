import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TDecodedToken } from './authMiddleware.types';

export const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.get('Authorization')?.split(' ')[1] || '';

    const decodedToken = token === ''
      ? null
      : jwt.verify(token, process.env.PW_JWT_HASH as string) as TDecodedToken;

    if (!decodedToken) throw new Error('Invalid token provided.');

    req.user = {
      _id: decodedToken._id,
      isAuth: true,
    }
  } catch (error) {
    console.log('Error in isAuth middleware', error);
    req.user.isAuth = false;

    return next();
  }

  next();
}
