const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
// create rating
exports.createRating = async function (req, res) {
  try {
    // get rating data
    const { courseId, rating, review } = req.body;
    // get user id
    const userId = req.user.id;
    // check if user is enrolled in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "User not enrolled in the course",
      });
    }
    // check if user has already given rating
    const givenRating = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (givenRating) {
      return res.status(400).json({
        success: false,
        message: "User has already rated the course",
      });
    }
    //create a rating and review
    const ratingReview = await RatingAndReview.create({
      user: userId,
      rating,
      review,
      course: courseId,
    });
    // update the course with this rating
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: ratingReview,
      },
    });
    // return the success response
    return res.status(200).json({
      success: true,
      message: "User rating and review added successfully",
      ratingReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding rating to the course",
    });
  }
};

// get Average rating
exports.getAverageRating = async function (req, res) {
  try {
    const { courseId } = req.body;
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Found average rating successfully",
        averageRating: result[0].averageRating,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average rating of the course is 0, no one has rated it yet",
      averageRating: 0,
    });
  } catch (error) {
    console.log(error);
    return res.staus(500).json({
      success: false,
      message: "Something went wrong, while fetching average rating",
    });
  }
};
// get all rating
exports.getAllRating = async function (req, res) {
  try {
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, while fetching all ratings",
    });
  }
};
