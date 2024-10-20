import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate";

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // Use host instead of service
    port: Number(process.env.EMAIL_PORT), // Ensure port is a number
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "ChandraShekhar <hello@mindfuel.io>", // Fix missing closing quote
    to: options.email,
    subject: options.subject,
    html: emailTemplate.replace("{{resetLink}}", options.resetLink), 
    //
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};


export default sendEmail;