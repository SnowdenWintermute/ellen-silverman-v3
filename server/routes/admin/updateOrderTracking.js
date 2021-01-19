const Order = require('../../models/order')

exports.updateOrderTracking = async (req, res) => {
  try {
    const order = await Order.findById(req.body.id)
    order.tracking = req.body.newTracking
    console.log(order)
    await order.save()
    res.json(order)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}