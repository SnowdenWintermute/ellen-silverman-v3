const Order = require('../../models/order')

exports.getOrderById = async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image",
        populate: {
          path: "series"
        }
      }
    }).populate("shippingAddress").populate("orderedBy")
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}