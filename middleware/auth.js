import { promisify } from "util";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/auth.js";

export const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const createSendToken = (statusCode, user, message, res) => {
  const token = createToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 3600 * 1000
    ),
    // secure: true,
  });
  if (process.env.NODE_ENV === "production") {
    res.cookie.secure = true;
  }
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    message,
    data: {
      user,
    },
  });
};

export const protect = catchAsync(async (req, res, next) => {
  // check if the user pass an authorization header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("No Authorization header found", 401));
  }

  //   verify if the token passed is valid token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //   check if the user with the token still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The token belong to this user does no longer exist")
    );
  }

  //   Check if the password was changed
  // if (user.changePasswordAt(decoded.iat)) {
  //   return next(
  //     new AppError("The password is recently changed please log in again", 401)
  //   );
  // }
  req.user = user;
  next();
});

export const restrict = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission for this action", 403)
      );
    }
    next();
  };
};
