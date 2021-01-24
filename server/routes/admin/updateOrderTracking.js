const Order = require('../../models/order')
const User = require('../../models/user')
const sendTrackingUpdateEmail = require('../../emails/user/sendTrackingUpdateEmail')

exports.updateOrderTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.body.id)
    const user = await User.findById(order.orderedBy)
    order.tracking = req.body.newTracking
    order.history.push({ message: `Tracking link updated: ${order.tracking}`, timestampe: Date.now() })
    await order.save()
    sendTrackingUpdateEmail(order, user)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}