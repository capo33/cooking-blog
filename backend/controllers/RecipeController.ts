import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import asyncHandler from "../middlewares/asyncHandler";
import { IReview } from "../interfaces/reviewInterface";
import { IRecipe } from "../interfaces/recipeInterface";

// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
const getRecipes = asyncHandler(async (req: Request, res: Response) => {
  const recipes = await RecipeModel.find()
    .populate("owner", "-password")
    .populate("category");

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
  const { recipeId } = req.params;
  const recipe = await RecipeModel.findById(recipeId).populate(
    "owner",
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
    owner: req.user._id,
  });

  res.status(201).json(newRecipe);
});

//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
const updateRecipe = asyncHandler(async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not founds");
  }

  // Check if the user is the owner of the recipe
  if (recipe?.owner.toString() !== req.user?._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedRecipe = await RecipeModel.findByIdAndUpdate(
    recipeId,
    req.body,
    { new: true }
  );
  console.log(updatedRecipe);

  res.status(200).json(updatedRecipe);
});

//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
const deleteRecipe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const recipe = await RecipeModel.findById(req.params.id);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // Check if the user is the owner of the recipe
  if (recipe.owner.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await recipe.deleteOne();

  res.status(200).json({ message: "Recipe deleted successfully" });
});

// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
const saveRecipe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // Check if the user is the owner of the recipe
  // if (recipe.owner.toString() === req?.user?._id.toString()) {
  //   res.status(401);
  //   throw new Error("You cannot save your own recipe");
  // }

  // Check if the recipe is already saved
  const isSaved = user?.savedRecipes.includes(recipe._id);
  if (isSaved) {
    res.status(400);
    throw new Error("Recipe already saved");
  }

  user?.savedRecipes.push(recipe._id);

  await user?.save();

  res.status(200).json({
    message: "Recipe saved successfully",
    savedRecipes: user?.savedRecipes,
  });
});

// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
const unsaveRecipe = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const recipe = await RecipeModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  // Check if the user is the owner of the recipe
  // if (recipe.owner.toString() === req.user._id.toString()) {
  //   res.status(401);

  //   throw new Error("You cannot unsave your own recipe");
  // }

  // Check if the recipe is already unsaved
  const isUnsaved = user?.savedRecipes.includes(recipe._id);

  if (!isUnsaved) {
    res.status(400);
    throw new Error("Recipe already unsaved");
  }

  await UserModel.findByIdAndUpdate(req.body.userID, {
    $pull: { savedRecipes: recipe._id },
  });

  res.status(200).json({ message: "Recipe unsaved successfully" });
});

// @desc    Get saved recipes
// @route   GET /api/v1/recipes/saved
// @access  Private
const getSavedRecipes = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // user id

  const user = await UserModel.findById(id).select("-password");

  const savedRecipes = await RecipeModel.find({
    _id: { $in: user?.savedRecipes },
  });

  res.status(200).json(savedRecipes);
});

// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
const getRecipesByUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // user id

  const user = await UserModel.findById(id)
    .populate("savedRecipes")
    .select("-password");

  res.status(200).json({ savedRecipes: user?.savedRecipes });
});

// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
const addReview = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params; // recipe id
  const { rating, comment } = req.body;

  const recipe = await RecipeModel.findById(id);

  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  const alreadyReviewed = recipe.reviews.find(
    (r) => r?.user?.toString() === req.user?._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("Recipe already reviewed");
  }

  const review = {
    name: req.user?.name,
    rating: Number(rating),
    comment: comment,
    user: req.user?._id,
  };

  recipe.reviews.push(review as IReview);

  recipe.numReviews = recipe.reviews.length;

  recipe.rating =
    recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
    recipe.reviews.length;

  await recipe.save();

  res.status(201).json({ message: "Review added" });
});

// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
const likeRecipe = asyncHandler(async (req: Request, res: Response) => {
  const recipe = await RecipeModel.findByIdAndUpdate(
    req.body.recipeID,
    {
      $push: { likes: req.user?._id },
    },
    { new: true }
  );
  if (!recipe) {
    res.status(404);
    throw new Error("Recipe not found");
  }

  res.status(200).json({
    message: "Recipe liked successfully",
    likes: recipe?.likes,
  });
});

// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
const unlikeRecipe = asyncHandler(async (req: Request, res: Response) => {
  const recipe = await RecipeModel.findByIdAndUpdate(
    req.body.recipeID,
    {
      $pull: { likes: req.user?._id },
    },
    { new: true }
  );

  res.status(200).json({
    message: "Recipe unliked successfully",
    likes: recipe?.likes,
  });
});

export {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  saveRecipe,
  unsaveRecipe,
  getSavedRecipes,
  getRecipesByUser,
  addReview,
  likeRecipe,
  unlikeRecipe,
};
