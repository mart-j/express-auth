import jwt from 'jsonwebtoken';
import { JwtDecoded } from '../types/jwtDecoded';

export const decodeToken = (token: string) => {
  const decodedUser = (() => {
    try {
      return jwt.verify(token, process.env.TOKEN_KEY!) as unknown as JwtDecoded;
    } catch {
      return {} as JwtDecoded;
    }
  })();

  const error = Object.keys(decodedUser).length < 1;

  return { error, user: decodedUser };
};

export const signToken = (id: string, email: string, username: string) => {
  return jwt.sign({ id, email, username }, process.env.TOKEN_KEY!);
};
