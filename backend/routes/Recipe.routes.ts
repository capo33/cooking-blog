import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();

router.get("/", recipeController.getRecipes);
router.get("/:recipeId", recipeController.getRecipeById);
router.put("/saveRecipe", protect, recipeController.saveRecipe);
router.put("/unsaveRecipe", protect, recipeController.unsaveRecipe);
router.post("/", protect, recipeController.createRecipe);
router.post("/:id/reviews", protect, recipeController.addReview);
router.delete("/:id/reviews/:reviewId", protect, recipeController.deleteReview);
router.put("/like", protect, recipeController.likeRecipe);
router.put("/unlike", protect, recipeController.unlikeRecipe);
router.put("/:recipeId", protect, recipeController.updateRecipe);
router.delete("/:recipeId", protect, recipeController.deleteRecipe);

router.get("/savedRecipes/:id", recipeController.getRecipesByUser); // Own recipes
router.get("/savedRecipes/ids/:id", recipeController.getSavedRecipes); // Saved recipes

export default router;
