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
      .populate("owner", "name avatar")
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
      res.status(404).json({ message: "Recipe not found" });
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
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newRecipe = await RecipeModel.create({
      ...req.body,
      owner: req.user._id,
    });

    await CategoryModel.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipe._id },
    });

    res.status(201).json(newRecipe);
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
    console.log(recipe);

    const user = await UserModel.findById(req.body.userID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if the user is the owner of the recipe
    // if (recipe.owner.toString() === req?.user?._id.toString()) {
    //   res.status(401);
    //   throw new Error("You cannot save your own recipe");
    // }

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

    // user?.savedRecipes.push(recipe._id);

    // await user?.save();

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
      "name"
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

    res.status(200).json({
      // savedRecipes: user?.savedRecipes,
      savedRecipes,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

// // @desc    Create a review
// // @route   POST /api/v1/recipes/:id/reviews
// // @access  Private
// const addReview = asyncHandler(async (req: Request, res: Response) => {
//   const { id } = req.params; // recipe id
//   const { rating, comment } = req.body;

//   const recipe = await RecipeModel.findById(id);

//   if (!recipe) {
//     res.status(404);
//     throw new Error("Recipe not found");
//   }

//   const alreadyReviewed = recipe.reviews.find(
//     (r) => r?.user?.toString() === req.user?._id.toString()
//   );

//   if (alreadyReviewed) {
//     res.status(400);
//     throw new Error("Recipe already reviewed");
//   }

//   const review = {
//     name: req.user?.name,
//     rating: Number(rating),
//     comment: comment,
//     user: req.user?._id,
//   };

//   recipe.reviews.push(review as IReview);

//   recipe.numReviews = recipe.reviews.length;

//   recipe.rating =
//     recipe?.reviews?.reduce((acc, item) => Number(item?.rating) + acc, 0) /
//     recipe.reviews.length;

//   await recipe.save();

//   res.status(201).json({ message: "Review added" });
// });

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
  // addReview,
  likeRecipe,
  unlikeRecipe,
};
