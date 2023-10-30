import Borrower from "../models/borrower.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const ableToRequestLoan = catchAsync(async (req, res, next) => {
  const user = await Borrower.findOne({ createdBy: req.user._id });
  if (user.status != "active") {
    return next(
      new AppError(
        `Wait while we active your account, your account is still ${user.status}`
      )
    );
  }
  next();
});
