import { Router } from "express";
import * as userController from "../controllers/AuthController";
 
const router: Router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
