import express from 'express';
import { loginUser } from '../controllers/user/login';
import { validateRegistration } from '../middleware/user';
import { verifyToken } from '../middleware/auth';
import { VerifyUserReq } from '../types/requests';
import { registerUser } from '../controllers/user/register';

const userRouter = express.Router();

userRouter.post('/register', validateRegistration, registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/status', verifyToken, (req: VerifyUserReq, res) => {
  res.json({ ...req.body });
});

export default userRouter;
