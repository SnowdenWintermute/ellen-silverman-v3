const express = require("express");
const userMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { save } = require("./saveCart");
const { get } = require("./getCart");
const { remove } = require("./clearCart");
const { lookupNewAddress } = require('./lookupNewAddress')
const { getUserAddresses } = require('./getUserAddresses')
const { confirmNewAddress } = require('./confirmNewAddress')
const { selectShippingAddress } = require('./selectShippingAddress')
const { removeAddress } = require('./removeAddress')
const { createOrder } = require('./createOrder')
const { getOwnOrdersByStatus } = require('./getOwnOrdersByStatus');
const { getOwnOrderById } = require('./getOwnOrderById');
const { submitReturnRequest } = require("./submitReturnRequest");
const { cancelOrder } = require("./cancelOrder");

userMainRouter.post("/cart", authCheck, save);
userMainRouter.get("/cart", authCheck, get);
userMainRouter.delete("/cart", authCheck, remove);

userMainRouter.post("/address", authCheck, lookupNewAddress);
userMainRouter.put("/address", authCheck, confirmNewAddress);
userMainRouter.put("/address/select", authCheck, selectShippingAddress);
userMainRouter.put("/address/remove", authCheck, removeAddress);
userMainRouter.get("/address", authCheck, getUserAddresses);

userMainRouter.post("/order", authCheck, createOrder)
userMainRouter.get("/order/:status", authCheck, getOwnOrdersByStatus)
userMainRouter.get("/order/id/:id", authCheck, getOwnOrderById)
userMainRouter.put("/order/return", authCheck, submitReturnRequest)
userMainRouter.put("/order/cancel", authCheck, cancelOrder)

module.exports = userMainRouter;
