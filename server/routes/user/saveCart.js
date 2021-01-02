const Cart = require('../../models/cart')
const Painting = require('../../models/painting')
const User = require('../../models/user')

exports.save = async (req, res) => {
  const { cartItemIdsAndQuantities } = req.body
  console.log(cartItemIdsAndQuantities)
  const newCart = new Cart()
  for (const item of cartItemIdsAndQuantities) {
    let subtotal = 0
    const painting = await Painting.findById(item.id).select('-image -thumbnail')
    subtotal += painting.price * item.quantity
    newCart.paintings.push({ painting: painting._id, count: item.quantity, subtotal })
  }
  let cartTotal = 0
  newCart.paintings.forEach(paintingInCart => {
    cartTotal += paintingInCart.subtotal
  })
  newCart.cartTotal = cartTotal
  const orderedBy = await User.findOne({ email: req.user.email })
  newCart.orderedBy = orderedBy._id
  console.log(newCart)
  res.send({ ok: true })
}