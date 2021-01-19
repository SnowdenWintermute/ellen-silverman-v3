const Order = require('../../models/order')
const User = require('../../models/user')

exports.submitReturnRequest = async (req, res) => {
  console.log(req.body)
  const { orderId, selectedPaintings, returnNotes } = req.body
  try {
    const user = await User.findOne({ email: req.user.email })
    const order = await Order.findById(orderId)
    console.log(order.orderedBy)
    console.log(user._id)
    if (!user._id.toString() === order.orderedBy.toString()) {
      res.json({ error: "You can not request a return on an order that was not made by your account." })
    } else {
      for (const painting in order.paintings) {
        //
      }
    }
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}