import { RegisterUserReq } from '../../types/requests';
import { Response } from 'express';
import { UserType } from '../../types/models';
import { UserModel } from '../../models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '../../helpers/token';

export const registerUser = async (req: RegisterUserReq, res: Response) => {
  try {
    const { username, password, email: reqEmail } = req.body;
    const email = reqEmail.toLowerCase();

    const user: UserType | null = await UserModel.findOne({ email });

    if (user) {
      res.status(400).json({
        error: 'email already registered',
      });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await new UserModel({
      email,
      username,
      password: hashPassword,
    }).save();

    const token = signToken(newUser.id, email, username);

    await UserModel.findByIdAndUpdate(newUser.id, { token });

    res.json({ id: newUser.id, username, email, token });
  } catch (e) {
    res.send({ error: e.message });
  }
};
