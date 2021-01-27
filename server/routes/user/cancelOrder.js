const sendAdminCancelledOrderNotificationEmail = require('../../emails/admin/sendAdminCancelledOrderNotificationEmail')
const sendCancelOrderEmail = require('../../emails/user/sendCancelOrderEmail')
const Order = require('../../models/order')
const User = require('../../models/user')

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image",
      }
    }).populate("shippingAddress")
    const user = await User.findOne({ email: req.user.email })
    console.log(order.orderedBy)
    console.log(user._id)
    if (user._id.toString() !== order.orderedBy.toString()) return res.json({ error: "You cannot cancel an order that you did not create." })
    if (order.status !== "processing") return res.json({ error: "You cannot cancel an order that has already shipped. Try issuing a return request instead." })
    order.status = "cancelled"
    order.history.push({ message: "Order cancelled", timestamp: Date.now() })
    await order.save()
    sendCancelOrderEmail(order, user)
    sendAdminCancelledOrderNotificationEmail(order)
    console.log(order)
    console.log(`Order id ${order._id} cancelled`)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}