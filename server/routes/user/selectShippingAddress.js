const Cart = require('../../models/cart')
const User = require('../../models/user')

exports.selectShippingAddress = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
    const userCart = await Cart.findOne({ orderedBy: user._id })
    userCart.shippingAddress = req.body.addressId
    await userCart.save()
    return res.json({ message: "Address saved" })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}