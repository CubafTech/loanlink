import Borrower from "../models/borrower.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateRequestWithSchema } from "../utils/validate.js";

export const createAccount = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Borrower.schema, next);
  const borrower = await Borrower.findOne({ createdBy: req.user._id });

  let data;
  if (borrower) {
    data = await Borrower.findByIdAndUpdate(borrower._id, req.body, {
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
