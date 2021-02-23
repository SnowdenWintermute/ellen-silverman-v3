const Order = require('../../models/order')
const User = require('../../models/user')

exports.getOwnOrderById = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    const orders = await Order.find({ orderedBy: user._id, _id: req.params.id }).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image",
        populate: {
          path: "series"
        }
      }
    }).populate("shippingAddress")
    res.json(orders[0])
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}