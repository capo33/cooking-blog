import axios from "axios";

import { RECIPE_URL } from "../../../constants/constants";

// *************************** Recipe *************************** //
// get all recipes
const getAllRecipes = async () => {
  const response = await axios.get(`${RECIPE_URL}`);
  return response.data;
};

interface Recipe {
  name: string;
  ingredients: string;
  instructions: string;
  image: string;
  cookingTime: number;
  category: string;
  owner: string;
}

// Create a recipe
const createRecipe = async (formData: Recipe, token: string) => {
  const response = await axios.post(`${RECIPE_URL}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get saved recipes
const getRecipesByUserId = async (userID: string, token: string) => {
  const response = await axios.get(
    `${RECIPE_URL}/savedRecipes/ids/${userID} `,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Save a recipe
const saveRecipe = async (recipeID: string, userID: string, token: string) => {
  const response = await axios.put(
    `${RECIPE_URL}`,
    { recipeID, userID },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// Get a recipe by ID
const getRecipeById = async (userID: string) => {
  const response = await axios.get(`${RECIPE_URL}/savedRecipes/${userID}`);
  return response.data;
};

// Update a recipe
const updateRecipe = async (
  recipeId: string,
  formData: Recipe,
  token: string
) => {
  const response = await axios.put(`${RECIPE_URL}/${recipeId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete a recipe
const deleteRecipe = async (recipeId: string, token: string) => {
  const response = await axios.delete(`${RECIPE_URL}/${recipeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const recipeService = {
  getAllRecipes,
  createRecipe,
  getRecipesByUserId,
  saveRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

export default recipeService;
