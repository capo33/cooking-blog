import { Router } from "express";

import { protect, admin } from "../middlewares/authMiddleware";
import * as authController from "../controllers/AuthController";

const router: Router = Router();

router.get("/logout", authController.logout);
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/profile", protect, authController.getProfile);
router.get("/users", protect, admin, authController.getUsers);
router.get("/user/:id", authController.getUserProfile);
router.post("/forgot-password", authController.forgotPassword);
router.put("/update-profile", protect, authController.updateProfile);
router.delete("/user", protect, authController.deleteUserByUser);
router.delete("/user/:id", protect, admin, authController.deleteUserByAdmin);

export default router;
