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
      subject: "Verify Your Email - Bully Barn",
      html: `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333333;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <h2>Welcome to Bully Barn!</h2>
          <p>Thank you for signing up with us. To get started, please verify your email by clicking the link below:</p>
          <p><a href="${validationLink}" style="display: inline-block; padding: 10px 20px; background-color: #2fbcbc; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
          <p>If you did not create an account on Bully Barn, you can ignore this email.</p>
          <p>Thank you.</p>
        </body>
      </html>
      `,
    }

    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response)
  } catch (err) {
    console.error("Error sending email: ", err)
  }
}

const sendForgotPwdEmail = async (userEmail, fullName, resetPwdLink)  => {
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
      subject: "Reset your password - Bully Barn",
      html:`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333333;
            }
            a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
        <h2>Hello ${fullName},</h2>
        <p>We received a request to reset your password.</p>
        <p>If you initiated this request, please click the following link to reset your password:</p>
        <p><a href="${resetPwdLink}" style="display: inline-block; padding: 10px 20px; background-color: #2fbcbc; color: #ffffff; text-decoration: none; border-radius: 5px;"> Link to reset password</a></p>
        <p>If you did not request a password reset, you can ignore this email. Your account is safe and secure.</p>
        <p>Thank you.</p>
      </body>
      </html>
    `,
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
      html: ` 
      <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333333;
            }
          </style>
        </head>
      <h2>Dear ${applicantName},</h2>
      <p>We hope this email finds you well. We are delighted to inform you that your application to adopt <strong>${dogName}</strong> has been approved! Congratulations on becoming the potential new pet parent to this wonderful dog.</p>
      <p>To proceed with the adoption process and secure <strong>${dogName}</strong> as your new companion, please click on the following link to pay the adoption fee:</p>
      <a href="${paymentLink}" style="display: inline-block; padding: 10px 20px; background-color: #2fbcbc; color: #ffffff; text-decoration: none; border-radius: 5px;">Pay Adoption Fee</a>
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