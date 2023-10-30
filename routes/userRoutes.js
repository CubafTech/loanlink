import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// User registration
router.post("/register", register);
router.post("/login", login);

export default router;
