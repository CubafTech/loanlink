import mongoose from "mongoose";

const { Schema } = mongoose;

const lenderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  investmentPreferences: {
    // Customize this field based on your platform's preferences
    type: [String],
    required: true,
  },
  preferredPaymentMethods: {
    // Customize this field based on available options (e.g., array of strings)
    type: [String],
    required: true,
  },
  bankAccount: {
    // Customize this field based on your platform's requirements
    bankName: String,
    accountNumber: String,
    routingNumber: String,
  },
  identityVerification: {
    // Customize this field to store verification documents
    driverLicense: String,
    passport: String,
  },
  incomeAndFinancialInfo: {
    // Customize this field based on what you collect
    annualIncome: Number,
    totalAssets: Number,
  },
  riskDisclosureAcknowledged: {
    type: Boolean,
    required: true,
  },
  agreementsAccepted: {
    investorAgreement: Boolean,
  },
});

const Lender = mongoose.model("Lender", lenderSchema);

export default Lender;
