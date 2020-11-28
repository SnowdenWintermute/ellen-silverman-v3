const express = require("express");
const seriesMainRouter = express.Router();
const { authCheck, adminCheck } = require("../../middlewares/auth");

const { create } = require('./addSeries')
const { list } = require('./listSeries')

seriesMainRouter.post("/", authCheck, adminCheck, create);
seriesMainRouter.get("/list", list);

module.exports = seriesMainRouter