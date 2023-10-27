// userController.js
import User from "../models/auth.js";
import { generateCode } from "../utils/codegenerator.js";
import messagebird from "messagebird";
import bcrypt from "bcryptjs";

// messageBird config
const client = messagebird.initClient(process.env.BIRD_KEY);
// Controller for user registration
export const register = async (req, res) => {
  const { email, phonenumber, pin } = req.body;

  try {
    // Check if the email or phone is already in use
    const existingUser = await User.findOne({
      $or: [{ email }, { phonenumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or phone number is already registered" });
    }

    // Generates a verification code
    const verificationCode = generateCode();
    console.log(verificationCode);

    // Send the verification code via MessageBird
    //   commented this code because my messagebird id fails don't know y
    // client.messages.create(
    //   {
    //     originator: '+19452533831',
    //     recipients: [phonenumber],
    //     body: `Your LoanLink  verification code is: ${verificationCode}`,
    //   },
    //   (error, response) => {
    //     if (error) {
    //       console.error('MessageBird error:', error);
    //       return res.status(500).json({ message: 'Error sending verification code' });
    //     }
    //     return res.status(201).json({ message: 'User registered successfully' });
    //   }
    //   );
    // Create a new user document in the database
    const newUser = new User({ email, phonenumber, Pin, verificationCode });
    await newUser.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// login startssssss
// userController.js

// Controller for user login
export const login = async (req, res) => {
  const { phonenumber, pin } = req.body;

  try {
    // Find the user by phone number
    const user = await User.findOne({ phonenumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password

    if (user.pin === pin) {
      // Password is valid, user is authenticated
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT
      );
      res
        .cookie(
          "access_token",
          token,
          {
            secure: true,
            httpOnly: true,
          },
          { expiresIn: "1h" }
        )
        .json({
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phonenumber: user.phonenumber,
          token,
        });

      return res.status(200).json({ message: "Login successful" });
    } else {
      // Invalid password
      return res.status(401).json({ message: "Invalid pin" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
