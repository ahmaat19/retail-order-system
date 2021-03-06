import nodemailer from 'nodemailer'

export const sendEmail = (options) => {
  const smtpTransparent = nodemailer.createTransport({
    service: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_KEY,
    },
  })

  const mailOptions = {
    from: `"Ahmed " <${process.env.SMTP_USER}>`,
    to: options.to,
    subject: options.subject,
    html: options.text,
  }

  return smtpTransparent.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('Email has returned an error: ', err)
    } else {
      console.log('Email has been sent', info)
    }
  })
}
