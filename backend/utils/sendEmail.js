import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your@gmail.com",
      pass: "your_app_password",
    },
  });

  await transporter.sendMail({
    from: "WaynTech <your@gmail.com>",
    to,
    subject,
    html,
  });
};