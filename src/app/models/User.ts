import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  verify: boolean;
  verificationToken: string;
  token: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  avatar: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  token: {
    type: String,
  },
  googleId: {
    type: String,
  },
},
  {
    versionKey: false,
    timestamps: true,
  });

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;