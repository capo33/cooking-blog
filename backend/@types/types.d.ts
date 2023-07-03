import { Types } from "mongoose";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: Types.ObjectId;
        isAdmin?: string;
        name?: string;
        email?: string;
        avatar?: string;
        password?: string;
        // username: string;
      } | null;
    }
  }
}

export {};
