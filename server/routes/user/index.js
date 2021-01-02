const express = require("express");
const userMainRouter = express.Router();
const { authCheck } = require("../../middlewares/auth");

const { save } = require('./saveCart')

userMainRouter.post("/cart", authCheck, save);

module.exports = userMainRouter