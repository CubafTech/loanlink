import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },
  phonenumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Match a 10-digit phone number with optional dashes or spaces
        return /^\d{10}$/.test(v.replace(/[-\s]/g, ''));
      },
      message: 'Phone number must be a 10-digit number with optional dashes or spaces.',
    },
  },
  tier: {
    type: String,
    enum: [
      "1", "2", "3"
    ],
    default:"1"
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pin:{
    type:String,
    required: true,
    max: 6,
    // Define a validation pattern for a 6-digit PIN
    validate: {
      validator: function (v) {
        // Match a 6-digit PIN
        return /^\d{6}$/.test(v);
      },
      message: 'PIN must be a 6-digit number.',
    },
    
  },
  isVerified: {
    type: Boolean,
    default:false
  },
  userType: {
    type: String,
    enum: ['borrower', 'lender'],
  },
  verificationCode: {
    type: Number,

  },
  isAdmin: {
    type: Boolean,
    default:false,
  },
  isSuperAdmin: {
    type: Boolean,
    default:false,
  }
  
});

const User = mongoose.model('User', userSchema);

export default User;
