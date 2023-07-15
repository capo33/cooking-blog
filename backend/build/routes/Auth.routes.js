"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const authController = __importStar(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
router.get("/logout", authController.logout);
router.get("/profile", authMiddleware_1.protect, authController.getProfile);
router.get("/users", authMiddleware_1.protect, authMiddleware_1.admin, authController.getUsers);
router.get("/user/:id", authController.getUserProfile);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.put("/update-profile", authMiddleware_1.protect, authController.updateProfile);
router.delete("/user", authMiddleware_1.protect, authController.deleteUserByUser);
router.delete("/user/:id", authMiddleware_1.protect, authMiddleware_1.admin, authController.deleteUserByAdmin);
exports.default = router;
