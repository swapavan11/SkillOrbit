const User = require("../models/User");
const Course = require("../models/Course");
const { instance } = require("../config/razorpay");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
// capture the payment and initiate the Razorpay order
// exports.capturePayment = async function (req, res) {
//   // get courseID and userID
//   const { courseId } = req.body;
//   const userId = req.user.id;
//   //validation
//   //valid courseID
//   if (!courseId) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide a valid  courseID",
//     });
//   }
//   // valid course detail
//   let courseDetails;
//   try {
//     courseDetails = await Course.findById(courseId);
//     if (!courseDetails) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Could not find Course" });
//     }

//     // now we will check if user is already enrolled in this course
//     // userId is in string format therefore we will convert it to Object Type
//     const uId = new mongoose.Types.Objectid(userId);
//     if (courseDetails.studentsEnrolled.includes(uId)) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already enrolled in this course",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message:
//         "Something went wrong while creating order for purchasing the course",
//     });
//   }

//   // order create
//   const amount = courseDetails.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency: currency,
//     receipt: Math.random(Date.now()).toString(),
//     notes: {
//       courseId: courseDetails._id,
//       userId,
//     },
//   };

//   try {
//     // initiate payment using razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);
//     // return response
//     return res.status(200).json({
//       success: true,
//       courseName: courseDetails.courseName,
//       courseDescription: courseDetails.courseDescription,
//       thumbnail: courseDetails.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message:
//         "Something went wrong while creating order for purchasing the course",
//     });
//   }
//   // return the response
// };

// controller for verifying payment

// is route par razorpay ki webhook hit karegi aur request mein uske paas hashedSecret hoga
// hum us secret ko apne secret se compare karenge
// secret verify hone par fir user and course mein required updates karenge
// exports.verifySignature = async function (req, res) {
//   // webhook secret
//   const webHookSecret = "123456";
//   // get the hashed secret from razor pay request
//   const signature = req.headers["x-razorpay-signature"];

//   // apne server vale secret ko phle hash karenge
//   const shasum = crypto.createHmac("sha256", webHookSecret);
//   shasum.update(JSON.stringify(req.body));
//   const digest = shasum.digest("hex");

//   // If signature gets verified
//   if (signature === digest) {
//     console.log("Payment is authorized");

//     // Ye req Razorpay ne bheji hai
//     // Aur isme userId and CourseID humne notes mein daali thi order create karte time
//     // therefore hum uska use karenge
//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       // find the course and enroll student in it
//       const enrolledCourse = await Course.findByIdAndUpdate(
//         courseId,
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );
//       // course not found
//       if (!enrolledCourse) {
//         return res.status(404).json({
//           success: false,
//           message: "Could not find the course",
//         });
//       }
//       console.log(enrolledCourse);

//       // find student and update course
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         { new: true }
//       );

//       // Now send the course enrollment mail
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulations",
//         "You have successfully enrolled the course"
//       );

//       console.log(emailResponse);

//       return res.status(200).json({
//         success: true,
//         message: "Signature verified and course added successfully",
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Something went wrong while verifying the signature",
//       });
//     }
//   } else {
//     return res.status(400).json({
//       success: false,
//       message: "Signature not verified, invalid request",
//     });
//   }
// };

exports.capturePayment = async (req, res) => {
  // Step 1 -> get courses array from body
  const { courses } = req.body;
  const userId = req.user.id;

  // Apply some validation
  if (courses.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "Please provide courses" });
  }

  // STEP 3 ->  calculate the total amount
  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);

      // If course not found return response
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Could not find the course" });
      }

      // Check if user is already enrolled in course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "Student already enrolled in the course",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // STEP 4 -> Options for creating order
  const options = {
    amount: Number(totalAmount * 100),
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  // STEP 5 -> Now initiate the payment using razorpay
  // create order for the payment
  try {
    const paymentResponse = await instance.orders.create(options);
    console.log("THIS IS RESPONSE FROM CREATING ORDER : ", paymentResponse);
    res.json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log("ERROR OCCURED WHILE CREATING ORDER FOR PAYMENT: ", error);
    res
      .status(500)
      .json({ success: false, message: "Could not intiate the order" });
  }
};

// VERIFY THE PAYMENT
exports.verifyPayment = async (req, res) => {
  // STEP 1 -> Extract all the required data
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
  } = req.body;

  const userId = req.user.id;

  // STEP 2 -> Apply validation on the data
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(404).json({ success: false, message: "Payment Failed" });
  }

  // Step 3 -> Now check the signature

  // phle hum apna khud ka signature bnaenge fir usko compare karenge ki jo
  // signature razorpay se aaya hai aur jo humne bnaya hai vo same hai ya nahi
  // same means legit payment and different means tampered/false payment

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  // comparing signatures
  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({
      success: true,
      message: "Payment verified",
    });
  }
  return res.status(404).json({ success: false, message: "Payment failed" });
};

// SEND payment success email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id;

  // STEP 1 _> validate the data
  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(404).json({
      success: false,
      message: "Please provide all the details",
    });
  }

  // Sending mails
  try {
    const uid = new mongoose.Types.ObjectId(userId);
    const enrolledStudent = await User.findById(uid);

    const response = await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId,
      ),
    );
    console.log("This is response from sending the mail :: ", response);
  } catch (error) {
    console.log(
      "Error occured while sending the mail of payment successful email",
      error,
    );
    return res.status(400).json({
      success: false,
      message: "Cannot send the payment successful email",
    });
  }
};

// Enroll the student in course
const enrollStudents = async (courses, userId, res) => {
  // STEP 1 -> Validate the data
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      messsage: "Please provide Course Id and User Id",
    });
  }
  console.log("THESE ARE COURSES::::::", courses);
  console.log("THESE ARE User::::::", userId);

  // STEP 2 -> Insert courseIds into user's enrolled courses
  for (const courseId of courses) {
    try {
      // FIND the course and enroll the studends
      const cid = new mongoose.Types.ObjectId(courseId);
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: cid },
        { $push: { studentsEnrolled: userId } },
        { new: true },
      );

      // validate course
      if (!enrolledCourse) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      // Create course progress for the user
      const courseProgress = await CourseProgress.create({
        courseID: cid,
        userId: userId,
        completedVideos: [],
      });

      // NOW find the student and insert course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            courses: cid,
            courseProgress: courseProgress._id,
          },
        },
        { new: true },
      );

      // Send email of course enrollement to the student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        ),
      );
      console.log(
        "THIS IS EMAIL RESPONSE AFTER ENROLLMENT OF THE STUDENT: ",
        emailResponse,
      );
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error.message });
    }
  }
};
