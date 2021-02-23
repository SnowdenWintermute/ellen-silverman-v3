const Order = require('../../models/order')
const User = require('../../models/user')

exports.getOwnOrdersByStatus = async (req, res) => {
  const { status } = req.params
  let orders = {}
  try {
    const user = await User.findOne({ email: req.user.email })
    if (status === "all") {
      orders = await Order.find({ orderedBy: user._id }).populate({
        path: "paintings",
        populate: {
          path: 'painting',
          select: "-image",
          populate: {
            path: "series"
          }
        }
      }).populate("shippingAddress")
    } else {
      orders = await Order.find({ orderedBy: user._id, status: status !== "all" && status }).populate({
        path: "paintings",
        populate: {
          path: 'painting',
          select: "-image",
          populate: {
            path: "series"
          }
        }
      }).populate("shippingAddress")
    }
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}