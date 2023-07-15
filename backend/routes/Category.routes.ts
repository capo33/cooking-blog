import * as express from "express";

import { protect, admin } from "../middlewares/authMiddleware";
import * as categoryController from "../controllers/CategoryController";

const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:slug", categoryController.getCategory);
router.post("/", protect, admin, categoryController.createCategory);
router.put("/:id", protect, admin, categoryController.updateCategory);
router.delete("/:id", protect, admin, categoryController.deleteCategory);

export default router;
