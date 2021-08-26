import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/user';
import 'dotenv/config';

(async () => {
  const app = express();
  app.use(express.json());

  await mongoose.connect(process.env.MONGO_URI!);

  console.log(`⚡ [database] Connected to ${process.env.MONGO_URI}`);

  app.use('/user', userRouter);

  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
    );
  });
})();
