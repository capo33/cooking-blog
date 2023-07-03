import { Types } from "mongoose";

export interface ICategory {
  name: string;
  slug?: string;
  image: string;
  recipes?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
