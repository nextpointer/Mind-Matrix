import {
  registerUser,
  loginUser,
  LogOutUser,
  getUserInfo,
} from "../controllers/user.controller.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/").get(verifyToken, getUserInfo);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Authorized Routes
router.route("/logout").post(verifyToken, LogOutUser);

export default router;
