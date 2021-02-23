const Cart = require('../../models/cart')
const Painting = require('../../models/painting')
const User = require('../../models/user')

exports.save = async (req, res) => {
  try {
    const { cartItemIdsAndQuantities } = req.body
    const user = await User.findOne({ email: req.user.email })
    let oldCart = await Cart.findOne({ orderedBy: user._id })
    if (oldCart) oldCart.remove()
    const newCart = new Cart()
    for (const item of cartItemIdsAndQuantities) { // subtotals for each item
      let subtotal = 0
      const painting = await Painting.findById(item.id).select('-image -thumbnail')
      subtotal += painting.price * item.quantity
      newCart.paintings.push({ painting: painting._id, count: item.quantity, subtotal })
    }
    let cartTotal = 0
    newCart.paintings.forEach(paintingInCart => cartTotal += paintingInCart.subtotal)
    newCart.cartTotal = cartTotal
    newCart.orderedBy = user._id
    await newCart.save()
    res.json({ ok: true })
  } catch (error) {
    res.json(error)
  }
}