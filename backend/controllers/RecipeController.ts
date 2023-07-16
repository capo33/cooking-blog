import { Request, Response } from "express";

import UserModel from "../models/User";
import RecipeModel from "../models/Recipe";
import CategoryModel from "../models/Category";
import asyncHandler from "../middlewares/asyncHandler";
import { IReview } from "../interfaces/reviewInterface";
import { IRecipe } from "../interfaces/recipeInterface";

// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await RecipeModel.find({})
      .populate("owner", "name image")
      .populate("category", "name image");

    res.status(200).json(recipes);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;

    const recipe = await RecipeModel.findById(recipeId)
      .populate("owner", "-password")
      .populate("category", "name image");

    const views: number = recipe?.views || 0;
    recipe?.set({ views: views + 1 });
    await recipe?.save();

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//@desc     Create a recipe
//@route    POST /api/v1/recipes
//@access   Private
const createRecipe = async (req: Request, res: Response) => {
  try {
    if (!req?.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create a new recipe
    const newRecipe = await RecipeModel.create({
      ...req.body,
      owner: req?.user?._id,
    });

    // Add the recipe to the category
    await CategoryModel.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });

    res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      newRecipe,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
const updateRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the owner of the recipe
    if (recipe?.owner.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedRecipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Recipe updated successfully",
      updatedRecipe,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
const deleteRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;
  try {
    // Check if the user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if the recipe exists
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the owner of the recipe
    if (recipe?.owner.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await RecipeModel.findByIdAndDelete(recipeId);

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
const saveRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const recipe = await RecipeModel.findById(req.body.recipeID).populate(
      "category",
      "name image recipes"
    );

    const user = await UserModel.findById(req.body.userID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the recipe is already saved
    const isSaved = user?.savedRecipes.includes(recipe._id);
    if (isSaved) {
      return res.status(400).json({ message: "Recipe already saved" });
    }

    // Save the recipe
    await UserModel.findByIdAndUpdate(
      req.body.userID,
      {
        $push: { savedRecipes: recipe._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Recipe saved successfully",
      savedRecipes: user?.savedRecipes,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
const unsaveRecipe = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const recipe = await RecipeModel.findById(req.body.recipeID).populate(
      "category",
      "name image recipes"
    );
    const user = await UserModel.findById(req.body.userID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the recipe is already saved
    const isUnsaved = user?.savedRecipes.includes(recipe._id);

    if (!isUnsaved) {
      return res.status(400).json({ message: "Recipe not saved" });
    }

    // Unsave the recipe
    await UserModel.findByIdAndUpdate(
      req.body.userID,
      {
        $pull: { savedRecipes: recipe._id },
      },
      { new: true } // to return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Recipe unsaved successfully",
      savedRecipes: user?.savedRecipes,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
const getRecipesByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // user id
    const user = await UserModel.findById(id)
      .populate("savedRecipes")
      .select("-password");

    res.status(201).json(user?.savedRecipes);
  } catch (error: unknown | any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get saved recipes
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Private
const getSavedRecipes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // user id

    const user = await UserModel.findById(id)
      .populate("savedRecipes")
      .select("-password");

    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.savedRecipes }, // find recipes with ids in the savedRecipes array
    })
      .populate("category", "name image")
      .populate("owner", "name");

    res.status(200).json({ savedRecipes });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
const addReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // recipe id

    // we need to get the rating and comment because we are going to send a number rating and a comment
    const { rating, comment } = req.body;

    const recipe = await RecipeModel.findById(id)
      // .sort({ createdAt: -1 })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user already reviewed the recipe before, so we match the review user with the logged in user
    const alreadyReviewed = recipe.reviews.find(
      (review) => review?.user?.toString() === req.user?._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: "Recipe already reviewed" });
    }

    // if the user has not reviewed the recipe before, we create a new review object
    const review = {
      name: req.user?.name,
      rating: Number(rating),
      comment: comment,
      user: req.user?._id,
    };

    // we push the new review to the recipe reviews array
    recipe.reviews.push(review as IReview);

    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;

    // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
    recipe.rating =
      recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
      recipe?.reviews?.length;

    // we save the recipe
    await recipe.save();

    res.status(201).json({ recipe, message: "Review added" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
const deleteReview = async (req: Request, res: Response) => {
  try {
    const { recipeId, reviewId } = req.params; // recipe id and review id

    const recipe = await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $pull: { reviews: { _id: reviewId } },
      },
      { new: true }
    );

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // we update the number of reviews and the rating
    recipe.numReviews = recipe.reviews.length;

    // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
    recipe.rating =
      recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
      recipe?.reviews?.length;

    // we save the recipe
    await recipe.save();

    res.status(200).json({ recipe, message: "Review deleted" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

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
  deleteReview,
  likeRecipe,
  unlikeRecipe,
};
