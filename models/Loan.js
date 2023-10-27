import mongoose from 'mongoose';

const { Schema } = mongoose;

const loanSchema = new Schema({
  // Reference to the borrower user
  borrower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Loan amount
  amount: {
    type: Number,
    required: true,
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
  // Date when the loan was created
  createdDate: {
    type: Date,
    default: Date.now,
  },
  // Status of the loan (e.g., 'pending', 'approved', 'repaid')
  status: {
    type: String,
    enum: ['pending', 'approved', 'repaid'],
    default: 'pending',
  },
  // Lender (reference to the lender user)
  lender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  // Repayment schedule (e.g., array of due dates and amounts)
  repaymentSchedule: [
    {
      dueDate: {
        type: Date,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      paid: {
        type: Boolean,
        default: false,
      },
    },
  ],
  // Add any other fields specific to your loan requirements
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
