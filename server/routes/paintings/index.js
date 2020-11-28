const express = require("express");
const paintingMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addPainting')

paintingMainRouter.post("/", authCheck, adminCheck, create);

module.exports = paintingMainRouter