import { Types } from "mongoose";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        // isAdmin?: string;
        role?: string;
        name?: string;
        email?: string;
        avatar?: string;
        password?: string;
        // username: string;
      } | null;
      recipe: {
        _id: Types.ObjectId;
        name: string;
        instructions: string;
        ingredients: string[];
        image: string;
        cookingTime: number;
        views: number;
        reviews: {
          _id: Types.ObjectId;
          name: string;
          rating: number;
          comment: string;
          user: Types.ObjectId;
        }[];
        rating: number;
        numReviews: number;
        slug: string;
        likes: Types.ObjectId[];
        category: Types.ObjectId;
        owner: Types.ObjectId;
        createdAt: Date;

        // username: string;
      } | null;
    }
  }
}

export {};
