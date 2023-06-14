import express from "express";

import { protect, admin } from "../middlewares/authMiddleware";
import * as categoryController from "../controllers/CategoryController";

const router = express.Router();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(protect, admin, categoryController.createCategory);

router.get("/:slug", categoryController.getCategory);

router
  .route("/:id")
  .put(protect, admin, categoryController.updateCategory)
  .delete(protect, admin, categoryController.deleteCategory);

export default router;
