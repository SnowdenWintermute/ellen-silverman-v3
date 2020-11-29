const express = require("express");
const paintingsMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addPainting')

paintingsMainRouter.post("/", authCheck, adminCheck, create);

module.exports = paintingsMainRouter