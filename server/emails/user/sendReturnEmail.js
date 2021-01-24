const nodemailer = require("nodemailer");
const createReturnEmailBody = require("./createReturnEmailBody");
const getNodemailerTransportOptions = require('../getNodemailerTransportOptions')
const rootUrl = process.env.ROOT_URL

module.exports = async (order, user, selectedPaintings, returnNotes) => {
  console.log("mailing return confirmation to " + user.email)
  if (!user.email) return
  try {
    const output = createReturnEmailBody(order, selectedPaintings, returnNotes);
    const textOutput = `Your return for the following items has been received and is being processed. \n 
    ${Object.keys(selectedPaintings).map(painting => selectedPaintings[painting] && painting + "\n")}
      You can view your orders at https://mcguffsilverman.com/user/history
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(getNodemailerTransportOptions());

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'no-reply@mcguffsilverman.com', // sender address
      to: user.email, // list of receivers
      subject: "Return Request", // Subject line
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
