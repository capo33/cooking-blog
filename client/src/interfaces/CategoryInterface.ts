import { Recipe } from "./RecipeInterface";

export interface Category {
  name: string;
  image: string;
  slug?: string;
  recipes?: Recipe[];
  _id?: string;
}

export interface ICategoryData {
  name: string;
  image: string;
}
