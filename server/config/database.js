const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDB = async function () {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((error) => {
      console.error(error);
      console.log("Cannot connect to database");
      process.exit(1);
    });
};
