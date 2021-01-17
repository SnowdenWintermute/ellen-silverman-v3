const Order = require('../../models/order')

exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params
  let orders = {}
  try {
    if (status === "all") {
      orders = await Order.find().populate({
        path: "paintings",
        populate: {
          path: 'painting',
          select: "-image",
          populate: {
            path: "series"
          }
        }
      }).populate("shippingAddress").populate("orderedBy")
    } else {
      orders = await Order.find({ status }).populate({
        path: "paintings",
        populate: {
          path: 'painting',
          select: "-image",
          populate: {
            path: "series"
          }
        }
      }).populate("shippingAddress").populate("orderedBy")
    }
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}