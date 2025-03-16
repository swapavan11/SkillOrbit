const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60,
  },
});

// sendVerificationEmail -> will send the verification email to the user
async function sendVerificationEmail(email, otp) {
  try {
    const response = await mailSender(
      email,
      "Verification email from StudyNotion",
      otpTemplate(otp)
    );
    console.log("Verification mail sent successfully ", response);
  } catch (error) {
    console.log("Error occurred while sending verification mail", error);
  }
}
// ADDING PRE MIDDLEWARE THAT WILL VERIFY OTP FIRST BEFORE REGISTERING THE USER
otpSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
