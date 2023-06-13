import { Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  answer: string;
  avatar: string;
  isAdmin: boolean;
  interests: string[];
  about: string;
  recipes: Types.ObjectId[];
  savedRecipes: Types.ObjectId[];
  phone: string;
  address: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
}
