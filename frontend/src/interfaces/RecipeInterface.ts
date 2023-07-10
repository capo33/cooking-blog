import { Category } from "./CategoryInterface";

export interface Owner {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  isAdmin?: boolean;
}
 
 
export interface Review {
  rating: number;
  comment: string;
  _id?: string;
  name?: string;
  user?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Recipe {
  _id?: string;
  name: string;
  ingredients: string[];
  instructions: string;
  image: string;
  cookingTime: number;
  category: Category;
  owner: Owner;
  likes?: string[];
  views?: number;
  reviews?: Review[];
  rating?: number;
  numReviews?: number;
  slug?: string;
  createdAt?: number;
}

export interface CreateRecipe {
  formData: Recipe;
  token: string;
}
