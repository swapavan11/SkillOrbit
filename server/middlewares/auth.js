const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async function (req, res, next) {
  try {
    // extracting the token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    console.log("Token is:", token);
    // if token is missing then returning the response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      // verification issue
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "Token is invalid, try log in again",
      });
    }
    //calling the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isStudent
exports.isStudent = async function (req, res, next) {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for students only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User cannot be verified, try again later",
    });
  }
};
// isInstructor
exports.isInstructor = async function (req, res, next) {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for instructor only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User cannot be verified, try again later",
    });
  }
};
// isAdmin
exports.isAdmin = async function (req, res, next) {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User cannot be verified, try again later",
    });
  }
};
