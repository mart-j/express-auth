import mongoose, { model, Model, Schema } from 'mongoose';
import { UserType } from '../types/models';

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
    },
    token: {
      type: String,
    },
    username: {
      trim: true,
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: { updatedAt: false } }
);

export const UserModel: Model<UserType> =
  mongoose.models.User || model('User', UserSchema);
