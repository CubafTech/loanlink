import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import { validateNigeriaPhoneNumber } from "../utils/validate.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      unique: true,
      index: true,
      sparse: true,
      required: true,
      type: String,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      unique: true,
      index: true,
      required: true,
      validate: {
        validator: validateNigeriaPhoneNumber,
        message: "please provide a valid phone number",
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: Number,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
      validate: [
        validator.isStrongPassword,
        "Please provide a strong password ",
      ],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.comparePassword = async function (
  providedPassword,
  dbPassword
) {
  return await bcrypt.compare(providedPassword, dbPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
