import express from "express";

import * as categoryController from "../controllers/CategoryController";
import { protect, admin } from "../middlewares/authMiddleware";

const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(protect, admin, categoryController.createCategory);

router.get("/:slug", categoryController.getCategoryById);

router
  .route("/:id")
  .put(protect, admin, categoryController.updateCategory)
  .delete(protect, admin, categoryController.deleteCategory);

export default router;
