const User = require('../../models/user')
const Cart = require('../../models/cart')
const Order = require('../../models/order')
const markPaintingsAsSoldOrDecrementStock = require("./markPaintingsAsSoldOrDecrementStock")
const { cloneDeep } = require('lodash')

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse
  try {
    const user = await User.findOne({ email: req.user.email })
    console.log(user)
    const userCart = await Cart.findOne({ orderedBy: user._id })
    console.log("found cart", userCart)
    const newOrder = new Order()
    newOrder.paintings = cloneDeep(userCart.paintings)
    console.log("new order paintings: ", newOrder.paintings)
    newOrder.orderTotal = userCart.cartTotal
    newOrder.paymentIntent = paymentIntent
    newOrder.shippingAddress = userCart.shippingAddress
    newOrder.orderedBy = user._id
    await newOrder.save()
    console.log("Order Saved: ", newOrder)
    markPaintingsAsSoldOrDecrementStock(newOrder)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}