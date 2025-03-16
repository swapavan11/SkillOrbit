/* eslint-disable no-undef */
const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
// send OTP controller
exports.sendOTP = async function (req, res) {
  try {
    const { email } = req.body;
    const userRegistered = await User.findOne({ email });
    if (userRegistered) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    console.log("Otp generated: ", otp);

    let exists = await OTP.findOne({ otp });
    while (exists) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      exists = await OTP.findOne({ otp });
    }

    const otpPayload = { email, otp };
    console.log("Otp payload: ", otpPayload);
    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Signup controller
exports.signUp = async function (req, res) {
  try {
    const {
      email,
      firstName,
      lastName,
      otp,
      password,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !email ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fiels are required",
      });
    }

    if (confirmPassword !== password) {
      return res.status(401).json({
        success: false,
        message: "Password and Confirm Password must be same",
      });
    }

    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }
    const recentOTP = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("OTP ", otp);
    console.log("Recent OTP: ", recentOTP.otp);
    if (!recentOTP || recentOTP?.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (recentOTP.otp !== Number(otp)) {
      return res.status(400).json({
        success: false,
        message: "OTP not valid",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating entry of user in database
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      additionalDetails: profileDetails,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered please try again later",
    });
  }
};

// Login controller
exports.login = async function (req, res) {
  try {
    // Get user data
    const { email, password } = req.body;
    // validate data
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    // check if user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not registered, please sign up first",
      });
    }
    // check if password match
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });
      user.token = token;
      user.password = undefined;
      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      return res.cookie("token", token, options).status(200).json({
        success: true,
        message: "Logged In successfully",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};

exports.changePassword = async function (req, res) {
  try {
    const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findOne({ email });

    // if user does'nt exists or password does'nt match
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    // Validating the password
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }
    // Now finally changing the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // sending the mail
    const response = await mailSender(
      user.email,
      "Password Changed Successfully",
      "Password changed",
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Cannot change password, try again later",
    });
  }
};
