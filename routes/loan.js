import express from "express";
import {
  createLoan,
  getLoanById,
  updateLoan,
  getLoans,
  deleteLoan,
  getAllLoans,
  FundLoan,
} from "../controllers/loan.js";
import { protect } from "../middleware/auth.js";
import { ableToRequestLoan } from "../middleware/loan.js";
// import { verifyAdmin, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

router.use(protect);
// get all loans, basically for loan counts only admins can do this
router.get("/all", getAllLoans);
router.get("/", getLoans);
// Create a new loan

router.post("/", ableToRequestLoan, createLoan);
router.get("/fund/:_id", FundLoan);

// Retrieve a loan by ID
router.get("/:_id", getLoanById);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.put("/:_id", updateLoan);

// Update a loan by ID (Protected route: only authorized users can update loans)
router.delete("/:_id", deleteLoan);

export default router;
