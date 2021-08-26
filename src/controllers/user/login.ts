import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { UserModel } from '../../models/User';
import { UserType } from '../../types/models';
import { LoginUserReq } from '../../types/requests';
import { signToken } from '../../helpers/token';

export const loginUser = async (req: LoginUserReq, res: Response) => {
  try {
    const { email: reqEmail, password } = req.body;
    const email = reqEmail.toLowerCase();

    if (!(email && password)) {
      res.status(400).json({ error: 'all input fields are required' });
      return;
    }

    const user: UserType | null = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = signToken(user.id, email, user.username);

      await UserModel.findByIdAndUpdate(user.id, { token });

      const responseUser = {
        id: user.id,
        username: user.username,
        email,
        token,
      };

      res.status(200).json(responseUser);
      return;
    }
    res.status(400).send({ error: 'invalid credentials' });
  } catch (error) {
    console.log({ error });
  }
};
