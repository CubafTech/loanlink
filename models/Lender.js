import mongoose from "mongoose";

const { Schema } = mongoose;

const lenderSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    required: [true, "The first name is required"],
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "The Last name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{{VALUE}} is not a valid gender",
    },
    required: true,
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
  type: {
    type: String,
    default: "lender",
    emum: ["lender"],
  },
  income: {
    type: Number,
    required: [true, "Your income is required"],
  },
  approveConsent: {
    type: Boolean,
    required: [true, "You must agree to our terms and conditions"],
  },
  status: {
    type: String,
    default: "inactive",
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Lender = mongoose.model("Lender", lenderSchema);

export default Lender;
