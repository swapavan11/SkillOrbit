const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async function (email, title, body) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: "demo.user14625@gmail.com",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Info from sending mail ", info);
    return info;
  } catch (error) {
    console.log("Error occurred while sending mail ", error);
    throw error;
  }
};

module.exports = mailSender;
