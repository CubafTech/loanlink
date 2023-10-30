import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
    default: 0,
    required: [true, "The amount is required"],
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
