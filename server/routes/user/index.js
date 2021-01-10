const express = require("express");
const userMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { save } = require("./saveCart");
const { get } = require("./getCart");
const { remove } = require("./clearCart");
const { lookupNewAddress } = require('./lookupNewAddress')
const { getUserAddresses } = require('./getUserAddresses')
const { confirmNewAddress } = require('./confirmNewAddress')
const { removeAddress } = require('./removeAddress')

userMainRouter.post("/cart", authCheck, save);
userMainRouter.get("/cart", authCheck, get);
userMainRouter.delete("/cart", authCheck, remove);

userMainRouter.post("/address", authCheck, lookupNewAddress);
userMainRouter.put("/address", authCheck, confirmNewAddress);
userMainRouter.put("/address/remove", authCheck, removeAddress);
userMainRouter.get("/address", authCheck, getUserAddresses);

module.exports = userMainRouter;
