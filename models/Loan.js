import mongoose from "mongoose";

const { Schema } = mongoose;

const loanSchema = new Schema({
  // Reference to the borrower user

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "Borrower",
  },
  // Loan amount
  amount: {
    type: Number,
    required: true,
    min: [20000, "The minimum borrowable amount is 20000"],
    max: [500000, "The maximum borrowable amount is 500000"],
  },

  // Loan term in months
  term: {
    type: Number,
    required: true,
    min: [1, "The minimum loan term is 1 month"],
    max: [12, "The maximum loan term is 12 months"],
  },
  purpose: {
    type: String,
    required: true,
    minlength: [30, "The purpose of the loan must be at least 30 characters"],
  },

  // Status of the loan (e.g., 'pending', 'approved', 'repaid')
  status: {
    type: String,
    enum: ["pending", "funded", "repaid", "defaulted"],
    default: "pending",
  },
  // Lender (reference to the lender user)
  lender: {
    type: Schema.Types.ObjectId,
    ref: "Borrower",
  },
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
