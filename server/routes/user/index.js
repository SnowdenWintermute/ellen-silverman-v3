const express = require("express");
const userMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { save } = require('./saveCart')
const { get } = require('./getCart')

userMainRouter.post("/cart", authCheck, save);
userMainRouter.get("/cart", authCheck, get);

module.exports = userMainRouter