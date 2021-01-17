const Order = require('../../models/order')

exports.changeOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.body.id)
    order.status = req.body.newStatus
    await order.save()
    res.json(order)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}