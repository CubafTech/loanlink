import mongoose from "mongoose";

const { Schema } = mongoose;

const borrowerSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Your birth date is required"],
  },
  address: {
    type: String,
    required: [true, "Your home address is required"],
  },
  state: {
    type: String,
    required: [true, "Your state of resident is required"],
  },
  country: {
    type: String,
    default: "Nigeria",
    enum: {
      value: "Nigeria",
      message: "The only supported country is Nigeria",
    },
  },
  lga: {
    type: String,
    required: [true, "Local Government Area is required"],
  },
  businessType: {
    type: String,
  },
  businessDescription: {
    type: String,
  },
  role: {
    type: String,
  },
  bvn: {
    type: Number,
    min: 11,
    max: 11,
  },
  approveConsent: {
    type: Boolean,
  },
  status: {
    type: String,
    default: "inactive",
  },
});

const Borrower = mongoose.model("Borrower", borrowerSchema);

export default Borrower;
