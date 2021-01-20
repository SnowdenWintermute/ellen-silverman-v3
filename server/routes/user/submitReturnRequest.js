const Order = require('../../models/order')
const User = require('../../models/user')

exports.submitReturnRequest = async (req, res) => {
  console.log(req.body)
  const { orderId, selectedPaintings, returnNotes } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })
    const order = await Order.findById(orderId).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image",
      }
    })
    console.log(order.orderedBy)
    console.log(user._id)
    if (!user._id.toString() === order.orderedBy.toString()) {
      res.json({ error: "You can not request a return on an order that was not made by your account." })
    } else {
      for (const painting in order.paintings) {
        for (const paintingTitle in selectedPaintings) {
          if (order.paintings[painting].painting.title === paintingTitle) {
            if (order.status !== "return requested") order.status = "return requested"
            order.paintings[painting].returnRequested = true
            order.paintings[painting].reasonForReturnRequest = returnNotes[order.paintings[painting].painting.title]
          }
        }
      }
      await order.save()
      res.json(order)
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}