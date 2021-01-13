const Order = require('../../models/order')
const User = require('../../models/user')

exports.getOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    const orders = await Order.find({ orderedBy: user._id }).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image"
      }
    })
    console.log(orders)
    res.json(orders)
  } catch (error) {
    res.json(error)
  }
}