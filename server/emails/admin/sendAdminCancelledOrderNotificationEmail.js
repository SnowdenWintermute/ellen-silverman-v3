const nodemailer = require("nodemailer");
const getNodemailerTransportOptions = require('../getNodemailerTransportOptions')
const adminEmail = process.env.IN_DEVELOPMENT_MODE ? "michael.p.silverman@gmail.com" : "mcguffsilverman@gmail.com"
const rootUrl = process.env.ROOT_URL;

module.exports = (order) => {
  console.log("admin notified: " + adminEmail)
  try {
    const output = `Order id ${order._id} has been cancelled. \n 
    Do not ship this order.`;
    const textOutput = output

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(getNodemailerTransportOptions());

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'no-reply@mcguffsilverman.com', // sender address
      to: adminEmail, // list of receivers
      subject: "Order Cancelled", // Subject line
      text: textOutput, // plain text body
      html: output // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log("error sending email");
    console.error(error.message);
  }
}