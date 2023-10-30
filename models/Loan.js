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
  // Interest rate (e.g., 5% for 5%)
  interestRate: {
    type: Number,
    required: true,
  },
  // Loan term in months
  term: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  repaymentMonth: {
    type: Number,
    required: [true, "provide the repayment month"],
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
  // Repayment schedule (e.g., array of due dates and amounts)

  // Add any other fields specific to your loan requirements
});

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
