import { Request, Response, NextFunction } from "express";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, answer } = req.body;

  // Check if user already exists
  if(!name || !email || !password || !answer) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }
  next();
};

