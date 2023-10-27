import mongoose from 'mongoose';

const { Schema } = mongoose;

const borrowerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  borrowerName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  creditScore: {
    type: Number,
    min: 300, // Minimum credit score value
    max: 850, // Maximum credit score value
  },
  // Other borrower-specific fields can be added here
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

export default Borrower;
