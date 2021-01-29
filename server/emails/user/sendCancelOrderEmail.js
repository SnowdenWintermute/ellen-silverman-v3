const nodemailer = require("nodemailer");
const getNodemailerTransportOptions = require('../getNodemailerTransportOptions')
const rootUrl = process.env.ROOT_URL

module.exports = async (order, user) => {
  console.log("mailing cancellation update update to " + user.email)
  if (!user.email) return
  try {
    const output = `Your order id ${order._id} has been successfully cancelled. \n
      You can view and manage your orders at <a href="https://mcguffsilverman.com/user/history">https://mcguffsilverman.com/user/history</a>
    `;
    const textOutput = `Your order id ${order._id} has been successfully cancelled. \n
    You can view and manage your orders at https://mcguffsilverman.com/user/history
  `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(getNodemailerTransportOptions());

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'no-reply@mcguffsilverman.com', // sender address
      to: user.email, // list of receivers
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
};
