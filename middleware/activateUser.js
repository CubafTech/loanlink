import User from "../models/auth.js";

// Controller for user account verification
export const verifyAccount = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    // Find the user by their email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided verification code matches the stored code
    if (user.verificationCode === verificationCode) {
      // Mark the account as verified
      user.isVerified = true;
      await user.save();

      return res.status(200).json({ message: "Account verified successfully" });
    } else {
      return res.status(401).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
