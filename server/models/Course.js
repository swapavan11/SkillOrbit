const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
  },
  courseDescription: {
    type: String,
    trim: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  whatYouWillLearn: {
    type: String,
    trim: true,
  },
  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
  ratingAndReviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingAndReview",
    },
  ],
  price: {
    type: Number,
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  studentsEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  tag: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  instructions: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
