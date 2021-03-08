const sendAdminCancelledOrderNotificationEmail = require('../../emails/admin/sendAdminCancelledOrderNotificationEmail')
const sendCancelOrderEmail = require('../../emails/user/sendCancelOrderEmail')
const Order = require('../../models/order')
const User = require('../../models/user')
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata')

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
    if (user._id.toString() !== order.orderedBy.toString()) return res
      .json({ error: "You cannot cancel an order that you did not create." })
    if (order.status !== "processing") return res
      .json({ error: "You cannot cancel an order that has already shipped. Try issuing a return request instead." })
    order.status = "cancelled"
    order.history.push({ message: "Order cancelled", timestamp: Date.now() })
    await order.save()
    const seriesIds = []
    order.paintings.forEach(painting => {
      painting.painting.sold = false
      painting.painting.save()
      painting.painting.seriesList.forEach(series => {
        if (!seriesIds.includes(series._id)) seriesIds.push(series._id)
      })
    })
    updateSeriesMetadata(seriesIds)
    sendCancelOrderEmail(order, user)
    sendAdminCancelledOrderNotificationEmail(order)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}