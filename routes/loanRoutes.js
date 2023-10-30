import express from "express";
import {
  createLoan,
  getLoanById,
  updateLoan,
  getLoans,
  deleteLoan,
} from "../controllers/loanController.js";
// import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

// get all loans, basically for loan counts only admins can do this
router.get("/loans", getLoans);
// Create a new loan
router.post("/loans/create", createLoan);

// Retrieve a loan by ID
router.get("/loans/:id", getLoanById);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.put("/loans/:id", updateLoan);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.delete("/loans/:id", deleteLoan);

export default router;
