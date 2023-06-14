import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/User";
import asyncHandler from "../middlewares/asyncHandler";
import { generateToken } from "../utils/generateToken";

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, answer } = req.body;

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if fields are empty
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  // Check the length of the password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    answer,
  });

  // generate token
  const token = generateToken(newUser._id);

  // Take out password from response
  const { password: _, ...userWithoutPassword } = newUser.toObject(); // we use toObject() instead of _doc in typescript to get the user object without the password

  // send response
  res.status(201).json({
    success: true,
    message: "User created successfully",
    token,
    user: userWithoutPassword,
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = await UserModel.findOne({ email });

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, existingUser.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  // generate token
  const token = generateToken(existingUser?._id);

  // Take out password from response
  const { password: _, ...userWithoutPassword } = existingUser.toObject();

  // send response
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    token,
    user: userWithoutPassword,
  });
});

// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
const logout = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "User logged out successfully",
  });
});

// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getProfile = asyncHandler(async (req: Request, res: Response) => {
  // get user from req.user
  const user = await UserModel.findById(req.user?._id).select("-password");

  // check user existince
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // generate token
  const token = generateToken(user?._id);

  // Remove password
  const { password: _, ...result } = user.toObject();

  // send response
  res.status(200).json({
    success: true,
    message: "Your profile",
    result,
    token,
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, answer, newPassword } = req.body;

  // Check if user exists
  const existingUser = await UserModel.findOne({ email });
  if (!existingUser) {
    res.status(400);
    throw new Error("User does not exist");
  }

  // Check if email is provided
  if (!email) {
    res.status(400);
    throw new Error("Please enter your email");
  }

  // Check if answer is provided
  if (!answer) {
    res.status(400);
    throw new Error("Please enter your answer");
  }

  // Check if the answer is matching
  if (existingUser.answer !== answer) {
    res.status(400);
    throw new Error("Answer is not correct");
  }

  // Check if newPassword is empty
  if (!newPassword) {
    res.status(400);
    throw new Error("Please enter your new password");
  }

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update user password
  const user = await UserModel.findByIdAndUpdate(existingUser._id, {
    password: hashedPassword,
  });

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
    user,
  });
});

export { register, login, logout, getProfile, forgotPassword };
