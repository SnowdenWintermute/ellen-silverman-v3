const User = require('../../models/user')
const Cart = require('../../models/cart')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
  const { cartTotal } = await Cart.findOne({ orderedBy: user._id })
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