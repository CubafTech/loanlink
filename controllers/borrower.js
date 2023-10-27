import Borrower from "../models/Borrower";
import catchAsync from "../utils/catchAsync";

const createAccount = catchAsync(async (req, res) => {
  const data = await Borrower.create({ createdBy: req.user._id });

  return res.status(201).json({
    status: "success",
    message: "Your profile has been successfully created",
    data,
  });
});
