import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loan.js";
import lenderRoutes from "./routes/lender.js";
import borrowerRoutes from "./routes/borrower.js";
import cookieParser from "cookie-parser";
import AppError from "./utils/appError.js";
import { globalError } from "./controllers/error.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());

app.use(bodyParser.json());
app.use(cors());
app.use(`${process.env.BASE_URL}/auth`, userRoutes);
app.use(`${process.env.BASE_URL}/borrower`, borrowerRoutes);
app.use(`${process.env.BASE_URL}/loan`, loanRoutes);
app.use(`${process.env.BASE_URL}/lender`, lenderRoutes);
// app.use(`${process.env.BASE_URL}/loan`, loanRoutes);

app.all("*", (req, res, next) => {
  const err = new AppError(`cannot find ${req.originalUrl}`, 404);
  next(err);
});

// Global Error handling Middleware

app.use(globalError);

export default app;
