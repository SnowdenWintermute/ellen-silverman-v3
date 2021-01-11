const User = require('../../models/user')
const Cart = require('../../models/cart')
const Painting = require('../../models/painting')

const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  console.log("creating payment intent")
  console.log(req.body)
  console.log(req.headers)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd'
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.json(error)
  }
}