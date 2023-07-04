import { Router } from "express";

import { protect, admin } from "../middlewares/authMiddleware";
import * as authController from "../controllers/AuthController";

const router: Router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", protect, authController.forgotPassword);
router.get("/logout", authController.logout);
router.get("/profile", protect, authController.getProfile);
router.get("/users", protect, admin, authController.getUsers);
router.get("/user/:id", authController.getUserProfile);
router.put("/update-profile", protect, authController.updateProfile);
router.delete("/user", protect, authController.deleteUserByUser);
router.delete("/user/:id", protect, admin, authController.deleteUserByAdmin);

export default router;
