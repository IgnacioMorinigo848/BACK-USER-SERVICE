const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE_EMAIL,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_EMAIL_PASSWORD,
  }
});

const sendEmail = async (recipientEmail,message) => {
  try {
    console.log(message)
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: recipientEmail,
      text: `Your verification code is: ${message}`,
      html: `<p>:Your verification code is <strong>${message}</strong></p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("email sent :", info.response);

    return {success:true};
  } catch (error) {
    console.error("Error sending email:", error);
    return {success:false};
  }
};

function generateNumber() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

module.exports = { 
  sendEmail,
  generateNumber,

 };
