import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();

router
  .route("/")
  .get(recipeController.getRecipes)
  .post(protect, recipeController.createRecipe);

router.put("/saveRecipe", protect, recipeController.saveRecipe);
router.put("/unsaveRecipe", protect, recipeController.unsaveRecipe);
router.put("/like", protect, recipeController.likeRecipe);
router.put("/unlike", protect, recipeController.unlikeRecipe);

router
  .route("/:recipeId")
  .get(recipeController.getRecipeById)
  .put(protect, recipeController.updateRecipe)
  .delete(protect, recipeController.deleteRecipe);

router.post("/:id/reviews", protect, recipeController.addReview);
router.get("/savedRecipes/:id", recipeController.getRecipesByUser); // Own recipes
router.get("/savedRecipes/ids/:id", recipeController.getSavedRecipes);   // Saved recipes

export default router;
