const User = require('../../models/user')
const Cart = require('../../models/cart')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
  const cart = await Cart.findOne({ orderedBy: user._id })
  if (!cart) throw new Error("No cart found")
  const { cartTotal } = cart
  const numberOfCentsToCharge = cartTotal * 100
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: numberOfCentsToCharge,
      currency: 'usd'
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.json(error)
  }
}