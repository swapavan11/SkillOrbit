const User = require("../models/User");
const Profile = require("../models/Profile");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
// update the user profile
exports.updateProfile = async function (req, res) {
  try {
    // get data
    const {
      gender = "",
      dateOfBirth = "",
      about = "",
      contactNumber,
      firstName,
      lastName,
    } = req.body;
    const userId = req.user.id;

    const userDetails = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
      },
      { new: true },
    );
    const profileId = userDetails.additionalDetails;
    console.log("Profile id: ", profileId);
    const profileDetails = await Profile.findById(profileId).exec();
    console.log("Profile details: ", profileDetails);
    profileDetails.gender = gender;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    const updatedUser =
      await User.findById(userId).populate("additionalDetails");
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating profile",
    });
  }
};

// controller for deleting account
exports.deleteAccount = async function (req, res) {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetails);
    // delete user
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the user",
      error: error.message,
    });
  }
};

// get all user details
exports.getUserDetails = async function (req, res) {
  try {
    // get user id
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    // validate user details
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // retun user details
    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user details",
      error: error.message,
    });
  }
};

// have to implement these again
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000,
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true },
    ).populate("additionalDetails");
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    // Calculating the user progress percentage
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0,
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds,
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier,
          ) / multiplier;
      }
    }
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    console.log("These are all the courses : ", courseDetails);
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
