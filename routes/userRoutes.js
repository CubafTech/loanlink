import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth.js";

const router = express.Router();

// User registration
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/update-password", updatePassword);

export default router;
