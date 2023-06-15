import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeServices from "./recipeServices";

interface Recipe {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  cookingTime: number;
  category: string;
  owner: string;
 }

interface RecipeState {
  recipes: Recipe[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

interface CreateRecipe {
  formData: Recipe;
  token: string;
}
const initialState: RecipeState = {
  recipes: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};


// *************************** Recipe *************************** //
// get all recipes
export const getAllRecipes = createAsyncThunk(
  "recipe/getAllRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await recipeServices.getAllRecipes();
      return response;
    } catch (error: unknown | any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return rejectWithValue(message);
    }
  }
);

// Create a recipe
export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async ( {formData, token}: CreateRecipe , thunkAPI) => {
    try {
      const response = await recipeServices.createRecipe(formData, token);
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

