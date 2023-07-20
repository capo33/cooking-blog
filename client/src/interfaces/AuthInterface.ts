import { Recipe } from "./RecipeInterface";

export interface User {
  // result: {
  // };
  message: string;
  token: string;
  name: string;
  email: string;
  password: string;
  answer?: string;
  about?: string;
  // isAdmin?: boolean;
  role?: string;
  phone?: string;
  address?: string;
  savedRecipes?: string[];
  birthday?: Date;
  interests?: string[];
  _id?: string;
  image?: string;
  createdAt?: number;
  updatedAt?: number;
  // token: string;
}

export interface Guest {
  // user: User;
  // recipe : Recipe;
  user: {
    message: string;
    token: string;
    name: string;
    email: string;
    password: string;
    answer?: string;
    about?: string;
    // isAdmin?: boolean;
    role: string;
    phone?: string;
    address?: string;
    savedRecipes?: string[];
    birthday?: Date;
    interests?: string[];
    _id?: string;
    image?: string;
    createdAt?: number;
    updatedAt?: number;
  };
  recipes: Recipe[];
}
export interface AuthUser {
  email: string;
  password: string;
  name?: string;
  answer?: string;
}

export interface Auth {
  formData: AuthUser;
  navigate: any;
  toast?: any;
}

export interface IResetPassword {
  email: string;
  answer: string;
  newPassword: string;
}

export interface IUpdateProfile {
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  birthday?: Date;
  about?: string;
  image?: string;
  interests?: string[];
}
