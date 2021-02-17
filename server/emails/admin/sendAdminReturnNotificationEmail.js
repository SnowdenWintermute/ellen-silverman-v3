const nodemailer = require("nodemailer");
const getNodemailerTransportOptions = require('../getNodemailerTransportOptions')
const adminEmail = process.env.IN_DEVELOPMENT_MODE ? "michael.p.silverman@gmail.com" : "mcguffsilverman@gmail.com"
const rootUrl = process.env.ROOT_URL;

module.exports = (order, user, selectedPaintings, returnNotes) => {
  console.log("admin notified: " + adminEmail)
  Object.keys(selectedPaintings).map(painting => console.log(painting))
  try {
    const output = `A return on order id ${order._id} has been requested for the following item(s). \n 
    ${Object.keys(selectedPaintings).map(painting => selectedPaintings[painting] &&
      (painting + " - Reason: " + returnNotes[painting] || "Reason not noted" + "\n"))}
      Please email the user at ${user.email} with return instructions.
    `;
    const textOutput = `A return has been requested for the following item(s). \n 
    ${Object.keys(selectedPaintings).map(painting => selectedPaintings[painting] &&
      (painting + " - Reason: " + returnNotes[painting] || "Reason not noted" + "\n"))}
      Please email the user at ${user.email} with return instructions.
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(getNodemailerTransportOptions());

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: 'no-reply@mcguffsilverman.com', // sender address
      to: adminEmail, // list of receivers
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
}