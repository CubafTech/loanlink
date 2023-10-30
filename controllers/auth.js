import User from "../models/auth.js";
import catchAsync from "../utils/catchAsync.js";
import Email from "../utils/email.js";
import { createToken, createSendToken } from "../middleware/auth.js";
import AppError from "../utils/appError.js";

export const register = catchAsync(async (req, res, next) => {
  const { password, email, phone } = req.body;
  const user = await User.create({
    password,
    email,
    phone,
  });
  user.password = undefined;
  console.log({ user });
  createSendToken(201, user, "user created successfully", res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is provided

  if (!email || !password) {
    return next(new AppError("email and password are required", 401));
  }

  //   check if the details provided is in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("invalid credentials provided", 401));
  }
  //  await new Email(user, "new url").sendWelcome();

  createSendToken(200, user, "user logged in successfully", res);
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(
      new AppError("There is no user with this particular email address", 404)
    );
  }
  const token = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/reset-password/${token}`;

  const message = `Forgot your password ? please click the this link to reset to your password ${resetUrl}.\n If you did not forgot your password, Please ignore this.`;
  //   sendin email
  try {
    await new Email(user, "password reset").resetPassword(message);
    res.status(200).json({
      status: "success",
      message: "Check your e-mail to reset your password",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "something went wrong please retry again.",
    });
  }
  //   const mailSent
});
export const resetPassword = catchAsync(async (req, res, next) => {
  // Get the provided token from the user
  const passwordResetToken = req.params.token;

  const hashedToken = crypto
    .createHash("sha256")
    .update(passwordResetToken)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("invalid token or the token as expired", 401));
  }
  const { password, confirmPassword } = req.body;

  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save({ validateBeforeSave: true });

  createSendToken(200, user, "password reset successfully", res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  //  Get the user from the collection
  const user = await User.findOne(req.user._id).select("+password");

  const { password, newPassword, confirmPassword } = req.body;

  if (!(await user.comparePassword(password, user.password))) {
    return next(new AppError("You entered an invalid password", 402));
  }

  user.password = newPassword;
  user.confirmPassword = confirmPassword;

  await user.save({ validateBeforeSave: true });

  createSendToken(200, user, "password change succesfully", res);
});
