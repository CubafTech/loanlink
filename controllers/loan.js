import Loan from "../models/loan.js";
import catchAsync from "../utils/catchAsync.js";
import { validateRequestWithSchema } from "../utils/validate.js";

export const createLoan = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Loan.schema, next);
  const loan = await Loan.create(req.body);
  return res.status(201).json({
    status: "success",
    message: "You have successfully created a loan request",
  });
});

// Retrieve a loan by ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("borrower");
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving the loan" });
  }
};

// Update a loan by ID
export const updateLoan = async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    return res.status(200).json(updatedLoan);
  } catch (error) {
    return res.status(500).json({ error: "Error updating the loan" });
  }
};

// Delete a loan by ID
export const deleteLoan = async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndRemove(req.params.id);
    if (!deletedLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }
    return res.status(200).json(deletedLoan);
  } catch (error) {
    return res.status(500).json({ error: "Error deleting the loan" });
  }
};

export const getLoans = async (req, res) => {
  try {
    const loan = await Loan.find(req.params.id);
    if (!loan) {
      return res.status(404).json({ error: "no loan at the moment found" });
    }
    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving the loan" });
  }
};
