import { NextFunction, Response } from 'express';
import Joi from 'joi';
import { RegisterUserReq } from 'src/types/requests';
import { RegisterUserBody } from '../types/requestBody';

export const validateRegistration = (
  req: RegisterUserReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const schema = Joi.object<RegisterUserBody>({
      email: Joi.string().email().required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().min(6).max(40).required(),
      passwordConfirm: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({
          'any.only': `Passwords must match`,
        }),
    });

    const { error } = schema.validate(req.body);
    const errorMessage = error?.details[0]?.message || '';

    if (error) {
      res.status(400).json({ error: errorMessage });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
