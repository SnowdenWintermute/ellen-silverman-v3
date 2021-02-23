const Order = require('../../models/order')
const User = require('../../models/user')
const sendReturnEmail = require('../../emails/user/sendReturnEmail')
const sendAdminReturnNotificationEmail = require('../../emails/admin/sendAdminReturnNotificationEmail')

exports.submitReturnRequest = async (req, res) => {
  const { orderId, selectedPaintings, returnNotes } = req.body
  try {
    const atLeastOnePaintingSelected = Object.keys(selectedPaintings).filter(key => selectedPaintings[key]).length > 0
    if (!atLeastOnePaintingSelected) return res.json({ error: "Please select at least one painting to submit a return request." })
    const user = await User.findOne({ email: req.user.email })
    const order = await Order.findById(orderId).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image",
      }
    }).populate("shippingAddress")
    if (!user._id.toString() === order.orderedBy.toString())
      res.json({ error: "You can not request a return on an order that was not made by your account." })
    else {
      for (const painting in order.paintings) {
        for (const paintingTitle in selectedPaintings) {
          if (order.paintings[painting].painting.title === paintingTitle) {
            if (selectedPaintings[paintingTitle]) {
              if (order.status !== "return requested") order.status = "return requested"
              order.paintings[painting].returnRequested = true
              order.paintings[painting].reasonForReturnRequest = returnNotes[order.paintings[painting].painting.title]
              order.history
                .push({ message: `Return requested: ${paintingTitle}, Reason: ${returnNotes[paintingTitle] || "None noted"}`, timestamp: Date.now() })
            }
          }
        }
      }
      // emails
      sendReturnEmail(order, user, selectedPaintings, returnNotes)
      sendAdminReturnNotificationEmail(order, user, selectedPaintings, returnNotes)
      await order.save()
      res.json(order)
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}