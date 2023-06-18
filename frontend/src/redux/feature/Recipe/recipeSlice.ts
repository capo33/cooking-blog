import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import recipeServices from "./recipeServices";
import { CreateRecipe, Recipe } from "../../../interfaces/RecipeInterface";

interface RecipeState {
  recipes: Recipe[];
  recipe: Recipe | null;
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: RecipeState = {
  recipes: [],
  recipe: null,
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
export const createRecipe = createAsyncThunk<Recipe, CreateRecipe>(
  "recipe/createRecipe",
  async ({ formData, token }, thunkAPI) => {
    try {
      const response = await recipeServices.createRecipe(formData, token);
      thunkAPI.dispatch(getAllRecipes());
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Uploading images
export const uploadImages = createAsyncThunk(
  "recipe/uploadImages",
  async ({ data, token }: { data: string; token: string }, thunkAPI) => {
    try {
      const response = await recipeServices.uploadRecipeImage(data, token);
      return response;
    } catch (error: unknown | any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.recipes = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get all recipes
    builder.addCase(getAllRecipes.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecipes.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.recipes = payload;
    });
    builder.addCase(getAllRecipes.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });

    // Create a recipe
    builder.addCase(createRecipe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRecipe.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.recipe = payload as Recipe;

    });
    builder.addCase(createRecipe.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
    builder.addCase(uploadImages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(uploadImages.fulfilled, (state, { payload }) => {
      console.log(payload);
      
      state.isLoading = false;
      state.isSuccess = true;
      state.recipes = payload;
    });
    builder.addCase(uploadImages.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload as string;
    });
  },
});

export const { setName } = recipeSlice.actions;

export default recipeSlice.reducer;
