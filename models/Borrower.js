import mongoose from "mongoose";

const { Schema } = mongoose;

const borrowerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Borrower = mongoose.model("Borrower", borrowerSchema);

export default Borrower;
