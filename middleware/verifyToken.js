import jwt from 'jsonwebtoken';
import { createError } from '../error.js';
import dotenv from 'dotenv';
dotenv.config();


export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
        return next(createError(401, "You are not authenticated!"))
    }
  jwt.verify(token.split(' ')[1], process.env.JWT, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user;
    next();
  });
}


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id) {
            next()
        } else {
            return next(createError(401, "You are not authorized!"));
        }
    })
}


export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.isAdmin) {
            next();
        } else {
         return next(createError(401, "You are not an Educator bruh!!!"));
        }
    })
}
export const isSuper = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.isSuperAdmin) {
            next();
        } else {
         return next(createError(401, "Only a super user can do this bruh!!!"));
        }
    })
}
// this to ensure that only a verifed user can do anything, 
export const isVerified = (req, res, next) => {
        if (req.isVerified) {
            next();
        } else {
            return next(createError(401, "your account is not verified yet"))
        }
}