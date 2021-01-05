const express = require("express");
const userMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { save } = require("./saveCart");
const { get } = require("./getCart");
const { remove } = require("./clearCart");

userMainRouter.post("/cart", authCheck, save);
userMainRouter.get("/cart", authCheck, get);
userMainRouter.delete("/cart", authCheck, remove);

module.exports = userMainRouter;
