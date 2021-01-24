const nodemailer = require("nodemailer");
const createNewOrderEmailBody = require("./createNewOrderEmailBody");
const getNodemailerTransportOptions = require('../getNodemailerTransportOptions')
const rootUrl = process.env.ROOT_URL

module.exports = async (user, order) => {
  console.log("mailing order confirmation to " + user.email)
  if (!user.email) return
  try {
    const output = createNewOrderEmailBody(user, order);
    const textOutput = `Thank you for your order. We will email you when your items ship. \n 
    ${order.paintings.map(painting => painting.painting.title + ": " + painting.painting.price) + "\n"}
      You can view your orders at ${rootUrl}/user/history
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(getNodemailerTransportOptions());

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'no-reply@mcguffsilverman.com', // sender address
      to: user.email, // list of receivers
      subject: "Order Placed", // Subject line
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
