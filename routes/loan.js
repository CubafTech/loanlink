import express from "express";
import {
  createLoan,
  getLoanById,
  updateLoan,
  getLoans,
  deleteLoan,
} from "../controllers/loan.js";
import { protect } from "../middleware/auth.js";
import { ableToRequestLoan } from "../middleware/loan.js";
// import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

// get all loans, basically for loan counts only admins can do this
router.get("/", getLoans);
// Create a new loan
router.post("/", protect, ableToRequestLoan, createLoan);

// Retrieve a loan by ID
router.get("/:id", getLoanById);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.put("/:id", updateLoan);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.delete("/:id", deleteLoan);

export default router;
