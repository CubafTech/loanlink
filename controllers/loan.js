import { LOADIPHLPAPI } from "dns";
import Loan from "../models/Loan.js";
import catchAsync from "../utils/catchAsync.js";
import { validateRequestWithSchema } from "../utils/validate.js";
import AppError from "../utils/appError.js";

export const createLoan = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Loan.schema, next);
  const loan = await Loan.create({ createdBy: req.user._id, ...req.body });
  return res.status(201).json({
    status: "success",
    message: "You have successfully created a loan request",
  });
});

// Retrieve a loan by ID
export const getLoanById = async (req, res) => {
  const data = await Loan.findById(req.params._id);

  return res.status(200).json({
    status: "success",
    mesage: "Loan fetched successfully",
  });
};

// Update a loan by ID
export const updateLoan = catchAsync(async (req, res, next) => {
  const loan = await Loan.findById(req.params._id);
  if (loan.status === "defaulted" || loan.status === "funded")
    return next(
      new AppError(
        `Loan has been ${loan.status}, updating this loan is not allow`,
        400
      )
    );
  req.body.status = "pending";
  const data = await Loan.findOneAndUpdate(
    {
      _id: req.params._id,
      createdBy: req.user - _id,
    },
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    status: "success",
    message: "Loan updated successfully",
    data,
  });
});

// Delete a loan by ID
export const deleteLoan = catchAsync(async (req, res, next) => {
  const loan = await Loan.findById(req.params._id);
  if (loan.status === "defaulted" || loan.status === "funded")
    return next(
      new AppError(
        `Loan has been ${loan.status}, updating this loan is not allow`,
        400
      )
    );
  req.body.status = "pending";

  const deletedLoan = await Loan.findByIdAndRemove(req.params.id);
  if (!deletedLoan) {
    return next(new AppError("No loan found with that ID", 404));
  }
  return res.status(200).json({
    status: "success",
    message: "Loan deleted successfully",
  });
});

export const getAllLoans = catchAsync(async (req, res, next) => {
  const data = await Loan.find();

  return res.status(200).json({
    status: "success",
    message: "All loans retrieved successfully",
    data,
  });
});

export const getLoans = catchAsync(async (req, res) => {
  const data = await Loan.find({ createdBy: req.user._id });
  return res.status(200).json({
    status: "success",
    message: "Loans fetch successfully",
    data,
  });
});

export const FundLoan = catchAsync(async (req, res, next) => {});
