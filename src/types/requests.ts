import { Request } from 'express';
import { LoginUserBody, RegisterUserBody, VerifyUserBody } from './requestBody';

export interface RegisterUserReq extends Request {
  body: RegisterUserBody;
}

export interface LoginUserReq extends Request {
  body: LoginUserBody;
}

export interface VerifyUserReq extends Request {
  body: VerifyUserBody;
}
