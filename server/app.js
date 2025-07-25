const express = require("express");
const app = express();

const courseRoutes = require("./routers/Course");
const paymentRoutes = require("./routers/Payments");
const profileRoutes = require("./routers/Profile");
const userRoutes = require("./routers/User");
const contactUsRoutes = require("./routers/Contact");

const { connectDB } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// Connect to DB
connectDB();

// Connect to Cloudinary
cloudinaryConnect();

// Allowed CORS origins
const allowedOrigins = [process.env.CORS_ORIGIN_URL]; // No trailing slash

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoutes);

// Default route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Server is up",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// const express = require("express");
// const app = express();

// const courseRoutes = require("./routers/Course");
// const paymentRoutes = require("./routers/Payments");
// const profileRoutes = require("./routers/Profile");
// const userRoutes = require("./routers/User");
// const contactUsRoutes = require("./routers/Contact");

// const { connectDB } = require("./config/database");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const fileUpload = require("express-fileupload");
// const PORT = process.env.PORT || 4000;
// const cors = require("cors");
// // connect db
// connectDB();

// // cloudinary
// cloudinaryConnect();

// // middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: `${process.env.CORS_ORIGIN_URL}`,
//     credentials: true,
//   }),
// );
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp",
//   }),
// );

// //routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoutes);

// // default route
// app.get("/", (req, res) => {
//   return res.status(404).json({
//     success: true,
//     message: "Server is up",
//   });
// });

// // start server
// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
