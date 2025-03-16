const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
exports.resetPasswordToken = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered",
      });
    }
    const token = crypto.randomUUID();
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true },
    );
    const url = `https://study-notion-iota-two.vercel.app/update-password/${token}`;

    await mailSender(
      email,
      "Password reset link",
      `Password reset link: ${url}`,
    );

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, please check the mail and change the password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending password reset mail",
    });
  }
};

exports.resetPassword = async function (req, res) {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password must match",
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true },
    );
    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while reseting the password",
    });
  }
};
