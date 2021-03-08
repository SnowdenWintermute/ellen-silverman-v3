const User = require('../../models/user')
const Cart = require('../../models/cart')
const Order = require('../../models/order')
const markPaintingsAsSoldOrDecrementStock = require("./markPaintingsAsSoldOrDecrementStock")
const { cloneDeep } = require('lodash')
const sendOrderEmail = require('../../emails/user/sendOrderEmail')
const sendAdminOrderNotificationEmail = require('../../emails/admin/sendAdminOrderNotificationEmail')
const updateSeriesMetadata = require('../utils/series/updateSeriesMetadata')
const Painting = require('../../models/painting')

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse
  try {
    const user = await User.findOne({ email: req.user.email })
    const userCart = await Cart.findOne({ orderedBy: user._id })
    const newOrder = new Order()
    newOrder.paintings = cloneDeep(userCart.paintings)
    newOrder.orderTotal = userCart.cartTotal
    newOrder.paymentIntent = paymentIntent
    newOrder.shippingAddress = userCart.shippingAddress
    newOrder.orderedBy = user._id
    await newOrder.save()
    const newOrderForConfirmationEmail = await Order.findById(newOrder._id)
      .populate({ path: "paintings", populate: { path: "painting", select: "title price", populate: { path: "series" } } })
    await sendOrderEmail(user, newOrderForConfirmationEmail)
    sendAdminOrderNotificationEmail(newOrderForConfirmationEmail)
    await markPaintingsAsSoldOrDecrementStock(newOrder)
    const seriesIds = []
    for (const painting of newOrder.paintings) {
      const paintingFromDB = await Painting.findById(painting.painting).populate('seriesList')
      paintingFromDB.seriesList.forEach(seriesId => {
        if (!seriesIds.includes(seriesId)) seriesIds.push(seriesId)
      })
    }
    updateSeriesMetadata(seriesIds)
    res.json({ ok: true })
  } catch (error) {
    console.log(error)
    res.json(error)
  }
}