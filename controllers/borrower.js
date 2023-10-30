import Borrower from "../models/Borrower.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateRequestWithSchema } from "../utils/validate.js";
import { response } from "express";

export const createAccount = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Borrower.schema, next);
  const response = await Borrower.findOne({ createdBy: req.user._id });

  let data;
  if (response) {
    data = await response.findByIdAndUpdate(response._id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    data = await Borrower.create({
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
