import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { login, register } from '../controllers/User.js';

const router = express.Router();

// User registration
router.post('/register', register);

// User login
router.post('/login', login);

export default router;
