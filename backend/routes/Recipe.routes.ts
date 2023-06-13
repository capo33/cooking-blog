import { Router } from "express";

import { protect } from "../middlewares/authMiddleware";
import * as recipeController from "../controllers/RecipeController";

const router: Router = Router();

router.get("/", recipeController.getRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", protect, recipeController.createRecipe);

export default router;
