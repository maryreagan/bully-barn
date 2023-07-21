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



module.exports = { sendValidationEmail, sendForgotPwdEmail }