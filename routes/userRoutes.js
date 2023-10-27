import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { login, register } from '../controllers/User.js';
// import { isVerified } from '../middleware/verifyToken.js';

const router = express.Router();

// User registration
router.post('/register', register);

// User login
// isVerified is to make sure only verified user can login
router.post('/login',  login);

export default router;
