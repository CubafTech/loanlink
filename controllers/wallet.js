import Wallet from "../models/wallet.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateRequestWithSchema } from "../utils/validate.js";

export const fundWallet = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Wallet.schema, next);
  const data = await Wallet.create({
    createdBy: req.user._id,
    owner: req.user._id,
    amount: req.body.amount,
    message: "Wallet Funding",
  });
  return res.status(201).json({
    status: "success",
    message: "wallet funding successful",
    data,
  });
});

export const withdrawFund = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Wallet.schema, next);
  const data = await Wallet.create({
    createdBy: req.user._id,
    owner: req.user._id,
    amount: -req.body.amount,
    message: "Fund withdraw",
  });

  return res.status(201).json({
    status: "success",
    message: "wallet funding successful",
    data,
  });
});
