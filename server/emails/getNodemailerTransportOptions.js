const emailPass = process.env.NODEMAILER_EMAIL_PASSWORD

module.exports = () => {
  return {
    name: "mcguffsilverman.com", // website name
    host: "mail.mcguffsilverman.com", // note - might can change this after hosted not on local host
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "no-reply@mcguffsilverman.com", // generated ethereal user
      pass: emailPass // generated ethereal password
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  }
}