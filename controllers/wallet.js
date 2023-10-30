import Wallet from "../models/wallet.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import { validateRequestWithSchema } from "../utils/validate.js";

export const fundWallet = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Wallet.schema, next);
  const wallet = await Wallet.findOne({ createdBy: req.user._id });
  let data;
  if (wallet) {
    data = await Wallet.findByIdAndUpdate(wallet._id, {
      amount: wallet.amount + req.body.amount,
    });
  } else {
    data = await Wallet.create({
      createdBy: req.user._id,
      amount: req.body.amount,
    });
  }
  return res.status(201).json({
    status: "success",
    message: "wallet funding successful",
    data,
  });
});

export const withdrawFund = catchAsync(async (req, res, next) => {
  validateRequestWithSchema(req, Wallet.schema, next);
  const wallet = await Wallet.findOne({ createdBy: req.user._id });
  let data;
  if (wallet) {
    if (wallet.amount < req.body.amount) {
      return next(
        new AppError("withrawal denied, due to lack of insufficent fund", 401)
      );
    }

    data = await Wallet.findByIdAndUpdate(wallet._id, {
      amount: wallet.amount - req.body.amount,
    });
  } else {
    data = await Wallet.create({
      createdBy: req.user._id,
      amount: req.body.amount,
    });
  }

  return res.status(201).json({
    status: "success",
    message: "wallet funding successful",
    data,
  });
});
