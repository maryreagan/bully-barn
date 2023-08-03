const nodemailer = require('nodemailer')
const username = process.env.MAILTRAP_USERNAME
const pwd = process.env.MAILTRAP_PASSWORD

const sendValidationEmail = async (userEmail, validationLink)  => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: username,
        pass: pwd
      },
      authMethod: "LOGIN"
    })

    const emailContent = {
      from: "noreply@bullybarn.com",
      to: userEmail,
      subject: "Verify Your Email",
      html: `<p>Hello, please click the following link to verify your email:</p><a href="${validationLink}">Verify Email</a>`,
    }

    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response)
  } catch (err) {
    console.error("Error sending email: ", err)
  }
}

const sendForgotPwdEmail = async (userEmail, resetPwdLink)  => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: username,
        pass: pwd
      },
      authMethod: "LOGIN"
    })

    const emailContent = {
      from: "noreply@bullybarn.com",
      to: userEmail,
      subject: "Forgot Password",
      html: `<p>Hello, please click the following link to reset your password:</p><a href="${resetPwdLink}">Reset Password</a>`,
    }

    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response)
  } catch (err) {
    console.error("Error sending email: ", err)
  }
}

const sendApprovedEmail = async (userEmail, applicantName, dogName, paymentLink)  => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: username,
        pass: pwd
      },
      authMethod: "LOGIN"
    })

    const emailContent = {
      from: "noreply@bullybarn.com",
      to: userEmail,
      subject: "Adoption Application Approved - Congratulations!",
      html: ` <h2>Dear ${applicantName},</h2>
      <p>We hope this email finds you well. We are delighted to inform you that your application to adopt <strong>${dogName}</strong> has been approved! Congratulations on becoming the potential new pet parent to this wonderful dog.</p>
      <p>To proceed with the adoption process and secure <strong>${dogName}</strong> as your new companion, please click on the following link to pay the adoption fee:</p>
      <a href="${paymentLink}" style="display: inline-block; padding: 10px 20px; background-color: #9fd3c7; color: #ffffff; text-decoration: none; border-radius: 5px;">Pay Adoption Fee</a>
      <p>If you have any questions or require any further assistance, please don't hesitate to reach out to us. We are more than happy to help.</p>
      <p>Thank you for choosing to adopt from our rescue organization. We look forward to welcoming <strong>${dogName}</strong> into your loving home!</p>
      <p>Best regards,<br>
      Bully Barn</p>`,
    }

    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response)
  } catch (err) {
    console.error("Error sending email: ", err)
  }
}



module.exports = { sendValidationEmail, sendForgotPwdEmail, sendApprovedEmail }