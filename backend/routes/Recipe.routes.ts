import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();
// getRecipes,
//   getRecipeById,
//   createRecipe,
//   updateRecipe,
//   deleteRecipe,
//   saveRecipe,
//   unsaveRecipe,
//   getSavedRecipes,
//   getRecipesByUser
router
  .route("/")
  .get(recipeController.getRecipes)
  // .put(protect, recipeController.saveRecipe)
  // .put(protect, recipeController.unsaveRecipe)
  .post(protect, recipeController.createRecipe);
// router.put("/saveRecipe", protect, recipeController.saveRecipe);
// router.put("/unsaveRecipe", protect, recipeController.unsaveRecipe);
router.put("/like", protect, recipeController.likeRecipe);
router.put("/unlike", protect, recipeController.unlikeRecipe);
// router
//   .route("/:recipeId")
//   .get(recipeController.getRecipeById)
//   .put(protect, recipeController.updateRecipe)
//   .delete(protect, recipeController.deleteRecipe);

// router.post("/:id/reviews", protect, recipeController.addReview);
// router.get("/savedRecipes/:id", recipeController.getRecipesByUser);
// router.get("/savedRecipes/ids/:id", recipeController.getSavedRecipes);

export default router;
