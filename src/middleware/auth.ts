import { VerifyUserReq } from '../types/requests';
import { NextFunction, Response } from 'express';
import { decodeToken } from '../helpers/token';

export const verifyToken = (
  req: VerifyUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-access-token'] || '';

    if (typeof token !== 'string') {
      return res.status(400).json({ error: 'token must be string' });
    }

    if (!token) {
      return res.status(400).json({ error: 'token required' });
    }

    const { error: decodeError, user } = decodeToken(token);

    if (decodeError) {
      return res.status(400).send({ error: 'invalid token' });
    }

    req.body = {
      ...req.body,
      username: user.username,
      email: user.email,
      id: user.id,
    };

    next();
    return;
  } catch (error) {
    return res.status(400).send({ error });
  }
};
