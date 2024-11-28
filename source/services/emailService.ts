import nodemailer from "nodemailer";
import { emailConfig } from "../configs/config";

const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: emailConfig.user,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
}
