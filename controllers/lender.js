import Lender from "../models/Lender.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateRequestWithSchema } from "../utils/validate.js";

export const createAccount = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Lender.schema, next);
  const response = await Lender.findOne({ createdBy: req.user._id });

  let data;
  if (response) {
    data = await response.findByIdAndUpdate(response._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    data = await Lender.create({
      createdBy: req.user._id,
      ...req.body,
    });
  }

  return res.status(201).json({
    status: "success",
    message: "Your profile has been successfully created",
    data,
  });
});

export const fetchProfile = catchAsync(async (req, res, next) => {
  const user = await Lender.findById(req.user._id);
  if (!user) return next(new AppError("user profile do not exist", 404));
  return res.status(200).json({
    status: "sucess",
    message: "Profile fetched successfully",
  });
});
