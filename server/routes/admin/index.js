const express = require("express");
const adminMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { getOrdersByStatus } = require('./getOrdersByStatus')
const { getOrderById } = require('./getOrderById')
const { changeOrderStatus } = require('./changeOrderStatus')

adminMainRouter.get("/orders/:status", authCheck, adminCheck, getOrdersByStatus);
adminMainRouter.get("/orders/id/:id", authCheck, adminCheck, getOrderById);
adminMainRouter.put("/orders/status", authCheck, adminCheck, changeOrderStatus);

module.exports = adminMainRouter