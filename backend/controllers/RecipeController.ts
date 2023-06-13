import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import asyncHandler from "../middlewares/asyncHandler";

// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  const recipes = await RecipeModel.find();

  if (recipes?.length === 0) {
    res.status(404);
    throw new Error("No recipes found");
  }

  res.status(200).json(recipes);
});

//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
const getRecipeById = asyncHandler(async (req: Request, res: Response) => {
  const recipe = await RecipeModel.findById(req.params.id).populate(
    "user",
    "-password"
  );

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  res.status(200).json(recipe);
});

//@desc     Create a recipe
//@route    POST /api/v1/recipes
//@access   Private
const createRecipe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const newRecipe = await RecipeModel.create({
    ...req.body,
    user: req.user._id,
  });

  res.status(201).json(newRecipe);
});

export { getRecipes, getRecipeById, createRecipe };
