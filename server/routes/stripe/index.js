const express = require("express");
const stripeMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { createPaymentIntent } = require("./createPaymentIntent");

stripeMainRouter.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = stripeMainRouter;
