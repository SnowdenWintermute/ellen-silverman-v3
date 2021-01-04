const Cart = require('../../models/cart')
const User = require('../../models/user')

exports.get = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    const userCart = await Cart.findOne({ orderedBy: user._id }).populate({
      path: "paintings",
      populate: {
        path: 'painting',
        select: "-image"
      }
    })
    res.json({ userCart })
  } catch (error) {
    res.json(error)
  }
}